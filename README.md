# MealConnect
This website focuses on reducing food waste by partnering with restaurants and grocery stores to collect surplus food and distribute it to NGOs and shelters, while raising awareness about food waste in the community.\

# Here's the snapshot of main page of website.
![alt text](image.png)

## Project structure

```
src/
  main.jsx                  entry — mounts the router and providers
  App.jsx                   maps the route table onto <Routes>
  routes.jsx                the route table; add a page here and nowhere else
  index.css                 reset, base typography, layout helpers
  styles/
    tokens.css              palette, fluid type scale, spacing, breakpoints
    ui.css                  shared buttons, cards, fields, tables, status chips
  assets/images/            all image assets
  common/components/        Layout, Navbar, Footer, PageHeader, EmptyState, ...
  context/                  DonationsProvider (persisted to localStorage)
  hooks/                    useMediaQuery, useDonations
  pages/
    Home/                   Homepage and its sections
    Restaurants/            dashboard + add-donation form
    Ngos/                   NGO dashboard
    Admin/                  admin panel + moderation queue
    Blog/  Contact/  Volunteer/
    Info/                   About, Donate, FAQ, Privacy, Terms, Partner,
                            Events, Careers, Support
```

### Styling

Plain CSS with custom properties rather than a utility framework. Every colour,
type size and spacing step is a token in `styles/tokens.css`, so the palette
taken from the original homepage is applied consistently across the new pages
without restyling the homepage itself.

Breakpoints are 480px (phone), 768px (tablet) and 1024px (small laptop).
Headings and section padding use `clamp()`, so most scaling happens without a
media query at all.

## Getting started

Built with [Vite](https://vite.dev/), React 19 and React Router 7. Requires Node 20.19+.

```bash
npm install
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server on http://localhost:3000 |
| `npm run build` | Produce a production bundle in `dist/` |
| `npm run preview` | Serve the built bundle locally |
| `npm test` | Run the test suite once (Vitest) |
| `npm run test:watch` | Run the tests in watch mode |
| `npm run coverage` | Run the tests with a coverage report |
| `npm run lint` | Lint with ESLint |

Because this is a single-page app, whatever host serves `dist/` needs a rewrite
that falls back to `index.html`, or deep links such as `/manage-donations` will
404 on refresh.
