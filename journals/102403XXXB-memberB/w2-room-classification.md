# Week 2 : Room Classification for Furnishing

## Error / Problem

Many builder DXF files either omitted text labels (`TEXT`/`MTEXT`) or used abbreviated/ambiguous labels (`RM-1`, `TOI`, `UTL`), causing `ptt_furnish` to skip furnishing or place living room sofas inside bedrooms.

## Relevant Context

Auto-furnishing depends on knowing the semantic role of each detected polygon from `ptt_parser`.

## Key Observation

Even without explicit CAD text labels, room functions strongly correlate with geometric and topological features: area, aspect ratio, number of connected rooms, and presence of plumbing/door openings. For example, bathrooms are small (2.5–6 m²) with a single door; living rooms are the largest central hub with multiple connecting doors.

## Solution

Implemented a two-stage room classifier:
1. **Regex label normalization** mapping common real estate abbreviations (`MBR` -> `BEDROOM`, `TOI`/`WC` -> `BATHROOM`, `KIT` -> `KITCHEN`, `DRG`/`LIV` -> `LIVING`).
2. **Geometric & topological fallback** using area thresholds, aspect ratio, and NetworkX room-adjacency degree when labels are missing.
