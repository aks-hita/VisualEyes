# Week 2 : 3D Wall Geometry Extrusion & Openings

## Error / Problem

Extruding 2D wall centerlines into 3D boxes produced z-fighting at wall junctions and left solid walls blocking doors and windows.

## Relevant Context

In `ptt_shell`, the 2D wall graph from `ptt_parser` must be converted into watertight 3D wall meshes (default 2.8m ceiling height), floor slabs, ceiling slabs, and framed door/window openings before `ptt_furnish` and `ptt_render` run.

## Key Observation

Splitting wall segments at door and window intervals before extrusion avoids brittle 3D boolean mesh subtraction. Each wall segment with an opening becomes three clean prisms: left pier, lintel above the opening, and (for windows) sill below.

## Solution

Implemented parametric wall extrusion in `ptt_shell` using NumPy:
- Mitered/snapped wall corners to eliminate z-fighting at T-junctions and L-corners.
- Subdivided opening spans into sill, lintel, and jamb geometry, inserting glass panes (`Glass_*`) for windows.
- Exported 2D wall colliders in `manifest.colliders` for the frontend walker engine.
