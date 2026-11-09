import test from "node:test";
import assert from "node:assert/strict";
import { towerLevels, bridgeLevels } from "../src/tower-levels.js";
import {
  campaignCourse,
  campaignTotal,
  nextCampaignLevel,
  towerOrdinal,
} from "../src/campaign-catalog.js";
import {
  initialTower,
  transitionTower,
  solveTower,
  towerStateKey,
} from "../src/tower-engine.js";
import { learningStages } from "../src/curriculum.js";
const certificates = new Map();
test("21 authored learning bridges have replayable shortest solutions and immutable undo snapshots", () => {
  assert.equal(bridgeLevels.length, 21);
  for (const l of bridgeLevels) {
    const r = solveTower(l);
    assert.ok(r.path, l.id + " " + r.status);
    certificates.set(l.id, r.path);
    let s = initialTower(l);
    for (const a of r.path) {
      const before = JSON.stringify(s),
        out = transitionTower(l, s, a);
      assert.ok(out.ok, l.id);
      assert.equal(JSON.stringify(s), before);
      s = out.state;
    }
    assert.ok(s.won, l.id);
    assert.ok(r.path.length >= 4, l.id);
  }
});
test("all 98 stages appear once in a course that begins gently and defers experts", () => {
  assert.equal(campaignTotal, 98);
  assert.equal(campaignCourse.length, 98);
  assert.equal(new Set(campaignCourse.map((e) => e.kind + e.id)).size, 98);
  assert.deepEqual(
    campaignCourse.slice(0, 5).map((e) => e.id),
    ["1", "2", "3", "4", "5"],
  );
  assert.equal(nextCampaignLevel("legacy", 5).id, "V0");
  assert.equal(nextCampaignLevel("tower", "missing"), null);
  assert.equal(nextCampaignLevel("combination", 73), null);
  let expert = false;
  for (const l of towerLevels) {
    assert.equal(l.difficulty, learningStages[l.learning.stage]);
    for (const id of l.learning.requires)
      assert.ok(
        towerOrdinal(id) > 0 && towerOrdinal(id) < towerOrdinal(l.id),
        l.id + " prerequisite " + id,
      );
    if (l.learning.optional) expert = true;
    else assert.equal(expert, false, l.id + " after expert");
  }
});
test("chests require a key and orthogonal same-floor contact; opened chests remain solid", () => {
  const l = bridgeLevels.find((l) => l.id === "TC1"),
    c = l.chests[0],
    s = initialTower(l);
  s.actors[0] = [c.at[0] - 1, c.at[1], c.at[2]];
  assert.equal(transitionTower(l, s, { type: "interact" }).ok, false);
  s.keys = ["brass"];
  const snapshot = JSON.stringify(s),
    r = transitionTower(l, s, { type: "interact" });
  assert.ok(r.ok);
  assert.equal(JSON.stringify(s), snapshot);
  assert.deepEqual(r.state.opened, [c.id]);
  assert.ok(r.state.keys.includes("gate"));
  assert.notEqual(towerStateKey(s), towerStateKey(r.state));
  assert.equal(
    transitionTower(l, r.state, { type: "move", dir: "right" }).ok,
    false,
  );
  assert.equal(transitionTower(l, r.state, { type: "interact" }).ok, false);
  for (const pos of [
    [c.at[0] - 1, c.at[1] - 1, c.at[2]],
    [c.at[0] - 1, c.at[1], c.at[2] + 1],
  ]) {
    const n = structuredClone(s);
    n.actors[0] = pos;
    assert.equal(transitionTower(l, n, { type: "interact" }).ok, false);
  }
});
test("all three chest puzzles physically need every chest reward and portal; upper course needs its lift", () => {
  for (const l of bridgeLevels.filter((l) => l.chests?.length)) {
    for (const c of l.chests)
      assert.equal(
        solveTower({
          ...l,
          chests: l.chests.map((x) =>
            x === c ? { ...x, reward: "wrong-key" } : x,
          ),
        }).status,
        "impossible",
        l.id + " " + c.id,
      );
    assert.equal(solveTower({ ...l, portals: [] }).status, "impossible", l.id);
  }
  const l = bridgeLevels.find((l) => l.id === "TC2");
  assert.equal(solveTower({ ...l, lifts: [] }).status, "impossible");
});
