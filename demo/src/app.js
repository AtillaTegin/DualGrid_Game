import { levels, showcase } from "./levels.js";
import { initial, step, copy, canExchange, solve, stateKey } from "./logic.js";
import { Observatory } from "./scene.js";
import { TutorialPlayer, lessons } from "./tutorials.js";
import { describeAction } from "./hint-utils.js";
import { journeyLevels } from "./journey-data.js";
import {
  towerLevels,
  campaignTotal,
  campaignOrdinal,
  nextCampaignLevel,
  lastCampaignPage,
  rememberPage,
  readTowerProgress,
} from "./campaign-catalog.js";
import {
  retainedLegacyIds,
  activeCampaignIds,
  canonicalLegacyId,
} from "./campaign-hardening.js";
const hintRoutes = new Map();
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
let scene,
  state,
  index = 0,
  active = 0,
  history = [],
  playing = false,
  busy = false,
  run = 0,
  progress = { best: {}, last: 0, tutorials: {} },
  sound = false,
  audio,
  coach,
  hintWorker,
  hintTimer,
  hintRequest = 0,
  hintPending = false,
  hintOpen = false,
  currentHint = null;
try {
  const stored = localStorage.getItem("dual-grid-learn-v3");
  if (stored) progress = { ...progress, ...JSON.parse(stored) };
  else {
    const old = JSON.parse(localStorage.getItem("dual-grid-v1") || "{}");
    for (const l of levels)
      if (l.legacyId && old.best?.[l.legacyId])
        progress.best[l.id] = old.best[l.legacyId];
  }
} catch {}
if (!progress.best || typeof progress.best !== "object") progress.best = {};
if (!progress.tutorials || typeof progress.tutorials !== "object")
  progress.tutorials = {};
