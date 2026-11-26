# Week 4 : Priority-Based Furniture Placement Algorithm

## Error / Problem

Even with collision checks, placing smaller items (nightstands, floor lamps, coffee tables) before primary anchor pieces caused large items (king beds, sofas) to fail placement due to fragmentation of free space.

## Relevant Context

Tested on 2BHK and 3BHK sample layouts where bedrooms and living/dining combos have tight wall segments between doors and windows.

## Key Observation

Professional interior designers always anchor the largest focal piece first against the longest uninterrupted solid wall, then place secondary and companion items relative to the anchor (e.g., nightstands flanking the headboard, coffee table + TV unit opposite the sofa).

## Solution

Implemented a hierarchical priority solver in `ptt_furnish`:
1. **Rank walls** per room by unobstructed length (excluding doors and floor-to-ceiling windows).
2. **Place primary anchor** (bed, sofa, kitchen counter, dining table) aligned to the highest-scoring wall.
3. **Place dependent items** using relative offsets (TV unit facing sofa, nightstands beside bed, chairs around dining table).
4. **Update occupancy grid** after each placement.
