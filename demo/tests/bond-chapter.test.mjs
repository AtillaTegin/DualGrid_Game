import test from "node:test";
import assert from "node:assert/strict";
import { bondLevels } from "../src/tower-levels.js";
import {
  initialTower,
  solveTower,
  transitionTower,
  bodyDims,
  relationHeld,
} from "../src/tower-engine.js";
test("six bond puzzles solve, replay and preserve input snapshots", () => {
  for (const l of bondLevels) {
    let s = initialTower(l);
    const r = solveTower(l);
    assert.ok(r.path, l.id);
    for (const a of r.path) {
      const before = JSON.stringify(s),
        out = transitionTower(l, s, a);
      assert.ok(out.ok, l.id);
      assert.equal(JSON.stringify(s), before);
      s = out.state;
    }
    assert.ok(s.won, l.id);
  }
});
test("finite distance rejects walking and portal jumps without dragging either body", () => {
  const l = bondLevels[1],
    s = initialTower(l);
  s.actors[1] = [1, 3, 0];
  const before = JSON.stringify(s);
  assert.equal(
    transitionTower(l, s, { type: "move", actor: 0, dir: "right" }).ok,
    true,
  );
  s.actors[1] = [2, 3, 0];
  assert.equal(
    transitionTower(l, s, { type: "move", actor: 0, dir: "right" }).ok,
    true,
  );
  const bad = { ...l, portals: [{ at: [0, 0, 0], to: [6, 0, 0] }] };
  assert.equal(transitionTower(bad, s, { type: "portal" }).ok, false);
  assert.deepEqual(s.actors[0], [0, 0, 0]);
});
test("domino rolls change actual footprint and perpendicular condition requires two lying dominos", () => {
  const l = bondLevels[2],
    s = initialTower(l);
  const n = transitionTower(l, s, {
    type: "move",
    actor: 0,
    dir: "right",
  }).state;
  assert.deepEqual(bodyDims(n, 0), [2, 1, 1]);
  assert.equal(relationHeld(l, n, { type: "perpendicular" }), false);
  const t = transitionTower(l, n, {
    type: "move",
    actor: 1,
    dir: "down",
  }).state;
  assert.deepEqual(bodyDims(t, 1), [1, 1, 2]);
  assert.equal(relationHeld(l, t, { type: "perpendicular" }), true);
  assert.deepEqual(bodyDims(s, 0), [1, 2, 1]);
});
test("paired movements are atomic and consume one turn; blocked partner rejects both", () => {
  const l = bondLevels[3],
    s = initialTower(l);
  const linked = transitionTower(l, s, { type: "link" }).state;
  const one = transitionTower(l, linked, { type: "move", dir: "right" }).state;
  assert.deepEqual(one.actors, [
    [1, 0, 0],
    [6, 0, 0],
  ]);
  assert.equal(one.moves, linked.moves + 1);
  const before = JSON.stringify(one);
  assert.equal(
    transitionTower(l, one, { type: "move", dir: "down" }).ok,
    false,
  );
  assert.equal(JSON.stringify(one), before);
  assert.equal(s.linked, false);
});
test("line is interrupted by an opaque panel; paired course needs link and energy course needs transfer", () => {
  const l = bondLevels[0],
    s = initialTower(l);
  s.actors = [
    [2, 1, 0],
    [4, 1, 0],
  ];
  assert.equal(relationHeld(l, s, { type: "line" }), true);
  assert.equal(
    relationHeld({ ...l, walls: [[3, 1, 0]] }, s, { type: "line" }),
    false,
  );
  const p = bondLevels[3];
  assert.equal(solveTower({ ...p, linkStations: [] }).status, "impossible");
  const q = bondLevels[4];
  assert.equal(solveTower({ ...q, allowTransfer: false }).status, "impossible");
});
test("combined level needs portals and panel motor; link stations cannot be invented at arbitrary cells", () => {
  const l = bondLevels[5];
  assert.equal(solveTower({ ...l, portals: [] }).status, "impossible");
  assert.equal(
    solveTower({
      ...l,
      movingWalls: l.movingWalls.map((w) => ({ ...w, console: [99, 99, 0] })),
    }).status,
    "impossible",
  );
  const q = bondLevels[3],
    s = initialTower(q);
  s.actors[0] = [1, 0, 0];
  assert.equal(transitionTower(q, s, { type: "link" }).ok, false);
});
