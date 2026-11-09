import test from "node:test";
import assert from "node:assert/strict";
import { controlLevels } from "../src/tower-levels.js";
import {
  initialTower,
  transitionTower,
  solveTower,
  towerWorldDirection,
  towerStateKey,
} from "../src/tower-engine.js";
import { turnFaces } from "../src/lab-engine.js";
test("six different control puzzles solve with actual input commands", () => {
  for (const l of controlLevels) {
    let s = initialTower(l);
    const r = solveTower(l);
    assert.ok(r.path, l.id);
    for (const a of r.path) {
      const before = JSON.stringify(s),
        world =
          a.type === "move" ? towerWorldDirection(l, s, a.actor, a.dir) : null,
        out = transitionTower(l, s, a);
      assert.ok(out.ok, l.id);
      assert.equal(JSON.stringify(s), before);
      if (world && s.faces)
        assert.deepEqual(
          out.state.faces[a.actor],
          turnFaces(s.faces[a.actor], world),
        );
      s = out.state;
    }
    assert.ok(s.won, l.id);
  }
});
test("inverse and quarter-turn mappings apply exactly once; UI-only commands remain separate", () => {
  const l = controlLevels[0],
    s = initialTower(l);
  s.actors[0] = [1, 0, 0];
  assert.equal(towerWorldDirection(l, s, 0, "right"), "left");
  const t = controlLevels[1],
    v = initialTower(t);
  v.actors[0] = [2, 2, 0];
  assert.equal(towerWorldDirection(t, v, 0, "up"), "right");
  assert.equal(towerWorldDirection(t, v, 0, "right"), "down");
});
test("polarity flips only on complete new entry, persists outside and is part of the search state", () => {
  const l = controlLevels[2],
    s = initialTower(l);
  s.actors[0] = [0, 0, 0];
  const n = transitionTower(l, s, { type: "move", dir: "right" }).state;
  assert.equal(n.polarity[0], true);
  const out = transitionTower(l, n, { type: "move", dir: "right" }).state;
  assert.deepEqual(out.actors[0], [0, 0, 0]);
  assert.equal(out.polarity[0], true);
  assert.equal(s.polarity[0], false);
  const same = structuredClone(s);
  same.polarity[0] = true;
  assert.notEqual(towerStateKey(same), towerStateKey(s));
});
test("split relay transforms are actor-specific, and both relay stages matter", () => {
  const l = controlLevels[3],
    s = initialTower(l);
  s.actors[0] = [2, 1, 0];
  assert.equal(towerWorldDirection(l, s, 0, "right"), "left");
  assert.equal(towerWorldDirection(l, s, 0, "up"), "up");
  assert.equal(towerWorldDirection(l, s, 1, "down"), "up");
  for (const id of ["west", "east"])
    assert.equal(
      solveTower({ ...l, plates: l.plates.filter((t) => t.id !== id) }).status,
      "impossible",
    );
});
test("stored-polarity combinations need their state-changing zones, lifts and portal", () => {
  for (const l of [controlLevels[2], controlLevels[4], controlLevels[5]])
    assert.equal(
      solveTower({ ...l, control: { kind: "polarity", zone: [] } }).status,
      "impossible",
      l.id,
    );
  for (const l of controlLevels.slice(4))
    assert.equal(solveTower({ ...l, lifts: [] }).status, "impossible", l.id);
  const l = controlLevels[5];
  assert.equal(solveTower({ ...l, portals: [] }).status, "impossible");
});
