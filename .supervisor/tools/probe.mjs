import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p = await b.newPage({viewport:{width:1180,height:1000}});
await p.addInitScript(()=>{ window.claude={use:async()=>null}; });
await p.goto('file://'+process.cwd()+'/preview.html');
await p.waitForTimeout(800);
const info = await p.evaluate(()=>{
  const acts=document.querySelector('section.supercard .acts');
  const cs=getComputedStyle(acts);
  return {
    actsBox: acts.getBoundingClientRect().toJSON(),
    flexWrap: cs.flexWrap, alignItems: cs.alignItems, maxWidth: cs.maxWidth,
    kids:[...acts.children].map(k=>({t:k.textContent.trim().slice(0,14),
      cls:k.className, ...k.getBoundingClientRect().toJSON(),
      h:getComputedStyle(k).height, as:getComputedStyle(k).alignSelf}))
  };
});
console.log(JSON.stringify(info,null,1));
await b.close();
