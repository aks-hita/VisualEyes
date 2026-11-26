# VisualEyes

## Project Overview

**VisualEyes** is a browser-based application that converts 2D architectural floor plans (DXF format) into fully furnished, interactive 3D apartment walkthroughs. Targeted at the real estate industry, it enables property buyers to virtually walk through apartments before they are physically constructed.

### Problem Statement

In the real estate market, buyers typically make major purchasing decisions based on flat 2D floor plans and static artist renderings. Commissioning custom 3D walkthroughs for every floor plan variant is expensive and slow, creating an information gap between builders and prospective buyers.

### Solution

VisualEyes automates the entire pipeline — from DXF floor plan to interactive 3D tour — running entirely in the browser with zero server infrastructure:

1. **Parse** — Read a standard AutoCAD DXF file and extract walls, doors, and windows
2. **Detect** — Identify closed room boundaries and classify room types (bedroom, kitchen, bathroom, etc.)
3. **Furnish** — Auto-place contextually appropriate furniture in each room while respecting door swings and walkways
4. **Render** — Generate a glTF/GLB 3D model with PBR materials, lighting, and shadows
5. **Tour** — Present an interactive first-person walkthrough with room-by-room navigation and live customization

### Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Runtime | Pyodide (Python in WebAssembly) | Leverages Python geometry/graph libraries (`numpy`, `networkx`, `pydantic`) client-side |
| 3D Engine | Three.js | Industry-standard WebGL renderer with native `GLTFLoader` support |
| Input Format | DXF (Drawing Exchange Format) | Universal CAD interchange standard supported by AutoCAD, Revit, ArchiCAD, SketchUp |
| Output Format | glTF / GLB | Compact binary 3D scene standard with embedded materials |
| Threading | Web Worker (`worker.js`) | Offloads Python execution from the main UI thread so the browser stays responsive |
| Hosting | Static site (Netlify) | Zero backend cost; no user floor plans leave the client machine |

## Authors

| Member | Roll No. | Responsibilities |
|--------|----------|------------------|
| Member A | `102403XXXA` | Input format research (DXF parsing) & testing phase |
| Member B | `102403XXXB` | Interior design functions (`ptt_furnish` auto-furnishing) |
| Member C | `102403XXXC` | 3D rendering, walker/tour engine, shell builder, Web Worker & UI |

## Installation & Usage

### Quick Start

1. Clone this repository.
2. Place the runtime dependencies (`pyodide/`, `data/`, and optionally `samples/`) inside `code/v2-final/` (see `code/README.md`).
3. Serve over HTTP (required for Web Workers and WebAssembly):
   ```bash
   cd code/v2-final/
   python3 -m http.server 8080
   ```
4. Open `http://localhost:8080` in a modern browser.
5. Drop a `.dxf` floor plan or load a sample project.

### Using the Application

1. **Upload** — Drag a DXF file onto the upload zone, or click to choose a file.
2. **Process** — The Web Worker initializes Pyodide and runs the 4-stage Python pipeline.
3. **Explore** — Navigate the generated 3D apartment:
   - **Walk**: Drag to look around; click the floor, a room card, or the mini-plan to move; use `WASD` or arrow keys.
   - **Tour**: Automated room-by-room walkthrough; touch or press any key to take manual control.
   - **Views**: Keys `1`–`4` switch camera modes; `H` toggles the room cards strip.
4. **Customize** — Use the side panel to change wall paint colors or select (`Click`), move (`G`), rotate (`R`), add, or delete (`Delete`) furniture.
5. **Duplex Mode** — Upload separate Ground Floor and Upper Floor DXF files to generate a stacked multi-level tour with level-switching controls.

## Technology Stack

- **Frontend**: React 19, Three.js (`GLTFLoader`), CSS Custom Properties (light/dark theme)
- **Backend (in-browser)**: Python 3.12 via Pyodide (WASM)
- **Python Libraries**: `numpy`, `networkx`, `pydantic`, `pyparsing`, `fonttools`
- **Deployment**: Static hosting (Netlify)
- **Documentation**: MkDocs Material
