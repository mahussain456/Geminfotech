# Gem Infotech

Responsive static website for **https://www.thegeminfo.com**, configured for Vercel. No runtime framework or third-party JavaScript is required.

## Develop and verify

Requires Node.js 22 or newer.

```powershell
npm run check
npm run preview
```

`check` validates JavaScript, builds the site, and runs seven production-artifact tests. `preview` serves `dist/` at http://127.0.0.1:4174, including the configured security policy and custom 404. Rebuild after editing. `dist/` is generated and ignored by Git.

## Vercel settings

Import the repository into Vercel using **Other** as the framework. The checked-in `vercel.json` sets:

- Build command: `npm run build`
- Output directory: `dist`
- Canonical production domain: `www.thegeminfo.com`
- Apex-domain redirect: `thegeminfo.com` → `www.thegeminfo.com`
- Security headers, content security policy and asset caching
- Preview builds (`VERCEL_ENV=preview`): noindex pages and blocked crawlers

Add both domain names to the Vercel project and apply the exact DNS records shown by Vercel. No deployment or DNS changes were made in this task. Verify HTTPS, apex redirects, page status codes and Search Console ownership on the live domain before announcing the launch.

## Contact requests

The form prepares a correctly addressed email draft on the visitor's device. The visitor must open and send it in an email application, or use the copy fallback. It does not send email from a server or store a lead. No email API key is needed. If direct website submission is desired, connect and test a mail provider and abuse protection before changing the draft wording to a sent confirmation.

## Content and design

- `index.html`: homepage source and shared header/footer.
- `content/services.mjs`: domain, business contact facts and eight distinct service articles.
- `scripts/build.mjs`: static pages, canonical/social tags, JSON-LD, robots, sitemap, llms.txt and 404.
- `style.css`, `script.js`: interface, accessible navigation, service filters, contact draft and controlled hero motion.
- `DESIGN.md`: documented design system.
- `SEO-LAUNCH.md`: completed SEO work, source references and launch checklist.

The build copies an explicit allowlist. Raw logo packages, mockups, tests, source content, prompt sidecars and internal documentation are not published. Original supplied logos are unchanged; light/dark variants are rendered at responsive sizes. The connected-workspace photo is AI-generated illustrative imagery, not a real customer or business location. Provenance stays in adjacent source sidecars. Local Manrope WOFF2 is distributed under `assets/fonts/OFL.txt`.
