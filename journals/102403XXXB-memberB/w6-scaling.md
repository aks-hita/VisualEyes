# Week 6 : Room-Size Scaling and Proportion Rules

## Error / Problem

Compact Indian urban apartments (e.g., 8.5 m² secondary bedrooms or narrow 2.1m kitchens) failed to furnish when using standard large-format furniture dimensions (1.8m × 2.0m king bed + two 0.5m nightstands).

## Relevant Context

Real estate buyers viewing 2BHK vs 3BHK units expect every bedroom to be furnished appropriately rather than left empty when space is tight.

## Key Observation

Instead of failing placement, interior layouts adapt by stepping down furniture variants (King Bed -> Queen Bed -> Single Bed, 3-seater Sofa -> 2-seater Loveseat) and omitting optional side items when remaining clearance drops below 0.6m.

## Solution

Added size-tier variants (`compact`, `standard`, `generous`) to the `ptt_furnish` catalog and a room-area-driven selector. If a `standard` tier fails the spatial constraint solver, the solver automatically retries with the `compact` variant, ensuring 100% of habitable rooms in our 2BHK, 3BHK, and duplex test plans receive balanced, realistic furnishings.
