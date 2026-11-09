import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import { towerLevels } from "../src/tower-levels.js";
import { campaignTotal, towerOrdinal } from "../src/campaign-catalog.js";
import { solveTower } from "../src/tower-engine.js";
const server = spawn(process.execPath, ["server.mjs"], {
  env: { ...process.env, PORT: "4187" },
  stdio: ["ignore", "pipe", "pipe"],
});
await new Promise((r, j) => {
  server.stdout.once("data", r);
  server.once("error", j);
  server.stderr.once("data", (d) => j(Error(String(d))));
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
try {
  const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
    }),
    errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:4187/?levels=1", {
    waitUntil: "networkidle",
  });
  assert.equal(
    await page.locator("#level-count").innerText(),
    String(campaignTotal),
  );
  assert.equal(await page.locator(".level-card").count(), campaignTotal);
  assert.equal(await page.locator(".tower-card").count(), towerLevels.length);
  assert.equal(await page.locator(".journey-card").count(), 9);
  assert.match(await page.locator("#campaign-summary").innerText(), /98/);
  assert.equal(await page.locator('.tower-card[data-tower="V3"]').count(), 0);
  await page.screenshot({ path: "screenshots/unified-campaign.png" });
  await page.click('.tower-card[data-tower="R6"]');
  await page.waitForURL("**/tower.html#R6");
  await page.waitForFunction(() =>
    document.querySelector("#title").textContent.includes("Qütb"),
  );
  assert.match(await page.locator("#floor").innerText(), new RegExp(towerOrdinal("R6") + "/" + campaignTotal));
  await page.click(".journey-link");
  await page.waitForSelector("#campaign-menu[open]");
  await page.click('.tower-card[data-tower="W1"]');
  await page.waitForURL("**/tower.html#W1");
  await page.goto("http://127.0.0.1:4187/tower.html?test#W1", {
    waitUntil: "networkidle",
  });
  await page.waitForFunction(() => !!window.towerTest);
  const path = solveTower(towerLevels.find((l) => l.id === "W1")).path;
  await page.evaluate((path) => {
    for (const a of path)
      if (!towerTest.perform(a)) throw Error("Replay failed");
  }, path);
  assert.equal(await page.evaluate(() => towerTest.state.won), true);
  await page.click(".journey-link");
  await page.waitForSelector("#campaign-menu[open]");
  assert.ok(
    await page
      .locator('.tower-card[data-tower="W1"]')
      .evaluate((b) => b.classList.contains("complete")),
  );
  await page.click("#campaign-close");
  await page.click("#continue");
  await page.waitForURL("**/tower.html#W1");
  assert.deepEqual(errors, []);
  console.log(
    "PASS: complete main catalog, chapter routes, progress badge, global ordinal and cross-page Continue.",
  );
} finally {
  await browser.close();
  server.kill();
}
