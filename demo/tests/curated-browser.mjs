import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import assert from "node:assert/strict";
import { journeyLevels } from "../src/journey-data.js";
import { certificates } from "../src/journey-solutions.js";
import { retainedLegacyIds } from "../src/campaign-hardening.js";
import { experiments } from "../src/lab-data.js";
import { certificates as labCertificates } from "../src/lab-solutions.js";
const server = spawn(process.execPath, ["server.mjs"], {
  env: { ...process.env, PORT: "4185" },
  stdio: ["ignore", "pipe", "pipe"],
});
process.on("exit", () => server.kill());
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
const errors = [];
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(r.status() + " " + r.url());
  });
  await fs.mkdir("screenshots", { recursive: true });
  await page.goto("http://127.0.0.1:4185/?test", { waitUntil: "networkidle" });
  await page.waitForFunction(() => !!window.demoTest);
  await page.click("#levels-menu");
  assert.equal(await page.locator(".level-card").count(), 77);
  assert.equal(await page.locator(".journey-card").count(), 9);
  assert.equal(await page.locator(".practice-card").count(), 0);
  assert.equal(await page.locator('a[href="lab.html"]').count(), 0);
  await page.click("#campaign-close");
  const legacy = JSON.parse(
    await fs.readFile("tests/campaign-solutions.json", "utf8"),
  );
  await page.evaluate(() => {
    demoTest.scene.quality(false);
    demoTest.scene.renderer.render = () => {};
  });
  for (const id of retainedLegacyIds) {
    const r = await page.evaluate(
      ({ id, path }) => {
        demoTest.load(id - 1);
        demoTest.skipLessons();
        for (const a of path) {
          demoTest.perform(a);
          demoTest.finishMotion();
        }
        return demoTest.state;
      },
      { id, path: legacy.find((l) => l.id === id).path },
    );
    assert.equal(r.won, true, "legacy " + id);
  }
  await page.evaluate(() => {
    demoTest.load(30);
    demoTest.skipLessons();
  });
  assert.equal(
    await page.evaluate(() => demoTest.index),
    28,
    "retired 31 resolves to 29",
  );
  await page.goto("http://127.0.0.1:4185/campaign.html?test", {
    waitUntil: "networkidle",
  });
  await page.waitForFunction(() => !!window.labTest);
  assert.equal(await page.locator(".case-card").count(), 9);
  await page.evaluate(() => {
    labTest.closeDialogs();
    labTest.scene.quality(false);
    labTest.scene.renderer.render = () => {};
  });
  for (const l of journeyLevels) {
    const r = await page.evaluate(
      ({ id, path }) => {
        labTest.load(id);
        if (labTest.scene.cloneMesh) throw Error("clone in " + id);
        for (const a of path)
          if (!labTest.perform(a)) throw Error(id + JSON.stringify(a));
        return labTest.state;
      },
      { id: l.id, path: certificates[l.id] },
    );
    assert.equal(r.won, true, l.id);
  }
  const hints = await page.evaluate(
    async (ids) => {
      const { journeyById } = await import("/src/journey-data.js"),
        { initial, step } = await import("/src/lab-engine.js"),
        worker = new Worker("/src/lab-hint-worker.js", { type: "module" }),
        out = [];
      for (const id of ids) {
        const r = await new Promise((resolve, reject) => {
          const t = setTimeout(() => reject(Error("hint " + id)), 20000);
          worker.onmessage = (e) => {
            clearTimeout(t);
            resolve(e.data);
          };
          worker.postMessage({
            id,
            state: initial(journeyById[id]),
            campaign: true,
            request: id,
          });
        });
        let s = initial(journeyById[id]);
        for (const a of r.path || []) s = step(journeyById[id], s, a).state;
        out.push([id, s.won]);
      }
      worker.terminate();
      return out;
    },
    journeyLevels.map((l) => l.id),
  );
  for (const [id, won] of hints) assert.equal(won, true, "worker " + id);
  // Actual keyboard and animation for the new opposing-gates switch, not an instant replay.
  await page.goto("http://127.0.0.1:4185/campaign.html?test&visual=1#69", {
    waitUntil: "networkidle",
  });
  await page.waitForFunction(() => !!window.labTest);
  await page.evaluate(() => {
    labTest.closeDialogs();
    labTest.scene.quality(false);
    labTest.scene.renderer.setPixelRatio(0.65);
  });
  const f = certificates["69"].findIndex((a) => a.type === "interact");
  await page.evaluate(
    ({ path, block }) => {
      for (const a of path) labTest.perform(a);
      labTest.select(block);
    },
    {
      path: certificates["69"].slice(0, f),
      block: certificates["69"][f].block,
    },
  );
  await page.keyboard.press("f");
  await page.waitForFunction(() => !labTest.scene.motion);
  assert.equal(await page.evaluate(() => labTest.state.levers), 1);
  assert.deepEqual(
    await page.evaluate(() => labTest.scene.doorViews.map((v) => v.target)),
    [0, 1],
  );
  await page.screenshot({ path: "screenshots/curated-69-switch.png" });
  await page.keyboard.press("f");
  await page.waitForFunction(() => !labTest.scene.motion);
  assert.equal(await page.evaluate(() => labTest.state.levers), 0);
  await page.keyboard.press("h");
  await page.waitForSelector("#apply-hint:not([hidden])");
  assert.match(await page.textContent("#help-text"), /blokunu seç/);
  for (const id of ["66", "67", "68", "70", "71", "72", "73"]) {
    await page.evaluate((id) => {
      labTest.closeDialogs();
      labTest.load(id);
    }, id);
    await page.screenshot({ path: `screenshots/curated-${id}.png` });
  }
  await page.setViewportSize({ width: 976, height: 827 });
  await page.evaluate(() => labTest.load("72"));
  await page.screenshot({ path: "screenshots/curated-compact.png" });
  const hint = await page.locator("#hint").boundingBox();
  assert.ok(hint.y + hint.height < 720);
  // Reference library remains separate; all M4 entries are removed, including its parent.
  await page.goto("http://127.0.0.1:4185/lab.html?test", {
    waitUntil: "networkidle",
  });
  await page.waitForFunction(() => !!window.labTest);
  assert.equal(await page.locator(".case-card").count(), 43);
  assert.equal(await page.locator('[data-case^="M4"]').count(), 0);
  await page.evaluate(() => {
    labTest.closeDialogs();
    labTest.scene.renderer.render = () => {};
  });
  for (const l of experiments) {
    const won = await page.evaluate(
      ({ id, path }) => {
        labTest.load(id);
        if (labTest.scene.cloneMesh) throw Error("reference clone");
        for (const a of path) if (!labTest.perform(a)) throw Error(id);
        return labTest.state.won;
      },
      { id: l.id, path: labCertificates[l.id] },
    );
    assert.equal(won, true, l.id);
  }
  assert.deepEqual(errors, []);
  console.log(
    "PASS: 28 selected campaign replays; 9 worker solutions; 43 merged references; real two-way switch; retired-ID aliases; distinct scene snapshots and compact hints.",
  );
} finally {
  await browser.close();
  server.kill();
}




