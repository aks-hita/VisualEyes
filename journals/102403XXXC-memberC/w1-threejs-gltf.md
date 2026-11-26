# Week 1 : Three.js Setup and glTF/GLB Pipeline

## Error / Problem

Needed a fast, browser-native 3D rendering engine capable of loading dynamically generated apartment geometry with PBR materials, real-time shadows, and environment reflections without requiring any plugins.

## Relevant Context

Evaluated Three.js, Babylon.js, and A-Frame for the VisualEyes frontend (`app.js`). The Python backend (`ptt_render`) produces binary glTF (`.glb`) files directly in memory.

## Key Observation

Three.js provides a lightweight `GLTFLoader` that parses an `ArrayBuffer` directly (`loader.parse(data, "", res, rej)`), avoiding network round-trips. Naming scene nodes by structural role (`Floor_*`, `Ceiling_*`, `Glass_*`) lets the viewer configure per-mesh shadow and transparency rules in a single scene traversal.

## Solution

Set up the Three.js WebGL renderer in `app.js` with tone mapping, soft shadow maps, and `GLTFLoader`. Configured `Ceiling_*` meshes with `THREE.DoubleSide` shadow casting and `Glass_*` / `Floor_*` meshes to receive shadows cleanly, establishing the visual foundation for `v1-prototype`.
