import {chromium} from 'playwright-core';
import {spawn} from 'node:child_process';
const server=spawn(process.execPath,['server.mjs'],{env:{...process.env,PORT:'4188'}});server.stdout.on('data',d=>console.log(String(d)));await new Promise(r=>setTimeout(r,1000));
const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{const p=await b.newPage();p.on('pageerror',e=>console.log('ERROR',e.name,e.message,String(e),JSON.stringify(e)));p.on('console',m=>console.log('CONSOLE',m.text()));p.on('requestfailed',r=>console.log('FAIL',r.url(),r.failure()));await p.goto('http://127.0.0.1:4188/tower.html?test#V0');await p.waitForTimeout(3000);console.log(await p.evaluate(()=>({title:document.querySelector('#title').textContent,test:!!window.towerTest,body:document.body.innerText.slice(0,1200)})));await p.screenshot({path:'screenshots/learning-debug.png'});}finally{await b.close();server.kill();}

