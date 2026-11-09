import test from "node:test";
import assert from "node:assert/strict";
import {
  shapeLevels as activeShapes,
  retiredTowerLevels,
} from "../src/tower-levels.js";
const shapeLevels = [
  ...activeShapes,
  ...retiredTowerLevels.filter((l) => l.id === "S6"),
];
import {
  initialTower,
  solveTower,
  transitionTower,
} from "../src/tower-engine.js";
test("six authored shape lessons solve, replay, and actually require resizing", () => {
  for (const l of shapeLevels) {
    const r = solveTower(l);
    assert.ok(r.path, l.id);
    assert.ok(r.path.some((a) => a.type === "resize"));
    let s = initialTower(l);
    for (const a of r.path) {
      const before = JSON.stringify(s),
        out = transitionTower(l, s, a);
      assert.ok(out.ok, l.id);
      assert.equal(JSON.stringify(s), before);
      s = out.state;
    }
    assert.ok(s.won, l.id);
    assert.equal(solveTower({ ...l, forms: false }).status, "impossible", l.id);
  }
});
test("S3 requires both the four-cell cover and remote release, not merely walking to goals", () => {
  const l = shapeLevels[2];
  assert.equal(solveTower({ ...l, plates: [] }).status, "impossible");
  assert.equal(solveTower({ ...l, switches: [] }).status, "impossible");
});
test("S5 needs its lift and upper cover; S6 needs both excavation and the descent permit", () => {
  const l = shapeLevels[4];
  assert.equal(solveTower({ ...l, lifts: [] }).status, "impossible");
  assert.equal(solveTower({ ...l, plates: [] }).status, "impossible");
  const q = shapeLevels[5];
  assert.equal(
    solveTower({ ...q, excavatorRequires: { switches: ["never"] } }).status,
    "impossible",
  );
  assert.equal(solveTower({ ...q, switches: [] }).status, "impossible");
});
test("low beam blocks a tall rolling body, expansion failure preserves state", () => {
  const l = shapeLevels[1],
    s = initialTower(l);
  s.actors[0] = [2, 0, 0];
  const before = JSON.stringify(s);
  assert.equal(transitionTower(l, s, { type: "move", dir: "right" }).ok, false);
  assert.equal(JSON.stringify(s), before);
  const small = initialTower(l);
  small.sizes[0] = 1;
  small.actors[0] = [2, 0, 0];
  const constrained = { ...l, walls: [[3, 1, 0]] };
  assert.equal(
    transitionTower(constrained, small, { type: "resize" }).ok,
    false,
  );
  assert.equal(small.sizes[0], 1);
});
test("chapter terrain is not a translated, reflected, or rotated board copy", () => {
  const signatures = shapeLevels.map((l) => {
    const cells = [...l.tiles, ...l.rubble];
    return Array.from({ length: 8 }, (_, k) => {
      let p = cells.map(([x, z, y]) => {
        if (k & 4) x = -x;
        for (let i = 0; i < (k & 3); i++) [x, z] = [-z, x];
        return [x, z, y];
      });
      const x = Math.min(...p.map((p) => p[0])),
        z = Math.min(...p.map((p) => p[1]));
      return p
        .map((p) => [p[0] - x, p[1] - z, p[2]].join(","))
        .sort()
        .join(";");
    }).sort()[0];
  });
  assert.equal(new Set(signatures).size, 6);
});
