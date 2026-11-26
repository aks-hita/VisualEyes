# Week 3 : Spatial Constraint Solver & Keepout Zones

## Error / Problem

Naive centroid-based furniture placement resulted in beds overlapping wardrobes, sofas blocking balcony doors, and dining chairs intersecting walls.

## Relevant Context

In a 3D walkthrough, blocked doorways break both realism and the first-person walker's navigation path between rooms.

## Key Observation

Interior design requires reserving negative space before placing any furniture: door-swing arcs (typically 0.9m radius), window-access zones, and a continuous 0.75m walkable circulation path connecting all doorways in a room.

## Solution

Built a 2D spatial occupancy grid (50mm resolution) in `ptt_furnish` using NumPy:
- Marked wall boundaries and door-swing semicircles as hard keepout zones.
- Computed shortest-path walkways between room openings and reserved a 0.75m clearance corridor.
- Every candidate furniture placement must pass an intersection check against occupied cells and keepout zones before being committed.
