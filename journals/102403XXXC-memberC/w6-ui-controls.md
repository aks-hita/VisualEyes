# Week 6 : Studio UI Design and Interactive Controls

## Error / Problem

The initial `v1-prototype` interface looked like a developer utility rather than a polished real estate presentation studio, and lacked mobile responsiveness and dark mode support.

## Relevant Context

Upgraded the frontend into **PlanToTour Studio** (`v2-final/index.html` + `app.js`) using React 19 and glass-morphism floating controls over the full-screen 3D canvas.

## Key Observation

Keeping the 3D viewport 100% full-bleed (`position: fixed; inset: 0`) with compact translucent islands (`#project`, `#tools`, `#island`, `#strip`) maximizes screen real estate on both desktop and mobile viewports.

## Solution

Built the Studio UI in `index.html` and `app.js`:
- **Cover Card (`#cover`)** — Customizable "Presented by" branding and apartment summary pills (carpet area, bedrooms, bathrooms).
- **Control Island (`#island`)** — Quick switching between Walk, Orbit, Plan, and Tour modes (`1`–`4` shortcuts).
- **Room Cards Strip (`#strip`)** — Scrollable room thumbnails with `H` toggle.
- **Lighting & Theme** — Daylight/evening lighting toggle, optional `env/sky.hdr` environment map support, snapshot capture, and automatic light/dark CSS theme.
