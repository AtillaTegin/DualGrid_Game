import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  journeyLevels,
  journeyById,
  removedMods,
} from "../src/journey-data.js";
import { experiments, byId, archivedExperiments } from "../src/lab-data.js";
import { levels } from "../src/levels.js";
import {
  retainedLegacyIds,
  activeCampaignIds,
  canonicalLegacyId,
} from "../src/campaign-hardening.js";
import { certificates } from "../src/journey-solutions.js";
import {
  initial,
  step,
  solve,
  doorOpen,
  stateKey,
  rollCollision,
} from "../src/lab-engine.js";
const move = (dir, block = 0) => ({ type: "move", dir, block });
// Starts, goals, loot, titles and orientation are deliberately excluded: changing
// those must not make an old board count as a new layout.
function terrain(l) {
  const ps = [];
  for (let z = 0; z < l.map.length; z++)
    for (let x = 0; x < l.map[z].length; x++) {
      if (l.map[z][x] === " ") continue;
      let type = l.specials?.[`${x},${z}`]?.type || "floor";
      for (const [field, tag] of [
        ["walls", "wall"],
        ["fragile", "fragile"],
        ["shell", "shell"],
        ["observer", "observer"],
        ["visitable", "visitable"],
        ["light", "light"],
      ])
        if (l[field]?.some((p) => p[0] === x && p[1] === z)) type += ":" + tag;
      if (l.gates?.some((g) => g.tiles.some((p) => p[0] === x && p[1] === z)))
        type += ":gate";
      if (l.ceilings?.some((p) => p.x === x && p.z === z)) type += ":ceiling";
      ps.push([x, z, type]);
    }
  return Array.from({ length: 8 }, (_, k) => {
    let a = ps.map(([x, z, t]) => {
      if (k & 4) x = -x;
      for (let i = 0; i < (k & 3); i++) [x, z] = [-z, x];
      return [x, z, t];
    });
    const x0 = Math.min(...a.map((p) => p[0])),
      z0 = Math.min(...a.map((p) => p[1]));
    return a
      .map(([x, z, t]) => [x - x0, z - z0, t])
      .sort((a, b) => a[0] - b[0] || a[1] - b[1])
      .map((p) => p.join(":"))
      .join("|");
  }).sort()[0];
}
test("active campaign has no reflected, rotated, translated, or start-only copies", () => {
  const all = [
      ...levels.filter((l) => retainedLegacyIds.includes(l.id) && l.id > 5),
      ...journeyLevels,
    ],
    seen = new Map();
  for (const l of all) {
    const k = terrain(l);
    assert.ok(!seen.has(k), `${l.id} duplicates ${seen.get(k)}`);
    seen.set(k, l.id);
  }
  assert.equal(activeCampaignIds.length, 28);
  assert.equal(journeyLevels.length, 9);
  assert.equal(
    new Set(journeyLevels.map((l) => [...l.mechanics].sort().join("|"))).size,
    9,
  );
  assert.ok(
    journeyLevels.filter((l) => l.collectibles?.length).length <
      journeyLevels.length / 2,
  );
});
test("no playable enemy clone or echo remains in campaign or laboratory", () => {
  for (const l of [...journeyLevels, ...experiments]) {
    assert.ok(!l.echo, l.id);
    assert.equal(initial(l).clone, null, l.id);
  }
  for (const id of ["M4", "M4.1", "M4.2", "M4.3", "M4.4", "M4.5"])
    assert.equal(byId[id], undefined);
  assert.equal(experiments.length, 43);
});
test("nine authored combinations have valid shortest certificates, not generic proof checklists", () => {
  for (const l of journeyLevels) {
    assert.ok(l.mechanics.length >= 3);
    assert.ok(!l.required?.length);
    const r = solve(l, undefined, 120000);
    assert.ok(r.path, l.id);
    assert.equal(r.path.length, certificates[l.id].length);
    assert.ok(r.path.length >= 15 && r.path.length <= 40);
    let s = initial(l);
    for (const a of certificates[l.id]) {
      const before = structuredClone(s),
        r = step(l, s, a);
      assert.ok(r.ok, l.id + ": " + r.reason);
      assert.deepEqual(s, before);
      assert.ok(!r.state.dead, l.id);
      s = r.state;
    }
    assert.ok(s.won, l.id);
  }
});
test("retired legacy aliases resolve to one retained puzzle, not hidden copies", () => {
  assert.equal(canonicalLegacyId(24), 23);
  assert.equal(canonicalLegacyId(31), 29);
  assert.equal(canonicalLegacyId(60), 57);
  assert.equal(canonicalLegacyId(6), 23);
  assert.equal(canonicalLegacyId(1), 1);
});
test("65 still cannot bypass the mandatory bridge or return shutter", () => {
  const l = journeyById["65"],
    s = initial(l);
  assert.equal(step(l, s, move("left")).ok, false);
  assert.equal(step(l, s, move("down")).ok, false);
  const r = solve({ ...l, walls: [[4, 1]] });
  assert.equal(r.path, null);
  assert.equal(r.limited, false);
  assert.ok(solve(l).path.length > solve({ ...l, fragile: [] }).path.length);
});
test("67 requires resizing rather than rolling the tall body through a beam", () => {
  const l = journeyById["67"];
  assert.equal(solve({ ...l, forms: undefined }, undefined, 20000).path, null);
  const beam = {
    map: ["......", "......", "......"],
    starts: [[1, 1]],
    shapes: [[1, 2, 1]],
    forms: [
      [1, 1, 1],
      [1, 2, 1],
    ],
    physicalRoll: true,
    goals: [{ x: 4, z: 1 }],
    ceilings: [{ x: 2, z: 1, h: 1.5 }],
  };
  let s = initial(beam);
  assert.equal(rollCollision(beam, s, 0, "right"), true);
  s = step(beam, s, { type: "resize" }).state;
  assert.equal(rollCollision(beam, s, 0, "right"), false);
});
test("68 requires the light actor and the one-use outward bridge", () => {
  const l = journeyById["68"];
  let s = initial(l);
  s.blocks[0].x = 0;
  s.blocks[0].z = 1;
  assert.equal(step(l, s, move("up")).ok, false);
  s = initial(l);
  s.blocks[1].x = 0;
  s.blocks[1].z = 1;
  assert.equal(step(l, s, move("up", 1)).state.collected, 1);
  assert.equal(
    solve(
      {
        ...l,
        walls: [
          [4, 5],
          [5, 5],
        ],
      },
      undefined,
      20000,
    ).path,
    null,
  );
});
test("69 switches two gates both ways and cannot close on a passive actor", () => {
  const l = journeyById["69"];
  let s = initial(l);
  Object.assign(s.blocks[0], { x: 6, z: 3 });
  Object.assign(s.blocks[1], { x: 4, z: 1 });
  const key = stateKey(l, s);
  assert.equal(step(l, s, { type: "interact" }).ok, false);
  assert.equal(stateKey(l, s), key);
  s.blocks[1].x = 5;
  s = step(l, s, { type: "interact" }).state;
  assert.equal(s.levers, 1);
  assert.equal(doorOpen(l, s, l.doors[0]), false);
  assert.equal(doorOpen(l, s, l.doors[1]), true);
  s = step(l, s, { type: "interact" }).state;
  assert.equal(s.levers, 0);
  assert.equal(doorOpen(l, s, l.doors[0]), true);
});
test("72 cannot evade the required growth corner by using a shrink-only station", () => {
  const l = journeyById["72"];
  assert.equal(
    solve({ ...l, chooseAnchor: false }, undefined, 20000).path,
    null,
  );
  let s = initial(l);
  s.blocks[0].x = 1;
  s.blocks[0].z = 1;
  assert.equal(step(l, s, { type: "resize", anchor: 0 }).ok, false);
});
test("73 loses unsupported ground when one controlled partner gets too far away", () => {
  const l = journeyById["73"];
  let s = step(l, initial(l), move("down")).state;
  s = step(l, s, move("right")).state;
  assert.equal(s.dead, true);
});
test("unreviewed M5 and N-family reference data retain their original definitions", () => {
  const saved = JSON.parse(
    fs.readFileSync(new URL("untouched-mods.json", import.meta.url)),
  );
  for (const l of saved.filter((l) => !l.id.startsWith("M4")))
    assert.deepEqual(
      archivedExperiments.find((c) => c.id === l.id),
      l,
      l.id,
    );
});
