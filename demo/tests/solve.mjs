import { levels } from "../src/levels.js";
import { solve } from "../src/logic.js";
for (const l of levels) {
  const r = solve(l);
  console.log(
    l.id,
    l.title,
    r.path?.length ?? "UNSOLVED",
    r.visited,
    JSON.stringify(r.path),
  );
  if (!r.path) process.exitCode = 1;
}
