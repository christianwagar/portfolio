# Christian Wagar — Portfolio

Personal portfolio site built with [Astro](https://astro.build) and deployed on [Cloudflare Pages](https://pages.cloudflare.com).

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output → dist/
npm run preview  # preview production build
```

## Update content

- **Copy & data:** edit [`src/data/site.ts`](src/data/site.ts)
- **Photos:** replace files in [`public/images/`](public/images/) (same filenames)
- **Inbox folder:** drop new assets in [`content-inbox/`](content-inbox/)

## Deploy to Cloudflare Pages

### Option A — Connect GitHub (recommended)

1. Push this repo to GitHub (see below)
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Select this repository
4. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** 22 (Environment variables → `NODE_VERSION` = `22`)
5. Deploy — you'll get a `*.pages.dev` URL

### Option B — Direct upload with Wrangler

```bash
npm run build
npx wrangler pages deploy dist --project-name=christian-wagar-portfolio
```

## Custom domain

In Cloudflare Pages → your project → **Custom domains** → add your domain (e.g. `christianwagar.com`). If the domain is on Cloudflare, DNS is configured automatically.

## Project structure

```
src/
├── components/   # Hero, About, Projects, etc.
├── data/site.ts  # All copy — edit here
├── layouts/
├── pages/
└── styles/
public/
├── images/       # Your photos
└── og-image.png  # LinkedIn/social preview
```
