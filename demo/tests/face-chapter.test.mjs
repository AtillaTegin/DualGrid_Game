import test from "node:test";
import assert from "node:assert/strict";
import { faceLevels } from "../src/tower-levels.js";
import {
  initialTower,
  solveTower,
  transitionTower,
  towerStateKey,
} from "../src/tower-engine.js";
test("six face puzzles replay and their certificates actually use orientation", () => {
  for (const l of faceLevels) {
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
    assert.equal(
      solveTower({ ...l, faceMode: false }).status,
      "impossible",
      l.id,
    );
  }
});
test("face rotation is reversible; lift, resizing and portal preserve physical labels", () => {
  const l = faceLevels[0],
    s = initialTower(l);
  const n = transitionTower(l, s, { type: "move", dir: "right" }).state;
  assert.notEqual(towerStateKey(n), towerStateKey(s));
  const back = transitionTower(l, n, { type: "move", dir: "left" }).state;
  assert.deepEqual(back.faces, s.faces);
  const t = faceLevels[4],
    path = solveTower(t).path;
  let state = initialTower(t);
  for (const a of path) {
    const out = transitionTower(t, state, a).state;
    if (a.type !== "move") assert.deepEqual(out.faces, state.faces);
    state = out;
  }
  const p = faceLevels[5];
  state = initialTower(p);
  for (const a of solveTower(p).path) {
    const out = transitionTower(p, state, a).state;
    if (a.type === "portal") assert.deepEqual(out.faces, state.faces);
    state = out;
  }
});
test("wrong face scan resets route; failed hazard move leaves old orientation intact", () => {
  const l = faceLevels[3],
    s = initialTower(l);
  s.actors[0] = [2, 4, 0];
  s.faceSequence = 1;
  const out = transitionTower(l, s, { type: "interact" });
  assert.ok(out.ok);
  assert.equal(out.state.faceSequence, 0);
  assert.equal(s.faceSequence, 1);
  const h = faceLevels[2],
    v = initialTower(h);
  v.actors[0] = [2, 1, 0];
  const before = JSON.stringify(v);
  assert.equal(transitionTower(h, v, { type: "move", dir: "right" }).ok, false);
  assert.equal(JSON.stringify(v), before);
});
test("face lift and expert portal are necessary, not optional scenery", () => {
  for (const l of faceLevels.slice(4))
    assert.equal(solveTower({ ...l, lifts: [] }).status, "impossible");
  const l = faceLevels[5];
  assert.equal(solveTower({ ...l, portals: [] }).status, "impossible");
});
