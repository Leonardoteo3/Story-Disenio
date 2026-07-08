# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-page "story style" microlearning slideshow, currently themed as an airport
operational-safety training ("Curso - Seguridad Operacional"). It is a pure static
site: plain HTML/CSS/JS, no build tooling, no package manager, no dependencies,
no backend.

## Running locally

There is no build step. Either:
- Open `index.html` directly in a browser, or
- Serve the folder with any static file server (e.g. `npx serve .`,
  `python -m http.server`) if you need it reachable over HTTP (fonts/CORS-free
  behavior is identical either way since everything is local).

`tunnel_url.txt` is a leftover URL from a temporary localtunnel session used to
share a local preview; it's not part of the app and can be regenerated/ignored.

There is no test suite and no linter configured in this repo.

## Architecture

- **`script.js`** is the source of truth for slide content and all interaction
  logic. All step content (title, image path, body text) lives in the `steps`
  array at the top of the file — add/edit/reorder slides there, not in
  `index.html`.
  - `updateUI()` is the single state-machine function driving transitions:
    fade out current content (300ms) → swap title/text/image/step-counter from
    `steps[currentIndex]` → update the avatar's progress ring → fade content
    back in → after a 1500ms delay, reveal the floating "Anterior" button
    (skipped on the first step).
  - The circular/squircle progress indicator around the avatar is an SVG
    `rect` whose `stroke-dasharray`/`stroke-dashoffset` are computed from
    `getTotalLength()`, not a canned CSS conic-gradient — keep that technique
    in mind if the avatar shape or size changes, since the rect's perimeter
    must still match its own path length.
  - Only two DOM events exist: `btnNext` click (advance, or alert on the last
    step) and `btnPrev` click (go back).

- **`index.html`** only holds the *current* step's placeholders
  (`#step-title`, `#step-text`, `#step-image`, `#current-step`,
  `#total-steps`) plus the static layout shell (glass container, avatar
  squircle + SVG progress ring, nav buttons). It is not re-templated per
  step — `script.js` mutates it in place.

- **`style.css`** implements a glassmorphism look: translucent panels
  (`backdrop-filter: blur(...)`) inside a CSS Grid layout (`1.6fr 1fr` — left
  column for avatar/title/text, right column for image/next button), plus the
  `floatIn` and `glowPulse` (`pulse-anim`) keyframe animations for the prev
  button reveal and the next-button pulse.

- **Asset folders**: `avatar/` (user avatar image), `fondo/` (background
  image), `fotos/` (per-step content photos referenced from `steps` in
  `script.js`). `inspiracion/` and `ui/` hold reference/mockup images used as
  design inspiration only — nothing in the app loads them at runtime.
