export const lessons = {
  basics: {
    title: "Bir kub. Bir çıxış.",
    body: "Məqsəd blokları öz hərfli çıxışlarına çatdırmaqdır. Əvvəl tək A kubu ilə başlayırıq. Oxlar və ya WASD ilə onu hər dəfə bir xana apar. Altındakı parlaq halqa yalnız seçilən bloku göstərir; ayrıca düymə deyil. Kömək üçün H bas.",
    caption: "A seçilib · SAĞA: → / D",
  },
  undo: {
    title: "Səhv etmək təhlükəsizdir.",
    body: "Dayaqsız yerə getsən blok düşər. Z bütün son gedişi geri qaytarır. R səviyyəni yenidən başlayır. İstənilən anda H ilə konkret addım istəyə bilərsən.",
    caption: "Səhv gediş → Z → əvvəlki vəziyyət",
  },
  two: {
    title: "İkinci kubla tanış ol.",
    body: "TAB ilə A və B arasında keç. 1 və 2 düymələri, yaxud soldakı kartlar da seçim edir. İşıqlı halqa seçimi göstərir. Hər kub öz hərfinə çatmalıdır; əvvəl çatanı yenə hərəkət etdirə bilərsən.",
    caption: "Əvvəl A · sonra TAB · sonra B",
  },
  weight: {
    title: "Ölçü və ağırlıq ayrı qaydalardır.",
    body: "A indi ağır, B isə yüngüldür. Rəng və A/B hərfi kimlikdir; ağırlıq isə roldur. Kiçik kub da ağır ola bilər. Hər blokun cari rolunu soldakı kartdan oxu.",
    caption: "A: ağır · B: yüngül · rənglər kimliyi saxlayır",
  },
  sensor: {
    title: "Sensor körpünü saxlayır.",
    body: "Dairəvi sensorun üstündə qalan blok bağlı körpünü açır. Sensoru buraxanda körpü bağlanır. O biri blok keçənə qədər yerində qal. İncə işıq xətti sensorun hansı körpüyə bağlı olduğunu göstərir.",
    caption: "Sensor basılır → körpü açılır → partnyor keçir",
  },
  heavy: {
    title: "Kvadrat sensor ağır rol istəyir.",
    body: "Yüngül blok kvadrat ağır sensoru aça bilmir. Ağır blok həmin yerə gəlməlidir. Kiçik kub həmişə dikdir; uzun blok üçün dik duruş da tələb olunur.",
    caption: "Yüngül: açmır × · ağır: açır ✓",
  },
  roll: {
    title: "A artıq uzun blokdur.",
    body: "Uzun blokun ölçüsü həmişə 1×1×2-dir. Dik olanda bir xana, uzananda iki xana tutur. İki dəfə eyni istiqamətə çevirəndə üç xana irəlidə yenidən dik dayanır. Digər blokun ölçüsünü onun kartından yoxla.",
    caption: "DİK → UZANMIŞ → DİK · iki əmr, üç xana",
  },
  both: {
    title: "İndi hər ikisi uzundur.",
    body: "A və B artıq 1×1×2 bloklardır. Hər ikisinin növbəti gedişdə tutacağı sahəni düşün. Çıxışa uzanmış deyil, dik çatmaq lazımdır. Yeni uzunluğa alışmaq üçün bu mərhələ qısadır.",
    caption: "İki uzun blok · iki ayrı çıxış",
  },
  upright: {
    title: "Ağır olmaq təkbaşına kifayət etmir.",
    body: "Uzun ağır blok kvadrat sensoru yalnız DİK dayananda açır. Uzanmış vəziyyət sensorun üstünü örtsə də açmır. Adi dairəvi sensor isə uzanmış bloku da qəbul edir.",
    caption: "UZANMIŞ ağır: × · DİK ağır: ✓",
  },
  light: {
    title: "Nazik keçid yalnız yüngül üçündür.",
    body: "Üç incə xəttlə işarələnmiş səth yüngül bloku qəbul edir. Ağır blokun ora gedişi rədd edilir. Bu, ölçüyə deyil, soldakı kartda yazılan rola bağlıdır.",
    caption: "Ağır: yol bağlı × · yüngül: keçə bilər ✓",
  },
  exchange: {
    title: "Kimlik qalır. Rollar dəyişir.",
    body: "Hər iki blok bənövşəyi cüt meydançalarda DİK dayansın. E ilə ağır və yüngül rolları dəyiş. A yenə A-dır, öz çıxışına gedir; B də öz kimliyini saxlayır.",
    caption: "İkisi də meydançada dik → E → ağır/yüngül mübadiləsi",
  },
  ice: {
    title: "Dayanacağı partnyorun yaradır.",
    body: "Yüngül blok tam buz üstünə çıxanda duruşunu dəyişmədən sürüşür. Divar və ya o biri blok onu saxlayır. Ağır blok buzda özü sürüşmür: əvvəl onu əyləc yerinə gətir. Buzun sonunda boşluq varsa düşə bilərsən.",
    caption: "A əyləc olur · B sürüşür · daş səthdə dayanır",
  },
  circuits: {
    title: "Eyni nömrə eyni körpüdür.",
    body: "Bir xəritədə bir neçə körpü ola bilər. Eyni nömrəli və rəngli sensorlar eyni körpünü açır. 1 açıq olanda 2 və 3 avtomatik açılmır. Keçidi qarşı tərəfdəki sensora təhvil vermək mümkündür.",
    caption: "1 → körpü 1 · 2 → körpü 2",
  },
};
const colors = {
  A: "#77c9d0",
  B: "#d8a66a",
  stone: "#364d5b",
  edge: "#71909c",
  purple: "#b29dcc",
};
const mix = (a, b, t) => a + (b - a) * t,
  clamp = (t) => Math.max(0, Math.min(1, t)),
  ease = (t) => t * t * (3 - 2 * t);
