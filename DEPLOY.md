# Deploy to Cloudflare Pages

Your site builds successfully (`npm run build` → `dist/`). Choose one path to go live:

## Path 1 — Cloudflare Dashboard + GitHub (recommended)

Since you already use Cloudflare, this is the easiest ongoing workflow.

1. **Create a GitHub repo** and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/christian-wagar-portfolio.git
   git push -u origin main
   ```

2. **Cloudflare Dashboard** → [Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages) → **Create** → **Pages** → **Connect to Git**

3. Select your repo and configure:
   | Setting | Value |
   |---------|-------|
   | Production branch | `main` |
   | Framework preset | Astro |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Environment variable | `NODE_VERSION` = `22` |

4. **Deploy** — Cloudflare builds and hosts at `christian-wagar-portfolio.pages.dev` (or similar).

5. **Custom domain** (optional): Project → **Custom domains** → Add `christianwagar.com` (or your domain).

Every push to `main` auto-deploys.

---

## Path 2 — Wrangler CLI (one-time or manual deploys)

1. Create an API token at [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens) with **Cloudflare Pages — Edit** permission.

2. Deploy:
   ```bash
   export CLOUDFLARE_API_TOKEN="your-token-here"
   npm run deploy
   ```

---

## Path 3 — GitHub Actions (CI deploy)

1. Add these [GitHub repository secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions):
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID` (found in Cloudflare Dashboard → Workers & Pages → right sidebar)

2. Push to `main` — the workflow in `.github/workflows/deploy.yml` builds and deploys automatically.

---

## Replace placeholder photos

Drop your real images into `public/images/` (same filenames):

- `headshot.jpg`
- `personal-dog-1.jpg`
- `cloudflare-fireside.jpg`
- `google-ai-essentials.jpg`
- `gainsight-pulse-1.jpg`
- `alteryx-gp-1.jpg`, `alteryx-gp-2.jpg`

Commit and push — Cloudflare redeploys automatically.

## Local preview

```bash
npm run dev       # dev server at http://localhost:4321
npm run preview   # preview production build
```