function save() {
  try {
    localStorage.setItem("dual-grid-learn-v3", JSON.stringify(progress));
  } catch {}
}
function tone(type) {
  if (!sound) return;
  try {
    audio ??= new AudioContext();
    audio.resume();
    const base =
      {
        move: 120,
        switch: 260,
        exchange: 420,
        win: 520,
        fall: 65,
        blocked: 85,
      }[type] || 160;
    [0, ...(type === "win" ? [0.16, 0.32] : [])].forEach((delay, i) => {
      const osc = audio.createOscillator(),
        gain = audio.createGain();
      osc.type = type === "fall" ? "sine" : "triangle";
      osc.frequency.setValueAtTime(
        base * (i === 1 ? 1.25 : i === 2 ? 1.5 : 1),
        audio.currentTime + delay,
      );
      osc.frequency.exponentialRampToValueAtTime(
        base * 0.6,
        audio.currentTime + delay + 0.3,
      );
      gain.gain.setValueAtTime(0.0001, audio.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(
        0.055,
        audio.currentTime + delay + 0.02,
      );
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audio.currentTime + delay + 0.45,
      );
      osc.connect(gain).connect(audio.destination);
      osc.start(audio.currentTime + delay);
      osc.stop(audio.currentTime + delay + 0.5);
    });
  } catch {}
}
let toastTimer;
function toast(message) {
  $("#toast").textContent = message;
  $("#toast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 3300);
}
function closeDialogs() {
  if (coach?.dialog.open) coach.close(false);
  $$("dialog[open]").forEach((d) => d.close());
}
function update() {
  const level = levels[index];
  $("#moves").textContent = String(state.moves).padStart(2, "0");
  $("#best").textContent = progress.best[level.id] ?? "—";
  $$(".entity").forEach((el, i) => {
    el.hidden = !state.blocks[i];
    if (!state.blocks[i]) return;
    const b = state.blocks[i];
    el.classList.toggle("selected", i === active);
    $("#role-" + (i ? "b" : "a")).textContent =
      `1×1×${b.size ?? 2}${level.showRoles ? " · " + (b.heavy ? "AĞIR" : "YÜNGÜL") : b.size === 1 ? " · KUB" : " · UZUN BLOK"}`;
  });
  $("#exchange").hidden = !level.pads;
  $("#exchange").disabled = !canExchange(level, state) || busy;
  $("#undo").disabled = !history.length || busy;
  $$("#level-nav button").forEach((b, i) => {
    b.classList.toggle("active", Number(b.dataset.level) === index + 1);
    b.classList.toggle("complete", !!progress.best[b.dataset.level]);
  });
  scene.sync(state, active);
}
function load(i) {
  rememberPage(null);
  hideHints();
  run++;
  index =
    canonicalLegacyId(Math.max(0, Math.min(levels.length - 1, i)) + 1) - 1;
  active = 0;
  busy = false;
  history = [];
  state = initial(levels[index]);
  playing = true;
  closeDialogs();
  document.body.classList.add("playing");
  $("#home").hidden = true;
  ["sidebar", "level-nav", "controls"].forEach(
    (id) => ($("#" + id).hidden = false),
  );
  $("#touch-controls").hidden = false;
  const l = levels[index];
  $("#chapter").textContent =
    `SƏVİYYƏ ${String(l.id).padStart(2, "0")} · ${campaignOrdinal("legacy", l.id)} / ${campaignTotal}${l.difficulty ? " · " + l.difficulty : ""}`;
  $("#circuit-legend").hidden = new Set(l.plates.map((p) => p.group)).size < 2;
  $("#level-title").textContent = l.title;
  $("#subtitle").textContent = l.subtitle;
  $("#instruction").textContent = l.intro;
  scene.load(l, state);
  progress.last = index;
  save();
  update();
  requestAnimationFrame(() =>
    $("#level-nav button.active")?.scrollIntoView({
      block: "nearest",
      inline: "center",
    }),
  );
  const unseen = l.features.filter((f) => !progress.tutorials[f]);
  if (unseen.length) coach.open(unseen);
}
function home() {
  hideHints();
  run++;
  playing = false;
  busy = false;
  closeDialogs();
  document.body.classList.remove("playing");
  $("#home").hidden = false;
  ["sidebar", "level-nav", "controls", "touch-controls"].forEach(
    (id) => ($("#" + id).hidden = true),
  );
  $("#continue").hidden =
    !lastCampaignPage() && !Object.keys(progress.best).length && !progress.last;
  const l = showcase,
    s = initial(l);
  s.blocks[0] = { x: 1, z: 4, o: "U", heavy: true };
  s.blocks[1] = { x: 7, z: 2, o: "U", heavy: false };
  scene.load(l, s);
  scene.sync(s, 0);
}
function select(i) {
  if (!playing || busy || $("dialog[open]") || !state.blocks[i]) return;
  active = i;
  scene.preview.visible = false;
  update();
  hintVisual();
  tone("switch");
}
function perform(action) {
  if (!playing || busy || $("dialog[open]")) return;
  const result = step(levels[index], state, action);
  if (!result.ok) {
    const msg = {
      pads: "Hər iki blok cüt mübadilə meydançalarında DİK dayanmalıdır.",
      blocked:
        "Bu sahədə maneə və ya digər blok var. Keçidi aç və ya ona yol saxla.",
      light: "Bu keçid yalnız yüngül blok üçündür. Rolları dəyiş.",
    };
    toast(msg[result.reason] || "Bu hərəkət indi mümkün deyil.");
    tone("blocked");
    return;
  }
  cancelHintSearch();
  currentHint = null;
  scene.clearHint();
  clearHintMarks();
  const before = copy(state);
  history.push({ state: before, active });
  state = result.state;
  busy = true;
  const token = run;
  tone(action === "exchange" ? "exchange" : state.dead ? "fall" : "move");
  scene.transition(before, state, action, () => {
    if (token !== run) return;
    busy = false;
    update();
    if (state.dead) showResult(false);
    else if (state.won) {
      const old = progress.best[levels[index].id];
      if (!old || state.moves < old)
        progress.best[levels[index].id] = state.moves;
      save();
      update();
      tone("win");
      showResult(true);
    } else if (hintOpen) requestHint();
  });
  update();
}
function undo() {
  if (busy || !history.length) return;
  closeDialogs();
  cancelHintSearch();
  currentHint = null;
  scene.clearHint();
  clearHintMarks();
  const h = history.pop();
  state = h.state;
  active = h.active;
  scene.animation = null;
  state.blocks.forEach((b, i) => scene.setPose(scene.blocks[i], b));
  update();
  tone("switch");
  if (hintOpen) requestHint();
}
function showResult(won) {
  const last = index + 1 === retainedLegacyIds.at(-1);
  $("#result-label").textContent = won
    ? "REZONANS TAMAMLANDI"
    : "YOL BURADA BİTMİR";
  $("#result-symbol").textContent = won ? "◇ ◈" : "↶";
  $("#result-title").textContent = won
    ? last
      ? "Birlikdə mümkün oldu."
      : "İki yaddaş. Bir ahəng."
    : "Bir gediş geri.";
  $("#result-copy").textContent = won
    ? last
      ? `Başlanğıc fəsillər tamamlandı. İndi 9 fərqli mexanika kombinasiyası səni gözləyir.`
      : `${state.moves} gediş. ${state.blocks.length === 1 ? "A kubu öz çıxışındadır." : "Hər iki blok öz çıxışındadır."} Növbəti addımda öyrənməyə davam et.`
    : "Bir blokun dayağı itdi. Bütün vəziyyəti bir addımla geri qaytara bilərsən.";
  $("#next").textContent = won
    ? last
      ? "YENİ KOMBİNASİYALARA KEÇ ↗"
      : "NÖVBƏTİ SƏVİYYƏ ↗"
    : "SON GEDİŞİ GERİ AL ↶";
  $("#result-secondary").textContent = won
    ? "Bu səviyyəni yenidən oyna"
    : "Səviyyəni yenidən başla";
  $("#next").onclick = () => {
    if (!won) return undo();
    const next = nextCampaignLevel("legacy", levels[index].id);
    if (next?.kind === "legacy") load(Number(next.id) - 1);
    else location.href = next?.href || "index.html?levels=1";
  };
  $("#result-secondary").onclick = () => load(index);
  $("#result").showModal();
}
function cancelHintSearch() {
  hintRequest++;
  hintPending = false;
  clearTimeout(hintTimer);
  if (hintWorker) {
    hintWorker.terminate();
    hintWorker = null;
  }
}
function clearHintMarks() {
  $$("[data-dir],.entity,#exchange").forEach((e) =>
    e.classList.remove("hinted"),
  );
}
function hideHints() {
  cancelHintSearch();
  hintOpen = false;
  currentHint = null;
  $("#hint-panel").hidden = true;
  clearHintMarks();
  scene?.clearHint();
}
function hintVisual() {
  if (!currentHint || !playing) return;
  const a = currentHint.action;
  clearHintMarks();
  if (typeof a === "object") {
    $$("[data-block]")[a.block]?.classList.add("hinted");
    $(`[data-dir="${a.dir}"]`)?.classList.add("hinted");
    scene.showHint(a, step(levels[index], state, a).state);
  } else if (a === "exchange") {
    $("#exchange").classList.add("hinted");
    scene.clearHint();
  }
}
function displayHint(action, message) {
  currentHint = { action, key: stateKey(state) };
  const d = describeAction(action);
  $("#hint-title").textContent = d.title;
  $("#hint-arrow").textContent = d.arrow;
  $("#hint-text").textContent = message || d.detail;
  $("#hint-apply").hidden = false;
  $("#hint-apply").textContent =
    action === "undo" ? "Geri al və kömək et ↶" : "Göstərilən addımı et →";
  if (typeof action === "object") active = action.block;
  update();
  hintVisual();
  $("#hint-panel").scrollIntoView({ block: "nearest" });
}
function requestHint() {
  if (!playing || busy || state.won || $("dialog[open]")) return;
  cancelHintSearch();
  hintOpen = true;
  $("#hint-panel").hidden = false;
  $("#hint-apply").hidden = true;
  currentHint = null;
  scene.clearHint();
  clearHintMarks();
  if (state.dead) {
    displayHint("undo");
    return;
  }
  const request = hintRequest,
    levelId = levels[index].id,
    snapshot = stateKey(state),
    token = run;
  const cached = hintRoutes.get(levelId + "|" + snapshot);
  if (cached?.length) {
    displayHint(cached[0]);
    return;
  }
  hintPending = true;
  $("#hint-title").textContent = "YOL HESABLANIR…";
  $("#hint-arrow").textContent = "…";
  $("#hint-text").textContent =
    "Cari vəziyyətindən konkret növbəti addım axtarılır. Oyun donmur; istəsən oynamağa davam edə bilərsən.";
  hintWorker = new Worker(new URL("./hint-worker.js", import.meta.url), {
    type: "module",
  });
  const fail = (message) => {
    if (request !== hintRequest) return;
    hintPending = false;
    clearTimeout(hintTimer);
    $("#hint-title").textContent = "YENİDƏN YOXLAYAQ";
    $("#hint-text").textContent = message;
    $("#hint-arrow").textContent = "↻";
  };
  hintWorker.onmessage = ({ data }) => {
    if (
      data.request !== hintRequest ||
      run !== token ||
      snapshot !== stateKey(state)
    )
      return;
    hintPending = false;
    clearTimeout(hintTimer);
    if (data.status === "ok" && data.path?.length) {
      let p = copy(state);
      for (let i = 0; i < data.path.length; i++) {
        hintRoutes.set(levelId + "|" + stateKey(p), data.path.slice(i));
        const r = step(levels[index], p, data.path[i]);
        if (!r.ok) break;
        p = r.state;
      }
      if (hintRoutes.size > 2000) hintRoutes.clear();
      displayHint(data.path[0]);
    } else if (data.status === "undo" || data.status === "no-route") {
      if (history.length)
        displayHint(
          "undo",
          "Bu vəziyyət çıxışı kilidləyib. Əvvəl Z ilə son gedişi geri alaq; sonra yenidən uyğun addımı göstərəcəyəm.",
        );
      else
        fail(
          "Başlanğıc həlli mövcuddur. R ilə yenidən başla və köməyi təkrar aç.",
        );
    } else if (data.status === "limit")
      fail(
        "Axtarış limiti çatdı. Bu, həllin olmadığı demək deyil. Köməyi yenidən istəyə və ya Z ilə əvvəlki vəziyyətə qayıda bilərsən.",
      );
    else fail("Kömək hazır olmadı. H ilə yenidən yoxla.");
  };
  hintWorker.onerror = () =>
    fail("Kömək xidməti açıla bilmədi. Səhifəni yeniləyib yenidən yoxla.");
  hintTimer = setTimeout(() => {
    if (request === hintRequest) {
      hintWorker?.terminate();
      hintWorker = null;
      fail(
        "Axtarış bu dəfə uzandı. Bu, həllin olmadığı demək deyil. H ilə yenidən yoxla və ya son gedişi Z ilə geri al.",
      );
    }
  }, 15000);
  hintWorker.postMessage({ request, levelId, state: copy(state) });
}
function applyHint() {
  if (!currentHint || busy || currentHint.key !== stateKey(state)) return;
  const a = currentHint.action;
  if (a === "undo") {
    undo();
    return;
  }
  if (typeof a === "object") active = a.block;
  perform(a);
}
try {
  scene = new Observatory($("#stage"));
} catch (e) {
  $("#fatal").hidden = false;
  $("#fatal-message").textContent = e.message;
  throw e;
}
coach = new TutorialPlayer((pages) => {
  pages.forEach((p) => (progress.tutorials[p] = true));
  save();
});
$("#level-count").textContent = String(campaignTotal);
$("#campaign-summary").textContent =
  `${campaignTotal} aktiv səviyyə: ${activeCampaignIds.length} əsas və ${towerLevels.length} yeni məkan/mod tapmacası. Hamısı buradan açılır.`;
$("#level-nav").addEventListener(
  "wheel",
  (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      $("#level-nav").scrollLeft += e.deltaY;
    }
  },
  { passive: false },
);
levels.forEach((l, i) => {
  if (!retainedLegacyIds.includes(l.id)) return;
  const b = document.createElement("button");
  b.textContent = String(i + 1).padStart(2, "0");
  b.dataset.level = l.id;
  b.title = `${l.title}${l.difficulty ? " · " + l.difficulty : ""}`;
  b.setAttribute("aria-label", `${i + 1}. ${l.title}`);
  b.onclick = () => load(i);
  $("#level-nav").appendChild(b);
});
const chapterTitles = [
  "İlk beş addım",
  "Ölçü və ağırlıq",
  "Uzun bloklar və yeni yollar",
  "Planı genişləndir",
  "Əlaqələri birləşdir",
  "Dərin sınaqlar",
];
for (let chapter = 0; chapter < 6; chapter++) {
  const section = document.createElement("section"),
    h = document.createElement("h3");
  h.textContent = `${chapter + 1}. ${chapterTitles[chapter]}`;
  section.appendChild(h);
  const grid = document.createElement("div");
  grid.className = "chapter-cards";
  for (const l of levels.slice(chapter * 10, chapter * 10 + 10)) {
    if (!retainedLegacyIds.includes(l.id)) continue;
    const b = document.createElement("button");
    b.className = "level-card";
    b.dataset.level = l.id;
    b.innerHTML = `<span>${String(l.id).padStart(2, "0")}</span><strong></strong>`;
    b.querySelector("strong").textContent = l.title;
    b.onclick = () => load(l.id - 1);
    grid.appendChild(b);
  }
  section.appendChild(grid);
  if (grid.children.length) $("#campaign-grid").appendChild(section);
}
for (const family of ["C"]) {
  const section = document.createElement("section"),
    h = document.createElement("h3"),
    grid = document.createElement("div");
  h.textContent = "Fərqli mexanika kombinasiyaları";
  grid.className = "chapter-cards";
  for (const l of journeyLevels.filter((l) => l.family === family)) {
    const b = document.createElement("button");
    b.className = "journey-card level-card";
    b.dataset.journey = l.id;
    b.innerHTML = `<span>${l.id}</span><strong>${l.title}</strong>`;
    b.onclick = () => (location.href = "campaign.html#" + l.id);
    grid.append(b);
  }
  section.append(h, grid);
  $("#campaign-grid").append(section);
}
for (const [prefix, title] of Object.entries({
  V: "Lift və mərtəbələr",
  S: "Ölçü və yük",
  H: "Enerji, portal və yollar",
  F: "Üzlər və orientasiya",
  R: "Koordinatlar və polarite",
  W: "Divarlar və pistonlar",
  B: "Rezonans və cüt addım",
  T: "Portal və məkan bağlantıları",
  G: "Zəmin yaddaşı və müşayiət",
})) {
  const group = towerLevels.filter((l) => l.id.startsWith(prefix));
  if (!group.length) continue;
  const section = document.createElement("section"),
    h = document.createElement("h3"),
    grid = document.createElement("div");
  h.textContent = title;
  section.id = "chapter-" + prefix;
  const jump = document.createElement("button");
  jump.textContent = title + " · " + group.length;
  jump.dataset.jump = prefix;
  jump.onclick = () =>
    section.scrollIntoView({ block: "start", behavior: "smooth" });
  $("#campaign-shortcuts").append(jump);
  grid.className = "chapter-cards";
  for (const l of group) {
    const b = document.createElement("button");
    b.className = "tower-card level-card";
    b.dataset.tower = l.id;
    b.innerHTML = `<span>${l.id}</span><strong></strong><small></small>`;
    b.querySelector("strong").textContent = l.title;
    b.querySelector("small").textContent =
      l.difficulty + (l.learning.optional ? " · İSTƏYƏ BAĞLI" : "");
    b.onclick = () => (location.href = "tower.html#" + l.id);
    grid.append(b);
  }
  section.append(h, grid);
  $("#campaign-grid").append(section);
}
// Keep the first five introductory stages before the new learning chapters.
const courseMenu = $("#campaign-grid"),
  menuSections = [...courseMenu.children];
