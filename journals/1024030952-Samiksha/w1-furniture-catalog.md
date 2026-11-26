# Week 1 : Furniture Catalog Design

## Error / Problem

Once `ptt_shell` extruded empty 3D rooms, the apartments looked sterile and made it hard for real estate buyers to judge room scale (e.g., whether a bedroom actually fits a queen bed and wardrobe).

## Relevant Context

In `ptt_furnish`, we needed a structured, lightweight catalog of furniture definitions that could be procedurally instanced into glTF nodes without shipping tens of megabytes of external 3D asset files in the browser bundle.

## Key Observation

Every residential room type has a predictable set of functional furniture primitives (bounding box dimensions, clearance margins, wall-attachment vs. free-standing behavior, and front-facing orientation).

## Solution

Designed a JSON/Pydantic-backed furniture catalog in `ptt_furnish` covering 8 room categories (`LIVING`, `BEDROOM`, `KITCHEN`, `BATHROOM`, `DINING`, `BALCONY`, `STUDY`, `FOYER`) and 40+ items (beds, wardrobes, nightstands, L-sofas, coffee tables, TV units, dining sets, kitchen counters, sinks, toilets, showers). Each item records `width`, `depth`, `height`, `clearance`, and `wall_mount` metadata.
