# Design Tokens — Portfolio frame `Two` (`288:1553`)

**Figma file:** [Portfolio](https://www.figma.com/design/IB95TubSh7LUPzHOK5OA8M/Portfolio?node-id=288-1553)  
**File key:** `IB95TubSh7LUPzHOK5OA8M`  
**Node ID:** `288:1553`  
**Frame name:** `Two`  
**Artboard size:** 1366 × 5286 px (desktop)

---

## Data source & limitations

| Source | Status |
|--------|--------|
| `get_variable_defs` (Figma MCP) | **Blocked** — Enterprise View seat rate limit |
| `get_design_context` (Figma MCP) | **Blocked** — same rate limit |
| `get_metadata` (cached from prior session) | **Available** — structure, sizes, layer names |

**What this document contains**

- Layout, spacing, sizing, and component dimensions inferred from Figma layer metadata.
- Typography *scale hints* derived from text bounding-box heights (not confirmed font family, weight, or line-height tokens).
- A checklist of color and variable tokens that **must** be re-pulled via MCP before implementation.

**What is not yet confirmed**

- Hex/RGB color values and Figma variable names (e.g. `color/background/primary`).
- Font family names and exact `font-size` / `line-height` / `letter-spacing` style tokens.
- Border radius, shadow, and effect tokens (not exposed in metadata XML).
- Component variant properties on `Header`, `slider`, and `ghost button` instances.

When MCP access resets, re-run:

```text
get_variable_defs  fileKey=IB95TubSh7LUPzHOK5OA8M  nodeId=288:1553
get_design_context   fileKey=IB95TubSh7LUPzHOK5OA8M  nodeId=288:1553
```

---

## Layout

| Token | Value | Notes |
|-------|-------|-------|
| `layout/artboard-width` | `1366px` | Primary desktop frame |
| `layout/artboard-height` | `5286px` | Full scroll height |
| `layout/content-max-width` | `1142px` | `1366 − (112 × 2)` — used in About, Work, etc. |
| `layout/content-inset-x` | `112px` | Horizontal margin for main sections |
| `layout/content-inset-x-alt` | `120px` | Used in “A Little Bit About Me” block |
| `layout/content-inset-x-cta` | `114px` | Footer CTA section |
| `layout/section-padding-y` | `70px` | Top padding inside several section wrappers |
| `layout/section-padding-y-cta` | `50px` | CTA / footer block |
| `layout/grid-column-width` | `97px` | Background grid columns (`Grids` layer) |
| `layout/grid-row-height` | `~98px` | Background grid rows |

### Section vertical rhythm (y-offsets within frame)

| Section | Y position | Height |
|---------|------------|--------|
| Header (component) | `0` | `63px` |
| Hero Section | `~63` | `~641px` |
| Slider (component) | `704` | `100px` |
| About | `804` | `844px` |
| Design Process | `1648` | `775px` |
| Recent Work | `2523` | `937px` |
| Testimonials | `3585` | `756px` |
| About Me (bio + photo) | `4343` | `615px` |
| CTA / Footer | `4960` | `326px` |

---

## Spacing

Derived from auto-layout frames and child offsets inside node `288:1553`.

| Token | Value | Where observed |
|-------|-------|----------------|
| `space/inner-2` | `8px` | Section title frames (`8px` padding on “My Recent Work” tab frame) |
| `space/inner-10` | `10px` | Card / info block inner padding (`About`, `Currently At`, etc.) |
| `space/inner-12` | `12px` | Hero “👋 Hello” badge vertical padding |
| `space/inner-24` | `24px` | Hero badge horizontal padding; About-me image container offset |
| `space/inner-30` | `30px` | Design-process card padding |
| `space/gap-14` | `14px` | Heading → body in info cards (`62 − 48 = 14`) |
| `space/gap-18` | `18px` | Work grid row gap (`294 − 276`) |
| `space/gap-24` | `24px` | Hero badge → headline (`84 − 60`) |
| `space/gap-36` | `36px` | About sub-section stack gap; two-column gutter (`589 − 553`) |
| `space/gap-40` | `40px` | CTA headline → social row (`194 − 160`) |
| `space/gap-58` | `58px` | Bio heading → paragraph |
| `space/gap-110` | `110px` | About-me image column → text column |
| `space/icon-gap` | `~21px` | Tool icons row (`82 − 61`) |

### Suggested spacing scale (for CSS mapping)

| Step | px | rem @ 16px root |
|------|-----|----------------|
| `space-1` | 8 | 0.5 |
| `space-2` | 10 | 0.625 |
| `space-3` | 12 | 0.75 |
| `space-4` | 14 | 0.875 |
| `space-5` | 18 | 1.125 |
| `space-6` | 24 | 1.5 |
| `space-7` | 30 | 1.875 |
| `space-8` | 36 | 2.25 |
| `space-9` | 40 | 2.5 |
| `space-10` | 58 | 3.625 |
| `space-11` | 70 | 4.375 |
| `space-12` | 112 | 7 |

---

## Typography (inferred — verify via MCP)

Font families are **not** exposed in metadata. Bounding-box heights suggest the scale below.

| Role | Layer example | Box height | Est. size | Est. line-height |
|------|---------------|------------|-----------|------------------|
| Display / hero headline | `I'm Dixita, UI/UX designer…` (`288:1594`) | `320px` (multi-line) | `~64–80px` | tight (~1.0–1.1) |
| CTA display | `Let's create something…` (`288:1579`) | `160px` (multi-line) | `~48–64px` | tight |
| Section title | `About`, `My Recent Work`, `My Design Process` | `50px` | `~40–50px` | ~1.0 |
| Subsection title | `Currently At`, `Education`, `Tools` | `48px` | `~32–40px` | ~1.0 |
| Eyebrow / badge | `👋 Hello` (`288:1593`) | `36px` in `60px` badge | `~24–28px` | ~1.2 |
| Lead / intro | About intro (`313:1623`) | `60px` (2 lines) | `~24–30px` | ~1.25–1.5 |
| Body / bio | About-me paragraph (`288:1575`) | `270px` (long) | `~18–22px` | ~1.5–1.6 |
| Card body | Job / education details | `90px` (3 lines) | `~18–20px` | ~1.5 |
| Testimonial name | `John M. Barker` | `24px` | `~16–20px` | ~1.2 |
| Testimonial role | `BA \| Product Owner NGAT` | `24px` | `~14–16px` | ~1.2 |
| Testimonial quote | quote blocks | `72–120px` | `~16–18px` | ~1.4–1.6 |
| Process step label | `Discover`, `Define`, … | `~31–38px` | `~24–28px` | ~1.1 |

### Font weights (unknown — confirm in Figma styles)

Likely weights used across the page (typical portfolio pattern; **not verified**):

- Regular (400) — body copy, testimonial quotes
- Medium (500) — nav links, labels
- Semi-bold (600) — subsection headings
- Bold (700) — hero & section titles

---

## Colors

**No color tokens could be read** for frame `288:1553`. The metadata XML does not include fill/stroke values, and `get_variable_defs` was unavailable.

The same Figma file contains **other** projects with documented palettes (not part of this frame):

| Project frame | Documented colors (from layer labels elsewhere in file) |
|---------------|--------------------------------------------------------|
| BeatStore case study (`266:3152`) | `#3F4048`, `#11cd91`, `#212121`, `#A1A1AA`, `#4E4AAE`, `#FAFAFA`, `#EBEAFF` |
| Feedlot / other case study (`268:…`) | `#142851`, `#FFA630`, `#505050`, `#595959`, `#F7F7F7` |

**Action required:** Pull `get_variable_defs` on `288:1553` to populate:

```text
color/background
color/surface
color/text/primary
color/text/secondary
color/accent
color/border
color/grid-line
```

---

## Components (Figma instances)

Reusable components referenced inside `288:1553`:

| Component | Instance node | Size (W × H) | Usage |
|-----------|---------------|--------------|-------|
| `Header` | `288:1646` | `1366 × 63` | Sticky top navigation |
| `slider` | `288:1608` | `1366 × 100` | Logo / partner marquee below hero |
| `ghost button` | `288:1576` | `190 × 52` | About-me CTA |
| `ghost button` | `288:1618`, `288:1636`, `288:1644` | `226 × 52` | Project cards (sibling frame `288:1609`) |

### `ghost button` sizing token

| Property | Value |
|----------|-------|
| Height | `52px` |
| Min width | `190px` |
| Max width (project cards) | `226px` |

---

## Sizing — key UI elements

| Element | Width | Height |
|---------|-------|--------|
| Hero badge (`Frame 2`) | `141px` | `60px` |
| Hero copy column (`Frame 67`) | `780px` | `404px` |
| Hero portrait image | `542px` | `616px` |
| About info card (half column) | `553px` | `162px` |
| Tool icon | `~61px` | `~61px` |
| Testimonial avatar | `74px` | `74px` |
| Social icon (CTA) | `32px` | `32px` |
| Work tile — tall | `454px` | `570px` |
| Work tile — wide | `670px` | `276px` |
| Work tile — banner | `755px` | `281px` |
| About-me photo frame | `~400px` | `475px` |
| Design-process step card | `~178–194px` | `~222–234px` |

---

## Border radius & effects

Not available from metadata. Inspect via `get_design_context` or Figma Dev Mode:

- Hero badge / pill chips
- Project cards & work tiles
- Ghost button corners
- Photo frames (polaroid-style container vectors present)
- Testimonial avatar (likely circular — `74px` square assets)

---

## Page structure map

For implementation reference (no code — structure only):

1. **Header** — `Header` component
2. **Hero** — eyebrow badge, display headline, portrait illustration, decorative wave vector
3. **Slider** — `slider` component (marquee)
4. **About** — intro + 2×2 info grid (Currently At, Based In, Education, Interests) + Tools icon row
5. **Design Process** — titled diagram with 5 steps (Discover → Test) + central illustration
6. **Recent Work** — masonry-style project thumbnail grid
7. **Testimonials** — `What It's Like to Work With Me` + 3 quote rows
8. **About Me** — polaroid photo + bio + `ghost button`
9. **CTA** — large closing headline + 2 social icons

---

## Recommended CSS variable names (draft)

Use these as a naming scaffold once MCP returns real values. **Do not treat hex placeholders as final.**

```css
:root {
  /* Colors — PENDING get_variable_defs */
  --color-bg: /* TBD */;
  --color-surface: /* TBD */;
  --color-text: /* TBD */;
  --color-text-muted: /* TBD */;
  --color-accent: /* TBD */;
  --color-border: /* TBD */;
  --color-grid: /* TBD */;

  /* Typography — PENDING */
  --font-sans: /* TBD */;
  --font-display: /* TBD */;

  --text-hero: clamp(2.5rem, 8vw, 5rem);
  --text-section: clamp(2rem, 4vw, 3.125rem);   /* ~50px */
  --text-subsection: clamp(1.5rem, 3vw, 2.5rem); /* ~40px */
  --text-eyebrow: 1.5rem;                        /* ~24px */
  --text-body: 1.125rem;                         /* ~18px */
  --text-small: 0.875rem;                        /* ~14px */

  /* Layout */
  --container-max: 71.375rem;  /* 1142px */
  --container-pad: 7rem;       /* 112px */
  --header-height: 3.9375rem;  /* 63px */
  --slider-height: 6.25rem;    /* 100px */

  /* Spacing */
  --space-section-y: 4.375rem; /* 70px */
  --space-column-gap: 2.25rem; /* 36px */
  --space-card-pad: 0.625rem;  /* 10px */

  /* Components */
  --button-height: 3.25rem;    /* 52px */
  --button-min-width: 11.875rem; /* 190px */
  --icon-md: 3.8125rem;        /* 61px */
  --avatar-md: 4.625rem;       /* 74px */
  --radius-button: /* TBD */;
  --radius-card: /* TBD */;
}
```

---

## Next steps

1. **Upgrade or wait for MCP quota** on the Figma Enterprise View seat.
2. Re-run `get_variable_defs` and `get_design_context` on node `288:1553`.
3. Merge confirmed color, font, radius, and shadow tokens into this file.
4. Only then map tokens into `styles.css` for HTML implementation.

---

*Generated from cached Figma metadata. Last attempted MCP pull: 2026-06-13 (rate-limited).*
