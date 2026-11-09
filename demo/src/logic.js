export const DIRECTIONS = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
};
export const copy = (s) => structuredClone(s);
export function cells(b) {
  return b.o === "X"
    ? [
        [b.x, b.z],
        [b.x + 1, b.z],
      ]
    : b.o === "Z"
      ? [
          [b.x, b.z],
          [b.x, b.z + 1],
        ]
      : [[b.x, b.z]];
}
export function roll(b, dir) {
  const [dx, dz] = DIRECTIONS[dir];
  const n = { ...b };
  if (b.size === 1) {
    n.x += dx;
    n.z += dz;
    n.o = "U";
    return n;
  }
  if (b.o === "U") {
    n.x += dx === -1 ? -2 : dx;
    n.z += dz === -1 ? -2 : dz;
    n.o = dx ? "X" : "Z";
  } else if (b.o === "X") {
    n.x += dx === 1 ? 2 : dx;
    n.z += dz;
    if (dx) n.o = "U";
  } else {
    n.z += dz === 1 ? 2 : dz;
    n.x += dx;
    if (dz) n.o = "U";
  }
  return n;
}
export function initial(level) {
  return {
    blocks: level.starts.map((p, i) => ({
      x: p[0],
      z: p[1],
      o: "U",
      size: level.sizes?.[i] ?? 2,
      heavy: level.roles?.[i] ?? i === 0,
    })),
    moves: 0,
    dead: false,
    won: false,
  };
}
export const key = (x, z) => `${x},${z}`;
export function tile(level, x, z) {
  if (
    z < 0 ||
    z >= level.map.length ||
    x < 0 ||
    x >= level.map[z].length ||
    level.map[z][x] === " "
  )
    return null;
  return level.specials?.[key(x, z)] || { type: "floor" };
}
export function groups(level, state) {
  const open = new Set();
  for (const p of level.plates || []) {
    if (
      state.blocks.some(
        (b) =>
          cells(b).some(([x, z]) => x === p.x && z === p.z) &&
          (!p.heavy || (b.heavy && b.o === "U")),
      )
    )
      open.add(p.group);
  }
  return open;
}
export function supported(level, b, open) {
  return cells(b).every(([x, z]) => {
    const t = tile(level, x, z);
    return t && (t.type !== "bridge" || open.has(t.group));
  });
}
export function win(level, s) {
  return s.blocks.every(
    (b, i) =>
      b.o === "U" && b.x === level.goals[i][0] && b.z === level.goals[i][1],
  );
}
export function canExchange(level, s) {
  return (
    !s.dead &&
    !s.won &&
    !!level.pads &&
    s.blocks.length === 2 &&
    s.blocks.every(
      (b) =>
        b.o === "U" && level.pads.some((p) => p[0] === b.x && p[1] === b.z),
    )
  );
}
export function step(level, state, action) {
  if (state.dead || state.won) return { ok: false, reason: "locked" };
  const s = copy(state);
  if (action === "exchange") {
    if (!canExchange(level, s)) return { ok: false, reason: "pads" };
    s.blocks.forEach((b) => (b.heavy = !b.heavy));
  } else {
    const { block, dir } = action;
    if (
      !DIRECTIONS[dir] ||
      !Number.isInteger(block) ||
      block < 0 ||
      block >= s.blocks.length
    )
      return { ok: false, reason: "input" };
    let b = roll(s.blocks[block], dir);
    const other = new Set(
      s.blocks.flatMap((b, i) =>
        i === block ? [] : cells(b).map((p) => key(...p)),
      ),
    );
    const hits = (n) =>
      cells(n).some(
        (p) => other.has(key(...p)) || tile(level, ...p)?.type === "wall",
      );
    if (hits(b)) return { ok: false, reason: "blocked" };
    if (b.heavy && cells(b).some((p) => tile(level, ...p)?.type === "light"))
      return { ok: false, reason: "light" };
    const open = groups(level, state);
    if (!supported(level, b, open)) {
      s.blocks[block] = b;
      s.dead = true;
    } else {
      const [dx, dz] = DIRECTIONS[dir];
      let guard = 0;
      while (
        !b.heavy &&
        cells(b).every((p) => tile(level, ...p)?.type === "ice") &&
        guard++ < 100
      ) {
        const next = { ...b, x: b.x + dx, z: b.z + dz };
        if (hits(next)) break;
        if (!supported(level, next, open)) {
          b = next;
          s.dead = true;
          break;
        }
        b = next;
      }
      s.blocks[block] = b;
    }
  }
  const open = groups(level, s);
  if (s.blocks.some((b) => !supported(level, b, open))) s.dead = true;
  s.moves++;
  s.won = !s.dead && win(level, s);
  return { ok: true, state: s };
}
export function stateKey(s) {
  return s.blocks
    .map((b) => `${b.x},${b.z},${b.o},${+b.heavy},${b.size ?? 2}`)
    .join("|");
}
export function actions(count = 2) {
  return Array.from({ length: count }, (_, i) => i)
    .flatMap((block) => Object.keys(DIRECTIONS).map((dir) => ({ block, dir })))
    .concat("exchange");
}
const heuristicCache = new WeakMap();
const poseKey = (b) => `${b.x},${b.z},${b.o},${b.size ?? 2}`;
// Independent reverse distances are lower bounds: bridges are open, roles and
// collisions are ignored, and any point of an ice slide may be a brake point.
// Every actual command is an edge in this relaxed graph, so A* stays optimal.
function distances(level) {
  if (heuristicCache.has(level)) return heuristicCache.get(level);
  const reverse = new Map();
  const fits = (b) =>
    cells(b).every((p) => {
      const t = tile(level, ...p);
      return t && t.type !== "wall";
    });
  const edge = (from, to) => {
    const k = poseKey(to);
    if (!reverse.has(k)) reverse.set(k, []);
    reverse.get(k).push(poseKey(from));
  };
  for (const size of new Set(level.sizes || level.starts.map(() => 2)))
    for (let z = 0; z < level.map.length; z++)
      for (let x = 0; x < level.map[z].length; x++)
        for (const o of size === 1 ? ["U"] : ["U", "X", "Z"]) {
          const b = { x, z, o, size };
          if (!fits(b)) continue;
          for (const dir of Object.keys(DIRECTIONS)) {
            let n = roll(b, dir);
            if (!fits(n)) continue;
            edge(b, n);
            const [dx, dz] = DIRECTIONS[dir];
            while (cells(n).every((p) => tile(level, ...p)?.type === "ice")) {
              n = { ...n, x: n.x + dx, z: n.z + dz };
              if (!fits(n)) break;
              edge(b, n);
            }
          }
        }
  const result = level.goals.map(([x, z], i) => {
    const first = `${x},${z},U,${level.sizes?.[i] ?? 2}`,
      d = new Map([[first, 0]]),
      q = [first];
    for (let i = 0; i < q.length; i++)
      for (const k of reverse.get(q[i]) || [])
        if (!d.has(k)) {
          d.set(k, d.get(q[i]) + 1);
          q.push(k);
        }
    return d;
  });
  heuristicCache.set(level, result);
  return result;
}
export function solve(level, start = initial(level), limit = 250000) {
  const d = distances(level),
    heap = [],
    best = new Map();
  let visited = 0;
  const h = (s) =>
    s.blocks.reduce((v, b, i) => v + (d[i].get(poseKey(b)) ?? Infinity), 0);
  const precedes = (a, b) => a.f < b.f || (a.f === b.f && a.g > b.g);
  const push = (n) => {
    heap.push(n);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!precedes(heap[i], heap[p])) break;
      [heap[i], heap[p]] = [heap[p], heap[i]];
      i = p;
    }
  };
  const pop = () => {
    const first = heap[0],
      last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      for (;;) {
        let c = i * 2 + 1;
        if (c >= heap.length) break;
        if (c + 1 < heap.length && precedes(heap[c + 1], heap[c])) c++;
        if (!precedes(heap[c], heap[i])) break;
        [heap[i], heap[c]] = [heap[c], heap[i]];
        i = c;
      }
    }
    return first;
  };
  const first = { s: start, g: 0, f: h(start), parent: null, action: null };
  if (!Number.isFinite(first.f) || start.dead)
    return { path: null, visited: 0 };
  push(first);
  best.set(stateKey(start), 0);
  while (heap.length && visited < limit) {
    const n = pop();
    if (best.get(stateKey(n.s)) !== n.g) continue;
    visited++;
    if (win(level, n.s)) {
      const path = [];
      for (let p = n; p.parent; p = p.parent) path.push(p.action);
      return { path: path.reverse(), visited };
    }
    for (const a of actions(start.blocks.length)) {
      const r = step(level, n.s, a);
      if (!r.ok || r.state.dead) continue;
      const k = stateKey(r.state),
        g = n.g + 1;
      if ((best.get(k) ?? Infinity) <= g) continue;
      const f = g + h(r.state);
      if (!Number.isFinite(f)) continue;
      best.set(k, g);
      push({ s: r.state, g, f, parent: n, action: a });
    }
  }
  return { path: null, visited, limited: heap.length > 0 };
}
