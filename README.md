# MealConnect
This website focuses on reducing food waste by partnering with restaurants and grocery stores to collect surplus food and distribute it to NGOs and shelters, while raising awareness about food waste in the community.\

# Here's the snapshot of main page of website.
![alt text](image.png)

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
