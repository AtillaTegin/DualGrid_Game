import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
const server = spawn(process.execPath, ["server.mjs"], {
  env: { ...process.env, PORT: "4182" },
  stdio: ["ignore", "pipe", "pipe"],
});
process.on("exit", () => server.kill());
await new Promise((r, j) => {
  server.stdout.once("data", r);
  server.once("error", j);
});
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: [
    "--no-sandbox",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
  ],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("response", (r) => {
  if (r.status() >= 400) errors.push(r.status() + " " + r.url());
});
await page.goto("http://127.0.0.1:4182/?test", { waitUntil: "networkidle" });
await page.waitForTimeout(400);
await page.screenshot({ path: "screenshots/01-home.png" });
await page.evaluate(() => demoTest.load(4));
await page.waitForTimeout(200);
await page.screenshot({ path: "screenshots/02-level-five.png" });
console.log(JSON.stringify({ errors }));
await browser.close();
server.kill();
if (errors.length) process.exitCode = 1;
