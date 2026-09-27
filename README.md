# joshuasu7.github.io

Personal portfolio for Joshua Su — electrical engineering student at Georgia Tech
(RF & antenna design, PCB design, embedded systems).

Live at **https://joshuasu7.github.io**

## Structure

Plain static HTML — no build step, no framework. Edit the `.html` files directly
and push; GitHub Pages serves them as-is.

| File | Page |
| --- | --- |
| `index.html` | Home — hero, three featured projects, experience, skills |
| `introduction.html` | About |
| `projects.html` | Project index |
| `radar.html` | X-Band Phased Array RADAR Board |
| `eog.html` | EOG Eye Tracking & Blink Detection |
| `crash-detection.html` | Embedded Crash Detection Device |
| `pll.html` | PLL Feedback Divider |
| `racquet.html` | Heated Racquet Grip |
| `resume.html` | Resume (embeds `Joshua_Su_Resume.pdf`) |
| `career.html` | Career goals |
| `discovery.html` | Redirect → `crash-detection.html` (old URL) |

## Assets

- `assets/css/site.css` — the entire theme. Colours are CSS custom properties on
  `:root`, with dark-mode overrides under `[data-theme="dark"]`. Change the
  palette in one place.
- `assets/js/site.js` — theme toggle (persisted in `localStorage`), mobile menu,
  projects dropdown.
- `images/` — photos and demo videos.
- `images/radar/` — simulation figures and equations exported from the
  *RADAR Phased Array Project* spreadsheet.

## Editing notes

- The nav lives in the `<header class="site-header">` block of every page. Adding
  a page means adding the link in each file's header.
- Project pages share the same shape: `.page-head` for the title block, then
  `.article > .wrap.wrap-narrow` for the body.
- Useful classes: `.metrics` (stat strip), `table.data` (spec tables),
  `figure.shot` (screenshots), `figure.eq` (equation images, forced light
  background so they stay readable in dark mode), `.fig-row` (side-by-side
  figures), `.note` (callout).

## To do

- `radar.html` hotlinks the beamsteering demo GIF from image2url.com. Save that
  GIF to `images/radar/beamsteering-demo.gif` and point the `<img>` at it so the
  page does not depend on a third-party host.
