# Netlify backend setup

MealConnect uses Netlify for its entire backend:

| Concern | Netlify feature | Where it lives in this repo |
| --- | --- | --- |
| Accounts & roles | Netlify Identity | `src/context/AuthContext.jsx`, `netlify/functions/identity-signup.mjs` |
| Data | Netlify DB (Postgres, powered by Neon) | `netlify/database/migrations/`, `netlify/functions/donations.mjs` |
| API | Netlify Functions | `netlify/functions/` |
| Contact & volunteer enquiries | Netlify Forms | hidden forms in `index.html`, `src/lib/netlifyForms.js` |

Work through the steps in order. Steps 1–6 are one-time setup.

---

## 0. Prerequisites

Netlify DB needs **Node 20.12.2+** and **Netlify CLI 26+**.

```bash
node --version
npm install -g netlify-cli
netlify --version
```

The CLI is deliberately **not** a dependency of this project — it pins
`@opentelemetry/api@~1.8`, which conflicts with the version Vitest wants. Install
it globally (above) or call it with `npx netlify`.

---

## 1. Create and link the Netlify project

```bash
netlify login
netlify init
```

Choose *Create & configure a new project*. When asked for build settings, accept
what it reads from `netlify.toml`:

- build command `npm run build`
- publish directory `dist`
- functions directory `netlify/functions`

Already have a project? Use `netlify link` instead.

---

## 2. Provision the database

```bash
netlify database init
```

This installs/verifies `@netlify/database`, provisions a Postgres branch, wires
up the `NETLIFY_DB_URL` environment variable, and checks connectivity. You do not
create or paste a connection string yourself.

> Netlify only auto-provisions when `@netlify/database` is present. It already is
> — see `package.json`.

---

## 3. Apply the schema

The donations table ships as a migration at
`netlify/database/migrations/0001_create_donations/migration.sql`.

```bash
netlify database migrations apply   # applies to your LOCAL dev database
netlify database status             # confirm: applied vs pending
```

On deploy, Netlify applies pending migrations automatically as part of the deploy
lifecycle — you do not run anything against production by hand.

To add a table later:

```bash
netlify database migrations new --description "add pickup locations"
```

Inspect data at any point:

```bash
netlify database connect --query "SELECT * FROM donations"
```

---

## 4. Enable Identity

In the Netlify UI: **Project configuration → Identity → Enable Identity**.

Then, still under Identity:

- **Registration**: `Open` while testing. Switch to `Invite only` before going
  live unless you genuinely want public signup.
- **Emails → Confirmation template**: leave confirmation on for production. For
  quick local testing you may enable *autoconfirm* so accounts work immediately.
- **External providers** (optional): Google, GitHub, GitLab, Bitbucket.

Identity requires HTTPS, which Netlify provides on deployed sites automatically.

---

## 5. Deploy once

Roles are assigned by an Identity **event function**, and event functions only
run on a deployed site — not under `netlify dev`.

```bash
git add -A && git commit -m "Add Netlify backend"
git push          # or: netlify deploy --build --prod
```

After the first deploy, `netlify/functions/identity-signup.mjs` is registered and
every new signup gets a role.

---

## 6. Create your admin account

**Administrators cannot self-register.** `identity-signup.mjs` only ever grants
`restaurant` or `ngo`, whatever the browser sends — otherwise anyone could sign
up straight into moderation powers.

To make yourself an admin:

1. Sign up through `/login` on the deployed site (pick either role).
2. Netlify UI → **Identity** → click your user → **Edit roles**.
3. Set the role to `admin` and save.
4. Sign out and back in — roles are baked into the JWT, so they only take effect
   on the next login or token refresh.

---

## Day-to-day development

```bash
npm run dev           # Vite only — UI work. No Identity, no functions, no DB.
npm run dev:netlify   # full stack at http://localhost:8888
```

Use `npm run dev:netlify` whenever you touch auth, the API or the database. It
proxies Vite on port 3000 through the Netlify dev server on **8888**, which is
where Functions, Identity and the local database are available.

Signing in under a plain `npm run dev` will not work — `@netlify/identity` has
nothing to talk to. The app is written to treat that as "signed out" rather than
crashing, so public pages still render.

---

## How auth works here

**Sign-up** → `signup(email, password, { full_name, role })` puts the requested
role in `user_metadata` → the `identity-signup` event function validates it and
writes the real role to `app_metadata.roles` → it appears in the JWT as
`user.roles`.

**Route guards** (`src/common/components/ProtectedRoute.jsx`) decide what the UI
offers:

| Route | Role |
| --- | --- |
| `/restaurants`, `/add-donation` | `restaurant` |
| `/ngos` | `ngo` |
| `/admin`, `/manage-donations` | `admin` |

**The real boundary is server-side.** Every branch in
`netlify/functions/donations.mjs` calls `getUser()` (which reads the `nf_jwt`
cookie) and re-checks the role against the database row before doing anything.
The client guard is a convenience — anything the browser enforces can be
bypassed with curl, so never treat it as security.

---

## Forms

`contact` and `volunteer` are Netlify Forms. Submissions appear in the Netlify UI
under **Forms**.

Netlify detects forms by parsing deployed HTML at build time, and a Vite SPA
renders its forms in JavaScript — so Netlify would never see them. Hidden copies
in `index.html` register the forms and their fields; the React forms then POST to
`/` with a matching `form-name`.

**If you add or rename a field in a React form, update the hidden form in
`index.html` to match, or that field will be dropped silently.** Two other rules
worth knowing: the POST body must be URL-encoded (not JSON), and the honeypot
field must be included — both are handled in `src/lib/netlifyForms.js`.

---

## Troubleshooting

| Symptom | Cause |
| --- | --- |
| Sign-in does nothing locally | Running `npm run dev` instead of `npm run dev:netlify` |
| New users have no role | Site not deployed yet — event functions do not run locally |
| Role change has no effect | Sign out and back in; roles live in the JWT |
| `401` from `/api/donations` | Not signed in, or cookies blocked by the browser |
| `403` from `/api/donations` | Signed in, but the role is not allowed that action |
| Form submissions not arriving | Field names in `index.html` do not match the React form |
| Migration not applied in production | Check the deploy log; migrations run in the deploy lifecycle |
