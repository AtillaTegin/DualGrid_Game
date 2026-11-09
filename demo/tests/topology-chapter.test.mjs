import test from "node:test";
import assert from "node:assert/strict";
import { topologyLevels } from "../src/tower-levels.js";
import {
  initialTower,
  transitionTower,
  solveTower,
  bodyDims,
  yawFaces,
  resolvePortal,
} from "../src/tower-engine.js";
test("six topology puzzles replay using real transitions, preserving snapshots and total energy", () => {
  for (const l of topologyLevels) {
    let s = initialTower(l);
    const total = s.energy.reduce((a, b) => a + b, 0);
    const r = solveTower(l);
    assert.ok(r.path, l.id);
    for (const a of r.path) {
      const before = JSON.stringify(s),
        out = transitionTower(l, s, a);
      assert.ok(out.ok, l.id);
      assert.equal(JSON.stringify(s), before);
      s = out.state;
      assert.equal(
        [...s.energy, ...s.deposits].reduce((a, b) => a + b, 0),
        total,
      );
    }
    assert.ok(s.won, l.id);
  }
});
test("occupied paired exit rejects the entire transfer; one command never ping-pongs", () => {
  const l = topologyLevels[0],
    s = initialTower(l);
  assert.equal(transitionTower(l, s, { type: "portal", actor: 0 }).ok, false);
  s.actors[1] = [5, 1, 0];
  const r = transitionTower(l, s, { type: "portal", actor: 0 });
  assert.ok(r.ok);
  assert.deepEqual(r.state.actors[0], [5, 0, 0]);
  assert.deepEqual(s.actors[0], [0, 0, 0]);
});
test("yaw rotates footprint and every side label consistently, four quarter turns are identity", () => {
  const l = topologyLevels[1],
    s = initialTower(l);
  const r = transitionTower(l, s, { type: "portal" });
  assert.ok(r.ok);
  assert.deepEqual(bodyDims(r.state, 0), [1, 1, 2]);
  const withFaces = { ...l, faceMode: true },
    start = initialTower(withFaces),
    turned = transitionTower(withFaces, start, { type: "portal" });
  assert.deepEqual(turned.state.faces[0], yawFaces(start.faces[0], 1));
  assert.equal(
    solveTower({ ...l, portals: l.portals.map((p) => ({ ...p, rotate: 0 })) })
      .status,
    "impossible",
  );
  const f = { u: 0, v: 1, r: 2, l: 3, f: 4, b: 5 },
    q = yawFaces(f, 1);
  assert.equal(q.f, 2);
  assert.equal(q.r, 5);
  assert.equal(q.v, 1);
  assert.deepEqual(yawFaces(f, 4), f);
  assert.deepEqual(yawFaces(q, 3), f);
});
test("wrapped movement is a single cube step and cannot carry a big footprint", () => {
  const l = topologyLevels[2],
    s = initialTower(l);
  s.actors[0] = [0, 1, 0];
  const r = transitionTower(l, s, { type: "move", dir: "left" });
  assert.ok(r.ok);
  assert.deepEqual(r.state.actors[0], [7, 1, 0]);
  s.sizes[0] = 2;
  assert.equal(transitionTower(l, s, { type: "move", dir: "left" }).ok, false);
  assert.equal(solveTower({ ...l, seams: [] }).status, "impossible");
});
test("selector resolves from the old sensor snapshot and cannot fabricate a route", () => {
  const l = topologyLevels[3],
    s = initialTower(l),
    p = l.portals[0];
  assert.equal(resolvePortal(l, s, p), null);
  s.actors[1] = [2, 0, 0];
  assert.deepEqual(resolvePortal(l, s, p).to, [5, 0, 0]);
  const r = transitionTower(l, s, { type: "portal", actor: 0 });
  assert.ok(r.ok);
  assert.deepEqual(r.state.actors[0], [5, 0, 0]);
  s.actors[1] = [2, 2, 0];
  assert.deepEqual(resolvePortal(l, s, p).to, [5, 5, 0]);
  assert.deepEqual(r.state.actors[0], [5, 0, 0]);
  assert.equal(solveTower({ ...l, plates: [] }).status, "impossible");
  const self = {
      ...l,
      starts: [[0, 0, 0]],
      plates: [{ id: "self", at: [0, 0, 0], actor: 0 }],
      portals: [
        {
          at: [0, 0, 0],
          branches: [{ to: [5, 0, 0], requires: { plates: ["self"] } }],
        },
      ],
    },
    before = initialTower(self);
  assert.deepEqual(
    transitionTower(self, before, { type: "portal" }).state.actors[0],
    [5, 0, 0],
  );
});
test("mixed seam puzzle needs shrinking; final routing puzzle needs both rotation and actor energy transfer", () => {
  const l = topologyLevels[4];
  assert.equal(solveTower({ ...l, forms: false }).status, "impossible");
  const q = topologyLevels[5];
  assert.equal(solveTower({ ...q, allowTransfer: false }).status, "impossible");
  assert.equal(
    solveTower({
      ...q,
      portals: q.portals.map((p) => ({
        ...p,
        rotate: 0,
        branches: p.branches?.map((b) => ({ ...b, rotate: 0 })),
      })),
    }).status,
    "impossible",
  );
});
