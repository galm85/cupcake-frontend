---
name: ui-redesign
description: Full UI/UX redesign completed 2026-06 — new brand palette, typography, and component styles
metadata:
  type: project
---

Complete CSS overhaul from a student "carnival" aesthetic to a modern luxury patisserie look.

**New color palette (CSS vars):**
- `--rose: #C17C74` (primary, replaces orange/purple)
- `--rose-dark: #9E5E57`, `--rose-light: #EDD5D2`, `--rose-pale: #FBF0EF`
- `--gold: #C9A96E` (accent)
- `--cream: #FDF8F3` (background)
- `--text-primary: #2D2020`, `--text-secondary: #6B5E5E`

**New fonts:** Playfair Display (headings, replaces Lobster) + Inter (body, replaces Poppins)

**Files changed:** `src/App.css`, `src/styles/components.css`, `src/styles/pages.css`, `src/styles/forms.css`, `src/components/Navbar.tsx`

**Navbar:** Now scroll-aware — adds `.scrolled` class after 20px scroll for stronger shadow.

**Old vars preserved as aliases** (`--purpel`, `--orange`, `--text`, `--background`) so any TSX using them still works.

**Why:** User requested a modern/professional redesign of their student project.

**How to apply:** Keep existing class names; all redesign is CSS-only. MUI Button globals are overridden in App.css.
