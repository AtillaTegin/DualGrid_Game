import test from "node:test";
import assert from "node:assert/strict";
import { floorLevels } from "../src/tower-levels.js";
import {
  initialTower,
  transitionTower,
  solveTower,
  supportedTower,
  towerStateKey,
} from "../src/tower-engine.js";
test("six floor-memory puzzles solve, replay and preserve input states", () => {
  for (const l of floorLevels) {
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
    assert.ok(s.won);
  }
});
test("last visit supports the occupant until it leaves, but rejects a new entry; history stores counters", () => {
  const l = floorLevels[0],
    s = initialTower(l);
  s.actors[0] = [1, 1, 0];
  s.visits[0] = 1;
  const entered = transitionTower(l, s, { type: "move", dir: "right" }).state;
  assert.equal(entered.visits[0], 2);
  assert.equal(supportedTower(l, entered, [2, 1, 0], 0), true);
  const left = transitionTower(l, entered, {
    type: "move",
    dir: "right",
  }).state;
  assert.equal(supportedTower(l, left, [2, 1, 0], 0), false);
  assert.equal(
    transitionTower(l, left, { type: "move", dir: "left" }).ok,
    false,
  );
  assert.equal(s.visits[0], 1);
  assert.notEqual(towerStateKey(left), towerStateKey(s));
  assert.equal(
    solveTower({ ...l, visitTiles: [{ at: [2, 1, 0], limit: 1 }] }).status,
    "impossible",
  );
});
test("a body cannot support its own observed tile, or withdraw support from a passive body", () => {
  const l = floorLevels[2],
    s = initialTower(l);
  s.actors = [
    [2, 0, 0],
    [6, 2, 0],
  ];
  assert.equal(supportedTower(l, s, [2, 0, 0], 0), false);
  s.actors = [
    [2, 0, 0],
    [1, 2, 0],
  ];
  assert.equal(supportedTower(l, s, [2, 0, 0], 0), true);
  const before = JSON.stringify(s);
  assert.equal(
    transitionTower(l, s, { type: "move", actor: 1, dir: "left" }).ok,
    false,
  );
  assert.equal(JSON.stringify(s), before);
});
test("relay floors are unsupported while off, and an occupied route cannot be switched off", () => {
  const l = floorLevels[1],
    s = initialTower(l);
  assert.equal(supportedTower(l, s, [2, 1, 0], 0), false);
  s.switches = ["grid"];
  assert.equal(supportedTower(l, s, [2, 1, 0], 0), true);
  const q = {
      ...l,
      starts: [
        [0, 2, 0],
        [2, 1, 0],
      ],
    },
    t = initialTower(q);
  t.switches = ["grid"];
  assert.equal(transitionTower(q, t, { type: "interact", actor: 0 }).ok, false);
});
test("remote escort needs observation, sensor power and the final stabilization switch", () => {
  const l = floorLevels[4];
  assert.equal(
    solveTower({
      ...l,
      observerFloors: l.observerFloors.map((g) => ({ ...g, radius: 0 })),
    }).status,
    "impossible",
  );
  assert.equal(solveTower({ ...l, plates: [] }).status, "impossible");
  assert.equal(solveTower({ ...l, switches: [] }).status, "impossible");
});
test("expert needs energy transfer, both relay stages and the return portal after exhausting the bridge", () => {
  const l = floorLevels[5];
  assert.equal(solveTower({ ...l, allowTransfer: false }).status, "impossible");
  for (const id of ["mid", "far"])
    assert.equal(
      solveTower({ ...l, plates: l.plates.filter((p) => p.id !== id) }).status,
      "impossible",
    );
  assert.equal(solveTower({ ...l, portals: [] }).status, "impossible");
});
