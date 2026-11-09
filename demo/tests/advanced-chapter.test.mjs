import test from "node:test";
import assert from "node:assert/strict";
import { towerLevels, advancedLevels } from "../src/tower-levels.js";
import {
  solveTower,
  transitionTower,
  initialTower,
} from "../src/tower-engine.js";
test("six different new puzzles replay; energy is conserved at every accepted command", () => {
  for (const l of advancedLevels) {
    const r = solveTower(l);
    assert.ok(r.path, l.id);
    let s = initialTower(l),
      total = [...s.energy, ...s.deposits].reduce((a, b) => a + b, 0);
    for (const a of r.path) {
      const before = JSON.stringify(s),
        r = transitionTower(l, s, a);
      assert.ok(r.ok, l.id);
      assert.equal(JSON.stringify(s), before);
      s = r.state;
      assert.equal(
        [...s.energy, ...s.deposits].reduce((a, b) => a + b, 0),
        total,
      );
    }
    assert.ok(s.won, l.id);
  }
});
test("removed excavation stages are absent; all active boards differ under rigid transforms", () => {
  assert.equal(towerLevels.length, 70);
  assert.ok(towerLevels.every((l) => !l.rubble.length));
  const signs = towerLevels.map(
    (l) =>
      Array.from({ length: 8 }, (_, k) => {
        const ps = [
          ...l.tiles,
          ...l.lifts.flatMap((t) => t.stops.map((y) => [...t.at, y])),
        ].map(([x, z, y]) => {
          if (k & 4) x = -x;
          for (let i = 0; i < (k & 3); i++) [x, z] = [-z, x];
          return [x, z, y];
        });
        const x = Math.min(...ps.map((p) => p[0])),
          z = Math.min(...ps.map((p) => p[1]));
        return [...new Set(ps.map((p) => [p[0] - x, p[1] - z, p[2]].join(",")))]
          .sort()
          .join("|");
      }).sort()[0],
  );
  assert.equal(new Set(signs).size, 70);
});
test("H2 needs the newly opened side passage, H4 needs actual actor transfer", () => {
  const l = advancedLevels[1];
  assert.equal(
    solveTower({ ...l, tiles: l.tiles.filter((p) => p.join() !== "4,2,0") })
      .status,
    "impossible",
  );
  const q = advancedLevels[3];
  assert.equal(solveTower({ ...q, allowTransfer: false }).status, "impossible");
});
test("portal rejects occupied or unsupported destinations without consuming a move", () => {
  const l = advancedLevels[4],
    s = initialTower(l);
  s.actors[0] = [2, 0, 0];
  const bad = { ...l, portals: [{ at: [2, 0, 0], to: [99, 99, 0] }] };
  const before = JSON.stringify(s);
  assert.equal(transitionTower(bad, s, { type: "portal" }).ok, false);
  assert.equal(JSON.stringify(s), before);
  const two = {
      ...l,
      starts: [
        [2, 0, 0],
        [6, 0, 0],
      ],
    },
    t = initialTower(two);
  assert.equal(transitionTower(two, t, { type: "portal" }).ok, false);
});
test("fragile support disappears only after leaving; undo snapshots retain intact terrain", () => {
  const l = advancedLevels[0],
    s = initialTower(l);
  s.actors[0] = [3, 2, 0];
  s.keys = ["left"];
  const r = transitionTower(l, s, { type: "move", dir: "right" });
  assert.ok(r.ok);
  assert.deepEqual(r.state.broken, [0]);
  assert.deepEqual(s.broken, []);
  assert.equal(
    transitionTower(l, r.state, { type: "move", dir: "left" }).ok,
    false,
  );
});
test("expert needs both lift access and actual energy transfer", () => {
  const l = advancedLevels[5];
  assert.equal(solveTower({ ...l, lifts: [] }).status, "impossible");
  assert.equal(solveTower({ ...l, allowTransfer: false }).status, "impossible");
});
