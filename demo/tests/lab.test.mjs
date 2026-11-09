import test from "node:test";
import assert from "node:assert/strict";
import { experiments, byId, archivedExperiments } from "../src/lab-data.js";
import { certificates } from "../src/lab-solutions.js";
import {
  initial,
  step,
  rollBody,
  worldDirection,
  stateKey,
  gateOpen,
} from "../src/lab-engine.js";
const move = (dir, block = 0) => ({ type: "move", dir, block });
test("all active parent mods and subtypes have an independent winning playable certificate", () => {
  assert.equal(experiments.length, 43);
  assert.equal(experiments.filter((l) => !l.id.includes(".")).length, 9);
  for (const l of experiments) {
    assert.ok(certificates[l.id]?.length, l.id + " missing certificate");
    let s = initial(l);
    for (const a of certificates[l.id]) {
      const before = structuredClone(s),
        r = step(l, s, a);
      assert.deepEqual(s, before, "input mutated");
      assert.ok(r.ok, l.id + ": " + r.reason);
      s = r.state;
    }
    assert.equal(s.dead, false, l.id);
    assert.equal(s.won, true, l.id);
    for (const p of l.required || [])
      assert.ok(s.proof.includes(p), l.id + " missing " + p);
  }
});
test("a cuboid rolls around a floor edge; four rolls restore its labelled physical faces", () => {
  let b = initial({ ...byId.M3, shapes: [[2, 3, 1]] }).blocks[0],
    original = structuredClone(b);
  for (let i = 0; i < 4; i++) b = rollBody(b, "right");
  assert.deepEqual(b.dims, original.dims);
  assert.deepEqual(b.faces, original.faces);
  assert.equal(b.x, original.x + 10);
});
test("illusions reveal through death and survive a laboratory restart", () => {
  const l = archivedExperiments.find((l) => l.id === "M1");
  let s = step(l, initial(l), move("right")).state;
  assert.equal(s.dead, true);
  assert.deepEqual(s.revealed, ["2,1"]);
  s = step(l, s, { type: "restart" }).state;
  assert.equal(s.dead, false);
  assert.ok(s.proof.includes("discover"));
});
test("control transform happens once and latch survives leaving its stripe", () => {
  const l = archivedExperiments.find((l) => l.id === "M2.3");
  let s = step(l, initial(l), move("right")).state;
  assert.equal(worldDirection(l, s, 0, "left"), "right");
  s = step(l, s, move("left")).state;
  assert.equal(s.blocks[0].x, 3);
  assert.equal(s.polarity[0], true);
});
test("failed expansion and blocked seam are transactional", () => {
  let l = byId["M3.6"],
    s = initial(l),
    key = stateKey(l, s);
  assert.equal(step(l, s, { type: "resize", anchor: 0 }).ok, false);
  assert.equal(stateKey(l, s), key);
  l = byId["N3.1"];
  s = initial(l);
  assert.equal(step(l, s, { type: "portal", block: 0 }).ok, false);
  assert.equal(s.moves, 0);
});
test("real-time clone consumes four half-second ticks, not four player moves", () => {
  const l = archivedExperiments.find((l) => l.id === "M4");
  let s = step(l, initial(l), move("right")).state;
  assert.equal(s.clone.x, 5);
  for (let i = 0; i < 3; i++) s = step(l, s, { type: "wait" }).state;
  assert.equal(s.clone.x, 5);
  s = step(l, s, { type: "wait" }).state;
  assert.equal(s.clone.x, 4);
});
test("storage, transfers and battery preserve total tokens", () => {
  for (const id of ["N2", "N2.2", "N2.3", "N2.4"]) {
    const l = byId[id];
    let s = initial(l);
    const total = (s) =>
        s.blocks.reduce((n, b) => n + b.energy, 0) +
        s.storage +
        (l.energyMode === "battery" ? s.slots.reduce((n, v) => n + v, 0) : 0),
      start = total(s);
    for (const a of certificates[id]) {
      s = step(l, s, a).state;
      assert.equal(total(s), start, id);
    }
  }
});
test("relation gate really closes when alignment is broken", () => {
  const l = byId["N4.1"];
  let s = initial(l);
  assert.equal(gateOpen(l, s, "a"), false);
  s = step(l, s, move("up")).state;
  assert.equal(gateOpen(l, s, "a"), true);
});
test("linked opposite intentions reject a blocked partner without moving either body", () => {
  const l = byId["N4.4"];
  let s = step(l, initial(l), { type: "link" }).state;
  const key = stateKey(l, s);
  assert.equal(step(l, s, move("right")).ok, false);
  assert.equal(stateKey(l, s), key);
});
