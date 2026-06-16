# Portfolio (Figma → HTML)

**Target frame:** [Portfolio — “Two” — node `288:1553`](https://www.figma.com/design/IB95TubSh7LUPzHOK5OA8M/Portfolio?node-id=288-1553)

Single-page portfolio for **Dixita Sainik** built from cached Figma metadata and `design-tokens.md`.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Semantic page (header, hero, about, process, work, testimonials, bio, CTA) |
| `styles.css` | Mobile-first CSS with design tokens as variables |
| `testimonials-carousel.js` | Progressive enhancement: auto-rotating circular testimonial carousel |
| `design-tokens.md` | Layout/spacing tokens from Figma; colors pending MCP |

## Export assets from Figma

Place exports in `assets/` (paths referenced in `index.html`):

- `hero-portrait.png` — hero illustration
- `about-photo.png` — polaroid photo
- `process-illustration.png` — design process center image
- `agon.png`, `rivanta.png`, `beatstore.png`, `fm.png` — Recent Work showcase tiles
- `1743025777683.jpg`, `1666805970572.jpg`, `1714303906770.jpg` — testimonial avatars (John, Enrique, Kushagra)
- `tools/figma.png`, `tools/xd.png`, etc. — tool icons

## Pixel-perfect pass (optional)

Figma MCP may be rate-limited (*View seat on Enterprise*). When MCP works again, run `get_variable_defs` and `get_design_context` on node `288:1553` to align colors, fonts, and asset URLs.

## Local preview

Open `index.html` in a browser, or from this folder:

```bash
npx --yes serve .
```

Then visit the URL printed in the terminal (often `http://localhost:3000`).