for (const section of menuSections.filter((s) =>
  s.querySelector("[data-tower]"),
))
  courseMenu.insertBefore(section, menuSections[1] || null);
$("#levels-menu").onclick = () => {
  $$(".level-card").forEach((b) => {
    b.classList.toggle("complete", !!progress.best[b.dataset.level]);
    b.classList.toggle(
      "active",
      playing && Number(b.dataset.level) === index + 1,
    );
  });
  let extension = {};
  try {
    extension = JSON.parse(localStorage.getItem("dual-grid-journey-v1")) || {};
  } catch {}
  $$(".journey-card").forEach((b) =>
    b.classList.toggle(
      "complete",
      !!extension[b.dataset.journey]?.completed &&
        extension[b.dataset.journey]?.revision ===
          journeyLevels.find((l) => l.id === b.dataset.journey).revision,
    ),
  );
  const towerProgress = readTowerProgress();
  $$(".tower-card").forEach((b) => {
    const p = towerProgress[b.dataset.tower],
      l = towerLevels.find((l) => l.id === b.dataset.tower);
    b.classList.toggle("complete", !!p?.completed && p.version === l.version);
  });
  $("#campaign-menu").showModal();
};
$("#campaign-close").onclick = () => $("#campaign-menu").close();
$("#start").onclick = () => load(0);
$("#continue").onclick = () => {
  const href = lastCampaignPage();
  if (href) location.href = href;
  else load(progress.last || 0);
};
$("#brand").onclick = home;
$("#undo").onclick = undo;
$("#restart").onclick = () => load(index);
$("#exchange").onclick = () => perform("exchange");
$$(".entity").forEach((b, i) => (b.onclick = () => select(i)));
$("#hint").onclick = requestHint;
$("#hint-apply").onclick = applyHint;
$("#hint-close").onclick = hideHints;
$("#rules").onclick = () => {
  if (playing && !busy) coach.open([...levels[index].features].reverse());
};
$("#sound").onclick = () => {
  sound = !sound;
  $("#sound").textContent = sound ? "SƏS: AÇIQ" : "SƏS: BAĞLI";
  $("#sound").setAttribute("aria-pressed", String(sound));
  tone("switch");
};
$("#fullscreen").onclick = async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch {
    toast("Tam ekran üçün brauzerdə F11 istifadə et.");
  }
};
$("#settings").onclick = () => $("#preferences").showModal();
$("#close-preferences").onclick = () => $("#preferences").close();
$("#quality").onchange = (e) => scene.quality(e.target.value === "high");
$("#reduced").checked = matchMedia("(prefers-reduced-motion:reduce)").matches;
scene.reduced = $("#reduced").checked;
$("#reduced").onchange = (e) => (scene.reduced = e.target.checked);
$$("[data-dir]").forEach((b) => {
  b.onclick = () => perform({ block: active, dir: b.dataset.dir });
  b.onpointerenter = () => {
    if (playing && !busy && !state.dead && !state.won) {
      const a = { block: active, dir: b.dataset.dir },
        r = step(levels[index], state, a);
      scene.previewMove(state.blocks[active], a.dir, r.ok && !r.state.dead);
    }
  };
  b.onpointerleave = () => {
    scene.preview.visible = false;
    hintVisual();
  };
});
document.addEventListener("keydown", (e) => {
  if (["INPUT", "SELECT", "TEXTAREA"].includes(e.target.tagName)) return;
  if ($("dialog[open]")) {
    if (e.key.toLowerCase() === "z" && $("#result").open) {
      e.preventDefault();
      undo();
    }
    return;
  }
  if (e.key === "Escape") {
    if (playing) home();
    return;
  }
  if (!playing) return;
  const dir =
    {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      w: "up",
      s: "down",
      a: "left",
      d: "right",
    }[e.key] ||
    { w: "up", s: "down", a: "left", d: "right" }[e.key.toLowerCase()];
  if (dir) {
    e.preventDefault();
    if (!e.repeat) perform({ block: active, dir });
  } else if (e.key === "Tab" || e.code === "Space") {
    e.preventDefault();
    if (!e.repeat) select((active + 1) % state.blocks.length);
  } else if (e.key === "1" || e.key === "2") select(Number(e.key) - 1);
  else if (e.key.toLowerCase() === "e") perform("exchange");
  else if (e.key.toLowerCase() === "z") {
    e.preventDefault();
    undo();
  } else if (e.key.toLowerCase() === "r") load(index);
  else if (e.key.toLowerCase() === "h") {
    e.preventDefault();
    requestHint();
  }
});
document.addEventListener("visibilitychange", () => {
  if (audio) {
    if (document.hidden) audio.suspend();
    else if (sound) audio.resume();
  }
});
// Explicit test hook; never needed for ordinary play or presentation.
if (new URLSearchParams(location.search).has("test"))
  window.demoTest = {
    load,
    perform,
    undo,
    home,
    select,
    requestHint,
    applyHint,
    skipLessons() {
      coach.close(false);
      for (const key of Object.keys(lessons)) progress.tutorials[key] = true;
    },
    lesson() {
      return coach.pages[coach.page];
    },
    resetLessons() {
      progress.tutorials = {};
      save();
    },
    get currentHint() {
      return currentHint;
    },
    finishMotion() {
      const a = scene.animation;
      if (a) {
        state.blocks.forEach((b, i) => scene.setPose(scene.blocks[i], b));
        scene.animation = null;
        scene.sync(state, active);
        a.onDone?.();
      }
    },
    get state() {
      return copy(state);
    },
    get busy() {
      return busy;
    },
    get active() {
      return active;
    },
    get index() {
      return index;
    },
    solution() {
      return solve(levels[index], state).path;
    },
    setFast() {
      scene.reduced = true;
    },
    get scene() {
      return scene;
    },
  };
home();
if (new URLSearchParams(location.search).has("levels"))
  $("#levels-menu").click();

const initialLevel = Number(new URLSearchParams(location.search).get("level"));
if (initialLevel && retainedLegacyIds.includes(initialLevel))
  load(initialLevel - 1);
