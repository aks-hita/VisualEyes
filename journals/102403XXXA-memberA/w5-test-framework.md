# Week 5 : Setting Up the Automated Test Harness

## Error / Problem

Changes to wall-snapping tolerances or room classification heuristics in `ptt_parser` frequently broke previously working floor plans, and manual inspection in the 3D viewer was too slow to catch regressions.

## Relevant Context

Transitioned from input-format research into the testing phase. We needed a repeatable, headless way to validate `ptt_parser` and `ptt_furnish` outputs before packaging `py.zip` for the browser.

## Key Observation

Every parsed floor plan produces a deterministic JSON manifest containing `rooms` (with `label`, `area`, and polygon vertices), `carpet_area`, and `furniture` counts. Comparing these structured fields against manually verified ground-truth JSONs catches geometric and classification regressions immediately.

## Solution

Built a regression test suite of 12 reference DXF plans (covering 1BHK, 2BHK, 3BHK, and duplex upper/lower levels) paired with expected JSON snapshots. Automated assertions on room count, room labels, total carpet area (within ±2% tolerance), and non-zero furniture placement per habitable room.
