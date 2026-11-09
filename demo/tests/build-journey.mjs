import fs from "node:fs";
import { journeyLevels } from "../src/journey-data.js";
import { experiments } from "../src/lab-data.js";
import { solve, initial, step } from "../src/lab-engine.js";
const certificates = {},
  audit = [];
for (const l of journeyLevels) {
  const result = solve(l, initial(l), 120000);
  if (!result.path)
    throw Error(l.id + " has no certified solution; old files kept");
  let state = initial(l);
  for (const a of result.path) {
    const r = step(l, state, a);
    if (!r.ok || r.state.dead) throw Error(l.id + " invalid certificate");
    state = r.state;
  }
  if (!state.won) throw Error(l.id + " did not finish");
  certificates[l.id] = result.path;
  audit.push({
    id: l.id,
    source: l.source,
    moves: result.path.length,
    visited: result.visited,
    allItems: state.collected === (1 << (l.collectibles||[]).length) - 1,
    lever: !!state.levers,
  });
  console.log(l.id, result.path.length, result.visited);
}
const lab = Object.fromEntries(
  experiments.map((l) => [
    l.id,
    solve(l,initial(l),120000).path,
  ]),
);
fs.writeFileSync(
  "src/journey-solutions.js",
  "export const certificates=" + JSON.stringify(certificates) + ";\n",
);
fs.writeFileSync(
  "src/lab-solutions.js",
  "export const certificates=" + JSON.stringify(lab) + ";\n",
);
fs.writeFileSync(
  "../reports/journey-audit-v0.7.json",
  JSON.stringify(audit, null, 2),
);
