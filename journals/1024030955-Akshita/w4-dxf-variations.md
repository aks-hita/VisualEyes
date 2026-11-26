# Week 4 : Handling Real-World DXF Variations

## Error / Problem

Floor plans exported from SketchUp, ArchiCAD, and older AutoCAD versions failed room detection because all geometry was placed on layer `0` or nested inside `INSERT` blocks with non-standard layer names.

## Relevant Context

During testing with 8 real-world residential DXF plans (2BHK, 3BHK, and duplex layouts), layer-name filtering (`WALL`, `A-WALL`) worked on only 3 of the 8 files.

## Key Observation

Relying solely on layer naming conventions is brittle. Structural walls can be identified geometrically: they appear as parallel line pairs separated by standard wall thicknesses (100mm–300mm) forming closed or nearly-closed topological cycles in a NetworkX graph.

## Solution

Implemented a multi-strategy fallback in `ptt_parser`:
1. **Layer-based extraction** when standard architectural layer names exist.
2. **Block expansion** for `INSERT` entities so doors, windows, and wall blocks are flattened into world coordinates.
3. **Geometric wall-pair & graph topology heuristics** using `networkx` when everything resides on layer `0`.
This raised successful parsing across our 8 sample plans from 37.5% to 100%.
