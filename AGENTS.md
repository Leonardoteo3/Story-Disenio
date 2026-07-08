# Agent Instructions

This is a pure Vanilla HTML/CSS/JS frontend project focusing on a modern Glassmorphism (Bento) aesthetic. There is no package manager, no build step, and no JS framework.

## Workflow & UI Updates
- **Mockup-Driven**: The user frequently uploads UI sketches (typically in the `ui/` or `inspiracion/` folders, e.g., `boceto-ui.png`) to guide layout changes.
- **CRITICAL - Always Commit Before Redesign**: Before modifying the HTML/CSS to match a new mockup, you MUST save the current state using Git (`git add . && git commit -m "Backup before UI redesign"`). The user relies on this to revert changes if the new design isn't satisfactory.

## Architecture & Code Quirks
- **Styling**: Relies heavily on CSS Grid for the macro-layout and Flexbox for micro-layouts. Uses `backdrop-filter` for glassmorphism.
- **SVG Progress Bar**: The progress bar around the avatar is a "Squircle" (rounded `<rect>`). Its completion logic uses `rect.getTotalLength()` in `script.js` to dynamically update `stroke-dashoffset`. Avoid hardcoding perimeter math.
- **Data/State**: The content (slides) is hardcoded as an array of objects (`steps`) in `script.js`. Navigation relies on manual DOM manipulation tracking a `currentIndex`.

## Directory Structure
- `avatar/`: Active user avatar image (`avatar.png`).
- `fondo/`: Full-bleed background image.
- `fotos/`: Images used inside the content slides.
- `inspiracion/` & `ui/`: Design references and structural sketches. DO NOT modify files here; use them purely for read-only guidance.