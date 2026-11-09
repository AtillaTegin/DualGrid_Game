import * as T from "../vendor/three.module.js";
import { Observatory } from "./scene.js";
import {
  footprint,
  gateOpen,
  wallCells,
  cellKey,
  worldDirection,
  DIRS,
  supported,
  rollBody,
  doorOpen,
  requirementsMet,
} from "./lab-engine.js";
const palette = [0x77d7d9, 0xf2b46e];
export class LabScene extends Observatory {
  loadLab(l, s) {
    this.lab = l;
    this.motion = null;
    const view = {
      ...l,
      id: l.refined ? "refined" : l.id,
      plates: [],
      bridges: [],
      specials: {},
      goals: l.goals.map((g) => [g.x, g.z]),
      pillars: [],
    };
    // The base observatory supplies lighting, materials and floating architecture.
    super.load(view, {
      blocks: s.blocks.map((b) => ({ ...b, size: 1, o: "U" })),
      flags: [],
    });
    this.baseTiles = this.stage.children.filter((o) =>
      Number.isInteger(o.userData.x),
    );
    this.features = new T.Group();
    this.stage.add(this.features);
    this.hazards = [];
    this.floorMarks = [];
    const tint = (p, color) => {
      const o = this.mesh(
        new T.PlaneGeometry(0.88, 0.88),
        new T.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.19,
          depthWrite: false,
        }),
      );
      o.rotation.x = -Math.PI / 2;
      o.position.set(p[0] - this.cx, 0.025, p[1] - this.cz);
      this.floorMarks.push(o);
    };
    const mark = (p, text, color = 0xb79ad9) => {
      const o = this.symbol(
        text,
        color,
        p[0] - this.cx,
        0.055,
        p[1] - this.cz,
        0.56,
      );
      this.floorMarks.push(o);
      return o;
    };
    for (const p of l.fragile || []) mark(p, "×", 0xf5b878);
    this.visitLabels = [];
    for (const p of l.visitable || [])
      this.visitLabels.push({ o: mark(p, "2", 0xf5b878), key: p.join(",") });
    for (const p of l.shell || []) mark(p, "≋", 0xf5b878);
    for (const p of l.light || []) {
      tint(p, 0xf1b576);
      mark(p, "B", 0xffc88d);
    }
    for (const p of l.holo || []) mark(p, "◇");
    for (const p of l.observer || []) mark(p, "◎");
    for (const p of l.reverse?.zone || []) {
      tint(p, 0xba83ee);
      mark(p, l.reverse.kind === "rotate" ? "↻" : "↔");
    }
    for (const p of l.reverse?.sensors || []) mark(p, "↔");
    for (const p of l.resizePads || [])
      mark(
        p,
        l.growPads && !l.growPads.some((q) => q[0] === p[0] && q[1] === p[1])
          ? "−"
          : "G",
      );
    if (l.forms && !l.resizePads) mark(l.starts[0], "G");
    if (l.formLatch) mark(l.formLatch.at, "▥");
    if (l.contact) mark(l.contact.at, String(l.contact.face), 0xffffff);
    for (const [i, p] of (l.sequence || []).entries())
      mark(p.at, `${i + 1}:${p.face}`, 0xffffff);
    for (const p of l.faceHazards || []) {
      tint(p.at, 0xff587b);
      mark(p.at, String(p.face), 0xff6c79);
    }
    if (l.terminal) mark(l.terminal, "T", 0xf0db89);
    for (const [i, p] of (l.terminals || []).entries())
      mark(p, `T${i + 1}`, 0xf0db89);
    if (l.portal) {
      mark(l.portal.from, "↗", 0x8cdff0);
      mark(l.portal.to, "↙", 0x8cdff0);
      if (l.portal.branch) mark(l.portal.branch.yes, "↙", 0x8cdff0);
    }
    if (l.fake) mark(l.fake.at, "⏣", 0xf0db89);
    for (const g of l.gates || []) {
      for (const p of g.tiles) mark(p, "═", 0x9bc9ef);
      for (const p of g.rule.pads || []) mark([p.x, p.z], "●", 0x9bc9ef);
      for (const p of g.rule.cells || []) mark(p, "⊙", 0x9bc9ef);
    }
    if (l.fake?.permission)
      mark([l.fake.permission.x, l.fake.permission.z], "●");
    if (l.wall?.brake) mark([l.wall.brake.x, l.wall.brake.z], "Ⅱ", 0x85e5bb);
    if (l.portal?.branch)
      mark([l.portal.branch.sensor.x, l.portal.branch.sensor.z], "●");
    for (const p of l.shelter?.cells || []) mark(p, "⌂", 0x85e5bb);
    for (const p of l.walls || [])
      this.box(
        0.96,
        1.7,
        0.96,
        this.side,
        p[0] - this.cx,
        0.72,
        p[1] - this.cz,
      );
    for (const c of l.ceilings || []) {
      this.box(
        0.94,
        0.13,
        0.94,
        this.brass,
        c.x - this.cx,
        c.h + (l.refined ? 0.08 : 0.15),
        c.z - this.cz,
      );
      mark([c.x, c.z], "⌒", 0x88c9d4);
    }
    if (l.refined) {
      for (const p of l.illusion || []) mark(p, "×", 0xff6385);
      const switchLabels = new Map();
      (l.switches || []).forEach((p, i) => {
        const key = p.join(",");
        switchLabels.set(key, [...(switchLabels.get(key) || []), i + 1]);
      });
      for (const [key, indices] of switchLabels)
        mark(key.split(",").map(Number), indices.join("/"), 0xffd888);
      if (l.formLatch) mark(l.formLatch.at, "▥", 0x9ee4df);
      for (const gate of l.gates || [])
        if (gate.rule.type === "echo") {
          mark(gate.rule.at, "◎", 0xff6e92);
          tint(gate.rule.at, 0xff6e92);
        }
    }
    for (const p of l.wall?.cells || []) {
      mark(p, "!", 0xfa627e);
      const o = this.box(
        0.9,
        1.8,
        0.9,
        this.emission(0x95334e, 0.7),
        p[0] - this.cx,
        0.9,
        p[1] - this.cz,
      );
      this.hazards.push({ o, p });
    }
    if (l.wall?.kind === "shrink")
      for (let x = 0; x <= (l.wall.max ?? 3); x++)
        for (let z = 0; z < l.map.length; z++) {
          const o = this.box(
            0.9,
            1.8,
            0.9,
            this.emission(0x95334e, 0.6),
            x - this.cx,
            0.9,
            z - this.cz,
          );
          this.hazards.push({ o, p: [x, z] });
        }
    this.cloneMesh = null;
    if (l.echo) {
      this.cloneMesh = this.box(
        0.96,
        0.96,
        0.96,
        new T.MeshStandardMaterial({
          color: 0xe83e68,
          emissive: 0xc92f59,
          emissiveIntensity: 0.7,
          transparent: true,
          opacity: 0.7,
        }),
        0,
        0,
        0,
      );
    }
    this.tetherLine = null;
    if (l.tether || l.link) {
      this.tetherLine = new T.Line(
        new T.BufferGeometry(),
        new T.LineBasicMaterial({ color: 0xc6a3ee }),
      );
      this.stage.add(this.tetherLine);
    }
    this.faceLabels = [];
    if (l.useFaces)
      for (let i = 0; i < s.blocks.length; i++) {
        const faces = {};
        for (const key of ["u", "v", "r", "l", "f", "b"]) {
          const c = document.createElement("canvas");
          c.width = c.height = 64;
          const tex = new T.CanvasTexture(c),
            mat = new T.MeshBasicMaterial({
              map: tex,
              transparent: true,
              side: T.DoubleSide,
            });
          const o = this.mesh(new T.PlaneGeometry(0.65, 0.65), mat);
          faces[key] = { o, c, tex };
        }
        this.faceLabels.push(faces);
      }
    this.goalOutlines = l.goals.map((g, i) => {
      const [w, , d] = g.dims || [1, 1, 1],
        x = g.x - this.cx - 0.43,
        z = g.z - this.cz - 0.43;
      const o = new T.Line(
        new T.BufferGeometry().setFromPoints(
          [
            [x, 0.04, z],
            [x + w - 0.14, 0.04, z],
            [x + w - 0.14, 0.04, z + d - 0.14],
            [x, 0.04, z + d - 0.14],
            [x, 0.04, z],
          ].map((p) => new T.Vector3(...p)),
        ),
        new T.LineBasicMaterial({ color: palette[i] }),
      );
      this.stage.add(o);
      this.symbol(
        i ? "B" : "A",
        palette[i],
        g.x - this.cx + (w - 1) / 2,
        0.07,
        g.z - this.cz + (d - 1) / 2,
        0.38,
      );
      return o;
    });
    this.goalTiles = [];
    if (l.refined)
      l.goals.forEach((goal, i) => {
        const [w, , d] = goal.dims || [1, 1, 1];
        for (let x = 0; x < w; x++)
          for (let z = 0; z < d; z++) {
            const px = goal.x + x - this.cx,
              pz = goal.z + z - this.cz;
            const fill = this.box(
              0.82,
              0.018,
              0.82,
              new T.MeshBasicMaterial({
                color: palette[i],
                transparent: true,
                opacity: 0.34,
              }),
              px,
              0.022,
              pz,
            );
            fill.userData.goalTile = i;
            this.goalTiles.push(fill);
            for (const [bw, bd, ox, oz] of [
              [0.86, 0.024, 0, -0.42],
              [0.86, 0.024, 0, 0.42],
              [0.024, 0.86, -0.42, 0],
              [0.024, 0.86, 0.42, 0],
            ])
              this.box(
                bw,
                0.02,
                bd,
                this.emission(palette[i], 2),
                px + ox,
                0.045,
                pz + oz,
              );
          }
      });
    this.echoForecast = null;
    if (l.refined && l.echo) {
      this.echoForecast = this.box(
        0.98,
        0.98,
        0.98,
        new T.MeshBasicMaterial({
          color: 0xff6e92,
          wireframe: true,
          transparent: true,
          opacity: 0.45,
        }),
        0,
        0,
        0,
      );
    }
    this.doorViews = [];
    this.itemViews = [];
    this.leverViews = [];
    for (const [i, item] of (l.collectibles || []).entries()) {
      const group = new T.Group();
      this.stage.add(group);
      group.position.set(item.at[0] - this.cx, 0.55, item.at[1] - this.cz);
      const color = item.kind === "key" ? 0xffce79 : 0xa7eeef;
      const mat =
        item.kind === "key"
          ? new T.MeshStandardMaterial({
              color: 0xe6b24f,
              metalness: 0.65,
              roughness: 0.24,
              emissive: 0xb97022,
              emissiveIntensity: 0.25,
            })
          : this.emission(color, 0.65);
      if (item.kind === "key") {
        const handle = this.mesh(
          new T.TorusGeometry(0.15, 0.045, 8, 20),
          mat,
          group,
        );
        handle.position.y = 0.15;
        this.box(0.055, 0.38, 0.055, mat, 0, -0.1, 0, group);
        this.box(0.16, 0.055, 0.055, mat, 0.05, -0.19, 0, group);
        this.box(0.12, 0.055, 0.055, mat, 0.04, -0.29, 0, group);
      } else this.mesh(new T.OctahedronGeometry(0.14), mat, group);
      const halo = this.mesh(
        new T.RingGeometry(0.22, 0.245, 32),
        new T.MeshBasicMaterial({ color, transparent: true, opacity: 0.65 }),
      );
      halo.rotation.x = -Math.PI / 2;
      halo.position.set(group.position.x, 0.04, group.position.z);
      this.itemViews.push({ group, halo, i, baseY: 0.55, target: 1, shown: 1 });
    }
    for (const [i, lever] of (l.levers || []).entries()) {
      const group = new T.Group();
      this.stage.add(group);
      group.position.set(lever.at[0] - this.cx, 0.03, lever.at[1] - this.cz);
      this.box(0.38, 0.14, 0.38, this.brass, 0, 0.07, 0, group);
      const arm = new T.Group();
      group.add(arm);
      arm.position.y = 0.15;
      this.box(0.045, 0.34, 0.045, this.brass, 0, 0.17, 0, arm);
      this.box(
        0.21,
        0.075,
        0.075,
        this.emission(0xf7c477, 1.3),
        0,
        0.35,
        0,
        arm,
      );
      const indicator = this.box(
        0.2,
        0.025,
        0.11,
        this.emission(0xffac61, 0.6),
        0,
        0.155,
        0.12,
        group,
      );
      this.leverViews.push({ group, arm, indicator, i, target: 0, shown: 0 });
      this.symbol(
        "F",
        0xffd690,
        lever.at[0] - this.cx,
        0.04,
        lever.at[1] - this.cz + 0.3,
        0.26,
      );
    }
    for (const door of l.doors || []) {
      for (const p of [door.at]) {
        const width = door.width || 1,
          x = p[0] + (width - 1) / 2 - this.cx,
          z = p[1] - this.cz;
        this.box(0.08, 3.2, 0.14, this.brass, x - width / 2 - 0.03, 1.6, z);
        this.box(0.08, 3.2, 0.14, this.brass, x + width / 2 + 0.03, 1.6, z);
        this.box(width + 0.14, 0.12, 0.18, this.brass, x, 3.22, z);
        const panel = new T.Group();
        this.stage.add(panel);
        panel.position.set(x, 1.55, z);
        this.box(width - 0.1, 3, 0.14, this.side, 0, 0, 0, panel);
        for (const px of [-0.3, 0, 0.3])
          this.box(
            0.025,
            2.7,
            0.17,
            this.emission(0xdca55e, 0.7),
            px * width,
            0,
            0,
            panel,
          );
        this.doorViews.push({
          door,
          panel,
          base: panel.position.clone(),
          shown: doorOpen(l, s, door) ? 1 : 0,
          target: doorOpen(l, s, door) ? 1 : 0,
        });
      }
    }
    this.discovered = new Set();
    // North arrow and coordinates are stable even inside an input reversal zone.
    this.symbol("↑ N", 0x94b1bc, -this.cx - 0.3, 0.02, -this.cz - 1, 0.8);
    this.mode = "playing";
    this.refresh(s, 0);
    this.resize();
  }
  center(b) {
    return new T.Vector3(
      b.x + (b.dims[0] - 1) / 2 - this.cx,
      b.dims[1] / 2,
      b.z + (b.dims[2] - 1) / 2 - this.cz,
    );
  }
  pose(g, b) {
    g.position.copy(this.center(b));
    g.rotation.set(0, 0, 0);
    g.scale.set(...b.dims);
  }
  refresh(s, active) {
    this.labState = s;
    this.labActive = active;
    this.hintArrow.visible = false;
    for (const v of this.visitLabels || []) {
      const count = s.visits[v.key] ?? 2;
      if (v.count !== count) {
        v.count = count;
        const canvas = v.o.material.map.image,
          ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 128, 128);
        ctx.fillStyle = "#f5b878";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "60px Georgia";
        ctx.fillText(String(count), 64, 66);
        v.o.material.map.needsUpdate = true;
      }
    }
    for (const v of this.itemViews || [])
      v.target = (s.collected || 0) & (1 << v.i) ? 0 : 1;
    for (const v of this.doorViews || [])
      v.target = doorOpen(this.lab, s, v.door) ? 1 : 0;
    for (const v of this.leverViews || []) {
      v.target = (s.levers || 0) & (1 << v.i) ? 1 : 0;
      v.indicator.material.color.setHex(
        v.target
          ? 0x84e4b7
          : requirementsMet(this.lab, s, this.lab.levers[v.i].requires)
            ? 0xffcf79
            : 0xb57558,
      );
    }
    s.blocks.forEach((b, i) => {
      this.pose(this.blocks[i], b);
      if (s.dead && !supported(this.lab, s, b, i))
        this.blocks[i].position.y -= 2.5;
      this.blocks[i].visible = true;
      this.blocks[i].userData.cap.material.emissiveIntensity =
        i === active ? 2 : 0.5;
      const p = this.center(b);
      this.targets[i].position.set(p.x, 0.05, p.z);
      this.targets[i].scale.set(b.dims[0], b.dims[2], 1);
      this.targets[i].visible = i === active;
      const labels = this.faceLabels?.[i];
      if (labels)
        for (const [key, f] of Object.entries(labels)) {
          const ctx = f.c.getContext("2d");
          ctx.clearRect(0, 0, 64, 64);
          ctx.fillStyle = "#fff5d8";
          ctx.font = "bold 48px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(b.faces[key], 32, 49);
          f.tex.needsUpdate = true;
          f.o.position.copy(p);
          f.o.rotation.set(0, 0, 0);
          const [w, h, d] = b.dims;
          if (key === "u" || key === "v") {
            f.o.position.y += (key === "u" ? 1 : -1) * (h / 2 + 0.02);
            f.o.rotation.x = -Math.PI / 2;
          } else if (key === "r" || key === "l") {
            f.o.position.x += (key === "r" ? 1 : -1) * (w / 2 + 0.02);
            f.o.rotation.y = Math.PI / 2;
          } else f.o.position.z += (key === "f" ? 1 : -1) * (d / 2 + 0.02);
        }
    });
    for (const o of this.baseTiles) {
      const { x, z } = o.userData,
        k = cellKey(x, z),
        g = this.lab.gates?.find((g) =>
          g.tiles.some((p) => p[0] === x && p[1] === z),
        ),
        observer = this.lab.observer?.some((p) => p[0] === x && p[1] === z);
      o.visible =
        !s.broken.includes(k) &&
        !s.revealed.includes(k) &&
        (!g || gateOpen(this.lab, s, g.id)) &&
        (!observer ||
          s.blocks.some(
            (b, i) =>
              Math.abs(x - b.x) + Math.abs(z - b.z) <= this.lab.radius &&
              !footprint(b).some((p) => p[0] === x && p[1] === z),
          ));
    }
    for (const k of s.revealed)
      if (!this.discovered.has(k)) {
        this.discovered.add(k);
        const [x, z] = k.split(",").map(Number);
        this.symbol("×", 0xff6385, x - this.cx, 0.03, z - this.cz, 0.8);
      }
    for (const o of this.floorMarks) {
      const x = Math.round(o.position.x + this.cx),
        z = Math.round(o.position.z + this.cz);
      o.visible = !s.broken.includes(cellKey(x, z));
    }
    const wc = wallCells(this.lab, s);
    for (const { o, p } of this.hazards)
      o.visible = wc.some((q) => q[0] === p[0] && q[1] === p[1]);
    if (this.cloneMesh) {
      this.cloneMesh.visible = s.clone.alive;
      this.pose(this.cloneMesh, s.clone);
    }
    if (this.echoForecast) {
      const head = s.queue[0],
        d =
          this.lab.echo.mirror === "x"
            ? { right: "left", left: "right", up: "up", down: "down" }[head]
            : head;
      this.echoForecast.visible = !!s.clone.alive && !!d;
      if (d) this.pose(this.echoForecast, rollBody(s.clone, d));
    }
    if (this.tetherLine) {
      this.tetherLine.visible = !!this.lab.tether || s.linked;
      this.tetherLine.geometry.dispose();
      this.tetherLine.geometry = new T.BufferGeometry().setFromPoints(
        s.blocks.map((b) => this.center(b)),
      );
    }
    [...this.goalMarks, ...(this.goalOutlines || [])].forEach((o) => {
      o.visible = !(
        this.lab.fake &&
        s.portalCount === 0 &&
        this.lab.fake.kind !== "permission"
      );
    });
  }
  animate(before, after, action, done) {
    this.refresh(after, this.labActive);
    const items = [];
    before.blocks.forEach((b, i) => {
      const n = after.blocks[i],
        start = this.center(b),
        end = this.center(n);
      if (start.distanceTo(end) > 0.001 || b.dims.join() !== n.dims.join()) {
        const g = this.blocks[i];
        this.pose(g, b);
        const dir =
          action.type === "move"
            ? worldDirection(this.lab, before, action.block ?? 0, action.dir)
            : null;
        // A rigid roll uses the old cuboid and its floor edge as the pivot.
        const delta = dir && DIRS[dir],
          rolled =
            dir &&
            Math.abs(n.x - b.x) + Math.abs(n.z - b.z) <=
              Math.max(...b.dims) + 1;
        let pivot, axis;
        if (rolled) {
          const [dx, dz] =
            i === (action.block ?? 0) || !before.linked
              ? delta
              : delta.map((v) => -v);
          pivot = start.clone();
          pivot.y = 0;
          if (dx) {
            pivot.x += (dx * b.dims[0]) / 2;
            axis = new T.Vector3(0, 0, -dx);
          } else {
            pivot.z += (dz * b.dims[2]) / 2;
            axis = new T.Vector3(dz, 0, 0);
          }
        }
        items.push({ i, b, n, start, end, pivot, axis });
      }
    });
    this.motion = {
      start: performance.now(),
      duration: action.type === "interact" ? 650 : 240,
      items,
      after,
      done,
    };
  }
  bump(state, i, dir, done) {
    this.motion = {
      kind: "bump",
      start: performance.now(),
      duration: 250,
      items: [],
      after: state,
      done,
      i,
      dir,
    };
  }
  finishMotion() {
    const m = this.motion;
    if (!m) return;
    this.motion = null;
    this.refresh(m.after, this.labActive);
    m.done?.();
  }
  showHint(a) {
    if (a?.type !== "move") return;
    const b = this.labState.blocks[a.block],
      d = DIRS[worldDirection(this.lab, this.labState, a.block, a.dir)];
    this.hintArrow.setDirection(new T.Vector3(d[0], 0, d[1]));
    this.hintArrow.position.copy(this.center(b));
    this.hintArrow.position.y = b.dims[1] + 0.45;
    this.hintArrow.visible = true;
  }
  frame(now) {
    const elapsed = Math.min(Math.max((now - this.last) / 1000, 0), 1),
      dt = Math.min(elapsed, 0.05);
    this.last = now;
    if (this.dust) this.dust.rotation.y += dt * 0.005;
    for (const v of this.itemViews || []) {
      v.shown += (v.target - v.shown) * (1 - Math.exp(-elapsed * 16));
      v.group.scale.setScalar(Math.max(0.001, v.shown));
      v.group.visible = v.shown > 0.01;
      v.halo.visible = !!v.target;
      v.group.rotation.y = now * 0.0008;
      v.group.position.y = v.baseY + Math.sin(now * 0.002 + v.i) * 0.065;
    }
    for (const v of this.doorViews || []) {
      v.shown += (v.target - v.shown) * (1 - Math.exp(-elapsed * 7));
      v.panel.position.copy(v.base);
      if (v.door.slide === "side")
        v.panel.position.x += v.shown * (v.door.width || 1);
      else v.panel.position.y += v.shown * 3.2;
    }
    for (const v of this.leverViews || []) {
      v.shown += (v.target - v.shown) * (1 - Math.exp(-elapsed * 12));
      v.arm.rotation.z = 0.6 - v.shown * 1.2;
    }
    for (let i = 0; i < this.goalMarks.length; i++)
      this.goalMarks[i].material.emissiveIntensity =
        1.2 + Math.sin(now * 0.0016 + i) * 0.3;
    const m = this.motion;
    if (m) {
      const u = Math.min(1, (now - m.start) / m.duration),
        e = u * u * (3 - 2 * u);
      if (m.kind === "bump") {
        const g = this.blocks[m.i],
          p = this.center(this.labState.blocks[m.i]),
          [dx, dz] = DIRS[m.dir];
        g.position.copy(p);
        g.position.x += dx * Math.sin(u * Math.PI) * 0.11;
        g.position.z += dz * Math.sin(u * Math.PI) * 0.11;
      }
      for (const it of m.items) {
        const g = this.blocks[it.i];
        if (it.pivot) {
          const q = new T.Quaternion().setFromAxisAngle(
            it.axis,
            (e * Math.PI) / 2,
          );
          g.position
            .copy(it.start)
            .sub(it.pivot)
            .applyQuaternion(q)
            .add(it.pivot);
          g.quaternion.copy(q);
        } else {
          g.position.lerpVectors(it.start, it.end, e);
          g.position.y += Math.sin(e * Math.PI) * 0.25;
          g.scale.set(...it.b.dims.map((v, i) => v + (it.n.dims[i] - v) * e));
        }
      }
      if (u === 1) this.finishMotion();
    }
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.frame);
  }
}
