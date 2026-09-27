import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root=resolve('dist');
const config=JSON.parse(await readFile('vercel.json','utf8'));
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.woff2':'font/woff2','.ico':'image/x-icon','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8'};
createServer(async(req,res)=>{
  for(const {key,value} of config.headers[0].headers) if(key!=='Content-Security-Policy')res.setHeader(key,value);
  res.setHeader('Content-Security-Policy',config.headers[0].headers.find(x=>x.key==='Content-Security-Policy').value.replace('; upgrade-insecure-requests',''));
  res.setHeader('Cache-Control','no-store');
  try{
    const url=new URL(req.url,'http://localhost');
    let file=resolve(root,'.'+decodeURIComponent(url.pathname));
    if(file!==root&&!file.startsWith(root+sep))throw new Error('Invalid path');
    if((await stat(file)).isDirectory())file=resolve(file,'index.html');
    res.setHeader('Content-Type',mime[extname(file)]||'application/octet-stream');
    res.end(await readFile(file));
  }catch{res.statusCode=404;res.setHeader('Content-Type','text/html; charset=utf-8');res.end(await readFile(resolve(root,'404.html')));}
}).listen(4174,'127.0.0.1',()=>console.log('Production build preview: http://127.0.0.1:4174'));
