# Week 4 : First-Person Walker Engine & Collision

## Error / Problem

In `v1-prototype`, free-fly camera controls allowed users to walk straight through walls and float above or below the floor slab, disorienting non-technical real estate buyers.

## Relevant Context

Buyers need an intuitive, game-like walkthrough at human eye height (`eye_height: 1.6m`) with support for mouse/touch drag, `WASD`/arrow keys, and click-on-floor teleportation.

## Key Observation

Using the 2D `colliders` exported in the plan manifest allows fast, deterministic circle-vs-segment collision resolution every frame without expensive 3D mesh raycasting against every triangle.

## Solution

Built the first-person walker engine in `app.js`:
- Locked camera height to `level.elevation + eye_height` with subtle walking head-bob (`S.walk.bob`).
- Added smooth damped interpolation when clicking a floor point or room card.
- Implemented sliding wall-collision resolution against `colliders` so users glide smoothly along walls instead of getting stuck.
