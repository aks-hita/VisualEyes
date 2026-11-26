# VisualEyes — Source Code

## Directory Structure

- **`v1-prototype/`** — Earlier single-floor version (`PlanToTour Live`) demonstrating the initial Pyodide + Three.js pipeline.
- **`v2-final/`** — Full production version (`PlanToTour Studio`) with duplex/multi-floor support, classic 2D plan editor (`classic.html`), sample project loader, Netlify routing/caching config, and custom HDRI environment support.

## Architecture

VisualEyes is a **static web application** with no backend server:

1. **Frontend** (`index.html`, `app.js`) — React 19 + Three.js 3D viewer, room card strip, interactive furniture/paint customization panel, and walker/tour engine.
2. **Plan Editor** (`classic.html`) — Standalone 2D drafting-table editor for correcting walls and room labels before 3D generation.
3. **Web Worker** (`worker.js`) — Executes the Python pipeline off the main thread via Pyodide WebAssembly, communicating via `{id, cmd, args}` messages (`init`, `parse`, `edit`, `build`, `duplex`).
4. **Python Pipeline** (loaded at runtime from `data/py.zip`):
   - `ptt_parser` — DXF parsing, wall topology graph, room boundary detection & classification
   - `ptt_shell` — 3D wall/floor/ceiling geometry extrusion with door/window cutouts
   - `ptt_furnish` — Interior design & rule-based auto-furnishing
   - `ptt_render` — glTF/GLB 3D scene assembly with PBR materials and lighting

## Runtime Prerequisites (Excluded from Git)

Large binary runtime files and pre-packaged wheels are excluded via `.gitignore`. To run the app locally, place the following inside `v2-final/` (or `v1-prototype/`):

1. **`pyodide/`** — Pyodide 0.26.x WASM runtime (`pyodide.js`, `pyodide.asm.js`, `pyodide.asm.wasm`, `pyodide-lock.json`)
2. **`data/`** — Base64-chunked archives (`index.json`, `py.zip.0.json`, `python_stdlib.zip.0.json`, and Pyodide WASM wheels for `numpy`, `networkx`, `pydantic`, `pydantic_core`, `pyparsing`, `fonttools`, `decorator`, `typing_extensions`, `annotated_types`)
3. **`samples/`** *(optional)* — Pre-built JSON tour samples (`2bhk.json`, `3bhk.json`, `duplex.json`)

## Running Locally

Must be served over HTTP(S) (`file://` will not work due to Web Worker and WASM CORS restrictions):

```bash
cd v2-final/
python3 -m http.server 8080
# Open http://localhost:8080
```

## Deployment

Deploy `v2-final/` directly to any static host (e.g., Netlify — configured via `netlify.toml` and `_redirects`, no build step required).
