# Week 3 : Pyodide Integration and Web Worker Architecture

## Error / Problem

Running `ptt_parser`, `ptt_shell`, `ptt_furnish`, and `ptt_render` via Pyodide on the main browser thread froze the UI for 15–25 seconds, blocking animations, CSS transitions, and user input.

## Relevant Context

VisualEyes runs 100% client-side as a static site. Loading Pyodide (`pyodide.asm.wasm`), 9 Python wheels, and `py.zip` had to happen asynchronously without degrading perceived responsiveness.

## Key Observation

Moving Pyodide into a dedicated Web Worker (`worker.js`) keeps the main UI thread at 60 FPS. Furthermore, intercepting `self.fetch` inside the worker allows `.zip` and `.whl` archives to be reconstructed from base64-chunked JSON parts (`data/*.json`), avoiding static host file-size/MIME issues.

## Solution

Implemented `worker.js` with an async RPC protocol (`init`, `parse`, `edit`, `build`, `duplex`):
- Emits `{progress: {step, done, total}}` during startup so `index.html` shows a smooth loading bar.
- Warms Python module imports immediately after unpacking `py.zip`.
- Transfers generated `.glb` `ArrayBuffer` objects back to `app.js` as zero-copy transferables.
