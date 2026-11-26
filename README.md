# VisualEyes

**VisualEyes** is a browser-based tool that transforms 2D architectural floor plans (DXF files) into fully furnished, interactive 3D apartment walkthroughs. Built for the real estate industry, it enables property buyers to preview and walk through apartments before they are constructed.

## Features

- **DXF Floor Plan Import** — Upload standard AutoCAD DXF files directly in the browser
- **Automatic Room Detection** — Identifies bedrooms, bathrooms, kitchens, living areas, and balconies
- **Smart Auto-Furnishing** — Places contextually appropriate furniture per room type with spatial constraints
- **Interactive 3D Walkthrough** — First-person walker, orbit view, 2D plan view, and automated room-by-room tour powered by Three.js
- **Duplex / Multi-Floor Support** — Stack ground and upper floor DXF plans with level switching
- **Live Customization** — Change wall paint colors, add/move/rotate/remove furniture, and toggle daylight/night lighting
- **100% Client-Side** — Python geometry & furnishing pipeline runs in WebAssembly via Pyodide inside a Web Worker

## Project Structure

```
VisualEyes/
├── .github/workflows/    # CI/CD pipeline for MkDocs deployment
├── assets/               # MkDocs theme assets
├── code/
│   ├── v1-prototype/     # Early single-floor PlanToTour prototype
│   └── v2-final/         # Full production Studio (duplex, classic editor, etc.)
├── docs/                 # Project documentation & DFD/architecture diagrams
├── journals/             # Individual weekly engineering journals (3 members)
├── project-report-final/ # Final report artifacts
├── Makefile              # Local documentation server & build targets
└── mkdocs.yml            # MkDocs Material configuration
```

## Quick Start

See [`code/README.md`](code/README.md) for runtime prerequisites and instructions to run VisualEyes locally.

## Documentation

Documentation is built with MkDocs Material and auto-deployed via GitHub Actions on push to `main`/`master`. To preview locally:

```bash
make docs
```

## Team

| Member | Roll No. | Role |
|--------|----------|------|
| Member A | `102403XXXA` | Input Format Research (DXF) & Testing |
| Member B | `102403XXXB` | Interior Design & Auto-Furnishing Functions |
| Member C | `102403XXXC` | 3D Rendering, Tour Engine, Shell Builder & UI |

## License

MIT License — see [LICENSE](LICENSE).
