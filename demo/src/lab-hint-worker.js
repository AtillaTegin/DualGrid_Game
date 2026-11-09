import { byId as labById } from "./lab-data.js";
import { journeyById } from "./journey-data.js";
import { certificates as journeyCertificates } from "./journey-solutions.js";
import { initial, step, stateKey, solve } from "./lab-engine.js";
import { certificates } from "./lab-solutions.js";
onmessage = ({ data: { id, state, request, campaign } }) => {
  const l = (campaign ? journeyById : labById)[id],
    key = stateKey(l, state);
  let s = initial(l);
  const path = (campaign ? journeyCertificates : certificates)[id] || [];
  for (let i = 0; i <= path.length; i++) {
    if (stateKey(l, s) === key) {
      postMessage({ request, path: path.slice(i), visited: 0 });
      return;
    }
    if (i < path.length) s = step(l, s, path[i]).state;
  }
  // Real-time hints plan with the clock paused; WAIT represents one 0.5 s tick.
  if (l.realtime && l.echo && state.pending.length) {
    let q = structuredClone(state),
      prefix = [];
    for (let i = 0; i < 4; i++) {
      const a = { type: "wait" },
        r = step(l, q, a);
      if (!r.ok || r.state.dead) break;
      q = r.state;
      prefix.push(a);
      if (q.won) {
        postMessage({ request, path: prefix, visited: 0 });
        return;
      }
      if (!q.pending.length) {
        const r2 = solve(l, q, 8000);
        if (r2.path) {
          postMessage({ request, ...r2, path: [...prefix, ...r2.path] });
          return;
        }
        break;
      }
    }
  }
  postMessage({ request, ...solve(l, state, 16000) });
};
