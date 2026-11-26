# Week 1 : Evaluating Input Format Options

## Error / Problem

Needed to select a single, reliable 2D floor plan input format before building the geometry and furnishing pipeline. Initial prototypes using raster floor plan images (PNG/JPEG) suffered from inconsistent wall thickness, text overlays obscuring doors, and poor scale recovery.

## Relevant Context

Architects and real estate developers export floor plans from diverse CAD/BIM tools—primarily AutoCAD, Revit, ArchiCAD, and SketchUp. We evaluated four candidate formats: raster images (with ML wall segmentation), SVG, IFC (BIM), and AutoCAD DXF.

## Key Observation

Raster images lose exact metric dimensions and require heavy ML models that cannot run reliably inside a browser Web Worker. IFC is rich in 3D metadata, but many builders only share 2D CAD drawings. DXF, by contrast, is plain-text/ASCII, preserves exact real-world units (millimeters/meters), and is universally exportable from every major CAD package.

## Solution

Standardized on **AutoCAD DXF** as the primary input format for `ptt_parser`. Documented the required entity subset (`LINE`, `LWPOLYLINE`, `ARC`, `INSERT`) and unit-scaling rules so downstream modules (`ptt_shell` and `ptt_furnish`) always receive normalized meter-scale coordinates.
