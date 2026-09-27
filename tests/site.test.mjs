import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { site, services } from '../content/services.mjs';
const root=resolve('dist');
const routes=['/',...services.map(s=>`/services/${s.slug}/`),'/privacy/'];
const read=path=>readFile(resolve(root,'.'+path+(path.endsWith('/')?'index.html':'')),'utf8');
const pages=await Promise.all(routes.map(async path=>({path,html:await read(path)})));

test('all public pages have unique titles, descriptions and correct canonical URLs',()=>{
 const titles=new Set();
 for(const {path,html} of pages){
  assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,path);
  const title=html.match(/<title>(.*?)<\/title>/)?.[1]; assert.ok(title&&title.length<85,path);
  assert.ok(!titles.has(title),'Duplicate title: '+title);titles.add(title);
  assert.match(html,/<meta name="description" content="[^"]{60,220}">/);
  assert.ok(html.includes(`<link rel="canonical" href="${site.origin}${path}">`),path);
  assert.ok(html.includes('index, follow, max-image-preview:large'),path);
  assert.ok(!html.includes('localhost'),path);
 }
});
test('structured data is valid, matches known business facts, and avoids invented proof',()=>{
 for(const {path,html} of pages){
  const matches=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];assert.equal(matches.length,1,path);
  const data=JSON.parse(matches[0][1]);assert.equal(data['@context'],'https://schema.org');
  const org=data['@graph'].find(x=>x['@type']==='Organization');assert.equal(org.telephone,site.phone);assert.equal(org.email,site.email);
  assert.ok(!JSON.stringify(data).includes('aggregateRating'));assert.ok(!org.address);
  if(path.startsWith('/services/'))assert.ok(data['@graph'].some(x=>x['@type']==='Service'));
 }
});
test('all local links, anchors, scripts and images resolve',async()=>{
 for(const {path,html} of pages){
  for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){
   const value=m[1].replaceAll('&amp;','&');if(/^(?:https?:|mailto:|tel:|data:)/.test(value))continue;
   const url=new URL(value,site.origin+path);
   const file=resolve(root,'.'+url.pathname+(url.pathname.endsWith('/')?'index.html':''));
   assert.ok((await stat(file)).isFile(),`${path}: ${value}`);
   if(url.hash){const target=await readFile(file,'utf8');assert.ok(target.includes(`id="${url.hash.slice(1)}"`),`${path}: ${value}`);}
  }
 }
});
test('sitemap is complete and robots points to the canonical domain',async()=>{
 const xml=await readFile(resolve(root,'sitemap.xml'),'utf8');const locs=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(x=>x[1]);
 assert.deepEqual(locs,routes.map(path=>site.origin+path));
 assert.ok(!xml.includes('404'));assert.equal(locs.length,new Set(locs).size);
 const robots=await readFile(resolve(root,'robots.txt'),'utf8');assert.match(robots,/Allow: \//);assert.ok(robots.includes(site.origin+'/sitemap.xml'));
});
test('production artifact excludes source, raw logos, review files and unnecessary fonts',async()=>{
 const allowed=['assets','index.html','style.css','script.js','services','privacy','404.html','robots.txt','sitemap.xml','llms.txt'];
 for(const file of await readdir(root))assert.ok(allowed.includes(file),'Unexpected public file: '+file);
 assert.deepEqual((await readdir(resolve(root,'assets/fonts'))).sort(),['OFL.txt','manrope-latin.woff2']);
 const sizes=await Promise.all(['assets/fonts/manrope-latin.woff2','assets/bay-area-connected-workspace.webp','style.css','script.js'].map(p=>stat(resolve(root,p))));
 assert.ok(sizes.reduce((sum,s)=>sum+s.size,0)<230000,'Core asset budget exceeds 230 KB');
});
test('Vercel security headers, redirect and error document are configured',async()=>{
 const config=JSON.parse(await readFile('vercel.json','utf8'));assert.equal(config.outputDirectory,'dist');
 const headers=config.headers[0].headers;assert.ok(headers.some(h=>h.key==='Content-Security-Policy'&&h.value.includes("object-src 'none'")));
 assert.equal(config.redirects[0].destination,site.origin+'/:path*');
 assert.match(await readFile(resolve(root,'404.html'),'utf8'),/noindex, follow/);
});
test('service pages have substantive unique help, preparation and limitations',()=>{
 for(const s of services){assert.ok(s.intro.length>120);assert.ok(s.preparation.length>120);assert.ok(s.expectation.length>120);assert.equal(s.faqs.length,2);assert.ok(s.related.every(slug=>services.some(x=>x.slug===slug)));}
});
