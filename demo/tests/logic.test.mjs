import { test } from "node:test";
import assert from "node:assert/strict";
import { levels as campaign } from "../src/levels.js";
import { legacyLevels as levels } from "../src/legacy-levels.js";
import {
  roll,
  cells,
  initial,
  step,
  solve,
  canExchange,
  groups,
  key,
  stateKey,
  actions,
  win,
} from "../src/logic.js";
test("rolling returns to upright after a three-cell displacement", () => {
  const b = { x: 2, z: 2, o: "U", heavy: true };
  const n = roll(roll(b, "right"), "right");
  assert.deepEqual(n, { ...b, x: 5 });
  assert.deepEqual(roll(roll(b, "up"), "up"), { ...b, z: -1 });
});
test("four moves around the block preserve the correct occupied footprint", () => {
  const b = { x: 2, z: 2, o: "X", heavy: true };
  assert.deepEqual(cells(roll(b, "down")), [
    [2, 3],
    [3, 3],
  ]);
  assert.deepEqual(roll(roll(b, "right"), "left"), b);
});
test("a blocked command never mutates original state or move count", () => {
  const l = levels[0],
    s = initial(l);
  s.blocks[1] = { ...s.blocks[1], x: 2, z: 2 };
  const before = structuredClone(s),
    r = step(l, s, { block: 0, dir: "right" });
  assert.equal(r.ok, false);
  assert.equal(r.reason, "blocked");
  assert.deepEqual(s, before);
});
test("unsupported move loses, allowing application history to restore it", () => {
  const s = initial(levels[0]);
  const r = step(levels[0], s, { block: 0, dir: "left" });
  assert.equal(r.ok, true);
  assert.equal(r.state.dead, true);
  assert.equal(s.dead, false);
  assert.equal(s.moves, 0);
});
test("one finished block does not lock or disappear", () => {
  const l = levels[0],
    s = initial(l);
  const r = step(l, s, { block: 1, dir: "left" });
  assert.equal(r.ok, true);
  assert.equal(r.state.won, false);
});
test("heavy plates require heavy AND upright; soft plates accept lying blocks", () => {
  const l = levels[4],
    s = initial(l);
  s.blocks[0] = { x: 1, z: 4, o: "X", heavy: true };
  assert.equal(groups(l, s).has(0), false);
  s.blocks[0].o = "U";
  assert.equal(groups(l, s).has(0), true);
  s.blocks[0].heavy = false;
  assert.equal(groups(l, s).has(0), false);
});
test("exchange changes only roles, preserves identities, costs one move", () => {
  const l = levels[3],
    s = initial(l);
  s.blocks[0] = { x: 1, z: 2, o: "U", heavy: true };
  assert.equal(canExchange(l, s), true);
  const r = step(l, s, "exchange");
  assert.equal(r.state.blocks[0].heavy, false);
  assert.equal(r.state.blocks[1].heavy, true);
  assert.equal(r.state.moves, 1);
  assert.equal(r.state.blocks[0].x, 1);
  assert.equal(s.blocks[0].heavy, true);
});
test("exchange away from both pads or while lying is rejected", () => {
  const l = levels[3],
    s = initial(l);
  assert.equal(step(l, s, "exchange").ok, false);
  s.blocks[0] = { x: 1, z: 2, o: "X", heavy: true };
  assert.equal(canExchange(l, s), false);
});
test("heavy block cannot enter light-only surface", () => {
  const l = {
    map: [".......", ".......", "......."],
    specials: { [key(2, 1)]: { type: "light" } },
    plates: [],
    goals: [
      [6, 1],
      [6, 2],
    ],
  };
  const s = {
    blocks: [
      { x: 1, z: 1, o: "U", heavy: true },
      { x: 6, z: 2, o: "U", heavy: false },
    ],
    moves: 0,
    dead: false,
    won: false,
  };
  assert.equal(step(l, s, { block: 0, dir: "right" }).reason, "light");
});
test("removing support also drops the passive block", () => {
  const l = {
    map: [".......", ".......", "......."],
    specials: { [key(5, 1)]: { type: "bridge", group: 0 } },
    plates: [{ x: 1, z: 1, group: 0 }],
    goals: [
      [6, 0],
      [6, 2],
    ],
  };
  const s = {
    blocks: [
      { x: 1, z: 1, o: "U", heavy: true },
      { x: 5, z: 1, o: "U", heavy: false },
    ],
    moves: 0,
    dead: false,
    won: false,
  };
  const r = step(l, s, { block: 0, dir: "right" });
  assert.equal(r.state.dead, true);
});
test("ice translation preserves orientation and stops before partner", () => {
  const l = {
    map: ["..........", "..........", ".........."],
    specials: Object.fromEntries(
      Array.from({ length: 8 }, (_, i) => [key(i + 2, 1), { type: "ice" }]),
    ),
    plates: [],
    goals: [
      [0, 0],
      [0, 2],
    ],
  };
  const s = {
    blocks: [
      { x: 8, z: 1, o: "U", heavy: true },
      { x: 1, z: 1, o: "U", heavy: false },
    ],
    moves: 0,
    dead: false,
    won: false,
  };
  const r = step(l, s, { block: 1, dir: "right" });
  assert.equal(r.state.dead, false);
  assert.deepEqual(cells(r.state.blocks[1]), [
    [6, 1],
    [7, 1],
  ]);
  assert.equal(r.state.blocks[1].o, "X");
});
for (const l of campaign)
  test(`level ${l.id} has a replayable solution`, () => {
    const solution = solve(l);
    assert.ok(solution.path, `no solution in ${solution.visited} states`);
    let s = initial(l);
    for (const a of solution.path) {
      const r = step(l, s, a);
      assert.equal(r.ok, true);
      assert.equal(r.state.dead, false);
      s = r.state;
    }
    assert.equal(s.won, true);
    assert.equal(solution.path.length, l.par, "verified shortest path changed");
    if (l.pads)
      assert.ok(
        solution.path.includes("exchange"),
        "signature mechanic must be required",
      );
  });
