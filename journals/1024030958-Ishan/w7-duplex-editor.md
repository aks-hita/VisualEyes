# Week 7 : Duplex Support, Classic Editor & Static Deployment

## Error / Problem

Builders needed to showcase two-story duplex apartments (requiring two separate DXF files stacked vertically) and occasionally needed to fix mislabeled rooms or wall gaps before generating the 3D tour.

## Relevant Context

Finalized `v2-final` (`plantotour-netlify-phase18`) for zero-build static deployment on Netlify.

## Key Observation

By extending `worker.js` with a `duplex` command (`build_duplex(lower, upper, options)`), both floors can be built in a single pipeline pass, returned as an array of `levels` with explicit `elevation` offsets, and navigated via a vertical floor-switcher (`#levels`).

## Solution

Completed the final `v2-final` release:
- Added dual-DXF upload slots (`Ground floor` and `Upper floor`) and `#levels` switcher in `index.html` / `app.js`.
- Integrated `classic.html` as a fallback 2D drafting-table plan editor linked from the upload modal (`#classicLink`).
- Configured `netlify.toml` (immutable-style caching for `/data/*`, `/pyodide/*`, `/samples/*`, `application/wasm` MIME header, and `no-cache` for HTML) plus `_redirects` and `404.html` for clean static hosting.
