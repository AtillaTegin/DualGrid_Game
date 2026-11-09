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
const errors = [];
try {
  const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  p.on("pageerror", (e) => errors.push(e.message));
  await p.goto("http://127.0.0.1:4182/?test", { waitUntil: "networkidle" });
  await p.waitForFunction(() => !!window.demoTest);
  await p.evaluate(() => {
    demoTest.scene.quality(false);
    demoTest.scene.renderer.setPixelRatio(0.8);
  });
  await p.click("#start");
  await p.waitForTimeout(200);
  await p.screenshot({ path: "screenshots/07-first-lesson.png" });
  await p.evaluate(() => demoTest.skipLessons());
  await p.keyboard.press("h");
  await p.waitForFunction(() => !!demoTest.currentHint);
  await p.screenshot({ path: "screenshots/08-concrete-hint.png" });
  await p.evaluate(() => demoTest.load(12));
  await p.click("#rules");
  await p.waitForTimeout(200);
  await p.screenshot({ path: "screenshots/09-growth-lesson.png" });
  await p.click("#tutorial-skip");
  await p.keyboard.press("ArrowRight");
  await p.waitForFunction(() => !demoTest.busy);
  await p.screenshot({ path: "screenshots/14-mixed-blocks.png" });
  const heights = await p.evaluate(() =>
    demoTest.scene.blocks.map((g) => {
      g.children[0].geometry.computeBoundingBox();
      const b = g.children[0].geometry.boundingBox;
      return Math.round((b.max.y - b.min.y) * 100) / 100;
    }),
  );
  if (heights[0] !== 1.98 || heights[1] !== 0.98)
    throw Error("Wrong physical render dimensions " + heights);
  if (errors.length) throw Error(errors.join("\n"));
  console.log("Visual learning checks passed: cube .98m, long block 1.98m.");
} finally {
  await browser.close();
  server.kill();
}
