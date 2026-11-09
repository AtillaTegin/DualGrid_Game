import test from "node:test";
import assert from "node:assert/strict";
import {
  towerLevels as activeLevels,
  retiredTowerLevels,
} from "../src/tower-levels.js";
const towerLevels = [...activeLevels, ...retiredTowerLevels]
  .filter((l) => ["V1","V2","V3"].includes(l.id))
  .sort((a, b) => a.id.localeCompare(b.id));
import {
  initialTower,
  transitionTower,
  solveTower,
  towerStateKey,
} from "../src/tower-engine.js";
test("three vertical puzzles solve and replay without mutating their inputs", () => {
  for (const l of towerLevels.filter((l) => ["V1","V2","V3"].includes(l.id))) {
    let s = initialTower(l);
    const r = solveTower(l);
    assert.ok(r.path, l.id);
    assert.ok(r.path.length >= 14);
    for (const a of r.path) {
      const before = JSON.stringify(s),
        out = transitionTower(l, s, a);
      assert.equal(JSON.stringify(s), before);
      assert.ok(out.ok);
      s = out.state;
    }
    assert.ok(s.won);
  }
});
test("every vertical puzzle needs its lifts; excavation cannot be skipped", () => {
  for (const l of towerLevels.filter((l) => ["V1","V2","V3"].includes(l.id)))
    assert.equal(solveTower({ ...l, lifts: [] }).status, "impossible");
  const l = towerLevels[2];
  assert.equal(
    solveTower({ ...l, excavatorRequires: { switches: ["never"] } }).status,
    "impossible",
  );
});
test("V2 cannot bypass either relay and V1 cannot skip upper key or lever", () => {
  const l = towerLevels[1];
  for (const id of ["lower", "upper"])
    assert.equal(
      solveTower({ ...l, plates: l.plates.filter((p) => p.id !== id) }).status,
      "impossible",
    );
  const a = towerLevels[0];
  assert.equal(solveTower({ ...a, keys: [] }).status, "impossible");
  assert.equal(solveTower({ ...a, switches: [] }).status, "impossible");
});
test("call lift only from matching landing; full lift state participates in undo and search", () => {
  const l = towerLevels[0],
    s = initialTower(l);
  assert.equal(transitionTower(l, s, { type: "interact" }).ok, false);
  const n = structuredClone(s);
  n.lifts[0] = 1;
  assert.notEqual(towerStateKey(n), towerStateKey(s));
  n.actors[0] = [2, 2, 0];
  const called = transitionTower(l, n, { type: "interact" });
  assert.ok(called.ok);
  assert.deepEqual(called.state.actors[0], [2, 2, 0]);
  assert.equal(called.state.lifts[0], 0);
  assert.equal(n.lifts[0], 1);
});
test("excavation requires power; digging opens only the specified adjacent same-height cell", () => {
  const l = towerLevels[2],
    s = initialTower(l);
  s.actors[0] = [2, 1, 1];
  assert.equal(transitionTower(l, s, { type: "dig", dir: "right" }).ok, false);
  assert.equal(transitionTower(l, s, { type: "move", dir: "right" }).ok, false);
  s.switches = ["power"];
  const r = transitionTower(l, s, { type: "dig", dir: "right" });
  assert.ok(r.ok);
  assert.deepEqual(r.state.dug, [0]);
  assert.deepEqual(s.dug, []);
  assert.equal(
    transitionTower(l, r.state, { type: "dig", dir: "right" }).ok,
    false,
  );
  assert.ok(transitionTower(l, r.state, { type: "move", dir: "right" }).ok);
});
