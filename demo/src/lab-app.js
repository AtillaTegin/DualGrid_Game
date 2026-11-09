import {
  experiments as labCases,
  byId as labById,
  families,
} from "./lab-data.js";
import { journeyLevels, journeyById, removedMods } from "./journey-data.js";
import { initial, step, clone, worldDirection } from "./lab-engine.js";
import { LabScene } from "./lab-scene.js";
import { activeCampaignIds } from "./campaign-hardening.js";
import {
  campaignTotal,
  campaignOrdinal,
  nextCampaignLevel,
  rememberPage,
} from "./campaign-catalog.js";
const campaign = document.body.dataset.mode === "campaign";
const experiments = campaign ? journeyLevels : labCases,
  byId = campaign ? journeyById : labById;
const storageKey = campaign ? "dual-grid-journey-v1" : "dual-grid-lab-v1";
const complete = (id) =>
  !!saved[id]?.completed &&
  (!byId[id]?.revision || saved[id]?.revision === byId[id].revision);
const $ = (id) => document.getElementById(id),
  dirNames = { up: "YUXARI ↑", down: "AŞAĞI ↓", left: "SOL ←", right: "SAĞ →" },
  arrows = { up: "↑", down: "↓", left: "←", right: "→" };
const proofNames = {
  discover: "Saxta zəmini kəşf et",
  collapse: "Plitənin qırılmasını gör",
  pressure: "Yükü iki xanaya yay",
  holo: "Relay yolundan keç",
  observer: "Müşahidə yolunu keç",
  budget: "Plitəyə iki dəfə daxil ol",
  remap: "Çevrilmiş idarə ilə addım et",
  "latched-move": "Yadda qalan polaritedə addım et",
  resize: "Ölçü dəyişdir",
  "large-roll": "Böyük kubu yuvarla",
  "shape-lock": "Forma kilidini aç",
  echo: "Kölgənin addımını gör",
  wait: "WAIT əmri et",
  "echo-blocked": "Kölgəni maneə saxlasın",
  wall: "Divarın fazası dəyişsin",
  shelter: "Sıxılmanı alçaq sığınacaqda keçir",
  brake: "Partnyor əyləcini işə sal",
  teleport: "Saxta çıxışı istifadə et",
  permission: "Partnyorla qapı icazəsi al",
  contact: "Düz üzlə kontakta toxun",
  shield: "İzolyasiya üzünü təhlükədə istifadə et",
  sequence: "Kontakt ardıcıllığını tamamla",
  transfer: "Enerjini ötür",
  stored: "Terminala 2 enerji yığ",
  battery: "Batareyanı sağ terminala qoy",
  portal: "Məkan tikişini istifadə et",
  wrap: "Sərhəddən sarın",
  alignment: "Xətt rezonansı yarat",
  tether: "Bağı həddə qədər uzat",
  perpendicular: "Perpendikulyar gövdələr yarat",
  linked: "Bağlı cüt addım et",
};
let saved;
try {
  saved = JSON.parse(localStorage.getItem(storageKey)) || {};
} catch {
  saved = {};
}
proofNames["shield-2,1"] = "(2,1) elektrik plitəsini alt üz 2 ilə keç";
proofNames["shield-3,1"] = "(3,1) elektrik plitəsini alt üz 2 ilə keç";
const persist = () => localStorage.setItem(storageKey, JSON.stringify(saved));
let scene;
try {
  scene = new LabScene($("stage"));
} catch (e) {
  $("message").textContent =
    "3D görüntü açıla bilmədi. Chrome/Edge-də hardware acceleration parametrini yoxla.";
  throw e;
}
let l,
  s,
  active = 0,
  history = [],
  busy = false,
  paused = true,
  anchor = 0,
  hintAction = null,
  request = 0,
  worker = null,
  tickAt = performance.now(),
  high = true;
