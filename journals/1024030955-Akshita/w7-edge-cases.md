# Week 7 : Edge Cases and Regression Tests

## Error / Problem

Real-world builder DXF files exposed four recurring edge cases:
1. Duplicate overlapping wall lines exported from CAD blocks.
2. Tiny enclosed shafts/ducts (< 1.5 m²) misclassified as bathrooms.
3. Slightly unclosed wall corners (2–5mm gaps) preventing room polygon detection.
4. Curved balcony walls (`ARC` entities) dropped during wall-graph construction.

## Relevant Context

Finalized QA before locking `v2-final` (`plantotour-netlify-phase18`), including duplex floor alignment and `classic.html` manual plan editing fallbacks.

## Key Observation

Applying a clean pre-processing pass before NetworkX cycle detection eliminates almost all topological failures without altering architectural dimensions.

## Solution

Added geometry sanitization tests and fixes in `ptt_parser`:
- Snap endpoints and merge collinear/overlapping segments within a 5mm tolerance.
- Tessellate `ARC` entities into polyline segments for curved walls.
- Filter out closed polygons under 2.0 m² (utility shafts/columns) from habitable room lists.
- Verified that any remaining wall-gap edge cases can be corrected interactively in `classic.html` via the `edit` worker command.
