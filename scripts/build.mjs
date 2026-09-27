import { readFile, writeFile, mkdir, copyFile, lstat, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { site, services } from '../content/services.mjs';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist');
const preview = process.env.VERCEL_ENV === 'preview';
const htmlEscape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const absolute = path => `${site.origin}${path}`;
const jsonLd = data => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g,'\\u003c')}</script>`;
const home = await readFile(resolve(root,'index.html'),'utf8');
// Clean only this build's verified output directory, never source or user assets.
if (dirname(output) !== root || output !== resolve(root, 'dist')) throw new Error('Unsafe build directory');
const prior = await lstat(output).catch(error => { if (error.code !== 'ENOENT') throw error; return null; });
if (prior?.isSymbolicLink()) throw new Error('Refusing to clean a symlinked output directory');
await rm(output, { recursive: true, force: true });
await mkdir(output,{recursive:true});
const write = async (path, text) => { const target=resolve(output,path); if (!target.startsWith(output + '/') && !target.startsWith(output + '\\')) throw new Error('Invalid output path'); await mkdir(dirname(target),{recursive:true}); await writeFile(target,text); };
const assets = [
  'style.css','script.js','assets/logo-header.webp','assets/logo-header-light-bg.webp',
  'assets/favicon/favicon.ico','assets/bay-area-connected-workspace.webp','assets/bay-area-connected-workspace-700.webp',
  'assets/fonts/manrope-latin.woff2','assets/fonts/OFL.txt'
];
for (const file of assets) { const target=resolve(output,file); await mkdir(dirname(target),{recursive:true}); await copyFile(resolve(root,file),target); }

const organization = {
  '@type':'Organization', '@id':absolute('/#organization'), name:site.name, url:site.origin+'/',
  logo:{'@type':'ImageObject',url:absolute('/assets/logo-header-light-bg.webp')},
  telephone:site.phone,email:site.email,
  description:'On-site computer repair, WiFi setup and IT support for Bay Area homes and small businesses.',
  areaServed:site.cities.map(name=>({'@type':'City',name})),
  contactPoint:[{'@type':'ContactPoint',telephone:site.phone,email:site.email,contactType:'customer service',availableLanguage:'English',hoursAvailable:{'@type':'OpeningHoursSpecification',dayOfWeek:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],opens:'08:00',closes:'20:00'}}]
};
const website = {'@type':'WebSite','@id':absolute('/#website'),url:site.origin+'/',name:site.name,publisher:{'@id':absolute('/#organization')},inLanguage:'en-US'};
function metadata(html,{path='/',title,description,graph=[],noindex=false}) {
  html=html.replace(/<title>[\s\S]*?<\/title>/,`<title>${htmlEscape(title)}</title>`)
    .replace(/\s*<meta (?:name="(?:description|robots|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g,'')
    .replace(/\s*<link rel="canonical"[^>]*>/g,'');
  const canonical=absolute(path);
  const extra=`\n<meta name="description" content="${htmlEscape(description)}">\n<link rel="canonical" href="${canonical}">\n<meta name="robots" content="${preview||noindex?'noindex, follow':'index, follow, max-image-preview:large'}">\n<meta property="og:type" content="website">\n<meta property="og:site_name" content="Gem Infotech">\n<meta property="og:locale" content="en_US">\n<meta property="og:title" content="${htmlEscape(title)}">\n<meta property="og:description" content="${htmlEscape(description)}">\n<meta property="og:url" content="${canonical}">\n<meta property="og:image" content="${absolute('/assets/bay-area-connected-workspace.webp')}">\n<meta property="og:image:width" content="1400">\n<meta property="og:image:height" content="934">\n<meta property="og:image:alt" content="Illustrative connected workspace with laptop and devices overlooking the Bay">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="${htmlEscape(title)}">\n<meta name="twitter:description" content="${htmlEscape(description)}">\n<meta name="twitter:image" content="${absolute('/assets/bay-area-connected-workspace.webp')}">\n${jsonLd({'@context':'https://schema.org','@graph':graph})}\n`;
  return html.replace('</head>',extra+'</head>');
}
const homeGraph=[organization,website,{'@type':'WebPage','@id':absolute('/#webpage'),url:site.origin+'/',name:'Bay Area Computer Repair & IT Support',isPartOf:{'@id':absolute('/#website')},about:{'@id':absolute('/#organization')},inLanguage:'en-US'},
 {'@type':'ItemList',name:'Gem Infotech tech support services',itemListElement:services.map((s,i)=>({'@type':'ListItem',position:i+1,name:s.name,url:absolute(`/services/${s.slug}/`)}))}];
await write('index.html',metadata(home,{title:'Bay Area Computer Repair & IT Support | Gem Infotech',description:'On-site computer repair, WiFi setup and IT support for Bay Area homes and small businesses. Open daily, with 24/7 emergency support. Get a free quote.',graph:homeGraph}));

const head=home.match(/<head>([\s\S]*?)<\/head>/)[1].replace(/(?:assets\/fonts\/manrope-latin.woff2)/g,'/assets/fonts/manrope-latin.woff2').replace('href="assets/','href="/assets/').replace('href="style.css','href="/style.css').replace('src="script.js','src="/script.js');
const icons=home.match(/<svg class="icon-definitions"[\s\S]*?<\/svg>/)?.[0] || home.match(/<svg[^>]*class="icon-definitions"[\s\S]*?<\/svg>/)[0];
const toRoot = text => text.replace(/href="#"/g,'href="/"').replace(/href="#(?!main)([^"]+)"/g,'href="/#$1"').replace(/src="assets\//g,'src="/assets/');
const header=toRoot(home.match(/<header[\s\S]*?<\/header>/)[0]);
const footer=toRoot(home.match(/<footer>[\s\S]*?<\/footer>/)[0]);
const arrow='<svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg>';
const shell = body => `<!DOCTYPE html><html lang="en"><head>${head}</head><body><a class="skip-link" href="#main">Skip to content</a>${icons}${header}<main id="main">${body}</main>${footer}</body></html>`;
const aside=`<aside class="service-aside"><h2>Talk to a local expert.</h2><p>Call for a free quote and discuss the right next step.</p><a href="tel:${site.phone}">669.900.2400</a><p>Every day, 8am–8pm.<br>Emergency support, 24/7.</p><a href="/#areas">Check our service areas</a></aside>`;
for(const service of services){
  const path=`/services/${service.slug}/`;
  const request=`/?service=${service.slug}#contact`;
  const body=`<section class="page-hero"><div class="container"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/#services">Services</a><span aria-hidden="true">/</span><span aria-current="page">${htmlEscape(service.name)}</span></nav><h1>${htmlEscape(service.heading)}</h1><p class="page-summary">${htmlEscape(service.summary)}</p><a class="button" href="${service.slug==='emergency'?'tel:'+site.phone:request}">${service.slug==='emergency'?'Call for urgent support':'Request a free quote'}${arrow}</a></div></section>
  <div class="container article-layout"><article class="article-body"><h2>How we can help</h2><p>${htmlEscape(service.intro)}</p><ul>${service.includes.map(x=>`<li>${htmlEscape(x)}</li>`).join('')}</ul><h2>Before you get in touch</h2><p>${htmlEscape(service.preparation)}</p><h2>What to expect</h2><p>${htmlEscape(service.expectation)}</p><h2>Where we provide support</h2><p>On-site support is available in ${site.cities.slice(0,-1).join(', ')} and ${site.cities.at(-1)}. For another Bay Area location, <a href="/?city=other-bay-area#contact">ask us about coverage</a> before arranging a visit.</p><h2>Questions about ${htmlEscape(service.name.toLowerCase())}</h2>${service.faqs.map(([q,a])=>`<h3>${htmlEscape(q)}</h3><p>${htmlEscape(a)}</p>`).join('')}<h2>Related services</h2><nav class="related-links" aria-label="Related services">${service.related.map(slug=>{const related=services.find(x=>x.slug===slug);return `<a href="/services/${slug}/">${htmlEscape(related.name)}</a>`;}).join('')}</nav><div class="article-cta"><p>Tell us what is happening. We will discuss the scope and explain the price before work begins.</p><a class="button" href="${request}">Get a quote${arrow}</a></div></article>${aside}</div>`;
  const graph=[organization,website,{'@type':'Service','@id':absolute(path+'#service'),name:service.name,serviceType:service.name,url:absolute(path),description:service.summary,provider:{'@id':absolute('/#organization')},areaServed:organization.areaServed}, {'@type':'WebPage','@id':absolute(path+'#webpage'),url:absolute(path),name:service.heading,isPartOf:{'@id':absolute('/#website')},mainEntity:{'@id':absolute(path+'#service')},inLanguage:'en-US'}, {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:site.origin+'/'},{'@type':'ListItem',position:2,name:service.name,item:absolute(path)}]}];
  await write(`services/${service.slug}/index.html`,metadata(shell(body),{path,title:service.title,description:service.description,graph}));
}
const privacyBody=`<section class="page-hero"><div class="container"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Website privacy</span></nav><h1>Website privacy</h1><p class="page-summary">How this website handles a quote request and the information you choose to share.</p></div></section><div class="container article-layout"><article class="article-body"><h2>Quote requests stay in your browser until you send</h2><p>The quote form prepares an email draft on your device. It does not submit your contact details to a website database. To contact Gem Infotech, you open the draft in your email application and send it, or copy the request and send it yourself.</p><h2>Information you choose to send</h2><p>A request can include your name, phone number, email address, selected service, city and description of the issue. Gem Infotech receives that information when you send the email and can use it to discuss your request. Do not include passwords, recovery keys, payment details or sensitive files in the form.</p><h2>Cookies and analytics</h2><p>This website does not set analytics or advertising cookies, use analytics scripts, or store your form fields in local storage. Fonts and images are served with the website rather than loaded from third-party font or image services.</p><h2>Hosting and email services</h2><p>The website is configured for Vercel hosting. Hosting providers may process technical request information such as IP addresses and request logs to operate and secure their services. See <a href="https://vercel.com/legal/privacy-notice" rel="noopener noreferrer">Vercel’s privacy notice</a>. Your email provider also processes messages you send through your email application.</p><h2>Questions about your information</h2><p class="privacy-contact">Contact <a href="mailto:${site.email}">${site.email}</a> with questions about information you have sent to Gem Infotech.</p></article>${aside}</div>`;
await write('privacy/index.html',metadata(shell(privacyBody),{path:'/privacy/',title:'Website Privacy | Gem Infotech',description:'How Gem Infotech’s website prepares quote requests, handles information you choose to email, and uses hosting services.',graph:[organization,website]}));
await write('404.html',metadata(shell(`<section class="page-hero"><div class="container"><h1>That page isn’t here.</h1><p class="page-summary">You can find our tech support services on the homepage, or call 669.900.2400 for help.</p><a class="button" href="/">Back to Gem Infotech${arrow}</a></div></section>`),{path:'/404.html',title:'Page Not Found | Gem Infotech',description:'Find local Bay Area tech support at Gem Infotech.',graph:[],noindex:true}));
const routes=['/',...services.map(x=>`/services/${x.slug}/`),'/privacy/'];
await write('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(path=>`  <url><loc>${absolute(path)}</loc></url>`).join('\n')}\n</urlset>\n`);
await write('robots.txt',preview?'User-agent: *\nDisallow: /\n':`User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`);
await write('llms.txt',`# Gem Infotech\n\n> Local, on-site technology support for Bay Area homes and small businesses.\n\nCanonical website: ${site.origin}/\nPhone: +1 669.900.2400\nEmail: ${site.email}\nRegular hours: daily, 8am–8pm Pacific time. Emergency support: 24/7.\nService areas: ${site.cities.join(', ')}. Other Bay Area coverage must be confirmed.\nPricing: request a free quote; no fixed prices are published.\nThe contact form prepares an email draft; visitors must send it from their email application.\n\n## Services\n${services.map(s=>`- [${s.name}](${absolute(`/services/${s.slug}/`)}): ${s.summary}`).join('\n')}\n\n## About this file\nThis is a convenience summary of public site content, not a crawler directive or a guarantee of inclusion in AI answers. The linked HTML pages are authoritative.\n`);
console.log(`Built ${routes.length} indexable pages + 404 in dist (${preview?'preview: noindex':'production: '+site.origin}).`);
