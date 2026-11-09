import * as T from "../vendor/three.module.js";
import {
  enabled,
  towerFootprint,
  bodyDims,
  relationHeld,
  resolvePortal,
  supportedTower,
} from "./tower-engine.js";
const H = 3.8,
  colors = [0x73d5d1, 0xe9b478];
export class TowerScene {
  constructor(canvas) {
    this.renderer = new T.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = T.PCFSoftShadowMap;
    this.renderer.outputColorSpace = T.SRGBColorSpace;
    this.renderer.toneMapping = T.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;
    this.scene = new T.Scene();
    this.camera = new T.PerspectiveCamera(38, 1, 0.1, 150);
    this.scene.add(new T.HemisphereLight(0xa4e8ff, 0x16202a, 2));
    const light = new T.DirectionalLight(0xe8f6ff, 4);
    light.position.set(-6, 18, 10);
    light.castShadow = true;
    light.shadow.mapSize.set(2048, 2048);
    Object.assign(light.shadow.camera, {
      left: -20,
      right: 20,
      top: 20,
      bottom: -20,
    });
    this.scene.add(light);
    const rim = new T.PointLight(0xffb468, 45, 30);
    rim.position.set(8, 6, -4);
    this.scene.add(rim);
    this.root = new T.Group();
    this.scene.add(this.root);
    this.motions = [];
    this.focus = new T.Vector3();
    this.target = new T.Vector3();
    this.last = performance.now();
    this.layerOnly = false;
    this.resize = new ResizeObserver(() => {
      const r = canvas.getBoundingClientRect();
      this.renderer.setSize(r.width, r.height, false);
      this.camera.aspect = r.width / Math.max(1, r.height);
      this.camera.updateProjectionMatrix();
    });
    this.resize.observe(canvas);
    canvas.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        this.camera.zoom = Math.min(
          2,
          Math.max(0.65, this.camera.zoom * Math.exp(-e.deltaY * 0.001)),
        );
        this.camera.updateProjectionMatrix();
      },
      { passive: false },
    );
    canvas.addEventListener("dblclick", () => {
      this.camera.zoom = 1;
      this.camera.updateProjectionMatrix();
    });
    this.tick();
  }
  material(color, metalness = 0.35) {
    return new T.MeshStandardMaterial({ color, metalness, roughness: 0.48 });
  }
  box(w, h, d, color, x, y, z, parent = this.root) {
    const m = new T.Mesh(new T.BoxGeometry(w, h, d), this.material(color));
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  }
  mark(text, x, y, z, color = "#a4e4dc", size = 0.65) {
    const c = document.createElement("canvas");
    c.width = 128;
    c.height = 128;
    const g = c.getContext("2d");
    g.font = `bold ${Math.min(70, 110 / String(text).length)}px system-ui`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillStyle = color;
    g.fillText(text, 64, 64);
    const mat = new T.MeshBasicMaterial({
      map: new T.CanvasTexture(c),
      transparent: true,
      depthWrite: false,
    });
    const mesh = new T.Mesh(new T.PlaneGeometry(size, size), mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, y, z);
    this.root.add(mesh);
    return mesh;
  }
  load(l, s) {
    this.busy = false;
    this.motions = [];
    this.digRock = null;
    while (this.root.children.length) {
      const o = this.root.children.pop();
      o.parent = null;
      o.traverse((n) => {
        n.geometry?.dispose();
        if (n.material) {
          n.material.map?.dispose();
          n.material.dispose();
        }
      });
    }
    this.l = l;
    const ps = [...l.tiles, ...l.rubble, ...l.starts];
    this.cx =
      (Math.max(...ps.map((p) => p[0])) + Math.min(...ps.map((p) => p[0]))) / 2;
    this.cz =
      (Math.max(...ps.map((p) => p[1])) + Math.min(...ps.map((p) => p[1]))) / 2;
    this.floorObjects = [];
    const tile = (p, color) => {
      const m = this.box(
        0.96,
        0.18,
        0.96,
        color,
        p[0] - this.cx,
        p[2] * H - 0.12,
        p[1] - this.cz,
      );
      m.userData.layer = p[2];
      m.userData.cell = p.join(",");
      this.floorObjects.push(m);
      return m;
    };
    for (const p of l.tiles) tile(p, 0x304856);
    this.visitViews = (l.visitTiles || []).map((t) => ({
      o: this.mark(
        String(t.limit),
        t.at[0] - this.cx,
        t.at[2] * H + 0.065,
        t.at[1] - this.cz,
        "#ffd18a",
      ),
      count: t.limit,
    }));
    for (const g of l.phaseFloors || [])
      for (const p of g.cells)
        this.mark(
          "◇",
          p[0] - this.cx,
          p[2] * H + 0.04,
          p[1] - this.cz,
          "#86c9e2",
        );
    for (const g of l.observerFloors || [])
      for (const p of g.cells)
        this.mark(
          "◎",
          p[0] - this.cx,
          p[2] * H + 0.04,
          p[1] - this.cz,
          "#bad1f7",
        );
    this.observerRings = (l.observerFloors || []).flatMap((group, g) =>
      s.actors.map((_, actor) => {
        const pts = [],
          r = group.radius;
        for (let x = -r; x <= r; x++)
          for (let z = -r; z <= r; z++)
            if (Math.abs(x) + Math.abs(z) <= r)
              for (const [dx, dz] of [
                [1, 0],
                [-1, 0],
                [0, 1],
                [0, -1],
              ])
                if (Math.abs(x + dx) + Math.abs(z + dz) > r) {
                  const tx = dz * 0.5,
                    tz = dx * 0.5;
                  pts.push(
                    new T.Vector3(x + dx * 0.5 + tx, 0, z + dz * 0.5 + tz),
                    new T.Vector3(x + dx * 0.5 - tx, 0, z + dz * 0.5 - tz),
                  );
                }
        const o = new T.LineSegments(
          new T.BufferGeometry().setFromPoints(pts),
          new T.LineBasicMaterial({
            color: colors[actor],
            transparent: true,
            opacity: 0.45,
          }),
        );
        this.root.add(o);
        return { o, actor, g };
      }),
    );
    for (const p of l.seams || [])
      this.mark(
        (p.dir === "left"
          ? "←"
          : p.dir === "right"
            ? "→"
            : p.dir === "up"
              ? "↑"
              : "↓") + "α",
        p.from[0] - this.cx,
        p.from[2] * H + 0.07,
        p.from[1] - this.cz,
        "#9ed9ff",
        0.8,
      );
    for (const pair of l.linkStations || [])
      for (const p of pair)
        this.mark(
          "L",
          p[0] - this.cx,
          p[2] * H + 0.05,
          p[1] - this.cz,
          "#9fe9db",
        );
    this.bondLine = null;
    if (l.relationDisplay || l.hardLink || l.linkStations) {
      this.bondLine = new T.Line(
        new T.BufferGeometry().setFromPoints([
          new T.Vector3(),
          new T.Vector3(),
        ]),
        new T.LineBasicMaterial({
          color: 0x84e9c2,
          transparent: true,
          opacity: 0.75,
        }),
      );
      this.root.add(this.bondLine);
    }
    this.panelViews = (l.movingWalls || []).map((w, i) =>
      w.frames[s.wallPhases[i]].map((p) =>
        this.box(
          0.94,
          w.clearance == null ? 1.35 : 0.18,
          0.94,
          0xb78959,
          p[0] - this.cx,
          p[2] * H + (w.clearance ?? 0.675),
          p[1] - this.cz,
        ),
      ),
    );
    this.panelGhosts = (l.movingWalls || []).map((w) =>
      w.frames[0].map((p) => {
        const o = new T.Mesh(
          new T.BoxGeometry(0.96, 0.08, 0.96),
          new T.MeshBasicMaterial({
            color: 0xffcc7b,
            wireframe: true,
            transparent: true,
            opacity: 0.65,
          }),
        );
        this.root.add(o);
        return o;
      }),
    );
    for (const w of l.movingWalls || [])
      for (const p of w.consoles || [w.console].filter(Boolean))
        this.mark(
          "K",
          p[0] - this.cx,
          p[2] * H + 0.05,
          p[1] - this.cz,
          "#ffca83",
        );
    for (const p of l.control?.zone || []) {
      this.box(
        0.89,
        0.025,
        0.89,
        0x634c7d,
        p[0] - this.cx,
        p[2] * H + 0.01,
        p[1] - this.cz,
      );
      this.mark(
        l.control.kind === "rotate"
          ? "↻"
          : l.control.kind === "polarity"
            ? "♦"
            : "↔",
        p[0] - this.cx,
        p[2] * H + 0.05,
        p[1] - this.cz,
        "#e2c4ff",
      );
    }
    for (const c of l.faceContacts || [])
      this.mark(
        `${c.side === "r" ? "→" : "↓"}${c.value}`,
        c.at[0] - this.cx,
        c.at[2] * H + 0.08,
        c.at[1] - this.cz,
        "#edceff",
      );
    for (const c of l.faceContacts || [])
      if (c.side === "r")
        this.box(
          0.08,
          0.65,
          0.65,
          0x9d80b0,
          c.at[0] - this.cx + 0.52,
          c.at[2] * H + 0.4,
          c.at[1] - this.cz,
        );
    for (const [i, c] of (l.faceRoute || []).entries())
      this.mark(
        `${i + 1}:${c.side === "r" ? "→" : "↓"}${c.value}`,
        c.at[0] - this.cx,
        c.at[2] * H + 0.08,
        c.at[1] - this.cz,
        "#edceff",
        0.9,
      );
    for (const c of l.faceHazards || []) {
      this.box(
        0.9,
        0.025,
        0.9,
        0x893b51,
        c.at[0] - this.cx,
        c.at[2] * H + 0.005,
        c.at[1] - this.cz,
      );
      this.mark(
        "!" + c.value,
        c.at[0] - this.cx,
        c.at[2] * H + 0.035,
        c.at[1] - this.cz,
        "#ffcfde",
      );
    }
    this.fragileMarks = (l.fragile || []).map((p) =>
      this.mark(
        "×",
        p[0] - this.cx,
        p[2] * H + 0.04,
        p[1] - this.cz,
        "#ffb46e",
      ),
    );
    this.depotViews = (l.depots || []).map((t, i) => {
      this.box(
        0.8,
        0.07,
        0.8,
        0x8d7143,
        t.at[0] - this.cx,
        t.at[2] * H + 0.015,
        t.at[1] - this.cz,
      );
      this.mark(
        "D" + (i + 1) + (t.withdrawActors ? "A" : ""),
        t.at[0] - this.cx,
        t.at[2] * H + 0.07,
        t.at[1] - this.cz,
      );
      return this.mark(
        "0",
        t.at[0] - this.cx + 0.32,
        t.at[2] * H + 0.12,
        t.at[1] - this.cz + 0.32,
        "#ffdb81",
        0.38,
      );
    });
    for (const [i, p] of (l.portals || []).entries()) {
      if (p.entryDims) {
        const [w, , d] = p.entryDims,
          frame = new T.Mesh(
            new T.BoxGeometry(w, 0.06, d),
            new T.MeshBasicMaterial({ color: 0xe0b3ff, wireframe: true }),
          );
        frame.position.set(
          p.at[0] - this.cx + (w - 1) / 2,
          p.at[2] * H + 0.08,
          p.at[1] - this.cz + (d - 1) / 2,
        );
        this.root.add(frame);
      }
      const ring = new T.Mesh(
        new T.TorusGeometry(0.37, 0.045, 12, 48),
        new T.MeshStandardMaterial({
          color: 0x90a8ff,
          emissive: 0x5969d9,
          emissiveIntensity: 1.5,
        }),
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.set(
        p.at[0] - this.cx,
        p.at[2] * H + 0.09,
        p.at[1] - this.cz,
      );
      this.root.add(ring);
      this.mark(
        "P" +
          (i + 1) +
          (p.actor == null ? "" : String.fromCharCode(65 + p.actor)),
        p.at[0] - this.cx,
        p.at[2] * H + 0.11,
        p.at[1] - this.cz,
        "#c5cbff",
      );
    }
    this.rubble = l.rubble.map((p) => {
      tile(p, 0x574735);
      const m = this.box(
        0.84,
        0.8,
        0.84,
        0x9c6b37,
        p[0] - this.cx,
        p[2] * H + 0.34,
        p[1] - this.cz,
      );
      m.rotation.y = 0.12;
      return m;
    });
    for (const [i, p] of l.goals.entries()) {
      for (const q of towerFootprint(
        p,
        l.goalDims?.[i] || l.goalSizes?.[i] || 1,
      )) {
        tile(q, 0x335860);
        if (
          !(l.resizePads || []).some((t) => t.every((v, j) => v === q[j])) &&
          !(l.faceContacts || []).some((c) => c.at.every((v, j) => v === q[j]))
        )
          this.mark("◇", q[0] - this.cx, q[2] * H + 0.025, q[1] - this.cz);
      }
      if (!l.faceMode)
        this.mark(
          String.fromCharCode(65 + i),
          p[0] -
            this.cx +
            ((l.goalDims?.[i]?.[0] || l.goalSizes?.[i] || 1) - 1) / 2,
          p[2] * H + 0.025,
          p[1] -
            this.cz +
            ((l.goalDims?.[i]?.[2] || l.goalSizes?.[i] || 1) - 1) / 2,
        );
    }
    for (const p of l.plates) {
      for (const q of p.cells || [p.at]) {
        tile(q, 0x23636a);
        this.mark("◎", q[0] - this.cx, q[2] * H + 0.025, q[1] - this.cz);
      }
    }
    for (const p of l.resizePads || [])
      this.mark(
        "G",
        p[0] - this.cx,
        p[2] * H + 0.06,
        p[1] - this.cz,
        "#ffce84",
      );
    for (const p of l.shell || [])
      this.mark(
        "≋",
        p[0] - this.cx,
        p[2] * H + 0.06,
        p[1] - this.cz,
        "#ffce84",
      );
    for (const c of l.ceilings || []) {
      this.box(
        0.94,
        0.13,
        0.94,
        0x65737a,
        c.at[0] - this.cx,
        c.at[2] * H + c.height,
        c.at[1] - this.cz,
      );
      for (const side of [-0.46, 0.46])
        this.box(
          0.04,
          c.height,
          0.04,
          0x65737a,
          c.at[0] - this.cx + side,
          c.at[2] * H + c.height / 2,
          c.at[1] - this.cz,
        );
    }
    this.levers = l.switches.map((p) => {
      const m = this.box(
        0.17,
        0.5,
        0.17,
        0xe0b56a,
        p.at[0] - this.cx,
        p.at[2] * H + 0.24,
        p.at[1] - this.cz,
      );
      this.mark("F", p.at[0] - this.cx, p.at[2] * H + 0.02, p.at[1] - this.cz);
      return m;
    });
    this.keys = l.keys.map((p) => {
      const m = this.box(
        0.26,
        0.4,
        0.26,
        0xffcf64,
        p.at[0] - this.cx,
        p.at[2] * H + 0.45,
        p.at[1] - this.cz,
      );
      m.rotation.z = 0.65;
      return m;
    });
    this.chestViews = (l.chests || []).map((c, i) => {
      const base = new T.Group();
      base.position.set(c.at[0] - this.cx, c.at[2] * H, c.at[1] - this.cz);
      this.root.add(base);
      this.box(0.8, 0.4, 0.8, 0x48656a, 0, 0.2, 0, base);
      for (const x of [-0.27, 0.27])
        this.box(0.065, 0.42, 0.82, 0xbda16b, x, 0.21, 0, base);
      const lid = new T.Group();
      lid.position.set(0, 0.42, -0.4);
      base.add(lid);
      this.box(0.84, 0.13, 0.84, 0x739b9d, 0, 0, 0.4, lid);
      const lock = this.box(0.14, 0.2, 0.09, 0xffcd69, 0, 0.34, 0.44, base);
      const reward = new T.Mesh(
        new T.OctahedronGeometry(0.16),
        this.material(0xffdb85),
      );
      this.root.add(reward);
      reward.visible = false;
      const opened = s.opened.includes(c.id);
      lid.rotation.x = opened ? -1.35 : 0;
      lock.visible = !opened;
      this.mark(
        "F" + (i + 1),
        c.at[0] - this.cx,
        c.at[2] * H + 0.04,
        c.at[1] - this.cz + 0.65,
        "#ffdb85",
        0.45,
      );
      return { base, lid, lock, reward, opened };
    });
    this.doors = l.doors.map((d) =>
      this.box(
        0.92,
        1.2,
        0.16,
        0xb28858,
        d.at[0] - this.cx,
        d.at[2] * H + 0.6,
        d.at[1] - this.cz,
      ),
    );
    this.lifts = l.lifts.map((t, i) => {
      const max = Math.max(...t.stops) * H;
      for (const dx of [-0.48, 0.48])
        for (const dz of [-0.48, 0.48])
          this.box(
            0.045,
            max + 0.6,
            0.045,
            0x547581,
            t.at[0] - this.cx + dx,
            max / 2,
            t.at[1] - this.cz + dz,
          );
      const g = new T.Group();
      this.root.add(g);
      g.position.set(t.at[0] - this.cx, s.lifts[i] * H, t.at[1] - this.cz);
      this.box(0.94, 0.16, 0.94, 0x52a8ad, 0, -0.09, 0, g);
      for (const dz of [-0.45, 0.45])
        this.box(0.9, 0.04, 0.045, 0xc0ece3, 0, 0.015, dz, g);
      return g;
    });
    this.actors = s.actors.map((p, i) => {
      const g = new T.Group();
      g.userData.actor = i;
      this.root.add(g);
      g.position.set(p[0] - this.cx, p[2] * H + 0.42, p[1] - this.cz);
      const dims = bodyDims(s, i);
      g.scale.set(...dims);
      g.position.set(
        p[0] - this.cx + (dims[0] - 1) / 2,
        p[2] * H + 0.5 * dims[1] - 0.02,
        p[1] - this.cz + (dims[2] - 1) / 2,
      );
      this.box(0.94, 0.94, 0.94, colors[i], 0, 0, 0, g);
      this.box(0.65, 0.025, 0.65, 0xd1ede7, 0, 0.485, 0, g);
      if (s.faces) {
        for (const side of ["u", "v", "r", "l", "f", "b"]) {
          const label = this.mark("0", 0, 0, 0, "#fff", 0.55);
          g.add(label);
          label.rotation.set(0, 0, 0);
          label.userData.faceKey = side;
          const q = 0.51;
          if (side === "u") {
            label.position.set(0, q, 0);
            label.rotation.x = -Math.PI / 2;
          }
          if (side === "v") {
            label.position.set(0, -q, 0);
            label.rotation.x = Math.PI / 2;
          }
          if (side === "r") {
            label.position.set(q, 0, 0);
            label.rotation.y = Math.PI / 2;
          }
          if (side === "l") {
            label.position.set(-q, 0, 0);
            label.rotation.y = -Math.PI / 2;
          }
          if (side === "f") label.position.set(0, 0, q);
          if (side === "b") {
            label.position.set(0, 0, -q);
            label.rotation.y = Math.PI;
          }
        }
        this.paintFaces(g, s.faces[i]);
      }
      if (l.energy)
        for (let j = 0; j < l.energy.reduce((a, b) => a + b, 0); j++) {
          const o = new T.Mesh(
            new T.SphereGeometry(0.07, 12, 8),
            new T.MeshStandardMaterial({
              color: 0xffcf69,
              emissive: 0xf7aa37,
              emissiveIntensity: 1,
            }),
          );
          o.position.set((j - 2) * 0.16, 0.62, 0);
          o.userData.energy = j;
          g.add(o);
        }
      return g;
    });
    // Permanent guide lines expose dependencies instead of hiding rules in prose.
    const line = (from, to) => {
      const geometry = new T.BufferGeometry().setFromPoints([
        new T.Vector3(from[0] - this.cx, from[2] * H + 0.03, from[1] - this.cz),
        new T.Vector3(to[0] - this.cx, to[2] * H + 0.03, to[1] - this.cz),
      ]);
      const o = new T.Line(
        geometry,
        new T.LineDashedMaterial({
          color: 0x719e9e,
          dashSize: 0.12,
          gapSize: 0.1,
          transparent: true,
          opacity: 0.5,
        }),
      );
      o.computeLineDistances();
      this.root.add(o);
    };
    const keySource = (id) =>
      l.keys.find((k) => k.id === id)?.at ||
      (l.chests || []).find((c) => c.reward === id)?.at;
    for (const target of [...(l.chests || []), ...(l.portals || [])])
      for (const id of target.requires?.keys || []) {
        const from = keySource(id);
        if (from) line(from, target.at);
      }
    for (const d of l.doors)
      for (const id of d.requires?.switches || []) {
        const sw = l.switches.find((p) => p.id === id);
        if (sw) line(sw.at, d.at);
      }
    for (const t of l.lifts)
      for (const id of t.requires?.plates || []) {
        const p = l.plates.find((p) => p.id === id);
        if (p) line(p.at, [...t.at, t.stops.at(-1)]);
      }
    this.drill = new T.Group();
    for (const p of l.seams || []) line(p.from, p.to);
    this.portalViews = (l.portals || []).map((p) => {
      const line = new T.Line(
        new T.BufferGeometry().setFromPoints([
          new T.Vector3(),
          new T.Vector3(),
        ]),
        new T.LineBasicMaterial({
          color: 0xa4adf3,
          transparent: true,
          opacity: 0.5,
        }),
      );
      const ghost = new T.Mesh(
        new T.BoxGeometry(1, 1, 1),
        new T.MeshBasicMaterial({
          color: 0xbac4ff,
          wireframe: true,
          transparent: true,
          opacity: 0.4,
        }),
      );
      this.root.add(line, ghost);
      return { line, ghost };
    });
    for (const d of l.doors)
      for (const id of [
        ...(d.requires?.plates || []),
        ...(d.requires?.anyPlates || []),
      ]) {
        const p = l.plates.find((t) => t.id === id);
        if (p) line(p.at, d.at);
      }
    for (const d of [...l.doors, ...(l.portals || [])])
      for (const r of d.requires?.deposits || [])
        if (l.depots?.[r.index]) line(l.depots[r.index].at, d.at);
    this.root.add(this.drill);
    this.box(0.12, 0.13, 0.65, 0xe0ac58, 0, 0, -0.3, this.drill);
    this.box(0.24, 0.24, 0.2, 0x536f79, 0, 0, -0.15, this.drill);
    this.drill.visible = false;
    const max = Math.max(...ps.map((p) => p[2]));
    const cells = [
      ...(l.visitTiles || []).map((t) => t.at),
      ...(l.phaseFloors || []).flatMap((g) => g.cells),
      ...(l.observerFloors || []).flatMap((g) => g.cells),
    ];
    this.dynamicViews = [
      ...new Map(cells.map((p) => [p.join(","), p])).values(),
    ].map((p) => {
      const o = new T.LineSegments(
        new T.EdgesGeometry(new T.BoxGeometry(0.94, 0.13, 0.94)),
        new T.LineBasicMaterial({
          color: 0x769db5,
          transparent: true,
          opacity: 0.45,
        }),
      );
      o.position.set(p[0] - this.cx, p[2] * H - 0.08, p[1] - this.cz);
      this.root.add(o);
      return { o, p, key: p.join(",") };
    });
    this.dynamicSupport = new Map();
    this.pendingFloorSupport = null;
    this.distance = 10 + max * 1.5;
    this.camera.position.set(
      this.distance,
      max * 1.2 + this.distance * 0.9,
      this.distance * 1.15,
    );
    this.update(s, 0);
    this.focus.copy(this.target);
    this.camera.lookAt(this.focus);
  }
  update(s, active, action) {
    this.nextFaces = s.faces;
    const now = performance.now(),
      duration =
        action?.type === "interact"
          ? 1050
          : action?.type === "dig"
            ? 550
            : ["panel", "wait"].includes(action?.type)
              ? 650
              : 260;
    this.busy = !!action;
    this.until = now + duration;
    const support = new Map(
      this.dynamicViews.map(({ p, key }) => [
        key,
        supportedTower(this.l, s, p, active) ||
          s.actors.some(
            (b, i) =>
              i !== active &&
              towerFootprint(b, bodyDims(s, i)).some((t) =>
                t.every((v, j) => v === p[j]),
              ) &&
              supportedTower(this.l, s, p, i),
          ),
      ]),
    );
    if (action) {
      this.pendingFloorSupport = support;
    } else {
      this.dynamicSupport = support;
      this.pendingFloorSupport = null;
    }
    for (const [i, v] of this.visitViews.entries()) {
      const left = this.l.visitTiles[i].limit - s.visits[i];
      if (left !== v.count) {
        const c = v.o.material.map.image,
          g = c.getContext("2d");
        g.clearRect(0, 0, 128, 128);
        g.font = "bold 70px system-ui";
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillStyle = left ? "#ffd18a" : "#db8f8f";
        g.fillText(String(left), 64, 64);
        v.o.material.map.needsUpdate = true;
        v.count = left;
      }
    }
    for (const ring of this.observerRings) {
      const p = s.actors[ring.actor],
        g = this.l.observerFloors[ring.g];
      ring.o.position.set(p[0] - this.cx, p[2] * H + 0.07, p[1] - this.cz);
      ring.o.visible =
        ring.actor !== active &&
        !(g.permanentRequires && enabled(this.l, s, g.permanentRequires));
    }
    const animate = (o, to, kind) =>
      this.motions.push({
        o,
        from: o.position.clone(),
        to,
        start: now,
        duration,
        kind,
      });
    this.motions = [];
    for (const [i, p] of (this.l.portals || []).entries()) {
      const view = this.portalViews[i],
        target = resolvePortal(this.l, s, p);
      view.line.visible = view.ghost.visible = !!target;
      if (!target) continue;
      const actor = p.actor ?? active,
        d = [...bodyDims(s, actor)];
      if ((target.rotate || 0) % 2) [d[0], d[2]] = [d[2], d[0]];
      const a = view.line.geometry.attributes.position;
      a.setXYZ(0, p.at[0] - this.cx, p.at[2] * H + 0.1, p.at[1] - this.cz);
      a.setXYZ(
        1,
        target.to[0] - this.cx,
        target.to[2] * H + 0.1,
        target.to[1] - this.cz,
      );
      a.needsUpdate = true;
      view.line.geometry.computeBoundingSphere();
      view.ghost.scale.set(...d);
      view.ghost.position.set(
        target.to[0] - this.cx + (d[0] - 1) / 2,
        target.to[2] * H + d[1] / 2,
        target.to[1] - this.cz + (d[2] - 1) / 2,
      );
    }
    for (const [i, w] of (this.l.movingWalls || []).entries()) {
      const phase = s.wallPhases[i],
        next =
          w.mode !== "manual" && w.brake && enabled(this.l, s, w.brake)
            ? phase
            : w.mode === "advance"
              ? Math.min(w.frames.length - 1, phase + 1)
              : (phase + 1) % w.frames.length;
      w.frames[phase].forEach((p, j) =>
        animate(
          this.panelViews[i][j],
          new T.Vector3(
            p[0] - this.cx,
            p[2] * H + (w.clearance ?? 0.675),
            p[1] - this.cz,
          ),
        ),
      );
      w.frames[next].forEach((p, j) =>
        this.panelGhosts[i][j].position.set(
          p[0] - this.cx,
          p[2] * H + 0.08,
          p[1] - this.cz,
        ),
      );
    }
    for (const [i, p] of s.actors.entries()) {
      const o = this.actors[i];
      const dims = bodyDims(s, i);
      animate(
        o,
        new T.Vector3(
          p[0] - this.cx + (dims[0] - 1) / 2,
          p[2] * H + 0.5 * dims[1] - 0.02,
          p[1] - this.cz + (dims[2] - 1) / 2,
        ),
        action?.type === "move" && (i === (action.actor ?? 0) || action.paired)
          ? i === (action.actor ?? 0) || this.l.linkMode !== "opposite"
            ? action.dir
            : { up: "down", down: "up", left: "right", right: "left" }[
                action.dir
              ]
          : action?.type === "portal" && i === (action.actor ?? 0)
            ? "portal"
            : null,
      );
      this.motions.at(-1).scaleFrom = o.scale.clone();
      this.motions.at(-1).scaleTo = new T.Vector3(...dims);
      o.children[1].material.emissive.set(i === active ? 0x68dac9 : 0);
      o.children[1].material.emissiveIntensity = 0.7;
      for (const m of o.children)
        if (m.userData.energy != null)
          m.visible = m.userData.energy < (s.energy?.[i] || 0);
    }
    for (const [i, y] of s.lifts.entries())
      animate(
        this.lifts[i],
        new T.Vector3(
          this.lifts[i].position.x,
          y * H,
          this.lifts[i].position.z,
        ),
      );
    for (const [i, d] of this.l.doors.entries())
      animate(
        this.doors[i],
        new T.Vector3(
          d.at[0] - this.cx,
          d.at[2] * H + (enabled(this.l, s, d.requires) ? -0.75 : 0.6),
          d.at[1] - this.cz,
        ),
      );
    for (const [i, v] of this.chestViews.entries()) {
      const opened = s.opened.includes(this.l.chests[i].id);
      if (opened !== v.opened) {
        v.opened = opened;
        v.start = now;
        v.fromAngle = v.lid.rotation.x;
        v.lock.visible = !opened;
        v.reward.visible = opened;
        v.flightFrom = v.base.position.clone().add(new T.Vector3(0, 0.8, 0));
        const p = s.actors[action?.actor ?? active];
        v.flightTo = new T.Vector3(
          p[0] - this.cx,
          p[2] * H + 0.65,
          p[1] - this.cz,
        );
      }
    }
    for (const [i, o] of this.keys.entries())
      o.visible = !s.keys.includes(this.l.keys[i].id);
    for (const [i, o] of this.rubble.entries()) o.visible = !s.dug.includes(i);
    if (action?.type === "dig") {
      const p = s.actors[action.actor ?? 0],
        d = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[
          action.dir
        ];
      this.drill.position.set(
        p[0] - this.cx + d[0] * 0.4,
        p[2] * H + 0.4,
        p[1] - this.cz + d[1] * 0.4,
      );
      this.drill.rotation.y = Math.atan2(-d[0], -d[1]);
      this.drill.visible = true;
      this.drillUntil = now + duration;
      const i = this.l.rubble.findIndex(
        (t) => t[0] === p[0] + d[0] && t[1] === p[1] + d[1] && t[2] === p[2],
      );
      if (i >= 0) {
        const o = this.rubble[i];
        o.visible = true;
        this.digRock = { o, until: now + duration, start: now };
      }
    }
    for (const [i, o] of this.levers.entries())
      o.material.emissive.set(
        s.switches.includes(this.l.switches[i].id) ? 0x4ac6aa : 0,
      );
    this.activeLayer = s.actors[active][2];
    if (this.bondLine)
      this.bondLine.material.color.set(
        this.l.relationDisplay
          ? relationHeld(this.l, s, this.l.relationDisplay)
            ? 0x77ecc6
            : 0xef9d97
          : s.linked || this.l.hardLink
            ? 0x77ecc6
            : 0x7c899c,
      );
    for (const [i, o] of this.depotViews.entries()) {
      const n = s.deposits[i];
      if (o.userData.count !== n) {
        const c = o.material.map.image,
          g = c.getContext("2d");
        g.clearRect(0, 0, 128, 128);
        g.font = "bold 70px system-ui";
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillStyle = "#ffdb81";
        g.fillText(String(n), 64, 64);
        o.material.map.needsUpdate = true;
        o.userData.count = n;
      }
    }
    this.brokenCells = new Set(
      (s.broken || []).map((i) => this.l.fragile[i].join(",")),
    );
    this.fragileMarks.forEach((o, i) => (o.visible = !s.broken.includes(i)));
    this.target.set(0, this.activeLayer * H, 0);
    this.visibility();
  }
  visibility() {
    for (const o of this.floorObjects)
      o.visible =
        (!this.layerOnly || o.userData.layer === this.activeLayer) &&
        !this.brokenCells?.has(o.userData.cell);
    for (const o of this.floorObjects)
      if (this.dynamicSupport.get(o.userData.cell) === false) o.visible = false;
    for (const v of this.dynamicViews)
      v.o.visible =
        this.dynamicSupport.get(v.key) === false &&
        (!this.layerOnly || v.p[2] === this.activeLayer);
  }
  tick() {
    requestAnimationFrame(() => this.tick());
    const now = performance.now(),
      dt = Math.min(0.1, (now - this.last) / 1000);
    this.last = now;
    if (this.pendingFloorSupport && now >= this.until) {
      this.dynamicSupport = this.pendingFloorSupport;
      this.pendingFloorSupport = null;
      this.visibility();
    }
    for (const v of this.chestViews || []) {
      if (v.start == null) continue;
      const t = Math.min(1, (now - v.start) / 750),
        ease = t * t * (3 - 2 * t);
      v.lid.rotation.x =
        v.fromAngle + ((v.opened ? -1.35 : 0) - v.fromAngle) * ease;
      if (v.reward.visible) {
        v.reward.position.lerpVectors(v.flightFrom, v.flightTo, ease);
        v.reward.position.y += Math.sin(t * Math.PI) * 0.65;
        v.reward.rotation.y += dt * 4;
        if (t === 1) v.reward.visible = false;
      }
      if (t === 1) v.start = null;
    }
    this.motions = this.motions.filter((m) => {
      const t = Math.min(1, (now - m.start) / m.duration),
        v = t * t * (3 - 2 * t);
      m.o.position.lerpVectors(m.from, m.to, v);
      if (m.scaleTo) m.o.scale.lerpVectors(m.scaleFrom, m.scaleTo, v);
      if (m.kind === "portal") {
        m.o.position.copy(t < 0.5 ? m.from : m.to);
        m.o.scale.multiplyScalar(Math.max(0.04, Math.abs(t * 2 - 1)));
      } else if (m.kind) {
        const angle = (t * Math.PI) / 2;
        const sign = ["right", "down"].includes(m.kind) ? 1 : -1;
        const xAxis = ["left", "right"].includes(m.kind),
          w = xAxis ? m.scaleFrom.x : m.scaleFrom.z,
          h = m.scaleFrom.y,
          axis = xAxis ? "x" : "z";
        m.o.scale.copy(m.scaleFrom);
        m.o.position[axis] =
          m.from[axis] +
          (sign * w) / 2 +
          sign * ((-w / 2) * Math.cos(angle) + (h / 2) * Math.sin(angle));
        m.o.position.y =
          m.from.y -
          h / 2 +
          (w / 2) * Math.sin(angle) +
          (h / 2) * Math.cos(angle);
        if (xAxis) m.o.rotation.z = -angle * sign;
        else m.o.rotation.x = angle * sign;
      }
      if (t === 1) {
        m.o.rotation.set(0, 0, 0);
        if (m.scaleTo) {
          m.o.scale.copy(m.scaleTo);
          m.o.position.copy(m.to);
        }
        if (this.nextFaces && m.o.userData.actor != null)
          this.paintFaces(m.o, this.nextFaces[m.o.userData.actor]);
      }
      return t < 1;
    });
    if (this.bondLine && this.actors.length === 2) {
      const a = this.bondLine.geometry.attributes.position;
      this.actors.forEach((o, i) =>
        a.setXYZ(i, o.position.x, o.position.y + 0.3, o.position.z),
      );
      a.needsUpdate = true;
      this.bondLine.geometry.computeBoundingSphere();
    }
    if (this.drill?.visible) {
      this.drill.children[0].rotation.z = now * 0.04;
      if (now >= this.drillUntil) this.drill.visible = false;
    }
    if (this.digRock) {
      this.digRock.o.scale.y = Math.max(
        0.02,
        1 - (now - this.digRock.start) / 550,
      );
      if (now >= this.digRock.until) {
        this.digRock.o.visible = false;
        this.digRock = null;
      }
    }
    if (now >= this.until) this.busy = false;
    this.focus.lerp(this.target, 1 - Math.exp(-dt * 3));
    this.camera.lookAt(this.focus);
    this.renderer.render(this.scene, this.camera);
  }
  paintFaces(o, faces) {
    for (const label of o.children) {
      const side = label.userData.faceKey;
      if (!side) continue;
      const value = faces[side];
      if (label.userData.value === value) continue;
      const c = label.material.map.image,
        g = c.getContext("2d");
      g.fillStyle = [
        "#dbecee",
        "#81cbd8",
        "#efc37d",
        "#bb9bdf",
        "#8bc9a8",
        "#e8a0aa",
      ][value];
      g.fillRect(0, 0, 128, 128);
      g.fillStyle = "#142630";
      g.font = "bold 84px system-ui";
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText(String(value), 64, 66);
      label.material.map.needsUpdate = true;
      label.userData.value = value;
    }
  }
}
