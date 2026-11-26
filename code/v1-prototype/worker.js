/* PlanToTour Live engine: the real Python pipeline under Pyodide, off the page's main thread.
 *
 * Messages in:  {id, cmd: "init" | "parse" | "edit" | "build", args}
 * Messages out: {id, ok, result} | {id, ok: false, error} | {progress: {step, done, total}}
 * Every file it loads is published next to the page (no CDN fetches).
 */
/* global loadPyodide */
const BASE = new URL("./", self.location.href).href;
importScripts(BASE + "pyodide/pyodide.js");

const WHEELS = [
  "typing_extensions-4.11.0-py3-none-any.whl",
  "annotated_types-0.6.0-py3-none-any.whl",
  "pydantic_core-2.27.2-cp312-cp312-pyodide_2024_0_wasm32.whl",
  "pydantic-2.10.5-py3-none-any.whl",
  "numpy-2.0.2-cp312-cp312-pyodide_2024_0_wasm32.whl",
  "decorator-5.1.1-py3-none-any.whl",
  "networkx-3.4.2-py3-none-any.whl",
  "pyparsing-3.1.2-py3-none-any.whl",
  "fonttools-4.51.0-py3-none-any.whl",
];

// Archives arrive as base64 JSON parts (see build.mjs). Pyodide fetches them by name
// (python_stdlib.zip, wheels, py.zip); answer those fetches from the parts instead.
const realFetch = self.fetch.bind(self);
let index = null;
async function archive(name) {
  index = index || (await (await realFetch(BASE + "data/index.json")).json());
  const entry = index[name];
  if (!entry) return null;
  const out = new Uint8Array(entry.size);
  let at = 0;
  for (let i = 0; i < entry.parts; i++) {
    const b64 = await (await realFetch(BASE + "data/" + name + "." + i + ".json")).json();
    const bin = atob(b64);
    for (let j = 0; j < bin.length; j++) out[at + j] = bin.charCodeAt(j);
    at += bin.length;
  }
  return out;
}
self.fetch = async (input, init) => {
  const url = input instanceof Request ? input.url : String(input);
  const name = String(url).split("?")[0].split("/").pop();
  if (/\.(zip|whl)$/.test(name)) {
    const bytes = await archive(name);
    if (bytes) return new Response(bytes, { headers: { "Content-Type": "application/zip" } });
  }
  return realFetch(input, init);
};

let py = null;
let live = null;
let starting = null;

function progress(step, done, total) {
  self.postMessage({ progress: { step, done, total } });
}

async function init() {
  const total = WHEELS.length + 2;
  progress("Starting Python", 0, total);
  py = await loadPyodide({ indexURL: BASE + "pyodide/" });
  let n = 1;
  for (const w of WHEELS) {
    progress("Loading " + w.split("-")[0], n, total);
    await py.loadPackage(BASE + "pyodide/" + w, { messageCallback: () => {} });
    n += 1;
  }
  progress("Loading the PlanToTour pipeline", n, total);
  const zip = await (await fetch(BASE + "py.zip")).arrayBuffer();
  py.unpackArchive(new Uint8Array(zip), "zip", { extractDir: "/app" });
  py.runPython("import sys, os; sys.path.insert(0, '/app'); os.chdir('/app')");
  live = py.pyimport("ptt_live");
  // Warm the imports so the first real run is quicker.
  py.runPython(
    "import ptt_parser.pipeline, ptt_shell.build, ptt_furnish.api, ptt_render.gltf, ptt_render.viewer",
  );
  progress("Ready", total, total);
  return { python: py.version };
}

function call(name, ...args) {
  return JSON.parse(live[name](...args));
}

self.onmessage = async (ev) => {
  const { id, cmd, args = {} } = ev.data || {};
  try {
    if (cmd === "init") {
      starting = starting || init();
      self.postMessage({ id, ok: true, result: await starting });
      return;
    }
    if (!live) await (starting = starting || init());
    if (cmd === "parse") {
      const bytes = py.toPy(new Uint8Array(args.bytes));
      try {
        self.postMessage({
          id,
          ok: true,
          result: call("parse_dxf", bytes, args.filename, JSON.stringify(args.options || {})),
        });
      } finally {
        bytes.destroy();
      }
    } else if (cmd === "edit") {
      self.postMessage({
        id,
        ok: true,
        result: call("edit_plan", JSON.stringify(args.plan), JSON.stringify(args.ops)),
      });
    } else if (cmd === "build") {
      const out = call("build_tour", JSON.stringify(args.plan), JSON.stringify(args.options || {}));
      if (out.error) {
        self.postMessage({ id, ok: true, result: out });
        return;
      }
      const glb = py.FS.readFile(out.glb); // Uint8Array copy
      const buf = glb.buffer.slice(glb.byteOffset, glb.byteOffset + glb.byteLength);
      self.postMessage({ id, ok: true, result: { ...out, glb: buf } }, [buf]);
    } else {
      throw new Error("unknown command " + cmd);
    }
  } catch (e) {
    self.postMessage({ id, ok: false, error: String((e && e.message) || e).slice(-1500) });
  }
};
