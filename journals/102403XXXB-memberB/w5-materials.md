# Week 5 : PBR Material and Texture Assignment

## Error / Problem

Early furnished 3D scenes rendered all furniture in uniform flat grey, making wood tables, fabric sofas, and ceramic bathroom fixtures indistinguishable.

## Relevant Context

Three.js `GLTFLoader` supports Physically Based Rendering (PBR) `metallicRoughness` materials (`baseColorFactor`, `roughnessFactor`, `metallicFactor`), which respond realistically to both daylight and evening lighting modes.

## Key Observation

Grouping furniture sub-meshes by semantic material role (`wood_oak`, `wood_walnut`, `fabric_linen`, `fabric_boucle`, `ceramic_white`, `metal_brushed`, `glass_clear`) allows crisp visual differentiation without large bitmap textures.

## Solution

Created a 15-material PBR palette in `ptt_furnish` / `ptt_render`. Assigned warm matte roughness (`0.85`) to upholstery, satin sheen (`0.45`) to timber surfaces, glossy low-roughness (`0.15`) to ceramic fixtures, and metallic accents (`0.9`) to handles and faucets. Combined with `app.js` shadow casting, the furnished rooms gained immediate depth and realism.
