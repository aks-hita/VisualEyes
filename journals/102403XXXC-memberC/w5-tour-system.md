# Week 5 : Automated Room-by-Room Tour System

## Error / Problem

First-time visitors opening a shared apartment link often didn't know where to walk first or missed secondary rooms like balconies and bathrooms.

## Relevant Context

Real estate agents wanted a one-click "Tour" mode that automatically guides a buyer through every room in the apartment like a curated video walkthrough.

## Key Observation

`ptt_render` can compute a logical room-visitation sequence (`tour` waypoints in the manifest) ordered from foyer/living room through kitchen, bedrooms, and bathrooms, with yaw targets pointing toward each room's focal furniture piece.

## Solution

Implemented the Auto-Tour state machine in `app.js` and `ptt_render`:
- Generates smooth camera waypoints between room centers while avoiding wall intersections.
- Updates the floating room caption (`#caption` showing room name and area) as the camera enters each room.
- Immediately yields manual control if the user touches the screen, drags, or presses a movement key.