test("60-stage learning curve introduces size and complexity gradually", () => {
  assert.equal(campaign.length, 60);
  assert.deepEqual(
    campaign.map((l) => l.id),
    Array.from({ length: 60 }, (_, i) => i + 1),
  );
  assert.ok(
    campaign
      .slice(0, 6)
      .every((l) => l.starts.length === 1 && l.sizes[0] === 1),
  );
  assert.ok(
    campaign
      .slice(6, 12)
      .every((l) => l.sizes.length === 2 && l.sizes.every((s) => s === 1)),
  );
  assert.ok(
    campaign.slice(12, 20).every((l) => l.sizes[0] === 2 && l.sizes[1] === 1),
  );
  assert.ok(campaign.slice(0, 28).every((l) => l.par < 22));
  assert.equal(campaign.find((l) => l.par >= 22).id, 30);
  assert.ok(campaign.slice(28).every((l, i, a) => !i || l.par >= a[i - 1].par));
  assert.equal(
    new Set(campaign.filter((l) => l.legacyId).map((l) => l.legacyId)).size,
    16,
  );
  const signatures = campaign.map((l) =>
    JSON.stringify([l.map, l.specials, l.plates, l.starts, l.goals, l.sizes]),
  );
  assert.equal(new Set(signatures).size, 60);
});
function bfsLength(level) {
  const q = [initial(level)],
    seen = new Set([stateKey(q[0])]);
  for (let i = 0; i < q.length; i++) {
    if (win(level, q[i])) return q[i].moves;
    for (const a of actions()) {
      const r = step(level, q[i], a);
      if (!r.ok || r.state.dead) continue;
      const k = stateKey(r.state);
      if (!seen.has(k)) {
        seen.add(k);
        q.push(r.state);
      }
    }
  }
  return null;
}
test("A* shortest lengths agree with independent breadth-first search, including ice", () => {
  for (const id of [1, 2, 3, 6])
    assert.equal(solve(levels[id - 1]).path.length, bfsLength(levels[id - 1]));
});
test("separate circuit groups do not open each other", () => {
  const l = levels[10],
    s = initial(l);
  s.blocks[0] = { x: 1, z: 1, o: "U", heavy: true };
  s.blocks[1] = { x: 2, z: 2, o: "U", heavy: false };
  const open = groups(l, s);
  assert.ok(open.has(0));
  assert.equal(open.has(1), false);
  assert.equal(open.has(2), false);
});
