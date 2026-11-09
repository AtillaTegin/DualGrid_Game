import test from "node:test";
import assert from "node:assert/strict";
import { wallLevels } from "../src/tower-levels.js";
import {
  initialTower,
  solveTower,
  transitionTower,
  towerStateKey,
} from "../src/tower-engine.js";
test("all six wall puzzles solve and replay without mutating earlier snapshots", () => {
  for (const l of wallLevels) {
    const r = solveTower(l);
    assert.ok(r.path, l.id);
    let s = initialTower(l);
    for (const a of r.path) {
      const before = JSON.stringify(s),
        out = transitionTower(l, s, a);
      assert.ok(out.ok, l.id);
      assert.equal(JSON.stringify(s), before);
      s = out.state;
    }
    assert.ok(s.won, l.id);
    assert.ok(
      s.wallPhases.some((p, i) => p !== initialTower(l).wallPhases[i]) ||
        r.path.some((a) => a.type === "wait"),
    );
  }
});
test("manual motor checks its entire swept path and does not teleport through a passive actor", () => {
  const l = wallLevels[0],
    s = initialTower(l);
  s.actors[0] = [1, 1, 0];
  s.actors.push([2, 0, 0]);
  s.sizes.push(1);
  const before = JSON.stringify(s);
  assert.equal(transitionTower(l, s, { type: "panel" }).ok, false);
  assert.equal(JSON.stringify(s), before);
  s.actors[1] = [4, 1, 0];
  assert.ok(transitionTower(l, s, { type: "panel" }).ok);
});
test("a panel cannot jump across a body even when its destination is empty", () => {
  const base = wallLevels[0],
    l = {
      ...base,
      movingWalls: [
        {
          mode: "manual",
          console: [1, 1, 0],
          frames: [[[2, 1, 0]], [[4, 1, 0]]],
        },
      ],
    },
    s = initialTower(l);
  s.actors = [
    [1, 1, 0],
    [3, 1, 0],
  ];
  s.sizes = [1, 1];
  assert.equal(transitionTower(l, s, { type: "panel" }).ok, false);
  assert.equal(s.wallPhases[0], 0);
});
test("clock advances only on accepted commands; rejected piston collision keeps the phase", () => {
  const l = wallLevels[1],
    s = initialTower(l);
  s.actors[0] = [2, 1, 0];
  s.wallPhases[0] = 2;
  const r = transitionTower(l, s, { type: "move", dir: "right" });
  assert.equal(r.ok, false);
  assert.equal(s.wallPhases[0], 2);
  const t = transitionTower(l, s, { type: "wait" });
  assert.ok(t.ok);
  assert.equal(t.state.wallPhases[0], 3);
  assert.notEqual(towerStateKey(t.state), towerStateKey(s));
});
test("partner brake is indispensable, not a decorative switch", () => {
  const l = wallLevels[4];
  assert.equal(
    solveTower({
      ...l,
      movingWalls: l.movingWalls.map((w) => ({ ...w, brake: undefined })),
    }).status,
    "impossible",
  );
  const r = solveTower(l);
  assert.ok(
    r.path.some((a) => a.actor === 0) && r.path.some((a) => a.actor === 1),
  );
});
test("shelter requires shrinking and expert needs both panel consoles and lift", () => {
  const l = wallLevels[3];
  assert.equal(solveTower({ ...l, forms: false }).status, "impossible");
  const q = wallLevels[5];
  for (let i = 0; i < 2; i++) {
    const w = q.movingWalls.map((w, j) =>
      j === i ? { ...w, console: [99, 99, 0] } : w,
    );
    assert.equal(solveTower({ ...q, movingWalls: w }).status, "impossible");
  }
  assert.equal(solveTower({ ...q, lifts: [] }).status, "impossible");
});
