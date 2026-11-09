import { levels } from "./levels.js";
import { solutions } from "./solutions.js";
import { initial, step, stateKey, solve } from "./logic.js";
import { interpretSearch } from "./hint-utils.js";
const known = new Map();
function witnesses(level) {
  if (known.has(level.id)) return known.get(level.id);
  const m = new Map(),
    path = solutions.find((s) => s.id === level.id)?.path || [];
  let state = initial(level);
  for (let i = 0; i <= path.length; i++) {
    m.set(stateKey(state), path.slice(i));
    if (i < path.length) state = step(level, state, path[i]).state;
  }
  known.set(level.id, m);
  return m;
}
self.onmessage = ({ data }) => {
  const { request, levelId, state } = data;
  try {
    const level = levels.find((l) => l.id === levelId);
    if (!level) throw Error("Unknown level");
    const memo = witnesses(level),
      k = stateKey(state);
    let answer;
    if (state.dead) answer = { status: "undo", path: null };
    else if (memo.has(k)) answer = { status: "ok", path: memo.get(k) };
    else {
      answer = interpretSearch(solve(level, state, 220000));
      if (answer.path) {
        let s = state;
        for (let i = 0; i <= answer.path.length; i++) {
          memo.set(stateKey(s), answer.path.slice(i));
          if (i < answer.path.length) s = step(level, s, answer.path[i]).state;
        }
        if (memo.size > 3000) known.delete(level.id);
      }
    }
    self.postMessage({ request, ...answer });
  } catch (error) {
    self.postMessage({ request, status: "error", message: error.message });
  }
};
