import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import { towerLevels } from "../src/tower-levels.js";
import { solveTower, bodyDims } from "../src/tower-engine.js";
const server = spawn(process.execPath, ["server.mjs"], {
  env: { ...process.env, PORT: "4186" },
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
      viewport: { width: 1280, height: 900 },
    }),
    errors = [];
  page.on("pageerror", (e) => {errors.push(e.message); console.error(e.stack);});
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(r.url());
  });
  for (const l of towerLevels.filter((l) =>
    process.env.DUAL_TEST_IDS
      ? process.env.DUAL_TEST_IDS.split(",").includes(l.id)
      : !process.env.DUAL_TEST_PREFIX ||
        l.id.startsWith(process.env.DUAL_TEST_PREFIX),
  )) {
    await page.goto(`http://127.0.0.1:4186/tower.html?test#${l.id}`, {
      waitUntil: "networkidle",
    });
    await page.waitForFunction(
      () => !!window.towerTest && !towerTest.scene.busy,
    );
    await page.click("#hint");
    await page.waitForFunction(() => !document.querySelector("#hint").disabled);
    assert.match(await page.locator("#message").innerText(), /bloku:/);
    await page.screenshot({ path: `screenshots/tower-${l.id}.png` });
    const path = solveTower(l).path;
    let digs = false;
    for (const a of path) {
      await page.waitForFunction(() => !towerTest.scene.busy);
      await page.evaluate((i) => towerTest.select(i), a.actor);
      if (a.type === "dig") {
        if (!digs) {
          await page.keyboard.press("x");
          digs = true;
        }
        await page.keyboard.press(
          {
            up: "ArrowUp",
            down: "ArrowDown",
            left: "ArrowLeft",
            right: "ArrowRight",
          }[a.dir],
        );
      } else {
        if (digs) {
          await page.keyboard.press("x");
          digs = false;
        }
        await page.keyboard.press(
          a.type === "interact"
            ? "f"
            : {
                  portal: "p",
                  deposit: "q",
                  withdraw: "e",
                  give: "t",
                  panel: "k",
                  wait: "Space",
                  link: "l",
                }[a.type]
              ? {
                  portal: "p",
                  deposit: "q",
                  withdraw: "e",
                  give: "t",
                  panel: "k",
                  wait: "Space",
                  link: "l",
                }[a.type]
              : a.type === "resize"
                ? "g"
                : {
                    up: "ArrowUp",
                    down: "ArrowDown",
                    left: "ArrowLeft",
                    right: "ArrowRight",
                  }[a.dir],
        );
      }
    }
    await page.waitForFunction(() => !towerTest.scene.busy);
    assert.equal(await page.evaluate(() => towerTest.state.won), true, l.id);
    if (l.chests?.length) {
      assert.equal(
        await page.evaluate(
          () =>
            towerTest.scene.chestViews.filter(
              (v) => v.opened && v.lid.rotation.x < -1.3,
            ).length,
        ),
        l.chests.length,
        l.id + " animated open lids",
      );
      assert.equal(
        await page.evaluate(() => towerTest.state.opened.length),
        l.chests.length,
      );
      assert.doesNotMatch(
        await page.locator("#stats").innerText(),
        /Açar [2-9]\/1/,
      );
    }
    if (l.id === "G1") {
      assert.deepEqual(await page.evaluate(() => towerTest.state.visits), [2]);
      assert.equal(
        await page.evaluate(() =>
          towerTest.scene.floorObjects
            .filter((o) => o.userData.cell === "2,1,0")
            .some((o) => o.visible),
        ),
        false,
      );
    }
    if (l.id === "G5") {
      assert.ok(
        await page.evaluate(() =>
          towerTest.state.switches.includes("solidify"),
        ),
      );
      assert.ok(
        await page.evaluate(() =>
          towerTest.scene.observerRings.every((r) => !r.o.visible),
        ),
      );
    }
    const rendered = await page.evaluate(() =>
        towerTest.scene.actors.map((o) => o.scale.toArray()),
      ),
      expected = await page.evaluate(
        () =>
          towerTest.state.dims || towerTest.state.sizes.map((n) => [n, n, n]),
      );
    assert.deepEqual(rendered, expected, l.id + " rendered body dimensions");
    if (l.faceMode) {
      assert.equal(await page.locator("#orientation").isVisible(), true);
      assert.ok(
        await page.evaluate(() =>
          towerTest.scene.actors.every((o, i) =>
            o.children
              .filter((c) => c.userData.faceKey)
              .every(
                (c) =>
                  c.userData.value ===
                  towerTest.state.faces[i][c.userData.faceKey],
              ),
          ),
        ),
      );
    }
    await page.screenshot({ path: `screenshots/tower-${l.id}-complete.png` });
    await page.click("#undo");
    assert.equal(await page.evaluate(() => towerTest.state.won), false);
    await page.click("#hint");
    await page.waitForFunction(() => !document.querySelector("#hint").disabled);
    assert.match(await page.locator("#message").innerText(), /bloku:/);
    console.log(l.id, "keyboard replay, current-state hint and undo PASS");
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:4186/tower.html?test#V1", {
    waitUntil: "networkidle",
  });
  assert.ok(await page.locator("#canvas").isVisible());
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  assert.deepEqual(errors, []);
  console.log(
    "PASS vertical web demo desktop + mobile layout, no browser errors",
  );
} finally {
  await browser.close();
  server.kill();
}

