import { chromium } from "playwright-core";
import assert from "node:assert/strict";
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: [
    "--no-sandbox",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
  ],
});
try {
  const page = await browser.newPage({
      viewport: { width: 1280, height: 900 },
    }),
    errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:4173/tower.html?test#G6", {
    waitUntil: "networkidle",
  });
  await page.waitForFunction(() => !!window.towerTest);
  assert.equal(await page.evaluate(() => towerTest.level.id), "G6");
  assert.equal(await page.locator('[data-action="portal"]').isVisible(),true);
  assert.equal(await page.locator("#portal-map").isVisible(), true);
  await page.click("#hint");
  await page.waitForFunction(() => !document.querySelector("#hint").disabled);
  assert.match(await page.locator("#message").innerText(), /bloku:/);
  assert.equal(await page.locator("#levels button").count(), 49);
  assert.deepEqual(errors, []);
  await page.screenshot({ path: "screenshots/tower-release.png" });
  console.log(
    "PASS packaged chapter: current-state hint, portal HUD, catalog count and no browser errors",
  );
} finally {
  await browser.close();
}


