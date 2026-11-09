// The laboratory has its own transition model. Campaign rules/certificates stay unchanged.
export const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
export const clone = (s) => structuredClone(s),
  cellKey = (x, z) => `${x},${z}`;
export function footprint(b) {
  const a = [];
  for (let x = 0; x < b.dims[0]; x++)
    for (let z = 0; z < b.dims[2]; z++) a.push([b.x + x, b.z + z]);
  return a;
}
export const upright = (b) => b.dims[0] === 1 && b.dims[2] === 1;
const at = (b, p) => b.x === p[0] && b.z === p[1];
const includes = (ps, x, z) => ps?.some((p) => p[0] === x && p[1] === z);
const occupied = (b, x, z) =>
  footprint(b).some((p) => p[0] === x && p[1] === z);
const distance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.z - b.z);
export function turnFaces(f, d) {
  const { u, v, r, l, f: front, b } = f;
  return d === "right"
    ? { u: l, v: r, r: u, l: v, f: front, b }
    : d === "left"
      ? { u: r, v: l, r: v, l: u, f: front, b }
      : d === "down"
        ? { u: b, v: front, r, l, f: u, b: v }
        : { u: front, v: b, r, l, f: v, b: u };
}
export function rollBody(b, dir) {
  const [dx, dz] = DIRS[dir],
    n = { ...b, dims: [...b.dims], faces: turnFaces(b.faces, dir) },
    [w, h, d] = b.dims;
  if (dx) {
    n.x += dx > 0 ? w : -h;
    n.dims = [h, w, d];
  } else {
    n.z += dz > 0 ? d : -h;
    n.dims = [w, d, h];
  }
  return n;
}
export function initial(l, known) {
  return {
    blocks: l.starts.map((p, i) => ({
      x: p[0],
      z: p[1],
      dims: [...(l.shapes?.[i] || [1, 1, 1])],
      heavy: i === 0,
      faces: { u: 0, v: 1, r: 2, l: 3, f: 4, b: 5 },
      energy: l.energy?.[i] || 0,
    })),
    moves: 0,
    dead: false,
    won: false,
    proof: l.strict ? [] : [...(known?.proof || [])],
    revealed: l.knownIllusion
      ? (l.illusion || []).map((p) => p.join(","))
      : [...(known?.revealed || [])],
    switchIndex: 0,
    collected: 0,
    levers: 0,
    broken: [],
    visits: {},
    polarity: l.starts.map(() => false),
    remapped: 0,
    wallPhase: 0,
    wallCount: 0,
    wallStep: -1,
    clone: l.echo
      ? {
          x: l.echo.start[0],
          z: l.echo.start[1],
          dims: [...(l.echo.shape || [1, 1, 1])],
          faces: { u: 0, v: 1, r: 2, l: 3, f: 4, b: 5 },
          heavy: false,
          alive: true,
        }
      : null,
    queue:
      l.echo && !l.realtime
        ? Array.from(
            { length: l.echo.delay || 3 },
            (_, i) => l.echo.seed?.[i] || "wait",
          )
        : [],
    pending: [],
    clock: 0,
    portalIndex: 0,
    portalCount: 0,
    latch: false,
    exitFlag: false,
    resizeCount: 0,
    charges: l.charges ?? 9,
    storage: 0,
    slots: [1, 0],
    sequence: 0,
    linked: false,
    last: "",
    events: [],
  };
}
function mark(s, event) {
  if (!s.proof.includes(event)) s.proof.push(event);
  s.events.push(event);
}
function floor(l, x, z) {
  return (
    z >= 0 &&
    z < l.map.length &&
    x >= 0 &&
    x < l.map[z].length &&
    l.map[z][x] !== " "
  );
}
function solid(l, b) {
  return footprint(b).some(
    ([x, z]) =>
      includes(l.walls, x, z) ||
      (l.ceilings || []).some((c) => c.x === x && c.z === z && b.dims[1] > c.h),
  );
}
export function hasItems(l, s, kind) {
  return (l.collectibles || []).every(
    (c, i) => c.kind !== kind || !!((s.collected || 0) & (1 << i)),
  );
}
export function requirementsMet(l, s, r = {}) {
  return (
    (!r.latch || s.latch) &&
    (!r.routeAtLeast || (s.switchIndex || 0) >= r.routeAtLeast) &&
    (!r.notLevers ||
      r.notLevers.every((id) => {
        const i = (l.levers || []).findIndex((c) => c.id === id);
        return i >= 0 && !((s.levers || 0) & (1 << i));
      })) &&
    (!r.routeComplete || (s.switchIndex || 0) >= (l.switches || []).length) &&
    (!r.allKeys || hasItems(l, s, "key")) &&
    (!r.allPoints || hasItems(l, s, "point")) &&
    (!r.items ||
      r.items.every((id) => {
        const i = (l.collectibles || []).findIndex((c) => c.id === id);
        return i >= 0 && !!((s.collected || 0) & (1 << i));
      })) &&
    (!r.levers ||
      r.levers.every((id) => {
        const i = (l.levers || []).findIndex((c) => c.id === id);
        return i >= 0 && !!((s.levers || 0) & (1 << i));
      }))
  );
}
export function doorOpen(l, s, door) {
  return requirementsMet(l, s, door.requires);
}
function doorHits(l, s, b) {
  return (l.doors || []).some(
    (d) =>
      !doorOpen(l, s, d) &&
      footprint(b).some((p) => includes(d.cells || [d.at], ...p)),
  );
}
function collectItems(l, s) {
  (l.collectibles || []).forEach((c, i) => {
    if (
      !((s.collected || 0) & (1 << i)) &&
      s.blocks.some((b) => occupied(b, ...c.at))
    ) {
      s.collected = (s.collected || 0) | (1 << i);
      mark(s, c.kind === "key" ? "key-pickup" : "point-pickup");
    }
  });
}
function overlap(a, b) {
  return footprint(a).some((p) => occupied(b, ...p));
}
// A rolling cuboid is a rotating rectangle in the movement/height plane.
// SAT checks its intermediate volume against beams, walls and the passive body.
function polygonHitsBox(poly, x0, y0, x1, y1) {
  const box = [
      [x0, y0],
      [x1, y0],
      [x1, y1],
      [x0, y1],
    ],
    axes = [
      [1, 0],
      [0, 1],
    ];
  for (let i = 0; i < 2; i++) {
    const a = poly[i],
      b = poly[i + 1];
    axes.push([-(b[1] - a[1]), b[0] - a[0]]);
  }
  return axes.every(([dx, dy]) => {
    const p = poly.map((v) => v[0] * dx + v[1] * dy),
      q = box.map((v) => v[0] * dx + v[1] * dy);
    return (
      Math.min(Math.max(...p), Math.max(...q)) -
        Math.max(Math.min(...p), Math.min(...q)) >
      1e-5
    );
  });
}
export function rollCollision(l, s, actor, dir) {
  if (!l.physicalRoll) return false;
  const b = s.blocks[actor],
    dx = DIRS[dir][0],
    sign = dx || DIRS[dir][1],
    axis = dx ? "x" : "z",
    cross = dx ? "z" : "x";
  const w = b.dims[dx ? 0 : 2],
    h = b.dims[1],
    depth = b.dims[dx ? 2 : 0],
    start = b[axis] - 0.5,
    pivot = sign > 0 ? start + w : start;
  const otherStart = b[cross] - 0.5,
    otherEnd = otherStart + depth,
    reach = Math.hypot(w, h);
  const obstacles = [];
  const add = (x, z, width, height, d, y = 0) => {
    const low = dx ? x : z,
      span = dx ? width : d,
      crossLow = dx ? z : x,
      crossSpan = dx ? d : width;
    if (
      crossLow >= otherEnd - 1e-5 ||
      crossLow + crossSpan <= otherStart + 1e-5 ||
      low > pivot + reach ||
      low + span < pivot - reach
    )
      return;
    obstacles.push([low, y, low + span, y + height]);
  };
  for (const c of l.ceilings || [])
    add(c.x - 0.5, c.z - 0.5, 1, c.thickness || 0.16, 1, c.h);
  for (const p of l.walls || []) add(p[0] - 0.5, p[1] - 0.5, 1, 12, 1);
  for (const d of l.doors || [])
    if (!doorOpen(l, s, d))
      for (const p of d.cells || [d.at]) add(p[0] - 0.5, p[1] - 0.5, 1, 3, 1);
  for (const p of wallCells(l, s)) add(p[0] - 0.5, p[1] - 0.5, 1, 1.8, 1);
  s.blocks.forEach((q, i) => {
    if (i !== actor) add(q.x - 0.5, q.z - 0.5, q.dims[0], q.dims[1], q.dims[2]);
  });
  if (!obstacles.length) return false;
  const x0 = sign > 0 ? -w : 0,
    x1 = sign > 0 ? 0 : w;
  for (let i = 0; i <= 64; i++) {
    const a = (i * Math.PI) / 128,
      c = Math.cos(a),
      sn = Math.sin(a),
      poly = [
        [x0, 0],
        [x1, 0],
        [x1, h],
        [x0, h],
      ].map(([u, y]) => [
        pivot + u * c + sign * y * sn,
        -sign * u * sn + y * c,
      ]);
    if (obstacles.some((o) => polygonHitsBox(poly, ...o))) return true;
  }
  return false;
}
export function sensorHeld(s, p) {
  return s.blocks.some(
    (b) => occupied(b, p.x, p.z) && (!p.heavy || (b.heavy && upright(b))),
  );
}
export function gateOpen(l, s, id) {
  const g = l.gates?.find((g) => g.id === id);
  if (!g) return true;
  const r = g.rule;
  if (r.requires && !requirementsMet(l, s, r.requires)) return false;
  if (r.type === "sensor") return r.pads.some((p) => sensorHeld(s, p));
  if (r.type === "cover")
    return r.cells.every((p) => occupied(s.blocks[r.actor || 0], ...p));
  if (r.type === "shape")
    return s.blocks.some((b) => at(b, r.at) && b.dims.join() === r.dims.join());
  if (r.type === "latch") return s.latch;
  if (r.type === "echo") return !!s.clone?.alive && at(s.clone, r.at);
  if (r.type === "energy") return s.storage >= r.amount;
  if (r.type === "battery") return s.slots[r.slot] > 0;
  if (r.type === "alignment") {
    const [a, b] = s.blocks;
    if (!a || !b || !upright(a) || !upright(b) || (a.x !== b.x && a.z !== b.z))
      return false;
    const dx = Math.sign(b.x - a.x),
      dz = Math.sign(b.z - a.z);
    let x = a.x + dx,
      z = a.z + dz;
    while (x !== b.x || z !== b.z) {
      if (includes(l.walls, x, z)) return false;
      x += dx;
      z += dz;
    }
    return true;
  }
  if (r.type === "perpendicular") {
    const [a, b] = s.blocks;
    return (
      a.dims[1] === 1 &&
      b.dims[1] === 1 &&
      ((a.dims[0] > 1 && b.dims[2] > 1) || (a.dims[2] > 1 && b.dims[0] > 1))
    );
  }
  return false;
}
export function supported(l, s, b, actor = -1) {
  return footprint(b).every(([x, z]) => {
    const k = cellKey(x, z);
    if (!floor(l, x, z) || s.broken.includes(k)) return false;
    if (includes(l.illusion, x, z)) return false;
    const gate = l.gates?.find((g) => includes(g.tiles, x, z));
    if (gate && !gateOpen(l, s, gate.id)) return false;
    if (includes(l.observer, x, z)) {
      const other = s.blocks[1 - actor];
      if (!other || Math.abs(x - other.x) + Math.abs(z - other.z) > l.radius)
        return false;
    }
    return true;
  });
}
function onReverseZone(l, b) {
  return footprint(b).every((p) => includes(l.reverse?.zone, ...p));
}
export function worldDirection(l, s, actor, raw) {
  const rev = l.reverse;
  if (!rev) return raw;
  let [dx, dz] = DIRS[raw];
  const b = s.blocks[actor];
  if (rev.kind === "latch") {
    if (s.polarity[actor]) {
      dx = -dx;
      dz = -dz;
    }
  } else if (rev.kind === "split") {
    if (rev.sensors.some((p) => s.blocks.some((q) => occupied(q, ...p)))) {
      if (actor === 0) dx = -dx;
      else dz = -dz;
    }
  } else if (onReverseZone(l, b)) {
    if (rev.kind === "rotate") [dx, dz] = [-dz, dx];
    else {
      dx = -dx;
      dz = -dz;
    }
  }
  return Object.keys(DIRS).find((d) => DIRS[d][0] === dx && DIRS[d][1] === dz);
}
function wallActive(l, s) {
  return l.wall?.kind === "shrink"
    ? s.wallStep >= 0
    : l.wall?.kind === "piston" && s.wallPhase === 2;
}
export function wallCells(l, s) {
  if (!wallActive(l, s)) return [];
  if (l.wall.kind === "shrink") {
    const a = [];
    for (let x = 0; x <= s.wallStep; x++)
      for (let z = 0; z < l.map.length; z++) if (floor(l, x, z)) a.push([x, z]);
    return a;
  }
  return l.wall.cells;
}
function safeRefuge(l, b) {
  return (
    l.shelter &&
    b.dims[1] <= l.shelter.height &&
    footprint(b).every((p) => includes(l.shelter.cells, ...p))
  );
}
function activeBlockers(l, s, b) {
  return (
    doorHits(l, s, b) ||
    solid(l, b) ||
    (footprint(b).some((p) => includes(wallCells(l, s), ...p)) &&
      !safeRefuge(l, b))
  );
}
function faceSafe(l, s, b) {
  for (const p of footprint(b)) {
    const hazard = l.faceHazards?.find((h) => at({ x: p[0], z: p[1] }, h.at));
    if (hazard && b.faces.v !== hazard.face) return false;
    if (hazard) {
      mark(s, "shield");
      mark(s, "shield-" + p.join(","));
    }
  }
  return true;
}
function pressureSafe(l, s, b) {
  for (const p of footprint(b))
    if (includes(l.shell, ...p)) {
      mark(s, "pressure");
      if ((b.heavy ? 2 : 1) / footprint(b).length > l.shellThreshold)
        return false;
    }
  return true;
}
function newEntries(l, s, b, old) {
  for (const p of footprint(b)) {
    if (occupied(old, ...p)) continue;
    const k = cellKey(...p);
    if (includes(l.visitable, ...p)) {
      const before = s.visits[k] ?? 2;
      if (before === 0) return false;
      s.visits[k] = before - 1;
      if (before === 1) mark(s, "budget");
    }
  }
  return true;
}
function leaving(l, s, old) {
  for (const p of footprint(old)) {
    if (s.blocks.some((b) => occupied(b, ...p))) continue;
    const k = cellKey(...p);
    if (
      includes(l.fragile, ...p) ||
      (includes(l.visitable, ...p) && s.visits[k] === 0)
    ) {
      if (!s.broken.includes(k)) {
        s.broken.push(k);
        mark(s, "collapse");
      }
    }
  }
}
function checkArrival(l, s, b, actor) {
  const nextSwitch = l.switches?.[s.switchIndex || 0];
  if (nextSwitch && at(b, nextSwitch)) {
    s.switchIndex = (s.switchIndex || 0) + 1;
    mark(s, "switch");
  }
  for (const p of footprint(b))
    if (includes(l.illusion, ...p)) {
      const k = cellKey(...p);
      if (!s.revealed.includes(k)) s.revealed.push(k);
      mark(s, "discover");
    }
  if (l.contact) {
    const t = l.contact;
    const ok =
      at(b, t.at) &&
      (t.side ? b.faces[t.side] === t.face : b.faces.v === t.face);
    if (ok) mark(s, "contact");
  }
  if (l.sequence) {
    const actual = l.sequence.findIndex((p) => at(b, p.at));
    if (actual >= 0) {
      const expected = l.sequence[s.sequence];
      if (expected && at(b, expected.at) && b.faces.v === expected.face) {
        s.sequence++;
        mark(s, "sequence");
      } else if (actual !== s.sequence - 1) s.sequence = 0;
    }
  }
  if (
    l.formLatch &&
    at(b, l.formLatch.at) &&
    b.dims.join() === l.formLatch.dims.join()
  ) {
    s.latch = true;
    mark(s, "shape-lock");
  }
}
function portalTarget(l, s, b) {
  if (!l.portal) return null;
  const p = l.portal;
  if (at(b, p.from)) {
    if (p.branch) {
      const held = sensorHeld(s, p.branch.sensor);
      return { at: held ? p.branch.yes : p.branch.no, yaw: p.yaw || 0 };
    }
    return { at: p.to, yaw: p.yaw || 0 };
  }
  if (
    p.back &&
    (at(b, p.to) || (p.branch && (at(b, p.branch.no) || at(b, p.branch.yes))))
  )
    return { at: p.from, yaw: -(p.yaw || 0) };
  return null;
}
function teleportBody(b, target) {
  const n = {
    ...b,
    x: target.at[0],
    z: target.at[1],
    dims: [...b.dims],
    faces: { ...b.faces },
  };
  if (target.yaw) {
    [n.dims[0], n.dims[2]] = [n.dims[2], n.dims[0]];
    const f = n.faces;
    n.faces =
      target.yaw > 0
        ? { ...f, r: f.b, f: f.r, l: f.f, b: f.l }
        : { ...f, r: f.f, f: f.l, l: f.b, b: f.r };
  }
  return n;
}
function echoAdvance(l, s, dir) {
  if (!s.clone?.alive || dir === "wait") return;
  const mirror = l.echo.mirror || "x";
  let d = dir;
  if (mirror === "x")
    d = { right: "left", left: "right", up: "up", down: "down" }[d];
  if (mirror === "z")
    d = { right: "right", left: "left", up: "down", down: "up" }[d];
  const n = rollBody(s.clone, d);
  if (
    solid(l, n) ||
    footprint(n).some((p) => includes(wallCells(l, s), ...p))
  ) {
    mark(s, "echo-blocked");
    return;
  }
  s.clone = { ...n, alive: true };
  mark(s, "echo");
  if (!supported(l, s, n, -1)) {
    s.clone.alive = false;
    mark(s, "echo-fall");
  }
}
function victory(l, s) {
  if (s.dead) return false;
  const good = s.blocks.every((b, i) => {
    const g = l.goals[i];
    return (
      at(b, [g.x, g.z]) &&
      (!g.dims || g.dims.join() === b.dims.join()) &&
      ((!g.face && g.face !== 0) || b.faces[g.side || "v"] === g.face) &&
      (g.energy === undefined || b.energy === g.energy)
    );
  });
  if (!good) return false;
  if (l.required && !l.required.every((p) => s.proof.includes(p))) return false;
  if (l.sequence && s.sequence < l.sequence.length) return false;
  if (l.requireResizes && s.resizeCount < l.requireResizes) return false;
  if (l.requirePortals && s.portalCount < l.requirePortals) return false;
  if (l.requireRemapped === 3 && s.remapped !== 3) return false;
  if (l.needExitFlag && !s.exitFlag) return false;
  if (l.needSwitches && (s.switchIndex || 0) < l.switches.length) return false;
  if (
    l.collectAll &&
    (s.collected || 0) !== (1 << (l.collectibles || []).length) - 1
  )
    return false;
  return true;
}
export function step(l, state, a) {
  if (a.type === "restart") return { ok: true, state: initial(l, state) };
  if (state.dead || state.won)
    return { ok: false, reason: "Bitib. Z və ya R ilə qayıt." };
  const s = clone(state);
  s.events = [];
  const actor = a.block ?? 0,
    b = s.blocks[actor];
  if (!b) return { ok: false, reason: "Bu blok yoxdur." };
  let world = "wait",
    didTeleport = false;
  if (a.type === "move") {
    if (!DIRS[a.dir]) return { ok: false, reason: "İstiqamət yanlışdır." };
    world = worldDirection(l, state, actor, a.dir);
    if (rollCollision(l, state, actor, world))
      return {
        ok: false,
        collision: true,
        reason: doorHits(l, state, rollBody(b, world))
          ? l.levers?.some((v) => v.toggle)
            ? "Qapı bu dövrədə bağlıdır. F şalteri ilə qarşılıqlı keçidləri dəyiş."
            : l.switches
              ? "Qapı sensor mərhələsini gözləyir. Nömrəli sensorları sıra ilə işə sal."
              : l.formLatch
                ? "Qapı forma kilidi ilə bağlıdır. Nişanlı xanaya tələb olunan dik forma ilə yerləş."
                : l.levers
                  ? "Qapı bağlıdır. Qızılı açarı, tələb olunan xalları və F şalterini yoxla."
                  : "Qapı açar tələb edir. Yüngül B blokunu açara çatdır."
          : l.forms
            ? "Yuvarlanarkən tirə, divara və ya partnyora dəyirsən. Əvvəl kiçil və ya başqa yol seç."
            : "Bu yuvarlanma maneəyə və ya digər bloka dəyir. Başqa keçid seç və ya bağlı qapını aç.",
      };
    let n = rollBody(b, world);
    if (
      l.wrap &&
      n.dims.every((x) => x === 1) &&
      (n.x < 0 || n.x >= l.map[0].length)
    ) {
      n.x = (n.x + l.map[0].length) % l.map[0].length;
      mark(s, "wrap");
      didTeleport = true;
    }
    const intents = new Map([[actor, n]]);
    if (s.linked && s.blocks.length === 2) {
      const d =
        l.link === "opposite"
          ? { right: "left", left: "right", up: "down", down: "up" }[world]
          : world;
      intents.set(1 - actor, rollBody(s.blocks[1 - actor], d));
    }
    for (const [i, q] of intents) {
      if (
        activeBlockers(l, state, q) ||
        s.blocks.some(
          (other, j) => j !== i && !intents.has(j) && overlap(q, other),
        )
      )
        return {
          ok: false,
          reason: "Maneə var. Digər blokun yerini və divar fazasını yoxla.",
        };
      if (q.heavy && footprint(q).some((p) => includes(l.light, ...p)))
        return { ok: false, reason: "Bu keçid yalnız yüngül rol üçündür." };
      if (
        l.tether &&
        distance(q, intents.get(1 - i) || s.blocks[1 - i]) > l.tether
      )
        return {
          ok: false,
          reason: `Bağ ${l.tether} xanadan çox uzana bilməz. Əvvəl partnyoru yaxınlaşdır.`,
        };
    }
    if (intents.size === 2) {
      const [u, v] = [...intents.values()];
      if (
        overlap(u, v) ||
        (overlap(u, s.blocks[1 - actor]) && overlap(v, s.blocks[actor]))
      )
        return {
          ok: false,
          reason: "Bağlı hərəkətdə bloklar bir-birindən keçə bilməz.",
        };
      mark(s, "linked");
    }
    for (const [i, q] of intents) {
      const old = s.blocks[i];
      if (
        l.reverse?.kind === "latch" &&
        !onReverseZone(l, old) &&
        onReverseZone(l, q)
      ) {
        s.polarity[i] = !s.polarity[i];
        mark(s, "latch-control");
      }
      s.blocks[i] = q;
      if (!newEntries(l, s, q, old)) s.dead = true;
      if (
        !supported(l, s, q, i) ||
        !pressureSafe(l, s, q) ||
        !faceSafe(l, s, q)
      )
        s.dead = true;
      checkArrival(l, s, q, i);
      if (footprint(q).some((p) => includes(l.observer, ...p)))
        mark(s, "observer");
      if (l.holo && footprint(q).some((p) => includes(l.holo, ...p)))
        mark(s, "holo");
      if (q.dims.every((d) => d === 2)) mark(s, "large-roll");
    }
    if (world !== a.dir) {
      s.remapped |= 1 << actor;
      mark(s, "remap");
      if (l.reverse?.kind === "latch") mark(s, "latched-move");
    }
    if (l.tether && distance(s.blocks[0], s.blocks[1]) === l.tether)
      mark(s, "tether");
  } else if (a.type === "interact") {
    const i = (l.levers || []).findIndex((lever) =>
      footprint(b).some(
        (p) => Math.abs(p[0] - lever.at[0]) + Math.abs(p[1] - lever.at[1]) <= 1,
      ),
    );
    if (i < 0)
      return {
        ok: false,
        reason: "Şalterin üstünə və ya bir xana yanına gəl, sonra F bas.",
      };
    const lever = l.levers[i];
    if ((s.levers || 0) & (1 << i) && !lever.toggle)
      return {
        ok: false,
        reason: "Bu şalter artıq işə salınıb. Qapı açıq qalır.",
      };
    if (!requirementsMet(l, s, lever.requires))
      return {
        ok: false,
        reason:
          "Şalter kilidlidir: əvvəl göstərilən açarı və işıq xallarını topla.",
      };
    s.levers = lever.toggle
      ? (s.levers || 0) ^ (1 << i)
      : (s.levers || 0) | (1 << i);
    if (s.blocks.some((q) => doorHits(l, s, q)))
      return {
        ok: false,
        reason:
          "Qapının üstündə blok var. Əvvəl onu kənara çək; şalter bloku sıxmayacaq.",
      };
    mark(s, "lever");
  } else if (a.type === "resize") {
    if (l.resizeActors && !l.resizeActors.includes(actor))
      return {
        ok: false,
        reason:
          "Bu mərhələdə yalnız A formasını dəyişir; B relay-i idarə edir.",
      };
    if (!l.forms || (l.resizePads && !l.resizePads.some((p) => at(b, p))))
      return { ok: false, reason: "G üçün ölçü meydançasına gəl." };
    if (s.charges === 0)
      return {
        ok: false,
        reason: "Ölçü dəyişmə ehtiyatı qalmayıb. Z geri qaytarır.",
      };
    const k = l.forms.findIndex((d) => d.join() === b.dims.join()),
      dims = l.forms[(k + 1) % l.forms.length],
      corner = l.chooseAnchor ? a.anchor || 0 : 0;
    const n = {
      ...b,
      dims: [...dims],
      x: b.x - (corner & 1 ? dims[0] - b.dims[0] : 0),
      z: b.z - (corner & 2 ? dims[2] - b.dims[2] : 0),
    };
    if (
      l.growPads &&
      dims.reduce((a, v) => a * v, 1) > b.dims.reduce((a, v) => a * v, 1) &&
      !l.growPads.some((p) => at(b, p))
    )
      return {
        ok: false,
        reason:
          "Bu meydança yalnız kiçilmək üçündür. Böyümə üçün əsas G meydançasına gəl.",
      };
    if (
      activeBlockers(l, state, n) ||
      !supported(l, state, n, actor) ||
      s.blocks.some((q, i) => i !== actor && overlap(n, q))
    )
      return {
        ok: false,
        reason:
          "Yeni həcm sığmır: dayaq, tavan və digər blok yoxlanır. Başqa lövbər seç.",
      };
    s.blocks[actor] = n;
    if (s.charges > 0) s.charges--;
    s.resizeCount = Math.min(2, s.resizeCount + 1);
    mark(s, "resize");
    checkArrival(l, s, n, actor);
  } else if (a.type === "transfer") {
    if (l.energyMode === "pair") {
      const other = s.blocks[1 - actor];
      if (!other || distance(b, other) !== 1 || !b.energy)
        return {
          ok: false,
          reason: "Enerjili bloku seç və partnyora bir kənarla qonşu ol.",
        };
      b.energy--;
      other.energy++;
      mark(s, "transfer");
    } else if (l.energyMode === "storage") {
      if (!at(b, l.terminal))
        return { ok: false, reason: "Enerji terminalına gəl." };
      if (b.energy) {
        b.energy--;
        s.storage++;
      } else if (s.storage) {
        s.storage--;
        b.energy++;
      } else return { ok: false, reason: "Enerji yoxdur." };
      if (s.storage >= 2) mark(s, "stored");
    } else if (l.energyMode === "battery") {
      const i = l.terminals.findIndex((p) => at(b, p));
      if (i < 0) return { ok: false, reason: "Batareya terminalında dayan." };
      if (b.energy) {
        if (s.slots[i]) return { ok: false, reason: "Terminal doludur." };
        b.energy--;
        s.slots[i]++;
        if (i === 1) mark(s, "battery");
      } else if (s.slots[i]) {
        s.slots[i]--;
        b.energy++;
      } else return { ok: false, reason: "Bu terminal boşdur." };
    } else return { ok: false, reason: "Bu sınaqda enerji ötürməsi yoxdur." };
  } else if (a.type === "portal") {
    const target = portalTarget(l, state, b);
    if (!target)
      return { ok: false, reason: "Enter üçün tikiş meydançasına tam yerləş." };
    const n = teleportBody(b, target);
    if (
      activeBlockers(l, state, n) ||
      !supported(l, state, n, actor) ||
      s.blocks.some((q, i) => i !== actor && overlap(n, q))
    )
      return {
        ok: false,
        reason: "Tikişin çıxışı doludur və ya gövdə sığmır. Əvvəl yolu boşalt.",
      };
    s.blocks[actor] = n;
    mark(s, "portal");
    didTeleport = true;
  } else if (a.type === "link") {
    if (!l.link)
      return { ok: false, reason: "Bağlı hərəkət bu sınaqda yoxdur." };
    s.linked = !s.linked;
    mark(s, "link-toggle");
  } else if (a.type === "wait" || a.type === "tick") {
    mark(s, "wait");
  } else return { ok: false, reason: "Əmr tanınmır." };
  // Automatic fake goals are transactional: a blocked destination rejects the whole command.
  if (a.type === "move" && l.fake) {
    const q = s.blocks[actor],
      f = l.fake;
    if (at(q, f.at) && upright(q)) {
      let target = f.dest;
      if (f.kind === "permission") {
        const ready = sensorHeld(state, f.permission);
        s.exitFlag = ready;
        if (ready) {
          mark(s, "permission");
          target = null;
        } else mark(s, "false-goal");
      }
      if (f.kind === "cycle")
        target = f.destinations[s.portalIndex % f.destinations.length];
      if (target) {
        const n = teleportBody(q, { at: target, yaw: 0 });
        if (
          activeBlockers(l, state, n) ||
          !supported(l, state, n, actor) ||
          s.blocks.some((o, i) => i !== actor && overlap(n, o))
        )
          return {
            ok: false,
            reason: "Saxta qapının təyinatı doludur: giriş bütöv rədd edildi.",
          };
        s.blocks[actor] = n;
        didTeleport = true;
        s.portalCount = Math.min(2, s.portalCount + 1);
        if (f.kind === "cycle")
          s.portalIndex = (s.portalIndex + 1) % f.destinations.length;
        if (f.kind === "latch") s.latch = true;
        mark(s, "false-goal");
        mark(s, "teleport");
      }
    }
  }
  if (l.fake?.kind === "permission" && !sensorHeld(s, l.fake.permission))
    s.exitFlag = false;
  if (!s.dead) collectItems(l, s);
  // Contact is lethal even if a queued echo would leave that cell later this turn.
  if (s.clone?.alive && s.blocks.some((q) => overlap(q, s.clone))) {
    s.dead = true;
    s.last = "Kölgə ilə təmas. Z ilə bir addım geri qayıt.";
    mark(s, "caught");
  }
  for (const old of state.blocks) leaving(l, s, old);
  const advance = !l.realtime || a.type === "wait" || a.type === "tick";
  if (l.echo) {
    const payload =
      actor === 0 && a.type === "move" && !didTeleport ? world : "wait";
    if (l.realtime) {
      if (a.type === "move") s.pending.push({ in: 4, dir: payload });
      if (advance) {
        s.pending.forEach((p) => p.in--);
        const due = s.pending.filter((p) => p.in <= 0);
        s.pending = s.pending.filter((p) => p.in > 0);
        for (const p of due) echoAdvance(l, s, p.dir);
      }
    } else {
      const head = s.queue.shift() || "wait";
      s.queue.push(payload);
      echoAdvance(l, s, head);
    }
  }
  if (advance) {
    s.clock = Math.min(20, s.clock + 1);
    if (l.wall) {
      const held = l.wall.brake && sensorHeld(state, l.wall.brake);
      if (held) mark(s, "brake");
      else {
        s.wallCount = (s.wallCount + 1) % (l.wall.every || 1);
        if (s.wallCount === 0) {
          if (l.wall.kind === "shrink")
            s.wallStep = Math.min(l.wall.max ?? 3, s.wallStep + 1);
          else s.wallPhase = (s.wallPhase + 1) % 4;
          mark(s, "wall");
        }
      }
    }
  }
  if (l.echo && s.clone?.alive) {
    for (const q of s.blocks)
      if (overlap(q, s.clone)) {
        s.dead = true;
        s.last = "Kölgə ilə təmas. Z ilə bir addım geri qayıt.";
        mark(s, "caught");
      }
  }
  for (let i = 0; i < s.blocks.length; i++) {
    const q = s.blocks[i];
    if (!supported(l, s, q, i) || !pressureSafe(l, s, q) || !faceSafe(l, s, q))
      s.dead = true;
    if (footprint(q).some((p) => includes(wallCells(l, s), ...p))) {
      if (safeRefuge(l, q)) mark(s, "shelter");
      else {
        s.dead = true;
        s.last = "Divar gövdəni sıxdı. Vaxtı və duruşu dəyiş.";
      }
    }
  }
  for (const g of l.gates || [])
    if (g.rule.type === "alignment" && gateOpen(l, s, g.id))
      mark(s, "alignment");
    else if (g.rule.type === "perpendicular" && gateOpen(l, s, g.id))
      mark(s, "perpendicular");
  s.moves++;
  s.won = victory(l, s);
  if (s.dead && !s.last)
    s.last =
      "Dayaq və ya təhlükə qaydası pozuldu. Z geri alır; R sınağı təkrarlayır.";
  return { ok: true, state: s };
}
export function stateKey(l, s) {
  return JSON.stringify([
    s.blocks.map((b) => [
      b.x,
      b.z,
      b.dims,
      b.heavy,
      b.energy,
      l.useFaces ? b.faces : null,
    ]),
    s.dead,
    l.strict && !l.required?.length ? null : s.proof.slice().sort(),
    s.revealed.slice().sort(),
    s.broken.slice().sort(),
    s.visits,
    s.polarity,
    l.requireRemapped ? s.remapped : 0,
    s.wallPhase,
    s.wallCount,
    s.wallStep,
    s.clone?.alive ? [s.clone.x, s.clone.z, s.clone.dims] : false,
    s.queue,
    s.pending,
    s.portalIndex,
    s.portalCount,
    s.latch,
    s.exitFlag,
    l.requireResizes ? s.resizeCount : 0,
    s.charges,
    s.storage,
    s.slots,
    s.sequence,
    s.switchIndex || 0,
    s.collected || 0,
    s.levers || 0,
    s.linked,
  ]);
}
export function actions(l, s) {
  if (s.dead) return [{ type: "restart" }];
  const a = s.blocks.flatMap((b, block) =>
    Object.keys(DIRS).map((dir) => ({ type: "move", block, dir })),
  );
  if (l.forms)
    for (let block = 0; block < s.blocks.length; block++)
      for (let anchor = 0; anchor < (l.chooseAnchor ? 4 : 1); anchor++)
        if (!l.resizeActors || l.resizeActors.includes(block))
          a.push({ type: "resize", block, anchor });
  if (l.energyMode)
    s.blocks.forEach((b, block) => a.push({ type: "transfer", block }));
  if (l.portal)
    s.blocks.forEach((b, block) => a.push({ type: "portal", block }));
  if (l.link) a.push({ type: "link" });
  if (l.levers)
    s.blocks.forEach((_, block) => a.push({ type: "interact", block }));
  if (l.echo || l.wall) a.push({ type: "wait" });
  return a;
}
export function solve(l, start = initial(l), limit = 80000) {
  if (l.revision >= 3) return solveAStar(l, start, limit);
  const q = [{ s: start, parent: -1, a: null }],
    seen = new Set([stateKey(l, start)]);
  for (let i = 0; i < q.length; i++) {
    const n = q[i];
    if (n.s.won) {
      const path = [];
      let j = i;
      while (q[j].parent >= 0) {
        path.push(q[j].a);
        j = q[j].parent;
      }
      return { path: path.reverse(), visited: i + 1 };
    }
    for (const a of actions(l, n.s)) {
      const r = step(l, n.s, a);
      if (!r.ok) continue;
      if (r.state.dead && !l.allowDiscovery) continue;
      const k = stateKey(l, r.state);
      if (seen.has(k)) continue;
      if (q.length >= limit)
        return { path: null, visited: q.length, limited: true };
      seen.add(k);
      q.push({ s: r.state, parent: i, a });
    }
  }
  return { path: null, visited: q.length, limited: false };
}
function solveAStar(l, start, limit) {
  const stride = l.forms || l.shapes?.some((d) => d.some((n) => n > 1)) ? 3 : 1;
  const md = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  const h = (s) => {
    const goals = s.blocks.reduce(
      (sum, b, i) =>
        sum + Math.ceil(md([b.x, b.z], [l.goals[i].x, l.goals[i].z]) / stride),
      0,
    );
    const pending = (l.collectibles || [])
      .filter((_, i) => !((s.collected || 0) & (1 << i)))
      .map((c) => c.at);
    let items = 0;
    if (s.blocks.length === 1) {
      const nodes = [
          [s.blocks[0].x, s.blocks[0].z],
          ...pending,
          [l.goals[0].x, l.goals[0].z],
        ],
        dist = nodes.map(() => Infinity),
        used = new Set();
      dist[0] = 0;
      let total = 0;
      for (let i = 0; i < nodes.length; i++) {
        let v = -1;
        for (let j = 0; j < nodes.length; j++)
          if (!used.has(j) && (v < 0 || dist[j] < dist[v])) v = j;
        used.add(v);
        total += dist[v];
        for (let j = 0; j < nodes.length; j++)
          dist[j] = Math.min(dist[j], md(nodes[v], nodes[j]));
      }
      items = Math.ceil(total / stride);
    } else
      for (const p of pending)
        items = Math.max(
          items,
          Math.ceil(
            Math.min(
              ...s.blocks.flatMap((b) => footprint(b).map((q) => md(p, q))),
            ) / stride,
          ),
        );
    return Math.max(goals, items);
  };
  const heap = [],
    best = new Map(),
    before = (a, b) => a.f < b.f || (a.f === b.f && a.g > b.g);
  const push = (n) => {
    heap.push(n);
    let i = heap.length - 1;
    while (i) {
      const p = (i - 1) >> 1;
      if (!before(heap[i], heap[p])) break;
      [heap[i], heap[p]] = [heap[p], heap[i]];
      i = p;
    }
  };
  const pop = () => {
    const n = heap[0],
      last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      for (;;) {
        let c = i * 2 + 1;
        if (c >= heap.length) break;
        if (c + 1 < heap.length && before(heap[c + 1], heap[c])) c++;
        if (!before(heap[c], heap[i])) break;
        [heap[c], heap[i]] = [heap[i], heap[c]];
        i = c;
      }
    }
    return n;
  };
  push({ s: start, g: 0, f: h(start), parent: null, a: null });
  best.set(stateKey(l, start), 0);
  let visited = 0;
  while (heap.length && visited < limit) {
    const n = pop(),
      k = stateKey(l, n.s);
    if (best.get(k) !== n.g) continue;
    visited++;
    if (n.s.won) {
      const path = [];
      for (let p = n; p.parent; p = p.parent) path.push(p.a);
      return { path: path.reverse(), visited };
    }
    for (const a of actions(l, n.s)) {
      const r = step(l, n.s, a);
      if (!r.ok || r.state.dead) continue;
      const key = stateKey(l, r.state),
        g = n.g + 1;
      if ((best.get(key) ?? Infinity) <= g) continue;
      if (best.size >= limit) return { path: null, visited, limited: true };
      best.set(key, g);
      push({ s: r.state, g, f: g + h(r.state), parent: n, a });
    }
  }
  return { path: null, visited, limited: heap.length > 0 };
}