export class TutorialPlayer {
  constructor(onFinish) {
    this.dialog = document.querySelector("#tutorial");
    this.canvas = document.querySelector("#tutorial-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.onFinish = onFinish;
    this.pages = [];
    this.page = 0;
    this.elapsed = 0;
    this.paused = false;
    this.last = 0;
    document.querySelector("#tutorial-next").onclick = () => this.next();
    document.querySelector("#tutorial-back").onclick = () => this.change(-1);
    document.querySelector("#tutorial-replay").onclick = () => {
      this.elapsed = 0;
      this.paused = false;
      this.pauseLabel();
    };
    document.querySelector("#tutorial-pause").onclick = () => {
      this.paused = !this.paused;
      this.pauseLabel();
    };
    document.querySelector("#tutorial-skip").onclick = () => this.close();
    this.dialog.addEventListener("cancel", (e) => {
      e.preventDefault();
      this.close();
    });
  }
  open(pages) {
    this.pages = [...new Set(pages)].filter((p) => lessons[p]);
    if (!this.pages.length) return;
    this.page = 0;
    this.elapsed = 0;
    this.paused = false;
    this.dialog.showModal();
    this.content();
    this.last = performance.now();
    this.raf = requestAnimationFrame((t) => this.frame(t));
  }
  close(save = true) {
    if (!this.dialog.open) return;
    cancelAnimationFrame(this.raf);
    this.dialog.close();
    if (save) this.onFinish(this.pages);
  }
  next() {
    if (this.page === this.pages.length - 1) this.close();
    else this.change(1);
  }
  change(d) {
    this.page = Math.max(0, Math.min(this.pages.length - 1, this.page + d));
    this.elapsed = 0;
    this.content();
  }
  pauseLabel() {
    document.querySelector("#tutorial-pause").textContent = this.paused
      ? "▶ DAVAM"
      : "Ⅱ DAYANDIR";
  }
  content() {
    const l = lessons[this.pages[this.page]];
    document.querySelector("#tutorial-title").textContent = l.title;
    document.querySelector("#tutorial-copy").textContent = l.body;
    document.querySelector("#tutorial-caption").textContent = l.caption;
    document.querySelector("#tutorial-number").textContent =
      `CANLI İZAH · ${this.page + 1} / ${this.pages.length}`;
    document.querySelector("#tutorial-next").textContent =
      this.page === this.pages.length - 1
        ? "ÖZÜM SINAYIM ↗"
        : "NÖVBƏTİ İZAH →";
    document.querySelector("#tutorial-back").disabled = this.page === 0;
    this.pauseLabel();
  }
  frame(now) {
    if (!this.dialog.open) return;
    if (!this.paused) this.elapsed += Math.min((now - this.last) / 1000, 0.1);
    this.last = now;
    this.draw(this.pages[this.page], this.elapsed % 7);
    this.raf = requestAnimationFrame((t) => this.frame(t));
  }
  draw(kind, t) {
    const c = this.ctx;
    this.canvas.width = 1400;
    this.canvas.height = 600;
    c.scale(2, 2);
    c.fillStyle = "#10232e";
    c.fillRect(0, 0, 700, 300);
    const p = (x, z, y = 0) => [
      340 + (x - z) * 39,
      110 + (x + z) * 19 - y * 45,
    ];
    const polygon = (points, fill, stroke = "#587583") => {
      c.beginPath();
      points.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
      c.closePath();
      c.fillStyle = fill;
      c.fill();
      c.strokeStyle = stroke;
      c.lineWidth = 0.8;
      c.stroke();
    };
    const tile = (x, z, color = colors.stone) => {
      polygon(
        [
          p(x - 0.48, z - 0.48),
          p(x + 0.48, z - 0.48),
          p(x + 0.48, z + 0.48),
          p(x - 0.48, z + 0.48),
        ],
        color,
      );
    };
    const text = (s, x, z, color = "#dce8e7", size = 15, y = 0.03) => {
      const q = p(x, z, y);
      c.fillStyle = color;
      c.font = `${size}px Segoe UI`;
      c.textAlign = "center";
      c.fillText(s, q[0], q[1] + 5);
    };
    const marker = (x, z, heavy = false, color = colors.A) => {
      const q = p(x, z, 0.035);
      c.strokeStyle = color;
      c.lineWidth = 2;
      c.beginPath();
      if (heavy) {
        const ps = [
          p(x - 0.3, z - 0.3, 0.04),
          p(x + 0.3, z - 0.3, 0.04),
          p(x + 0.3, z + 0.3, 0.04),
          p(x - 0.3, z + 0.3, 0.04),
        ];
        ps.forEach((v, i) => (i ? c.lineTo(...v) : c.moveTo(...v)));
        c.closePath();
      } else c.ellipse(q[0], q[1], 17, 8, 0, 0, Math.PI * 2);
      c.stroke();
    };
    const block = (b) => {
      const w = b.w || 1,
        h = b.h || 1,
        d = b.d || 1;
      let v = [
        [-w / 2, 0, -d / 2],
        [w / 2, 0, -d / 2],
        [w / 2, 0, d / 2],
        [-w / 2, 0, d / 2],
        [-w / 2, h, -d / 2],
        [w / 2, h, -d / 2],
        [w / 2, h, d / 2],
        [-w / 2, h, d / 2],
      ].map(([x, y, z]) => [x + b.x, y, z + b.z]);
      if (b.rotation) {
        const { sign = 1, phase = 0 } = b.rotation,
          px = b.x + (sign * w) / 2,
          a = (ease(phase) * Math.PI) / 2;
        v = v.map(([x, y, z]) => [
          px + (x - px) * Math.cos(a) + sign * y * Math.sin(a),
          -sign * (x - px) * Math.sin(a) + y * Math.cos(a),
          z,
        ]);
      }
      const color = b.name === "B" ? colors.B : colors.A;
      const faces = [
        [0, 1, 5, 4],
        [1, 2, 6, 5],
        [2, 3, 7, 6],
        [3, 0, 4, 7],
        [4, 5, 6, 7],
        [3, 2, 1, 0],
      ];
      faces
        .map((ids) => ({
          ids,
          depth:
            ids.reduce((s, i) => s + v[i][0] + v[i][2] - 0.3 * v[i][1], 0) / 4,
        }))
        .sort((a, b) => a.depth - b.depth)
        .forEach(({ ids }, i) =>
          polygon(
            ids.map((i) => p(v[i][0], v[i][2], v[i][1])),
            i >= 4 ? color : b.name === "B" ? "#87663f" : "#3e7985",
            "#a1bdc1",
          ),
        );
      const center = v.reduce(
        (s, a) => s.map((n, i) => n + a[i] / 8),
        [0, 0, 0],
      );
      text(b.name, center[0], center[2], "#eef4e9", 18, center[1] + 0.1);
      if (b.selected) {
        const q = p(center[0], center[2]);
        c.strokeStyle = "#d9f2ec";
        c.lineWidth = 2;
        c.beginPath();
        c.ellipse(q[0], q[1], 29, 13, 0, 0, Math.PI * 2);
        c.stroke();
      }
      if (b.weight)
        text(b.weight, center[0], center[2], "#e4e9dc", 11, h + 0.27);
    };
    const move = (name, x, z, dir, time, selected = true) => {
      const k = Math.min(4, Math.floor(Math.max(0, time))),
        f = clamp(time - k);
      return {
        name,
        x: x + k * dir,
        z,
        rotation: { sign: dir, phase: k < 4 ? f : 0 },
        selected,
      };
    };
    const bridge = ["sensor", "heavy", "circuits"].includes(kind),
      open = kind === "heavy" ? t >= 2 : t > 1.4;
    for (let z = 0; z < 3; z++)
      for (let x = 0; x < 6; x++) {
        if (bridge && (x === 2 || x === 3)) {
          if (
            (z === 2 && kind !== "circuits") ||
            (kind === "circuits" && (z === 0 || z === 2))
          ) {
            const on = kind === "circuits" ? (z === 0 ? t > 1.4 : t > 4) : open;
            tile(x, z, on ? (z === 2 ? "#856c48" : "#548894") : "#172c38");
            if (kind === "circuits")
              text(
                z === 0 ? "1" : "2",
                x,
                z,
                z === 0 ? colors.A : colors.B,
                12,
              );
          }
          continue;
        }
        tile(x, z);
      }
    if (["basics", "undo"].includes(kind)) {
      text("A", 4, 1, colors.A);
      let time = t % 5;
      if (kind === "undo" && time > 3) time = 5 - time;
      block(move("A", 0, 1, 1, time));
      text(kind === "undo" && t > 3 ? "↶ Z" : "→ / D", 2, 2, "#c1d4d8", 14);
    } else if (kind === "both") {
      const a = Math.min(2, Math.floor(t / 1.45)),
        ta = clamp(t / 1.45 - a),
        bt = Math.max(0, t - 3.2),
        b = Math.min(2, Math.floor(bt / 1.45)),
        tb = clamp(bt / 1.45 - b);
      const ap = [
          { x: 0, w: 1, h: 2 },
          { x: 1.5, w: 2, h: 1 },
          { x: 3, w: 1, h: 2 },
        ],
        bp = [
          { x: 5, w: 1, h: 2 },
          { x: 3.5, w: 2, h: 1 },
          { x: 2, w: 1, h: 2 },
        ];
      text("A", 3, 0, colors.A);
      text("B", 2, 2, colors.B);
      block({
        name: "A",
        ...ap[a],
        z: 0,
        rotation: a < 2 ? { phase: ta } : null,
        selected: t < 3.2,
      });
      block({
        name: "B",
        ...bp[b],
        z: 2,
        rotation: t >= 3.2 && b < 2 ? { phase: tb, sign: -1 } : null,
        selected: t >= 3.2,
      });
      text(t < 3.2 ? "A seçilib" : "TAB → B seçilib", 2, 3, "#d5e4dc", 13);
    } else if (kind === "two") {
      text("A", 2, 0, colors.A);
      text("B", 3, 2, colors.B);
      block({
        name: "A",
        x: mix(0, 2, ease(clamp(t / 2))),
        z: 0,
        h: 1,
        selected: t < 3,
      });
      block({
        name: "B",
        x: mix(5, 3, ease(clamp((t - 3) / 2))),
        z: 2,
        h: 1,
        selected: t >= 3,
      });
      text(t < 3 ? "A seçilib" : "TAB → B seçilib", 2, 3, "#d5e4dc", 13);
    } else if (kind === "roll") {
      const k = Math.min(2, Math.floor(t / 1.7)),
        f = clamp(t / 1.7 - k),
        states = [
          { x: 0, w: 1, h: 2 },
          { x: 1.5, w: 2, h: 1 },
          { x: 3, w: 1, h: 2 },
        ];
      block({
        name: "A",
        ...states[k],
        z: 1,
        rotation: k < 2 ? { phase: f } : null,
        selected: true,
      });
      block({ name: "B", x: 5, z: 2 });
      text("1 xana → 2 xana → 1 xana", 2, 3, "#d8e6df", 13);
    } else if (kind === "weight") {
      block({ name: "A", x: 1, z: 1, selected: t < 3, weight: "AĞIR" });
      block({ name: "B", x: 4, z: 1, selected: t >= 3, weight: "YÜNGÜL" });
    } else if (kind === "sensor") {
      marker(1, 0);
      block({ name: "A", x: mix(0, 1, ease(clamp(t))), z: 0, selected: t < 2 });
      block({
        name: "B",
        x: mix(1, 5, ease(clamp((t - 2) / 3))),
        z: 2,
        selected: t >= 2,
      });
      text(open ? "KÖRPÜ AÇIQ" : "SENSOR BOŞDUR", 3, 3, "#d4e7df", 13);
    } else if (kind === "heavy") {
      marker(1, 0, true);
      block({
        name: t < 2 ? "B" : "A",
        x: 1,
        z: 0,
        selected: true,
        weight: t < 2 ? "YÜNGÜL ×" : "AĞIR ✓",
      });
      text(t < 2 ? "KÖRPÜ BAĞLI" : "KÖRPÜ AÇIQ", 3, 3, "#d4e7df", 13);
    } else if (kind === "upright") {
      marker(1, 1, true);
      marker(4, 1, true);
      block({ name: "A", x: 1.5, z: 1, w: 2, h: 1 });
      block({ name: "A", x: 4, z: 1, h: 2, selected: true });
      text("UZANMIŞ ×", 1, 3, "#ca9a83", 13);
      text("DİK ✓", 4, 3, "#a7d6bd", 13);
    } else if (kind === "light") {
      for (let x = 2; x < 5; x++) {
        tile(x, 2, "#766f60");
        text("≡", x, 2, "#ded8bb");
      }
      block({ name: "A", x: 1, z: 0, weight: "AĞIR ×" });
      block({
        name: "B",
        x: mix(0, 5, ease(clamp(t / 4))),
        z: 2,
        selected: true,
        weight: "YÜNGÜL ✓",
      });
    } else if (kind === "exchange") {
      marker(1, 1, false, colors.purple);
      marker(4, 1, false, colors.purple);
      block({ name: "A", x: 1, z: 1, weight: t < 3 ? "AĞIR" : "YÜNGÜL" });
      block({ name: "B", x: 4, z: 1, weight: t < 3 ? "YÜNGÜL" : "AĞIR" });
      text("⇄  E", 2.5, 1, colors.purple, 22, 1.3);
    } else if (kind === "ice") {
      for (let x = 1; x < 6; x++) {
        tile(x, 1, "#386b80");
        text("≋", x, 1, "#8fd1de", 13);
      }
      block({ name: "A", x: 5, z: 1, h: 2, weight: "ƏYLƏC" });
      block({
        name: "B",
        x: mix(1.5, 3.5, ease(clamp((t - 1) / 2))),
        z: 1,
        w: 2,
        h: 1,
        selected: true,
      });
      text(
        t > 3 ? "DAYANDI · B daşa dönə bilər" : "BUZDA SÜRÜŞÜR",
        2,
        3,
        "#d4e7df",
        13,
      );
    } else if (kind === "circuits") {
      marker(1, 0, false, colors.A);
      marker(1, 2, false, colors.B);
      text("1", 1, 0, colors.A);
      text("2", 1, 2, colors.B);
      block({ name: "A", x: mix(0, 1, ease(clamp(t))), z: 0 });
      block({ name: "B", x: mix(0, 1, ease(clamp(t - 3))), z: 2 });
    }
    c.fillStyle = "#7896a4";
    c.font = "10px Segoe UI";
    c.textAlign = "left";
    c.fillText("NÜMUNƏ SƏHNƏ · İZAH ÜÇÜN ANİMASİYA", 20, 281);
  }
}