const isModal = () => document.querySelector("dialog[open]");
function note(text, kind = "") {
  $("message").textContent = text;
  $("message").className = "lab-message " + kind;
}
function pause(value) {
  paused = value;
  tickAt = performance.now();
  renderClock();
}
function renderClock() {
  $("pause").textContent = l?.realtime
    ? paused
      ? "P · SAAT: PAUZA"
      : "P · SAAT: CANLI"
    : "SAAT: NÖVBƏLİ";
  $("pause").disabled = !l?.realtime;
  $("pause").classList.toggle("paused", !!l?.realtime && paused);
}
function load(id, showIntro = true) {
  worker?.terminate();
  request++;
  hintAction = null;
  $("help").hidden = true;
  l = byId[id] || experiments[0];
  s = initial(l);
  active = 0;
  history = [];
  anchor = 0;
  busy = false;
  pause(true);
  scene.loadLab(l, s);
  location.hash = l.id;
  if (campaign) rememberPage("campaign.html#" + l.id);
  saved[l.id] = { ...saved[l.id], opened: true };
  persist();
  render();
  note(
    "Oxlar / WASD ilə yuvarlan. Tab ilə blok seç. H konkret addımı göstərir.",
  );
  if (showIntro) intro();
}
function intro() {
  pause(true);
  $("intro-code").textContent = campaign
    ? `SƏVİYYƏ ${l.id} · ${l.difficulty || "ORTA"} · ${campaignOrdinal("combination", l.id)}/${campaignTotal}`
    : `${l.id} · ${l.id.includes(".") ? "ALT-ELEMENT" : "ƏSAS MOD"}`;
  $("intro-title").textContent = l.title;
  $("intro-rule").textContent = l.rule;
  if ($("undo-rule"))
    $("undo-rule").textContent = l.strict
      ? "Z son əmri bütün nəticələri ilə geri alır: açar, qırılan yol, forma və kölgə növbəsi əvvəlki vəziyyətə qayıdır. R səviyyəni sıfırdan başlayır."
      : "Z tam dünya vəziyyətini geri alır. R yenidən başlayır. Bu köhnə laboratoriya nümunəsində görülmüş hadisə və kəşf yadda qalır.";
  const parts = [];
  if (l.fragile) parts.push("×: tərk ediləndə qırılan plitə.");
  if (l.visitable) parts.push("Ⅱ: iki girişlik plitə.");
  if (l.shell) parts.push("≋: hər xanada ən çox 1 yük.");
  if (l.gates || l.holo)
    parts.push("● / ⊙: relay və kontakt; ═ / ◇: açılan keçid.");
  if (l.observer) parts.push("◎: partnyor 2 xana yaxın olduqda dayaq.");
  if (l.reverse) parts.push("↔ / ↻: idarə xəritəsinin dəyişdiyi zona.");
  if (l.forms) parts.push("G: ölçü dəyişmə. ▥: dik forma kilidi.");
  if (l.collectibles)
    parts.push(
      "Havada fırlanan qızılı açar və mavi kristallar həqiqi yığılan əşyalardır. Üstlərindən keçəndə götürülür və sayğac artır. Hamısını toplamaq tələb olunur.",
    );
  if (l.levers)
    parts.push(
      l.levers.some((v) => v.toggle)
        ? "F şalteri iki qapını əks vəziyyətlərə çevirir. F-ni yenidən basmaq mümkündür. Qapı xanası əvvəl boş olmalıdır."
        : "Qollu şalterə bir xana yaxınlaş və F bas. Tələb olunan açar olmadan işləmir. Metal qapı animasiya ilə açılır.",
    );
  if (l.refined && l.forms)
    parts.push(
      "Bütün işıqlı xanalar hədəfin tam izidir; 2×2 forma dörd işığın hamısını örtməlidir.",
    );
  if (l.switches)
    parts.push(
      "Nömrəli qızılı açarlar göstərilən sıra ilə toplanır. Çıxış yalnız hamısı toplandıqda qəbul edir.",
    );
  if (l.echo && l.refined)
    parts.push(
      "Aşağı qırmızı relay-i yalnız kölgə işə salır. Q növbəni irəli aparır; real vaxt sayılmır.",
    );
  if (l.fake)
    parts.push(
      "⏣: saxta qapı; həqiqi A/B çıxışları teleportdan sonra görünür.",
    );
  if (l.portal) parts.push("↗ / ↙: Enter ilə bağlı tikişlər.");
  if (l.useFaces)
    parts.push(
      "0–5: üz nömrələri. Döşəmə kontaktındakı nömrə tələb olunan alt üzdür.",
    );
  if (l.energyMode)
    parts.push("T: enerji terminalı və ya qonşu bloklar arasında ötürmə.");
  if (l.wall) parts.push("!: pistonun sıxdığı xana. Yaşıl ⌂: alçaq sığınacaq.");
  if (l.wrap) parts.push("Sol / sağ kənarlar bağlıdır.");
  if (l.tether || l.link) parts.push("Bənövşəyi xətt: partnyor bağı.");
  $("legend").textContent =
    parts.join(" ") || "Mavi A və kəhrəba B çıxışları. Qırmızı kölgədən yayın.";
  $("clock-rule").textContent = l.realtime
    ? "CANLI SAAT: hər 0.5 saniyə bir məntiq addımıdır. Kölgə 4 addım (=2 saniyə) gecikir. P pauza edir. Q pauzada da bir saat addımı keçir. Menyu, H və pəncərədən çıxmaq saatı saxlayır."
    : "NÖVBƏLİ SINAQ: yalnız uğurlu əmrlər mexanikanı irəli aparır. Səhv/rədd edilmiş əmr və Tab vaxtı dəyişmir. Rahat düşünə bilərsən.";
  $("intro").showModal();
}
function render() {
  $("case-code").textContent = campaign
    ? `SƏVİYYƏ ${l.id} · ${l.difficulty || "ORTA"} · ${campaignOrdinal("combination", l.id)}/${campaignTotal}`
    : `${l.id} · ${l.id.includes(".") ? "ALT-ELEMENT" : "ƏSAS MOD"}`;
  $("case-title").textContent = l.title;
  $("case-rule").textContent = l.rule;
  $("actors").replaceChildren(
    ...s.blocks.map((b, i) => {
      const button = document.createElement("button");
      button.className = i === active ? "active" : "";
      button.innerHTML = `<strong>${i ? "B · EMBER" : "A · AETHER"}</strong><small>(${b.x}, ${b.z}) · ${b.dims.join("×")}${l.light || l.shell ? " · " + (b.heavy ? "ağır 2" : "yüngül 1") : ""}${l.energyMode ? " · ⚡" + b.energy : ""}</small>`;
      button.onclick = () => select(i);
      return button;
    }),
  );
  const details = [];
  if (l.reverse)
    details.push(
      "Düymə → dünya: " +
        ["up", "right", "down", "left"]
          .map((d) => arrows[d] + arrows[worldDirection(l, s, active, d)])
          .join(" · ") +
        (l.reverse.kind === "latch"
          ? ` · polarite ${s.polarity[active] ? "TƏRS" : "düz"}`
          : ""),
    );
  if (l.forms)
    details.push(
      s.charges < 0
        ? "G · Ölçü meydançasında sərbəst dəyişmə"
        : `G ehtiyatı: ${s.charges} · dəyişmə ${s.resizeCount}${l.requireResizes ? "/" + l.requireResizes : ""}`,
    );
  if (l.echo)
    details.push(
      "Kölgə " +
        (s.clone.alive ? "aktiv" : "sönüb") +
        " · " +
        (l.realtime
          ? "gecikənlər: " +
            s.pending
              .map((p) => arrows[p.dir] + " " + p.in * 0.5 + "s")
              .join(" · ")
          : "növbə: " + s.queue.map((d) => arrows[d] || "·").join(" ")),
    );
  if (l.wall)
    details.push(
      l.wall.kind === "piston"
        ? `Piston: ${["AÇIQ", "XƏBƏRDARLIQ", "SIXILMA", "XƏBƏRDARLIQ"][s.wallPhase]} · sayğac ${s.wallCount}/${l.wall.every || 1}`
        : `Tutulan son sütun: ${s.wallStep < 0 ? "yoxdur" : s.wallStep} · sayğac ${s.wallCount}/${l.wall.every || 1}`,
    );
  if (l.fake?.kind === "cycle")
    details.push(
      "Növbəti təyinat: (" + l.fake.destinations[s.portalIndex].join(",") + ")",
    );
  if (l.fake) details.push("Saxta keçidlər: " + s.portalCount);
  if (l.useFaces) {
    const f = s.blocks[active].faces;
    details.push(
      `Üzlər: alt ${f.v} · üst ${f.u} · sağ ${f.r} · sol ${f.l} · ön ${f.f} · arxa ${f.b}`,
    );
  }
  if (l.sequence)
    details.push(`Kontakt sırası: ${s.sequence}/${l.sequence.length}`);
  if (l.formLatch)
    details.push(
      `Forma kilidi: ${s.latch ? "açıqdır" : l.formLatch.dims.join("×") + " tələb olunur"}`,
    );
  if (l.visitable)
    details.push(
      l.visitable
        .map(
          (p) =>
            `Plitə (${p.join(",")}): ${s.visits[p.join(",")] ?? 2} giriş qalıb`,
        )
        .join(" · "),
    );
  if (l.switches)
    details.push(
      `Sensor sırası: ${s.switchIndex || 0}/${l.switches.length}${l.switches[s.switchIndex || 0] ? " · növbəti (" + l.switches[s.switchIndex || 0].join(",") + ")" : " · sıra tamamlandı"}`,
    );
  if (l.collectibles)
    for (const kind of ["key", "point"]) {
      const all = l.collectibles
          .map((c, i) => ({ ...c, i }))
          .filter((c) => c.kind === kind),
        got = all.filter((c) => (s.collected || 0) & (1 << c.i));
      if (!all.length) continue;
      details.push(
        `${kind === "key" ? "Qızılı açar" : "◆ İşıq xalları"}: ${got.length}/${all.length}`,
      );
    }
  if (l.levers)
    details.push(
      l.levers.some((v) => v.toggle)
        ? `F · Dövrə: ${s.levers ? "sağ keçid açıq" : "sol keçid açıq"}`
        : `F · Şalter: ${l.levers.filter((_, i) => (s.levers || 0) & (1 << i)).length}/${l.levers.length}`,
    );
  if (campaign && complete(l.id) && saved[l.id]?.best)
    details.push(`Şəxsi rekord: ${saved[l.id].best} gediş`);
  if (l.energyMode)
    details.push(
      "Ümumi enerji: " +
        (s.blocks.reduce((a, b) => a + b.energy, 0) +
          s.storage +
          (l.energyMode === "battery"
            ? s.slots.reduce((a, b) => a + b, 0)
            : 0)) +
        (l.energyMode === "storage"
          ? ` · körpüdə ${s.storage}`
          : l.energyMode === "battery"
            ? ` · terminallar ${s.slots.join(" / ")}`
            : ""),
    );
  if (l.tether)
    details.push(
      `Məsafə: ${Math.abs(s.blocks[0].x - s.blocks[1].x) + Math.abs(s.blocks[0].z - s.blocks[1].z)} / ${l.tether}`,
    );
  if (l.link) details.push(`Cüt addım: ${s.linked ? "BAĞLI" : "sərbəst"}`);
  $("mechanism").textContent =
    details.join("\n") || "Təcrübəni sına və A/B çıxışlarına çat.";
  $("mechanism").style.whiteSpace = "pre-line";
  $("objectives").innerHTML =
    (l.required || [])
      .map(
        (p) =>
          `<div class="${s.proof.includes(p) ? "done" : ""}">${s.proof.includes(p) ? "✓" : "○"} ${proofNames[p] || p}</div>`,
      )
      .join("") +
    l.goals
      .map(
        (g, i) =>
          `<div>◎ ${i ? "B" : "A"} → (${g.x},${g.z})${g.dims ? " · " + g.dims.join("×") : ""}${g.energy !== undefined ? " · ⚡" + g.energy : ""}${g.face !== undefined ? " · " + (g.side === "r" ? "sağ" : "alt") + " üz " + g.face : ""}</div>`,
      )
      .join("");
  $("moves").textContent = s.moves + " gediş";
  $("completion").textContent =
    experiments.filter((x) => complete(x.id)).length +
    ` / ${experiments.length} ${campaign ? "yeni səviyyə" : "sınaq"}`;
  for (const [id, visible] of Object.entries({
    wait: l.echo || l.wall,
    resize: l.forms,
    anchor: l.chooseAnchor,
    transfer: l.energyMode,
    portal: l.portal,
    link: l.link,
    interact: l.levers,
  }))
    $(id).hidden = !visible;
  $("anchor").textContent =
    "X · Lövbər: " +
    ["sağ/aşağı", "sol/aşağı", "sağ/yuxarı", "sol/yuxarı"][anchor];
  document
    .querySelectorAll("[data-vote]")
    .forEach((b) =>
      b.classList.toggle("selected", saved[l.id]?.vote === b.dataset.vote),
    );
  renderClock();
}
function select(i) {
  if (busy || isModal()) return;
  active = i;
  scene.refresh(s, active);
  render();
}
function perform(a, instant = false) {
  if (busy || isModal()) return false;
  if (a.type === "undo") {
    worker?.terminate();
    request++;
    $("help").hidden = true;
    if (!history.length) {
      note("Geri alınacaq addım yoxdur.");
      return false;
    }
    const known = { proof: [...s.proof], revealed: [...s.revealed] };
    s = history.pop();
    if (!l.strict) {
      s.proof = [...new Set([...s.proof, ...known.proof])];
      s.revealed = [...new Set([...s.revealed, ...known.revealed])];
    }
    pause(true);
    scene.refresh(s, active);
    render();
    note(
      l.strict
        ? "Son gediş tam geri alındı: yol, açarlar və kölgə növbəsi əvvəlki vəziyyətdədir."
        : "Dünya geri alındı. Müşahidə etdiyin hadisələr yadda qaldı.",
    );
    return true;
  }
  const r = step(l, s, a);
  if (!r.ok) {
    note(r.reason, "danger");
    if (r.collision && !instant) {
      busy = true;
      scene.bump(
        s,
        a.block ?? active,
        worldDirection(l, s, a.block ?? active, a.dir),
        () => {
          busy = false;
        },
      );
    }
    return false;
  }
  worker?.terminate();
  request++;
  hintAction = null;
  $("help").hidden = true;
  history.push(clone(s));
  const before = s;
  s = r.state;
  if (a.type === "resize" && a.anchor !== undefined) anchor = a.anchor;
  if (a.block !== undefined) active = a.block;
  busy = true;
  const done = () => {
    busy = false;
    render();
    if (s.won) {
      pause(true);
      saved[l.id] = {
        ...saved[l.id],
        completed: true,
        revision: l.revision,
        best: Math.min(
          saved[l.id]?.revision === l.revision
            ? saved[l.id]?.best || Infinity
            : Infinity,
          s.moves,
        ),
      };
      persist();
      render();
      note(
        campaign
          ? `${s.moves} gediş — səviyyə tamamlandı. Növbəti səviyyəyə keçə bilərsən.`
          : "Sınaq tamamlandı. İdeyanı saxlayırsan, dəyişdirirsən, yoxsa çıxarırsan?",
        "success",
      );
    } else if (s.dead) {
      pause(true);
      note(s.last, "danger");
    } else
      note(
        l.strict
          ? s.events.includes("lever")
            ? l.levers?.some((v) => v.toggle)
              ? "Dövrə dəyişdi: bir qapı bağlanır, digəri açılır."
              : "Şalter işlədi. Bağlı qapının açılmasını izlə."
            : s.events.includes("shape-lock")
              ? "Düzgün forma kilidi açdı. Keçid indi sərbəstdir."
              : s.events.includes("key-pickup")
                ? "Qızılı açar götürüldü. Açar tələb edən kilidlərin icazəsi dəyişdi."
                : s.events.includes("point-pickup")
                  ? "İşıq xalı yığıldı. Qalan kristalları sayğacda yoxla."
                  : s.events.includes("switch")
                    ? "Marşrut sensoru işə düşdü. Növbəti məqsədi sol paneldə yoxla."
                    : s.events.includes("collapse")
                      ? "Arxandakı plitə qırıldı. Qayıdış yolunu yenidən planlaşdır."
                      : ""
          : s.events.length
            ? "Müşahidə: " + s.events.map((p) => proofNames[p] || p).join(" · ")
            : "",
      );
  };
  if (instant) {
    scene.refresh(s, active);
    done();
  } else scene.animate(before, s, a, done);
  return true;
}
function describe(a) {
  if (a.type === "move") {
    const d = worldDirection(l, s, a.block, a.dir);
    return `${a.block ? "B" : "A"} blokunu seç. ${dirNames[a.dir]} düyməsini bas.${d !== a.dir ? " Dünya istiqaməti: " + dirNames[d] + "." : ""}`;
  }
  return {
    interact: `${a.block ? "B" : "A"} blokunu seç. F bas: yaxınlıqdakı şalteri işə sal və qapını aç.`,
    resize: `${a.block ? "B" : "A"} blokunu seç. ${l.chooseAnchor ? "X ilə " + ["sağ/aşağı", "sol/aşağı", "sağ/yuxarı", "sol/yuxarı"][a.anchor || 0] + " lövbərini seç. " : ""}G bas: ölçünü dəyiş.`,
    transfer: `${a.block ? "B" : "A"} blokunu seç. T bas: 1 enerji ötür.`,
    portal: `${a.block ? "B" : "A"} blokunu seç. Enter bas: tikişdən keç.`,
    wait: l.realtime
      ? "Q bas: saatı 0.5 saniyə irəli apar."
      : "Q bas: bir əmr gözlə.",
    restart: l.strict
      ? "R bas: səviyyəni təmiz vəziyyətdən yenidən başla."
      : "R bas: müşahidəni yadda saxlayıb yenidən başla.",
    link: "L bas: cüt addım bağını dəyiş.",
  }[a.type];
}
function hint() {
  if (busy || isModal()) return;
  pause(true);
  $("help").hidden = false;
  $("help-text").textContent = "Cari vəziyyətdən yol hesablanır…";
  $("apply-hint").hidden = true;
  if (s.won) {
    $("help-text").textContent = "Bu sınaq tamamlanıb.";
    return;
  }
  if (s.dead) {
    hintAction = { type: "restart" };
    $("help-text").textContent = history.length
      ? l.strict
        ? "Z ilə son addımı geri al. R bütün tapmacanı, açarları və şalterləri sıfırdan başladır."
        : "Z ilə son addımı geri al və ya R ilə sınağı yenidən başla. Kəşfin yadda qalır."
      : "R ilə yenidən başla.";
    $("apply-hint").hidden = false;
    return;
  }
  worker?.terminate();
  worker = new Worker("src/lab-hint-worker.js", { type: "module" });
  const token = ++request;
  worker.onmessage = ({ data }) => {
    if (data.request !== request) return;
    if (data.path?.length) {
      hintAction = data.path[0];
      $("help-text").textContent =
        describe(hintAction) +
        (l.realtime ? " Saat pauzadadır; bu, diskret planlama köməyidir." : "");
      $("apply-hint").hidden = false;
      scene.showHint(hintAction);
    } else
      $("help-text").textContent = data.limited
        ? "Axtarış həddinə çatdı; bu, həll yoxdur demək deyil. Z ilə əvvəlki vəziyyətə qayıt və H-ni yenidən yoxla."
        : data.path
          ? "Çıxış tamamlandı."
          : "Bu vəziyyətdən yol tapılmadı. Z ilə geri qayıt və ya R ilə başla.";
    worker.terminate();
  };
  worker.onerror = () => {
    $("help-text").textContent =
      "Kömək açıla bilmədi. Səhifəni yerli START-DEMO ilə açıb yenidən yoxla.";
  };
  worker.postMessage({ id: l.id, state: s, request: token, campaign });
}
function list() {
  pause(true);
  drawList();
  $("list").showModal();
}
function drawList() {
  const q = $("search").value.toLocaleLowerCase("az"),
    filter = $("filter").value;
  $("case-list").replaceChildren();
  for (const [family, [title]] of Object.entries(
    campaign ? { C: ["Fərqli mexanika kombinasiyaları"] } : families,
  )) {
    const cases = experiments.filter(
      (x) =>
        x.family === family &&
        (x.id + " " + x.title).toLocaleLowerCase("az").includes(q) &&
        (filter === "all" ||
          (filter === "unplayed" && !complete(x.id)) ||
          saved[x.id]?.vote === filter),
    );
    if (!cases.length) continue;
    const section = document.createElement("section");
    section.className = "family-section";
    const h = document.createElement("h3");
    h.textContent = campaign ? title : family + " · " + title;
    section.append(h);
    const grid = document.createElement("div");
    grid.className = "case-grid";
    for (const c of cases) {
      const b = document.createElement("button");
      b.className = "case-card " + (!c.id.includes(".") ? "parent" : "");
      b.dataset.case = c.id;
      const status = saved[c.id] || {},
        vote = { keep: "Saxla", revise: "Dəyişdir", drop: "Çıxar" }[
          status.vote
        ];
      b.innerHTML = `<span>${c.id} · ${campaign ? c.mechanics?.join(" · ") : c.id.includes(".") ? "ALT-ELEMENT" : "ƏSAS MOD"}</span><strong>${c.title}</strong><small>${complete(c.id) ? "✓ Tamamlanıb" + (campaign ? " · " + status.best + " gediş" : "") : campaign ? "Oyna" : c.refined ? "Yenilənib · yenidən yoxla" : "Oyna və yoxla"}${!campaign && vote ? " · " + vote : ""}${c.realtime ? " · CANLI SAAT" : ""}</small>`;
      b.onclick = () => {
        $("list").close();
        load(c.id);
      };
      grid.append(b);
    }
    section.append(grid);
    $("case-list").append(section);
  }
}
document
  .querySelectorAll("[data-action]")
  .forEach(
    (b) =>
      (b.onclick = () =>
        perform({ type: b.dataset.action, block: active, anchor })),
  );
