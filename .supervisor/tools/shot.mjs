import { chromium } from 'playwright';
import fs from 'fs';
const html = fs.readFileSync('dashboard.html','utf8');
const doc = `<!doctype html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>:root{color-scheme:light}body{margin:0;font:14px system-ui}img{max-width:100%}[hidden]{display:none!important}</style>
</head><body>${html}</body>`;
fs.writeFileSync('preview.html', doc);
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p = await b.newPage({ viewport:{width:1180,height:1100}, deviceScaleFactor:2 });
await p.addInitScript(()=>{ window.claude = { use: async ()=>null }; });
await p.goto('file://'+process.cwd()+'/preview.html');
await p.waitForTimeout(1500);
await p.locator('section.supercard').screenshot({ path:'shot-super.png' });
await p.locator('.group').first().screenshot({ path:'shot-rows.png' });
await b.close();
console.log('ok');
