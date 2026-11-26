# Week 6 : Cross-Browser and Performance Testing

## Error / Problem

In early browser tests, large 3BHK and duplex DXF files caused noticeable UI stutter during Pyodide startup, and Safari occasionally threw out-of-memory errors when transferring large GLB buffers.

## Relevant Context

VisualEyes must run smoothly on desktop and mobile browsers (Chrome, Firefox, Edge, Safari) when served as a static site (e.g., Netlify) with `worker.js` handling WASM execution.

## Key Observation

1. Copying the `Uint8Array` GLB buffer across `postMessage` doubled peak memory usage.
2. Loading base64-chunked archives (`data/*.json`) without progress feedback made users think the app had hung.

## Solution

Verified `worker.js` transferable `ArrayBuffer` usage (`self.postMessage(..., [buf])`) so GLB ownership transfers with zero copy. Tested cold-start and warm-parse timings across Chrome 120+, Firefox 121+, and Safari:
- Cold Pyodide + wheel init: ~4–7s
- Parse + shell + furnish + GLB build (2BHK): ~2–4s
Added structured progress events (`{progress: {step, done, total}}`) and clear error reporting for unsupported WebGL/WASM environments.
