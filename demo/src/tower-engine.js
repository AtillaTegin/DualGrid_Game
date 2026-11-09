// Engine data is JSON-only; renderer and input do not participate in transitions.
import { rollCollision, turnFaces } from "./lab-engine.js";
export const directions = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
};
export const key = (p) => p.join(",");
const equal = (a, b) => a.every((v, i) => v === b[i]);
export const bodyDims = (s, i) => s.dims?.[i] || Array(3).fill(s.sizes[i]);
export function yawFaces(f, turns) {
  let n = { ...f };
  for (let i = 0; i < ((turns % 4) + 4) % 4; i++)
    n = { u: n.u, v: n.v, r: n.b, l: n.f, f: n.r, b: n.l };
  return n;
}
export function resolvePortal(l, s, p) {
  if (p.branches) {
    if (!enabled(l, s, p.requires)) return null;
    const b = p.branches.find((b) => enabled(l, s, b.requires));
    return b ? { ...p, ...b } : null;
  }
  return p;
}
export function seamTarget(l, s, actor, worldDir) {
  const p = s.actors[actor];
  return (l.seams || []).find((t) => equal(t.from, p) && t.dir === worldDir);
}
export function towerFootprint(p, size = 1) {
  const w = Array.isArray(size) ? size[0] : size,
    d = Array.isArray(size) ? size[2] : size;
  return Array.from({ length: w * d }, (_, i) => [
    p[0] + (i % w),
    p[1] + Math.floor(i / w),
    p[2],
  ]);
}
const covers = (s, i, p) =>
  towerFootprint(s.actors[i], bodyDims(s, i)).some((t) => equal(t, p));
export const linkDistance = (s) =>
  Math.abs(s.actors[0][0] - s.actors[1][0]) +
  Math.abs(s.actors[0][1] - s.actors[1][1]) +
  4 * Math.abs(s.actors[0][2] - s.actors[1][2]);
export function relationHeld(l, s, r) {
  if (s.actors.length !== 2) return false;
  const [a, b] = s.actors,
    [da, db] = s.actors.map((_, i) => bodyDims(s, i));
  if (r.type === "perpendicular")
    return (
      da[1] === 1 &&
      db[1] === 1 &&
      da.reduce((a, b) => a * b, 1) === 2 &&
      db.reduce((a, b) => a * b, 1) === 2 &&
      ((da[0] === 2 && db[2] === 2) || (da[2] === 2 && db[0] === 2))
    );
  if (r.type === "distance")
    return (
      linkDistance(s) >= (r.min ?? 0) && linkDistance(s) <= (r.max ?? Infinity)
    );
  if (
    a[2] !== b[2] ||
    da[0] !== 1 ||
    da[2] !== 1 ||
    db[0] !== 1 ||
    db[2] !== 1 ||
    (a[0] !== b[0] && a[1] !== b[1])
  )
    return false;
  const obstacles = [
    ...(l.walls || []),
    ...(l.doors || [])
      .filter((d) => !d.requires?.relation && !enabled(l, s, d.requires))
      .map((d) => d.at),
    ...movingWallCells(l, s)
      .filter((c) => c.clearance == null)
      .map((c) => c.at),
  ];
  return !obstacles.some(
    (p) =>
      p[2] === a[2] &&
      p[0] >= Math.min(a[0], b[0]) &&
      p[0] <= Math.max(a[0], b[0]) &&
      p[1] >= Math.min(a[1], b[1]) &&
      p[1] <= Math.max(a[1], b[1]),
  );
}
export const movingWallCells = (l, s) =>
  (l.movingWalls || []).flatMap((w, i) =>
    w.frames[s.wallPhases?.[i] || 0].map((at) => ({
      at,
      clearance: w.clearance,
      index: i,
    })),
  );
const inControlZone = (l, s, i) =>
  towerFootprint(s.actors[i], bodyDims(s, i)).every((p) =>
    (l.control?.zone || []).some((q) => equal(p, q)),
  );
