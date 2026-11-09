import { towerLevels } from "./tower-levels.js";
import {
  campaignTotal,
  nextCampaignLevel,
  towerOrdinal,
  rememberPage,
  completeTower,
} from "./campaign-catalog.js";
import {
  initialTower,
  transitionTower,
  towerWorldDirection,
  enabled,
  bodyDims,
  linkDistance,
  relationHeld,
  resolvePortal,
  seamTarget,
} from "./tower-engine.js";
import { turnFaces } from "./lab-engine.js";
import { TowerScene } from "./tower-scene.js";
const $ = (s) => document.querySelector(s),
  scene = new TowerScene($("#canvas"));
let level,
  state,
  active = 0,
  history = [],
  dig = false,
  request = 0;
const worker = new Worker("./src/tower-worker.js", { type: "module" });
const names = {
  up: "yuxarı ↑",
  down: "aşağı ↓",
  left: "sola ←",
  right: "sağa →",
};
function message(t) {
  $("#message").textContent = t;
}
function render(action) {
  scene.update(state, active, action);
  $("#actors").replaceChildren(
    ...state.actors.map((p, i) => {
      const b = document.createElement("button");
      b.textContent = `${String.fromCharCode(65 + i)} · ${p[2] + 1}-ci mərtəbə · ${bodyDims(state, i).join("×")}${level.energy ? " · ⚡" + state.energy[i] : ""}`;
      b.classList.toggle("active", active === i);
      b.onclick = () => select(i);
      return b;
    }),
  );
  $("#stats").textContent =
    `${state.moves} gediş · Açar ${state.keys.length}/${new Set([...level.keys.map((k) => k.id), ...(level.chests || []).map((c) => c.reward)]).size} · Şalter ${state.switches.length}/${level.switches.length}`;
  $("#floor").textContent =
    `${towerOrdinal(level.id)}/${campaignTotal} · ${state.actors[active][2] + 1}-ci MƏRTƏBƏ / ${1 + Math.max(...level.tiles.map((p) => p[2]))}`;
  $("#learning").textContent =
    `${level.difficulty}${level.learning.optional ? " · İstəyə bağlı ekspert sınağı" : ""} · ${level.learning.teaches}`;
  $("#interact").textContent = level.chests?.length
    ? "F · Sandıq / lift / şalter"
    : "F · Lift / şalter";
  $("#resources").textContent = [
    ...(level.chests || []).map(
      (c, i) =>
        `Sandıq ${i + 1}: ${state.opened.includes(c.id) ? "AÇILIB" : "KİLİDLİ"}`,
    ),
    ...(state.keys || []).map((k) => level.keyNames?.[k] || k),
    ...(level.visitTiles || []).map(
      (t, i) =>
        `Giriş (${t.at[0]},${t.at[1]}): ${t.limit - state.visits[i]}/${t.limit}`,
    ),
    ...(level.phaseFloors || []).map(
      (g, i) =>
        `Dayaq ${i + 1}: ${enabled(level, state, g.requires) ? "AÇIQ" : "BOŞLUQ"}`,
    ),
    ...(level.observerFloors || []).map((g) =>
      g.permanentRequires && enabled(level, state, g.permanentRequires)
        ? "Müşahidə yolu: DAİMİ"
        : `Müşahidə: digər blok · radius ${g.radius}`,
    ),
    ...(level.movingWalls || []).map(
      (w, i) =>
        `Panel ${i + 1}: ${state.wallPhases[i] + 1}/${w.frames.length}${w.brake && enabled(level, state, w.brake) ? " · ƏYLƏC" : ""}`,
    ),
    ...(level.depots || []).map((t, i) => `D${i + 1}: ${state.deposits[i]} ⚡`),
    ...level.switches
      .filter((t) => t.toggle)
      .map(
        (t, i) =>
          `Şalter ${i + 1}: ${state.switches.includes(t.id) ? "AÇIQ" : "BAĞLI"}`,
      ),
  ].join(" · ");
  const f = state.faces?.[active];
  $("#portal-map").hidden = !level.portals?.length && !level.seams?.length;
  $("#portal-map").textContent = (level.portals || [])
    .map((p, i) => {
      const t = resolvePortal(level, state, p);
      return `P${i + 1}${p.actor == null ? "" : " · " + String.fromCharCode(65 + p.actor)} → ${t ? `${t.label || ""}${t.entryDims ? " · giriş " + t.entryDims.join("×") : ""} (${t.to[0]},${t.to[1]}) · mərtəbə ${t.to[2] + 1}${t.rotate ? " · " + (((t.rotate % 4) + 4) % 4) * 90 + "°" : ""}` : "BAĞLI — sensor seç"}`;
    })
    .concat(
      level.seams?.length ? ["α kənarı: oxla sarınma · yalnız kiçik kub"] : [],
    )
    .join("\n");
  $("#bond").hidden = !(
    level.relationDisplay ||
    level.hardLink ||
    level.linkStations
  );
  $("#bond").textContent = [
    level.hardLink ? `Məsafə: ${linkDistance(state)} / ${level.hardLink}` : "",
    level.relationDisplay
      ? `Uyğunluq: ${relationHeld(level, state, level.relationDisplay) ? "VAR" : "YOXDUR"}`
      : "",
    level.linkStations
      ? `Cüt addım: ${state.linked ? "BAĞLI" : "SƏRBƏST"}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
  $("#compass").hidden = !level.control;
  $("#compass").textContent =
    ["up", "down", "left", "right"]
      .map(
        (dir) =>
          `${names[dir]} düyməsi → dünyada ${names[towerWorldDirection(level, state, active, dir)]}`,
      )
      .join("\n") +
    (level.control?.kind === "polarity"
      ? `\nYaddaş: ${state.polarity[active] ? "TƏRS" : "NORMAL"}`
      : "");
  $("#orientation").hidden = !f;
  if (f)
    $("#orientation").textContent =
      `Üst ${f.u} · Alt ${f.v} · Şərq ${f.r} · Qərb ${f.l} · Cənub ${f.f} · Şimal ${f.b}\nNövbəti alt: ↑${turnFaces(f, towerWorldDirection(level, state, active, "up")).v}  ↓${turnFaces(f, towerWorldDirection(level, state, active, "down")).v}  ←${turnFaces(f, towerWorldDirection(level, state, active, "left")).v}  →${turnFaces(f, towerWorldDirection(level, state, active, "right")).v}${level.faceRoute ? "\nMöhür: " + state.faceSequence + "/" + level.faceRoute.length : ""}`;
  for (const b of document.querySelectorAll("[data-action]"))
    b.hidden =
      b.dataset.action === "link"
        ? !level.linkStations
        : b.dataset.action === "panel"
          ? !level.movingWalls?.some((w) => w.mode === "manual")
          : b.dataset.action === "wait"
            ? !level.movingWalls?.some((w) => w.mode !== "manual")
            : b.dataset.action === "portal"
              ? !level.portals?.length
              : !level.energy;
  $("#tool").hidden = !level.rubble.length;
  $("#tool").textContent = dig ? "X · QAZMA REJİMİ" : "X · Hərəkət";
  $("#tool").classList.toggle("active", dig);
  $("#undo").disabled = !history.length;
  $("#select").disabled = state.actors.length < 2;
  $("#resize").hidden = !level.forms;
  $("#win").hidden = !state.won;
  $("#result").textContent =
    `${state.moves} gediş · bütün fiziki şərtlər tamamlandı`;
  $("#next").textContent = !nextCampaignLevel("tower", level.id)
    ? "Səyahət xəritəsinə qayıt"
    : "Növbəti sınaq →";
}
function select(i) {
  if (scene.busy) return;
  active = i;
  render();
}
function perform(a, force = false) {
  if (scene.busy && !force) return false;
  const worldDir =
    a.type === "move"
      ? towerWorldDirection(level, state, a.actor ?? 0, a.dir)
      : a.dir;
  const r = transitionTower(level, state, a);
  const seam =
    a.type === "move" ? seamTarget(level, state, a.actor ?? 0, worldDir) : null;
  if (!r.ok) {
    message(r.reason);
    return false;
  }
  history.push(state);
  state = r.state;
  if (state.won) completeTower(level, state.moves);
  active = a.actor ?? active;
  request++;
  $("#hint").disabled = false;
  message(
    a.type === "dig"
      ? "Süxur çıxarıldı, yol açıldı. X ilə hərəkətə qayıt."
      : state.won
        ? "Səviyyə tamamlandı."
        : a.type === "interact"
          ? "Mexanizm işə düşdü."
          : "",
  );
  render({
    ...a,
    type: seam ? "portal" : a.type,
    dir: worldDir,
    paired: a.type === "move" && history.at(-1).linked,
  });
  if (
    a.type === "interact" &&
    level.faceRoute?.some((t) =>
      t.at.every((v, i) => v === state.actors[a.actor ?? 0][i]),
    )
  )
    message(
      state.faceSequence > history.at(-1).faceSequence
        ? `Möhür təsdiqləndi: ${state.faceSequence}/${level.faceRoute.length}.`
        : "Üz və ya sıra uyğun deyil: möhür yaddaşı sıfırlandı. Z ilə geri ala bilərsən.",
    );
  return true;
}
function load() {
  level =
    towerLevels.find((l) => l.id === location.hash.slice(1)) || towerLevels[0];
  state = initialTower(level);
  rememberPage("tower.html#" + level.id);
  active = 0;
  history = [];
  dig = false;
  request++;
  $("#hint").disabled = false;
  $("#title").textContent = level.title;
  $(".sidebar-scroll").scrollTop = 0;
  $(".eyebrow").textContent = level.chapter || "Lift və qazıntı · İlk bölmə";
  $("#focus").textContent =
    `${level.difficulty ? level.difficulty + " · " : ""}${level.focus}`;
  $("#intro").textContent = level.intro;
  if (level.movingWalls?.length)
    $("#intro").textContent +=
      " Qızılı tel kontur panelin növbəti yerini göstərir.";
  if ((level.depots || []).some((t) => t.withdrawActors))
    $("#intro").textContent +=
      " A işarəli terminaldan enerjini yalnız A geri götürür; B-yə T ilə ötür.";
  $("#level-total").textContent =
    `${towerLevels.length} səviyyə · qazıntı aktiv siyahıdan çıxarılıb`;
  scene.load(level, state);
  render();
  message("Qaydaları solda oxu. İlk addım üçün H bas.");
  for (const b of $("#levels").children)
    b.classList.toggle("active", b.dataset.id === level.id);
}
for (const l of towerLevels) {
  const b = document.createElement("button");
  b.textContent = `${l.id} · ${l.difficulty || "Lift"}`;
  b.title = l.title;
  b.dataset.id = l.id;
  b.onclick = () => {
    location.hash = l.id;
  };
  $("#levels").append(b);
}
function hint() {
  const id = ++request;
  $("#hint").disabled = true;
  message("Hazırkı vəziyyət üçün həll hesablanır…");
  worker.postMessage({ level, state, request: id });
}
worker.onmessage = ({ data: r }) => {
  if (r.request !== request) return;
  $("#hint").disabled = false;
  if (!r.path) {
    message(
      r.status === "budget"
        ? "Axtarış həddi doldu; bu, həllin olmadığı demək deyil."
        : "Bu vəziyyətdən həll yoxdur. Z ilə əvvəlki gedişə qayıt.",
    );
    return;
  }
  const a = r.path[0];
  if (!a) {
    message("Artıq tamamlanıb.");
    return;
  }
  const seamHint =
    a.type === "move"
      ? seamTarget(
          level,
          state,
          a.actor,
          towerWorldDirection(level, state, a.actor, a.dir),
        )
      : null;
  if (seamHint) {
    message(
      `${String.fromCharCode(65 + a.actor)} bloku: ${names[a.dir]} düyməsini bas — α kənarından (${seamHint.to[0]},${seamHint.to[1]}) xanasına keç. Qalan həll: ${r.path.length} gediş.`,
    );
    return;
  }
  if (level.control && a.type === "move") {
    message(
      `${String.fromCharCode(65 + a.actor)} bloku: ${names[a.dir]} düyməsini bas — blok dünyada ${names[towerWorldDirection(level, state, a.actor, a.dir)]} gedəcək. Qalan həll: ${r.path.length} gediş.`,
    );
    return;
  }
  if (
    a.type === "interact" &&
    level.faceRoute?.some((t) =>
      t.at.every((v, i) => v === state.actors[a.actor][i]),
    )
  ) {
    message(
      `${String.fromCharCode(65 + a.actor)} bloku: F bas — düzgün üzlə bu möhürü təsdiqlə. Qalan həll: ${r.path.length} gediş.`,
    );
    return;
  }
  message(
    `${String.fromCharCode(65 + a.actor)} bloku: ${{ link: "L bas — stansiyada iki bloku bağla və ya ayır.", wait: "SPACE bas — təhlükəsiz yerdə bir faza gözlə.", panel: "K bas — idarə pultunda paneli çək.", portal: "P bas — portaldan keç.", deposit: "Q bas — terminala bir token qoy.", withdraw: "E bas — terminaldan bir token götür.", give: "T bas — qonşu partnyora bir token ver." }[a.type] || (a.type === "resize" ? "G bas — stansiyada ölçünü dəyiş." : a.type === "interact" ? "F bas — qonşu sandığı, şalteri və ya lifti işə sal." : a.type === "dig" ? `X ilə qazma rejimini aç, ${names[a.dir]} qaz.` : `Hərəkət rejimində ${names[a.dir]} get.`)} Qalan həll: ${r.path.length} gediş.`,
  );
};
worker.onerror = () => {
  message("Hint hesablaması açıla bilmədi. Səhifəni yenilə.");
  $("#hint").disabled = false;
};
function undo() {
  if (scene.busy || !history.length) return;
  state = history.pop();
  request++;
  $("#hint").disabled = false;
  scene.load(level, state);
  render();
  message("Bloklar, liftlər, qazıntı və kilidlər birlikdə geri alındı.");
}
function reset() {
  load();
}
function toggle() {
  dig = !dig;
  render();
  message(
    dig ? "Oxla qonşu süxuru qaz. X hərəkətə qaytarır." : "Hərəkət rejimi.",
  );
}
$("#hint").onclick = hint;
$("#undo").onclick = undo;
$("#reset").onclick = reset;
$("#tool").onclick = toggle;
$("#interact").onclick = () => perform({ type: "interact", actor: active });
$("#resize").onclick = () => perform({ type: "resize", actor: active });
for (const b of document.querySelectorAll("[data-action]"))
  b.onclick = () => perform({ type: b.dataset.action, actor: active });
$("#select").onclick = () => select((active + 1) % state.actors.length);
$("#next").onclick = () => {
  const next = nextCampaignLevel("tower", level.id);
  if (next?.kind === "tower") location.hash = next.id;
  else location.href = next?.href || "index.html?levels=1";
};
$("#layers").onclick = () => {
  scene.layerOnly = !scene.layerOnly;
  scene.visibility();
  $("#layers").textContent = scene.layerOnly
    ? "Yalnız aktiv mərtəbə"
    : "Bütün mərtəbələr";
};
for (const b of document.querySelectorAll("[data-dir]"))
  b.onclick = () =>
    perform({ type: dig ? "dig" : "move", actor: active, dir: b.dataset.dir });
document.addEventListener("keydown", (e) => {
  if (
    e.ctrlKey ||
    e.metaKey ||
    e.altKey ||
    e.repeat ||
    e.target.matches("summary")
  )
    return;
  const k = e.key.toLowerCase(),
    dir = {
      arrowup: "up",
      w: "up",
      arrowdown: "down",
      s: "down",
      arrowleft: "left",
      a: "left",
      arrowright: "right",
      d: "right",
    }[k];
  if (dir) {
    e.preventDefault();
    perform({ type: dig ? "dig" : "move", actor: active, dir });
  } else if (k === "tab") {
    e.preventDefault();
    select((active + 1) % state.actors.length);
  } else if (k === "f") perform({ type: "interact", actor: active });
  else if (k === "x") toggle();
  else if (k === "z") undo();
  else if (k === "r") reset();
  else if (k === "h") hint();
  else if (k === "g") perform({ type: "resize", actor: active });
  else if (k === " ") {
    e.preventDefault();
    perform({ type: "wait", actor: active });
  } else if (k === "k") perform({ type: "panel", actor: active });
  else if (k === "l") perform({ type: "link", actor: active });
  else if ({ p: "portal", q: "deposit", e: "withdraw", t: "give" }[k])
    perform({
      type: { p: "portal", q: "deposit", e: "withdraw", t: "give" }[k],
      actor: active,
    });
});
addEventListener("hashchange", load);
load();
if (new URLSearchParams(location.search).has("test"))
  window.towerTest = {
    get level() {
      return level;
    },
    get state() {
      return state;
    },
    scene,
    perform: (a) => perform(a, true),
    undo,
    select,
    reset,
  };
