# Search and launch readiness

## Implemented

- Ten canonical, indexable HTML pages: homepage, eight detailed service pages and website privacy; plus a noindex 404.
- Distinct titles/descriptions, absolute canonical URLs on https://www.thegeminfo.com, Open Graph and Twitter previews.
- Crawlable text, descriptive service links and related-service navigation, useful questions and direct answers.
- Organization, WebSite, WebPage, Service, ItemList and BreadcrumbList JSON-LD as appropriate. No invented ratings, postal addresses, credentials or prices.
- Canonical XML sitemap and robots.txt. Preview deployments are noindex and disallowed from crawling.
- Optional llms.txt mirrors known business information. It is a convenience summary, not a ranking mechanism or crawler-access requirement.
- Responsive 35 KB/105 KB hero images and a single local WOFF2 font; no third-party script/font requests or frontend dependencies.
- Pause/play, offscreen and hidden-tab animation suspension; reduced-motion and no-JavaScript static alternatives.
- Vercel static build, HTTPS-domain canonicalization configuration, security headers, custom 404, and allowlisted output.
- Seven automated checks cover metadata, schema, local links, sitemap, output hygiene, asset budget and substantive service content.

## Launch work that requires the live account/domain

1. Import the repository into Vercel, deploy the generated `dist` output and add www.thegeminfo.com plus thegeminfo.com. Apply the DNS records Vercel provides.
2. Check HTTPS, apex and index.html redirects, actual security headers, 404 status and all contact links on the deployed domain.
3. Verify the domain in Google Search Console and Bing Webmaster Tools, then submit https://www.thegeminfo.com/sitemap.xml.
4. Verify and maintain the real Google Business Profile. Use the same business name, phone, service areas and hours. Do not publish a private address or manufacture reviews.
5. Add verified official profile URLs to business structured data when supplied. A public address has not been supplied, so this build uses Organization/Service rather than claiming eligibility for Google's address-based LocalBusiness rich results.
6. Confirm all operational claims, opening hours, service scope and privacy information before launch. Add actual team credentials and case studies only when documented.
7. Measure PageSpeed Insights and Core Web Vitals on the deployed site. Local checks are not field-performance certification.
8. Monitor real query impressions, clicks and leads. No guarantee is made of indexing, ranking, AI citation or traffic.

## Query/content map

Home targets Bay Area computer repair and IT support. Service pages separately answer computer repair, WiFi setup, virus removal, small-office setup, OS installation, printer setup, smart hands and emergency-support intent. Geographic coverage is stated where relevant; no duplicated city doorway pages were created.

## AEO/GEO approach and primary references

Google states that existing SEO fundamentals apply to AI Overviews and AI Mode; special AI files or markup are not required. Important text should be accessible, internally linked and consistent with structured data:
https://developers.google.com/search/docs/appearance/ai-features

Organization data helps identify the business:
https://developers.google.com/search/docs/appearance/structured-data/organization

Local-business rich result requirements must not be satisfied with an invented address:
https://developers.google.com/search/docs/appearance/structured-data/local-business

OpenAI distinguishes OAI-SearchBot for search from GPTBot for training. The build has no agent-specific search blocks; a training preference is a separate policy decision:
https://developers.openai.com/api/docs/bots

Vercel configuration reference:
https://vercel.com/docs/project-configuration

## Known contact behavior

The form is a validated email-draft builder with a copy fallback. Visitors send from their email app. No backend or delivery confirmation is implied, no visitor email was sent during testing, and no direct-submission service has been configured.
