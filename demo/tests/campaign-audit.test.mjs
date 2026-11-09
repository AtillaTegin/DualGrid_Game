import {retainedLegacyIds} from "../src/campaign-hardening.js";
import test from "node:test";
import assert from "node:assert/strict";
import { levels } from "../src/levels.js";
import { initial, roll, cells, tile, solve } from "../src/logic.js";
// Independent relaxed reachability: all bridges open, no passive actor collisions.
// Failure here proves that no real path can evade the role restriction.
function reachableWithoutRoleChange(l, b, goal) {
  const q = [b],
    seen = new Set();
  for (let i = 0; i < q.length; i++) {
    const n = q[i],
      key = [n.x, n.z, n.o].join();
    if (seen.has(key)) continue;
    seen.add(key);
    if (n.x === goal[0] && n.z === goal[1] && n.o === "U") return true;
    for (const dir of ["up", "down", "left", "right"]) {
      const p = roll(n, dir);
      if (
        cells(p).every((c) => {
          const t = tile(l, ...c);
          return t && t.type !== "wall" && (!p.heavy || t.type !== "light");
        })
      )
        q.push(p);
    }
  }
  return false;
}
test("every retained legacy main mechanic is physically unavoidable, not an instruction-only suggestion", () => {
  let bridges = 0,
    ice = 0,
    roles = 0;
  for (const l of levels.filter((l) => l.id >= 23 && retainedLegacyIds.includes(l.id))) {
    for (const type of ["bridge", "ice"])
      if (Object.values(l.specials).some((s) => s.type === type)) {
        const blocked = {
          ...l,
          specials: Object.fromEntries(
            Object.entries(l.specials).map(([p, s]) => [
              p,
              s.type === type ? { type: "wall" } : s,
            ]),
          ),
        };
        const r = solve(blocked);
        assert.equal(r.path, null, l.id + " can bypass " + type);
        assert.equal(r.limited, undefined, l.id + " search must exhaust");
        if (type === "bridge") bridges++;
        else ice++;
      }
    if (l.pads) {
      assert.ok(
        initial(l).blocks.some(
          (b, i) => !reachableWithoutRoleChange(l, b, l.goals[i]),
        ),
        l.id + " exchange is optional",
      );
      roles++;
    }
  }
  assert.equal(bridges, 10);
  assert.equal(ice, 4);
  assert.equal(roles, 6);
});
