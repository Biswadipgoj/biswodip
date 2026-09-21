import { chromium } from '@playwright/test';
import fs from 'node:fs';
const browser = await chromium.launch({channel:'msedge'});
const measurements=[];
for(const width of [320,360,375,390,430,768,1024,1440,1728]) {
 const page=await browser.newPage({viewport:{width,height:width<800?844:900}});
 await page.goto(process.env.PORTFOLIO_URL || 'http://localhost:3000');
 await page.waitForTimeout(1000);
 for(const id of ['opening','stack','nanolink','resume','contact']) {
  await page.evaluate(id=>{const el=document.getElementById(id);window.portfolioScroll?.scrollTo(el,{immediate:true});if(!window.portfolioScroll)el.scrollIntoView()},id);
  await page.waitForTimeout(650);
  measurements.push(await page.evaluate(({width,id})=>({width,id,overflow:document.documentElement.scrollWidth-innerWidth,heading:document.querySelector('#'+id+' h1,#'+id+' h2,#'+id+' h3')?.getBoundingClientRect().toJSON(),controls:[...document.querySelectorAll('#'+id+' button')].filter(e=>e.getBoundingClientRect().width).map(e=>({label:e.textContent,height:e.getBoundingClientRect().height,width:e.getBoundingClientRect().width})),glyphs:document.querySelectorAll('[data-glyph]').length}),{width,id}));
  if([390,1440,1728].includes(width))await page.screenshot({path:`artifacts/after-${width}-${id}.png`});
 }
 await page.close();
}
fs.writeFileSync('artifacts/responsive-measurements.json',JSON.stringify(measurements,null,2));
console.log(JSON.stringify({states:measurements.length,maxOverflow:Math.max(...measurements.map(m=>m.overflow))}));
await browser.close();