document.querySelectorAll("[data-vote]").forEach(
  (b) =>
    (b.onclick = () => {
      saved[l.id] = { ...saved[l.id], vote: b.dataset.vote };
      persist();
      render();
      note(
        "Rəyin saxlandı. “Rəyləri yüklə” ilə hamısını JSON kimi götürə bilərsən.",
      );
    }),
);
$("open-list").onclick = list;
$("close-list").onclick = () => $("list").close();
$("search").oninput = drawList;
$("filter").onchange = drawList;
$("lesson").onclick = intro;
$("begin").onclick = () => {
  $("intro").close();
  pause(!l.realtime);
};
$("intro").addEventListener("cancel", () => pause(true));
$("hint").onclick = hint;
$("apply-hint").onclick = () => {
  if (hintAction) perform(hintAction);
};
$("close-help").onclick = () => {
  $("help").hidden = true;
  scene.hintArrow.visible = false;
};
$("pause").onclick = () => pause(!paused);
$("anchor").onclick = () => {
  anchor = (anchor + 1) % 4;
  render();
};
$("quality").onclick = () => {
  high = !high;
  scene.quality(high);
  $("quality").textContent = "GÖRÜNTÜ: " + (high ? "YÜKSƏK" : "YÜNGÜL");
};
$("next").onclick = () => {
  const next = experiments.indexOf(l) + 1;
  if (campaign && !s.won) {
    note("Əvvəl bu səviyyəni tamamla və ya menyudan başqa səviyyə seç.");
    return;
  }
  if (campaign) {
    location.href =
      nextCampaignLevel("combination", l.id)?.href || "index.html?levels=1";
    return;
  }
  load(experiments[next % experiments.length].id);
};
$("export").onclick = () => {
  const blob = new Blob(
      [
        JSON.stringify(
          {
            project: "DUAL GRID",
            type: "mod-laboratory-feedback",
            exportedAt: new Date().toISOString(),
            removedExperiments: removedMods.map((id) => ({
              id,
              ...saved[id],
              status: "removed",
            })),
            experiments: experiments.map((c) => ({
              id: c.id,
              title: c.title,
              ...saved[c.id],
            })),
          },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    ),
    url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = "dual-grid-mod-reyleri.json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
addEventListener("keydown", (e) => {
  if (
    isModal() ||
    e.target.matches("input,select,textarea") ||
    e.ctrlKey ||
    e.metaKey ||
    e.altKey
  )
    return;
  const key = e.key.toLowerCase(),
    dir = {
      arrowup: "up",
      w: "up",
      arrowdown: "down",
      s: "down",
      arrowleft: "left",
      a: "left",
      arrowright: "right",
      d: "right",
    }[key];
  if (dir) {
    e.preventDefault();
    if (!e.repeat) perform({ type: "move", block: active, dir });
    return;
  }
  const commands = {
    z: "undo",
    r: "restart",
    q: "wait",
    g: "resize",
    t: "transfer",
    enter: "portal",
    l: "link",
    f: "interact",
  };
  if (commands[key]) {
    e.preventDefault();
    if (!e.repeat) perform({ type: commands[key], block: active, anchor });
  } else if (key === "tab") {
    e.preventDefault();
    select((active + 1) % s.blocks.length);
  } else if (key === "h") hint();
  else if (key === "p" && l.realtime) pause(!paused);
  else if (key === "x" && l.chooseAnchor) {
    anchor = (anchor + 1) % 4;
    render();
  } else if (key === "escape") list();
});
addEventListener("blur", () => pause(true));
document.addEventListener("visibilitychange", () => {
  if (document.hidden) pause(true);
});
setInterval(() => {
  const now = performance.now();
  if (
    l?.realtime &&
    !paused &&
    !busy &&
    !isModal() &&
    !s.dead &&
    !s.won &&
    !document.hidden
  ) {
    let catchup = 0;
    while (now - tickAt >= 500 && catchup++ < 8 && !s.dead && !s.won) {
      tickAt += 500;
      perform({ type: "tick" }, true);
    }
  }
}, 50);
const hash = decodeURIComponent(location.hash.slice(1));
load(byId[hash] ? hash : experiments[0].id, false);
if (!byId[hash]) list();
else intro();
if (campaign) {
  document
    .querySelectorAll("[data-vote],#export,.lab-review>span")
    .forEach((o) => (o.hidden = true));
  $("filter")
    .querySelectorAll(
      'option[value="keep"],option[value="revise"],option[value="drop"]',
    )
    .forEach((o) => o.remove());
}
addEventListener("hashchange", () => {
  const id = decodeURIComponent(location.hash.slice(1));
  if (byId[id] && id !== l.id) {
    document.querySelectorAll("dialog[open]").forEach((d) => d.close());
    load(id);
  }
});
if (new URLSearchParams(location.search).has("test"))
  window.labTest = {
    load: (id) => load(id, false),
    perform: (a) => perform(a, true),
    get state() {
      return clone(s);
    },
    get level() {
      return l;
    },
    get active() {
      return active;
    },
    scene,
    select,
    pause,
    hint,
    closeDialogs: () => {
      document.querySelectorAll("dialog[open]").forEach((d) => d.close());
      pause(true);
    },
    finishMotion: () => scene.finishMotion(),
  };