export function towerWorldDirection(l, s, i, dir) {
  const c = l.control;
  if (!c) return dir;
  let [x, z] = directions[dir];
  const on =
    c.kind === "polarity"
      ? s.polarity[i]
      : c.kind === "split"
        ? enabled(l, s, c.requires)
        : inControlZone(l, s, i);
  if (on) {
    if (c.kind === "rotate") [x, z] = [-z, x];
    else if (c.kind === "split") {
      if (i === 0) x = -x;
      else z = -z;
    } else {
      x = -x;
      z = -z;
    }
  }
  return Object.keys(directions).find(
    (k) => directions[k][0] === x && directions[k][1] === z,
  );
}
function validBody(l, s, i) {
  const p = s.actors[i],
    dims = bodyDims(s, i),
    size = dims[1];
  return (
    towerFootprint(p, dims).every(
      (t) =>
        supportedTower(l, s, t, i) &&
        !blocked(l, s, t) &&
        !movingWallCells(l, s).some(
          (c) => c.clearance != null && equal(c.at, t) && size > c.clearance,
        ) &&
        !(l.ceilings || []).some((c) => equal(c.at, t) && size > c.height) &&
        !(l.faceHazards || []).some(
          (c) => equal(c.at, t) && s.faces?.[i]?.v !== c.value,
        ) &&
        !(l.shell || []).some(
          (c) =>
            equal(c, t) && 2 / (dims[0] * dims[2]) > (l.shellThreshold ?? 1),
        ),
    ) &&
    !s.actors.some(
      (q, j) =>
        j !== i &&
        towerFootprint(q, bodyDims(s, j)).some((t) => covers(s, i, t)),
    )
  );
}
export function initialTower(l) {
  return {
    actors: structuredClone(l.starts),
    sizes: l.starts.map((_, i) => l.startSizes?.[i] || 1),
    dims: l.dominoMode ? structuredClone(l.shapes) : null,
    linked: false,
    lifts: l.lifts.map((t) => t.stops[0]),
    keys: [],
    opened: [],
    switches: [],
    dug: [],
    broken: [],
    visits: (l.visitTiles || []).map(() => 0),
    energy: l.starts.map((_, i) => l.energy?.[i] || 0),
    deposits: (l.depots || []).map((t) => t.initial || 0),
    faces: l.faceMode
      ? l.starts.map(() => ({ u: 0, v: 1, r: 2, l: 3, f: 4, b: 5 }))
      : null,
    faceSequence: 0,
    polarity: l.starts.map(() => false),
    wallPhases: (l.movingWalls || []).map((w) => w.initial || 0),
    moves: 0,
    won: false,
  };
}
export function enabled(l, s, r = {}) {
  return (
    (!r.anyOf || r.anyOf.some((req) => enabled(l, s, req))) &&
    (!r.relation || relationHeld(l, s, r.relation)) &&
    (r.linked == null || s.linked === r.linked) &&
    (!r.polarity || r.polarity.every((t) => s.polarity[t.actor] === t.value)) &&
    (!r.wallPhases ||
      r.wallPhases.every((t) => s.wallPhases[t.index] === t.phase)) &&
    (!r.anyPlates ||
      r.anyPlates.some((id) => enabled(l, s, { plates: [id] }))) &&
    (!r.faceAtLeast || s.faceSequence >= r.faceAtLeast) &&
    (!r.faceRouteComplete || s.faceSequence === (l.faceRoute || []).length) &&
    (!r.faceRouteIncomplete || s.faceSequence < (l.faceRoute || []).length) &&
    (!r.contacts ||
      r.contacts.every((id) => {
        const c = (l.faceContacts || []).find((t) => t.id === id);
        return (
          c &&
          s.actors.some(
            (p, i) =>
              (c.actor == null || c.actor === i) &&
              equal(p, c.at) &&
              s.faces?.[i]?.[c.side || "v"] === c.value,
          )
        );
      })) &&
    (!r.notSwitches || r.notSwitches.every((k) => !s.switches.includes(k))) &&
    (!r.energy ||
      r.energy.every(
        (t) =>
          (s.energy[t.actor] || 0) >= (t.min ?? 0) &&
          (s.energy[t.actor] || 0) <= (t.max ?? Infinity),
      )) &&
    (!r.deposits ||
      r.deposits.every(
        (t) =>
          (s.deposits[t.index] || 0) >= (t.min ?? 0) &&
          (s.deposits[t.index] || 0) <= (t.max ?? Infinity),
      )) &&
    (!r.keys || r.keys.every((k) => s.keys.includes(k))) &&
    (!r.switches || r.switches.every((k) => s.switches.includes(k))) &&
    (!r.dug || r.dug.every((k) => s.dug.includes(k))) &&
    (!r.plates ||
      r.plates.every((id) => {
        const p = l.plates.find((p) => p.id === id);
        return (
          p &&
          (p.cells || [p.at]).every((c) =>
            s.actors.some(
              (a, i) => (p.actor == null || p.actor === i) && covers(s, i, c),
            ),
          )
        );
      }))
  );
}
export function supportedTower(l, s, p, actor = -1) {
  const budget = (l.visitTiles || []).findIndex((t) => equal(t.at, p));
  if (
    budget >= 0 &&
    (s.visits[budget] || 0) >= l.visitTiles[budget].limit &&
    !s.actors.some((_, i) => covers(s, i, p))
  )
    return false;
  const phase = (l.phaseFloors || []).find((g) =>
    g.cells.some((c) => equal(c, p)),
  );
  if (phase && !enabled(l, s, phase.requires)) return false;
  const observed = (l.observerFloors || []).find((g) =>
    g.cells.some((c) => equal(c, p)),
  );
  if (
    observed &&
    !(
      observed.permanentRequires && enabled(l, s, observed.permanentRequires)
    ) &&
    !(
      actor >= 0 &&
      s.actors.some(
        (b, i) =>
          i !== actor &&
          b[2] === p[2] &&
          Math.abs(b[0] - p[0]) + Math.abs(b[1] - p[1]) <= observed.radius,
      )
    )
  )
    return false;
  if ((l.fragile || []).some((t, i) => s.broken?.includes(i) && equal(t, p)))
    return false;
  return (
    l.tiles.some((t) => equal(t, p)) ||
    l.rubble.some((t, i) => s.dug.includes(i) && equal(t, p)) ||
    l.lifts.some(
      (t, i) => p[0] === t.at[0] && p[1] === t.at[1] && p[2] === s.lifts[i],
    )
  );
}
function blocked(l, s, p) {
  return (
    (l.chests || []).some((c) => equal(c.at, p)) ||
    movingWallCells(l, s).some((c) => c.clearance == null && equal(c.at, p)) ||
    (l.walls || []).some((t) => equal(t, p)) ||
    l.doors.some((d) => equal(d.at, p) && !enabled(l, s, d.requires))
  );
}
export function transitionTower(l, s, a) {
  if (s.won) return { ok: false, reason: "Səviyyə tamamlanıb." };
  const n = structuredClone(s),
    b = n.actors[a.actor ?? 0];
  if (!b) return { ok: false, reason: "Blok yoxdur." };
  if (a.type === "link") {
    if (
      !l.linkStations?.some((pair) =>
        pair.every((p, i) => equal(p, s.actors[i])),
      )
    )
      return {
        ok: false,
        reason: "L bağ stansiyasında hər iki blok öz yerində dayanmalıdır.",
      };
    n.linked = !s.linked;
  } else if (a.type === "move" && s.linked) {
    if (l.dominoMode || l.forms || l.control)
      return {
        ok: false,
        reason: "Bu bağ rejimi yalnız adi kub cütü üçündür.",
      };
    const d = directions[a.dir],
      other = 1 - (a.actor ?? 0),
      opp = l.linkMode === "opposite" ? -1 : 1;
    for (const [i, mult] of [
      [a.actor ?? 0, 1],
      [other, opp],
    ]) {
      const p = s.actors[i];
      n.actors[i] = [p[0] + d[0] * mult, p[1] + d[1] * mult, p[2]];
      if (!supportedTower(l, s, n.actors[i], i) || blocked(l, s, n.actors[i]))
        return {
          ok: false,
          reason:
            "Cüt addımda tərəflərdən birinin yolu bağlıdır; heç biri hərəkət etmədi.",
        };
      if (n.faces)
        n.faces[i] = turnFaces(
          s.faces[i],
          mult === 1
            ? a.dir
            : Object.keys(directions).find(
                (k) => directions[k][0] === -d[0] && directions[k][1] === -d[1],
              ),
        );
    }
    if (equal(n.actors[0], s.actors[1]) || equal(n.actors[1], s.actors[0]))
      return {
        ok: false,
        reason: "Cüt addımda bloklar bir-birinin içindən keçmir.",
      };
  } else if (a.type === "move" || a.type === "dig") {
    const worldDir =
      a.type === "move"
        ? towerWorldDirection(l, s, a.actor ?? 0, a.dir)
        : a.dir;
    const d = directions[worldDir];
    if (!d) return { ok: false, reason: "İstiqamət seç." };
    const size = n.sizes[a.actor ?? 0];
    let p = [
      b[0] + d[0] * (a.type === "move" ? size : 1),
      b[1] + d[1] * (a.type === "move" ? size : 1),
      b[2],
    ];
    let nextDims;
    if (a.type === "move" && n.dims) {
      const [w, h, depth] = n.dims[a.actor ?? 0];
      p = d[0]
        ? [b[0] + (d[0] > 0 ? w : -h), b[1], b[2]]
        : [b[0], b[1] + (d[1] > 0 ? depth : -h), b[2]];
      nextDims = d[0] ? [h, w, depth] : [w, depth, h];
    }
    const seam =
      a.type === "move" ? seamTarget(l, s, a.actor ?? 0, worldDir) : null;
    if (seam) {
      if (!equal(bodyDims(s, a.actor ?? 0), [1, 1, 1]))
        return {
          ok: false,
          reason: "Sarınan kənardan yalnız 1×1×1 kub keçir. Əvvəl kiçil.",
        };
      p = [...seam.to];
      nextDims = n.dims ? [1, 1, 1] : undefined;
    }
    if (a.type === "dig") {
      if (size !== 1)
        return {
          ok: false,
          reason: "Qazma aləti yalnız kiçik kubda işləyir. G ilə kiçil.",
        };
      const i = l.rubble.findIndex((t) => equal(t, p));
      if (i < 0 || n.dug.includes(i))
        return {
          ok: false,
          reason: "Bu istiqamətdə qazılacaq material yoxdur.",
        };
      if (!enabled(l, n, l.excavatorRequires))
        return { ok: false, reason: "Ekskavatorun enerji şalterini əvvəl aç." };
      n.dug.push(i);
    } else {
      if (l.forms || l.dominoMode) {
        const layer = b[2],
          obstacles = [
            ...movingWallCells(l, n)
              .filter((c) => c.clearance == null)
              .map((c) => c.at),
            ...(l.walls || []),
            ...(l.chests || []).map((c) => c.at),
            ...l.rubble.filter((_, i) => !n.dug.includes(i)),
            ...l.doors
              .filter((t) => !enabled(l, n, t.requires))
              .map((t) => t.at),
          ]
            .filter((p) => p[2] === layer)
            .map((p) => p.slice(0, 2));
        const blocks = n.actors.map((v, i) => ({
          x: v[0],
          z: v[1],
          dims: bodyDims(n, i),
        }));
        const others = blocks.map((q, i) =>
          n.actors[i][2] === layer ? q : { ...q, x: 1000, z: 1000 },
        );
        if (
          rollCollision(
            {
              physicalRoll: true,
              walls: obstacles,
              ceilings: (l.ceilings || [])
                .filter((c) => c.at[2] === layer)
                .map((c) => ({ x: c.at[0], z: c.at[1], h: c.height }))
                .concat(
                  movingWallCells(l, n)
                    .filter((c) => c.clearance != null && c.at[2] === layer)
                    .map((c) => ({ x: c.at[0], z: c.at[1], h: c.clearance })),
                ),
              doors: [],
            },
            { blocks: others },
            a.actor ?? 0,
            worldDir,
          )
        )
          return {
            ok: false,
            reason:
              "Yuvarlanma qövsü divara, tavana və ya digər bloka dəyir. Kiçil və ya başqa tərəfdən yaxınlaş.",
          };
      }
      if (!supportedTower(l, n, p, a.actor ?? 0))
        return {
          ok: false,
          reason: (l.visitTiles || []).some((t) => equal(t.at, p))
            ? "Plitənin giriş haqqı bitib. Başqa yol seç və ya Z ilə geri al."
            : (l.phaseFloors || []).some((g) =>
                  g.cells.some((c) => equal(c, p)),
                )
              ? "Bu enerji döşəməsi sönükdür. Sensoru və ya şalter rejimini hazırla."
              : (l.observerFloors || []).some((g) =>
                    g.cells.some((c) => equal(c, p)),
                  )
                ? "Bu xanaya digər blokun müşahidəsi çatmır. Əvvəl partnyoru yaxınlaşdır."
                : l.lifts.length
                  ? "Qarşıda dayaq yoxdur. Liftin mərtəbəsini yoxla."
                  : "Qarşıda dayaq yoxdur. Başqa cığır seç.",
        };
      if (blocked(l, n, p))
        return {
          ok: false,
          reason: movingWallCells(l, n).some(
            (c) => c.clearance == null && equal(c.at, p),
          )
            ? "Panel bu xanadadır. Pult, faza və ya əyləc ilə əvvəl keçidi boşalt."
            : "Qapı bağlıdır; işıq xəttindəki şərti tamamla.",
        };
      if (n.actors.some((v, i) => i !== (a.actor ?? 0) && equal(v, p)))
        return { ok: false, reason: "Burada digər blok dayanıb." };
      n.actors[a.actor ?? 0] = p;
      if (nextDims) n.dims[a.actor ?? 0] = nextDims;
      if (n.faces)
        n.faces[a.actor ?? 0] = turnFaces(n.faces[a.actor ?? 0], worldDir);
      if (
        l.control?.kind === "polarity" &&
        !inControlZone(l, s, a.actor ?? 0) &&
        inControlZone(l, n, a.actor ?? 0)
      )
        n.polarity[a.actor ?? 0] = !n.polarity[a.actor ?? 0];
    }
  } else if (a.type === "wait") {
    if (!l.movingWalls?.some((w) => w.mode !== "manual"))
      return { ok: false, reason: "Bu səviyyədə gözləmə mexanizmi yoxdur." };
  } else if (a.type === "panel") {
    const i = (l.movingWalls || []).findIndex(
      (w) =>
        w.mode === "manual" &&
        (w.consoles || [w.console]).some((p) => equal(p, b)),
    );
    if (i < 0)
      return { ok: false, reason: "K nişanlı idarə pultunun üstünə gəl." };
    const w = l.movingWalls[i];
    if (!enabled(l, n, w.requires))
      return { ok: false, reason: "Panel motorunun icazəsi hələ verilməyib." };
    n.wallPhases[i] = (n.wallPhases[i] + 1) % w.frames.length;
  } else if (a.type === "deposit" || a.type === "withdraw") {
    const i = (l.depots || []).findIndex((t) => equal(t.at, b));
    if (i < 0) return { ok: false, reason: "Enerji terminalının üstünə gəl." };
    const actor = a.actor ?? 0;
    if (
      a.type === "withdraw" &&
      l.depots[i].withdrawActors &&
      !l.depots[i].withdrawActors.includes(actor)
    )
      return {
        ok: false,
        reason:
          "Bu terminaldan enerjini yalnız A götürə bilir; T ilə partnyora ötür.",
      };
    if (a.type === "deposit") {
      if (!n.energy[actor])
        return { ok: false, reason: "Blokda enerji yoxdur." };
      n.energy[actor]--;
      n.deposits[i]++;
    } else {
      if (!n.deposits[i]) return { ok: false, reason: "Terminal boşdur." };
      n.energy[actor]++;
      n.deposits[i]--;
    }
  } else if (a.type === "give") {
    if (l.allowTransfer === false)
      return { ok: false, reason: "Enerji ötürməsi bu sınaqda bağlıdır." };
    const i = n.actors.findIndex(
      (p, i) =>
        i !== (a.actor ?? 0) &&
        p[2] === b[2] &&
        Math.abs(p[0] - b[0]) + Math.abs(p[1] - b[1]) === 1,
    );
    if (i < 0 || !n.energy[a.actor ?? 0])
      return {
        ok: false,
        reason: "Enerji vermək üçün dolu blokla partnyorun yanına gəl.",
      };
    n.energy[a.actor ?? 0]--;
    n.energy[i]++;
  } else if (a.type === "portal") {
    const entry = (l.portals || []).find(
      (t) => equal(t.at, b) && (t.actor == null || t.actor === (a.actor ?? 0)),
    );
    const portal = entry ? resolvePortal(l, s, entry) : null;
    if (!portal || !enabled(l, s, portal.requires))
      return {
        ok: false,
        reason: "Aktiv portalın üstünə gəl. Ünvan xətti təyinatı göstərir.",
      };
    const actor = a.actor ?? 0;
    if (portal.entryDims && !equal(bodyDims(s, actor), portal.entryDims))
      return {
        ok: false,
        reason: "Portal girişində işarələnən bədən duruşunu hazırla.",
      };
    n.actors[actor] = [...portal.to];
    const turns = (((portal.rotate || 0) % 4) + 4) % 4;
    if (n.faces) n.faces[actor] = yawFaces(n.faces[actor], turns);
    if (n.dims && turns % 2) {
      const [w, h, d] = n.dims[actor];
      n.dims[actor] = [d, h, w];
    }
  } else if (a.type === "resize") {
    if (!l.forms || !(l.resizePads || []).some((p) => equal(p, b)))
      return { ok: false, reason: "Ölçü yalnız G işıqlı stansiyada dəyişir." };
    if (l.resizeActors && !l.resizeActors.includes(a.actor ?? 0))
      return { ok: false, reason: "Bu blok ölçüsünü dəyişmir." };
    n.sizes[a.actor ?? 0] = n.sizes[a.actor ?? 0] === 1 ? 2 : 1;
    if (!validBody(l, n, a.actor ?? 0))
      return {
        ok: false,
        reason:
          "Böyümək üçün dörd boş dayaq və kifayət qədər hündürlük lazımdır.",
      };
  } else if (a.type === "interact") {
    const chest = (l.chests || []).find(
      (c) =>
        !n.opened.includes(c.id) &&
        (c.actor == null || c.actor === (a.actor ?? 0)) &&
        c.at[2] === b[2] &&
        towerFootprint(b, bodyDims(n, a.actor ?? 0)).some(
          (p) => Math.abs(p[0] - c.at[0]) + Math.abs(p[1] - c.at[1]) === 1,
        ),
    );
    if (chest) {
      if (!enabled(l, n, chest.requires))
        return {
          ok: false,
          reason: "Sandıq kilidlidir. Əvvəl onun kiçik açarını tap.",
        };
      n.opened.push(chest.id);
      if (!n.keys.includes(chest.reward)) n.keys.push(chest.reward);
    } else {
      const pad = (l.faceRoute || []).findIndex((t) => equal(t.at, b));
      if (pad >= 0 && n.faceSequence < (l.faceRoute || []).length) {
        const t = l.faceRoute[pad];
        n.faceSequence =
          pad === n.faceSequence &&
          n.faces?.[a.actor ?? 0]?.[t.side || "v"] === t.value
            ? n.faceSequence + 1
            : 0;
      } else {
        const lever = l.switches.find(
          (t) =>
            (t.actor == null || t.actor === (a.actor ?? 0)) &&
            t.at[2] === b[2] &&
            towerFootprint(b, bodyDims(n, a.actor ?? 0)).some(
              (p) => Math.abs(t.at[0] - p[0]) + Math.abs(t.at[1] - p[1]) <= 1,
            ) &&
            (t.toggle || !n.switches.includes(t.id)),
        );
        if (lever) {
          if (!enabled(l, n, lever.requires))
            return { ok: false, reason: "Şalterin açarı hələ götürülməyib." };
          if (n.switches.includes(lever.id))
            n.switches = n.switches.filter((k) => k !== lever.id);
          else n.switches.push(lever.id);
        } else {
          const i = l.lifts.findIndex(
            (t) =>
              b[0] === t.at[0] &&
              b[1] === t.at[1] &&
              b[2] === n.lifts[l.lifts.indexOf(t)],
          );
          // Calling is explicit at a landing, never teleports a body into the shaft.
          const call =
            i < 0
              ? l.lifts.findIndex((t) => t.calls?.some((p) => equal(p, b)))
              : i;
          if (call < 0)
            return {
              ok: false,
              reason: "Şalterə yaxınlaş və ya lift platformasına çıx.",
            };
          const t = l.lifts[call];
          if (
            i >= 0 &&
            (bodyDims(n, a.actor ?? 0)[0] > 1 ||
              bodyDims(n, a.actor ?? 0)[2] > 1)
          )
            return {
              ok: false,
              reason:
                "Böyük kub təkxanalı lift platformasına sığmır. G stansiyasında kiçil.",
            };
          if (!enabled(l, n, t.requires))
            return {
              ok: false,
              reason: "Liftin kilidi bağlıdır; əlaqəli sensoru yoxla.",
            };
          const from = n.lifts[call],
            to =
              i < 0
                ? b[2]
                : t.stops[(t.stops.indexOf(from) + 1) % t.stops.length];
          if (to === from)
            return { ok: false, reason: "Lift artıq bu mərtəbədədir." };
          if (
            n.actors.some(
              (v) => v[0] === t.at[0] && v[1] === t.at[1] && v[2] === to,
            )
          )
            return { ok: false, reason: "Liftin təyinatı doludur." };
          for (const v of n.actors)
            if (v[0] === t.at[0] && v[1] === t.at[1] && v[2] === from)
              v[2] = to;
          n.lifts[call] = to;
        }
      }
    }
  } else return { ok: false, reason: "Naməlum əmr." };
  for (const k of l.keys)
    if (n.actors.some((p, i) => covers(n, i, k.at)) && !n.keys.includes(k.id))
      n.keys.push(k.id);
  (l.fragile || []).forEach((p, i) => {
    if (
      s.actors.some((_, j) => covers(s, j, p)) &&
      !n.actors.some((_, j) => covers(n, j, p)) &&
      !n.broken.includes(i)
    )
      n.broken.push(i);
  });
  for (const [i, t] of (l.visitTiles || []).entries()) {
    if (
      !s.actors.some((_, j) => covers(s, j, t.at)) &&
      n.actors.some((_, j) => covers(n, j, t.at))
    )
      n.visits[i]++;
    if (n.visits[i] > t.limit)
      return {
        ok: false,
        reason:
          "Bu plitənin giriş haqqı bitib. Başqa yol seç və ya Z ilə geri qayıt.",
      };
  }
  for (const [i, w] of (l.movingWalls || []).entries()) {
    if (w.mode !== "manual" && !(w.brake && enabled(l, n, w.brake))) {
      n.wallPhases[i] =
        w.mode === "advance"
          ? Math.min(w.frames.length - 1, n.wallPhases[i] + 1)
          : (n.wallPhases[i] + 1) % w.frames.length;
    }
    const old = w.frames[s.wallPhases[i]],
      next = w.frames[n.wallPhases[i]];
    if (s.wallPhases[i] !== n.wallPhases[i])
      for (let j = 0; j < old.length; j++) {
        const from = old[j],
          to = next[j];
        if (
          n.actors.some(
            (p, actor) =>
              bodyDims(n, actor)[1] > (w.clearance ?? 0) &&
              towerFootprint(p, bodyDims(n, actor)).some(
                (q) =>
                  q[2] === from[2] &&
                  q[0] >= Math.min(from[0], to[0]) &&
                  q[0] <= Math.max(from[0], to[0]) &&
                  q[1] >= Math.min(from[1], to[1]) &&
                  q[1] <= Math.max(from[1], to[1]),
              ),
          )
        )
          return {
            ok: false,
            reason:
              "Panelin növbəti hərəkəti bloka dəyir. Təhlükəsiz cibə çəkil, əyləci tut və ya Z ilə planı dəyiş.",
          };
      }
  }
  if (l.hardLink && linkDistance(n) > l.hardLink)
    return {
      ok: false,
      reason: `Bağın limiti ${l.hardLink}-dir. Əvvəl partnyoru yaxınlaşdır.`,
    };
  if (n.actors.some((p, i) => !validBody(l, n, i)))
    return {
      ok: false,
      reason: "Bu dəyişiklik digər blokun dayağını və ya qapısını bağlayır.",
    };
  n.moves++;
  n.won =
    l.goals.every(
      (p, i) =>
        equal(p, n.actors[i]) &&
        (!l.goalDims || equal(bodyDims(n, i), l.goalDims[i])) &&
        (!l.goalSizes || n.sizes[i] === l.goalSizes[i]),
    ) && enabled(l, n, l.exitRequires);
  return { ok: true, state: n };
}
export function towerStateKey(s) {
  return JSON.stringify([
    s.actors,
    s.dims,
    s.linked,
    s.sizes,
    s.lifts,
    [...s.keys].sort(),
    s.opened,
    [...s.switches].sort(),
    [...s.dug].sort(),
    s.broken,
    s.visits,
    s.energy,
    s.deposits,
    s.faces,
    s.faceSequence,
    s.polarity,
    s.wallPhases,
  ]);
}
export function solveTower(l, start = initialTower(l), budget = 150000) {
  const queue = [{ s: start, parent: -1, a: null }],
    seen = new Set([towerStateKey(start)]);
  for (let head = 0; head < queue.length && head < budget; head++) {
    const node = queue[head];
    if (node.s.won) {
      const path = [];
      let k = head;
      while (queue[k].parent !== -1) {
        path.push(queue[k].a);
        k = queue[k].parent;
      }
      return { path: path.reverse(), states: head, status: "solved" };
    }
    for (let actor = 0; actor < l.starts.length; actor++)
      for (const a of [
        { type: "interact", actor },
        ...(l.linkStations ? [{ type: "link", actor }] : []),
        ...(l.movingWalls?.length
          ? [
              { type: "wait", actor },
              { type: "panel", actor },
            ]
          : []),
        ...(l.portals?.length ? [{ type: "portal", actor }] : []),
        ...(l.depots?.length
          ? [
              { type: "deposit", actor },
              { type: "withdraw", actor },
            ]
          : []),
        ...(l.energy?.length && l.starts.length > 1
          ? [{ type: "give", actor }]
          : []),
        ...(l.forms ? [{ type: "resize", actor }] : []),
        ...Object.keys(directions).map((dir) => ({ type: "move", actor, dir })),
        ...Object.keys(directions).map((dir) => ({ type: "dig", actor, dir })),
      ]) {
        const r = transitionTower(l, node.s, a);
        if (!r.ok) continue;
        const k = towerStateKey(r.state);
        if (seen.has(k)) continue;
        seen.add(k);
        queue.push({ s: r.state, parent: head, a });
      }
  }
  return {
    path: null,
    states: seen.size,
    status: queue.length >= budget ? "budget" : "impossible",
  };
}
