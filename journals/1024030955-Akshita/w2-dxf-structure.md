# Week 2 : Deep Dive into DXF Structure

## Error / Problem

Raw DXF files exported from AutoCAD contained tens of thousands of lines across multiple sections, causing our early prototype reader to misinterpret dimension lines, title blocks, and hatch patterns as structural walls.

## Relevant Context

A standard DXF file is organized into `HEADER`, `CLASSES`, `TABLES`, `BLOCKS`, `ENTITIES`, and `OBJECTS` sections, encoded as alternating group-code/value pairs (e.g., `0` for entity type, `8` for layer name, `10/20` for X/Y coordinates).

## Key Observation

Structural walls and openings are concentrated in the `ENTITIES` section (and nested `BLOCKS` for doors/windows), typically separated onto dedicated layers such as `WALL`, `A-WALL`, `DOOR`, `WINDOW`, and `TEXT`/`MTEXT`. Dimension annotations (`DIMENSION`) and hatches (`HATCH`) can be safely filtered out early.

## Solution

Mapped out a canonical DXF group-code specification for `ptt_parser`:
- Extract `$INSUNITS` from `HEADER` to normalize mm/cm/inch/feet to meters.
- Parse `LINE` and `LWPOLYLINE` entities for wall segments, `ARC` for door swings, `INSERT` for block references, and `TEXT`/`MTEXT` for room labels.
- Discard `DIMENSION`, `HATCH`, and `LEADER` entities before graph construction.
