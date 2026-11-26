# Week 3 : DXF Parsing with pyparsing under Pyodide

## Error / Problem

Importing `ezdxf` inside the Pyodide WebAssembly environment failed with missing C-extension wheel errors and bloated the initial download payload beyond acceptable browser load times.

## Relevant Context

VisualEyes executes its entire Python pipeline (`ptt_parser`, `ptt_shell`, `ptt_furnish`, `ptt_render`) inside a browser Web Worker (`worker.js`) using Pyodide 0.26. Every dependency must be pure Python or have a pre-compiled `wasm32` wheel.

## Key Observation

We only need a small fraction of the DXF specification—specifically `HEADER` units, `BLOCKS` definitions, and geometric primitives in `ENTITIES`. Pure-Python `pyparsing` (a lightweight wheel already supported by Pyodide) combined with `networkx` and `pydantic` is sufficient to parse group-code pairs into validated Pydantic models.

## Solution

Replaced the `ezdxf` dependency with a custom streaming group-code parser in `ptt_parser` backed by `pyparsing` and `pydantic` schemas. Initialized `worker.js` with only 9 lightweight wheels (`pyparsing`, `numpy`, `networkx`, `pydantic`, `fonttools`, etc.), keeping cold-start initialization fast and 100% browser-compatible.
