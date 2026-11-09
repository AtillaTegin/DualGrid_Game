import * as T from "../vendor/three.module.js";
import { cells, tile, groups, roll, supported } from "./logic.js";
const C = {
  cyan: 0x79d0d4,
  amber: 0xe4ad68,
  purple: 0xb7a0d9,
  stone: 0x42515a,
  bronze: 0x8d7451,
};
const circuitColor = (group = 0) => [0x79d0d4, 0xe4ad68, 0xb7a0d9][group % 3];
const V = (x = 0, y = 0, z = 0) => new T.Vector3(x, y, z);
function bevel(w, h, d, r = 0.025) {
  const s = new T.Shape();
  const x = -w / 2 + r,
    y = -h / 2 + r;
  s.moveTo(x, y);
  s.lineTo(-x, y);
  s.lineTo(-x, -y);
  s.lineTo(x, -y);
  s.closePath();
  const g = new T.ExtrudeGeometry(s, {
    depth: d - 2 * r,
    bevelEnabled: true,
    bevelThickness: r,
    bevelSize: r,
    bevelSegments: 1,
    steps: 1,
    curveSegments: 1,
  });
  g.translate(0, 0, -d / 2 + r);
  return g;
}
function noiseTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d");
  const d = ctx.createImageData(128, 128);
  let seed = 19;
  for (let i = 0; i < d.data.length; i += 4) {
    seed = (seed * 16807) % 2147483647;
    const n = 112 + (seed % 55);
    d.data[i] = n;
    d.data[i + 1] = n;
    d.data[i + 2] = n;
    d.data[i + 3] = 255;
  }
  ctx.putImageData(d, 0, 0);
  const t = new T.CanvasTexture(c);
  t.colorSpace = T.SRGBColorSpace;
  t.wrapS = t.wrapT = T.RepeatWrapping;
  return t;
}
function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d"),
    g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,.8)");
  g.addColorStop(0.12, "rgba(255,255,255,.3)");
  g.addColorStop(0.45, "rgba(255,255,255,.05)");
  g.addColorStop(1, "transparent");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new T.CanvasTexture(c);
}
function labelTexture(text, color) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d");
  ctx.font = "60px Georgia";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 64, 66);
  return new T.CanvasTexture(c);
}
export class Observatory {
  constructor(container) {
    this.container = container;
    this.renderer = new T.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = T.PCFSoftShadowMap;
    this.renderer.toneMapping = T.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.4;
    container.appendChild(this.renderer.domElement);
    this.scene = new T.Scene();
    this.scene.fog = new T.FogExp2(0x0c1c28, 0.028);
    this.camera = new T.OrthographicCamera(-10, 10, 7, -7, 0.1, 180);
    this.camera.position.set(15, 15, 15);
    this.scene.add(new T.HemisphereLight(0xaecddd, 0x263137, 2.3));
    const sun = new T.DirectionalLight(0xc5d8dc, 3.4);
    sun.position.set(-8, 18, 7);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, {
      left: -15,
      right: 15,
      top: 15,
      bottom: -15,
      near: 0.5,
      far: 55,
    });
    sun.shadow.bias = -0.00025;
    sun.shadow.normalBias = 0.025;
    this.scene.add(sun);
    const rim = new T.DirectionalLight(0x54b6d1, 2.2);
    rim.position.set(6, 4, -12);
    this.scene.add(rim);
    const warm = new T.PointLight(0xeeb46d, 16, 26, 2);
    warm.position.set(-5, 3, 6);
    this.scene.add(warm);
    const env = new T.Scene();
    env.background = new T.Color(0x758e9c);
    for (const [x, y, z, color] of [
      [-4, 6, 3, 0xffe9ca],
      [5, 2, -4, 0xb4e7f1],
    ]) {
      const panel = new T.Mesh(
        new T.BoxGeometry(5, 5, 0.1),
        new T.MeshBasicMaterial({ color }),
      );
      panel.position.set(x, y, z);
      panel.lookAt(0, 0, 0);
      env.add(panel);
    }
    const pmrem = new T.PMREMGenerator(this.renderer);
    this.environment = pmrem.fromScene(env, 0.05);
    this.scene.environment = this.environment.texture;
    this.scene.environmentIntensity = 0.7;
    env.traverse((o) => {
      if (o.isMesh) {
        o.geometry.dispose();
        o.material.dispose();
      }
    });
    pmrem.dispose();
    this.noise = noiseTexture();
    this.glow = glowTexture();
    this.stone = new T.MeshStandardMaterial({
      color: 0x71818b,
      map: this.noise,
      roughness: 0.87,
      metalness: 0.12,
    });
    this.side = new T.MeshStandardMaterial({
      color: 0x293b48,
      map: this.noise,
      roughness: 0.83,
      metalness: 0.24,
    });
    this.brass = new T.MeshStandardMaterial({
      color: C.bronze,
      metalness: 0.78,
      roughness: 0.37,
    });
    this.floorGeo = bevel(0.98, 0.27, 0.98, 0.018);
    this.bodyGeo = bevel(0.96, 1.98, 0.96, 0.022);
    this.cubeGeo = bevel(0.96, 0.98, 0.96, 0.022);
    this.stage = new T.Group();
    this.scene.add(this.stage);
    this.animated = [];
    this.bridges = [];
    this.goalMarks = [];
    this.targets = [];
    this.blocks = [];
    this.mode = "home";
    this.createWorld();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.resize();
    this.last = performance.now();
    this.frame = this.frame.bind(this);
    requestAnimationFrame(this.frame);
  }
  mesh(g, m, parent = this.stage) {
    const o = new T.Mesh(g, m);
    o.castShadow = true;
    o.receiveShadow = true;
    parent.add(o);
    return o;
  }
  box(w, h, d, m, x, y, z, parent = this.stage) {
    const o = this.mesh(new T.BoxGeometry(w, h, d), m, parent);
    o.position.set(x, y, z);
    return o;
  }
  emission(color, intensity = 1.5) {
    return new T.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: intensity,
      roughness: 0.35,
      metalness: 0.35,
    });
  }
  halo(color, x, y, z, scale = 1, parent = this.stage) {
    const s = new T.Sprite(
      new T.SpriteMaterial({
        map: this.glow,
        color,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: T.AdditiveBlending,
      }),
    );
    s.position.set(x, y, z);
    s.scale.set(scale, scale, 1);
    parent.add(s);
    return s;
  }
  createWorld() {
    const bg = new T.Group();
    this.scene.add(bg);
    const dark = new T.MeshStandardMaterial({
      color: 0x172b39,
      roughness: 0.95,
      metalness: 0.2,
    });
    let seed = 71;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < 45; i++) {
      const a = rnd() * Math.PI * 2,
        r = 16 + rnd() * 28,
        h = 4 + rnd() * 23;
      const o = this.box(
        1 + rnd() * 2,
        h,
        1 + rnd() * 2,
        dark,
        Math.cos(a) * r,
        -12 + h / 2,
        Math.sin(a) * r,
        bg,
      );
      o.rotation.y = rnd() * 0.18;
      if (i % 4 === 0)
        this.box(
          0.035,
          h * 0.6,
          0.04,
          this.emission(i % 8 ? 0x306b7d : 0x8e6945, 0.7),
          o.position.x + 0.7,
          o.position.y,
          o.position.z + 0.7,
          bg,
        );
    }
    const floor = this.mesh(
      new T.PlaneGeometry(300, 300),
      new T.MeshBasicMaterial({ color: 0x101e2c }),
      bg,
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -18;
    const particles = new Float32Array(240 * 3);
    for (let i = 0; i < 240; i++) {
      particles[i * 3] = (rnd() - 0.5) * 55;
      particles[i * 3 + 1] = rnd() * 14 - 7;
      particles[i * 3 + 2] = (rnd() - 0.5) * 55;
    }
    const geo = new T.BufferGeometry();
    geo.setAttribute("position", new T.BufferAttribute(particles, 3));
    this.dust = new T.Points(
      geo,
      new T.PointsMaterial({
        color: 0xa6c5cf,
        size: 0.035,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      }),
    );
    this.scene.add(this.dust);
    const moon = this.mesh(
      new T.TorusGeometry(3.7, 0.023, 8, 100),
      new T.MeshBasicMaterial({
        color: 0x8da7ac,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      }),
      bg,
    );
    moon.position.set(0, -1, -8);
    moon.lookAt(moon.position.clone().add(V(18, 12.728, 18)));
    const arc = this.mesh(
      new T.TorusGeometry(4, 0.018, 6, 100, Math.PI * 1.65),
      new T.MeshBasicMaterial({
        color: 0xa18b69,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      }),
      bg,
    );
    arc.position.copy(moon.position);
    arc.quaternion.copy(moon.quaternion);
    arc.rotateZ(0.3);
  }
  disposeStage() {
    const textures = new Set();
    this.stage.traverse((o) => {
      if (o.isMesh) {
        if (![this.floorGeo, this.bodyGeo, this.cubeGeo].includes(o.geometry))
          o.geometry.dispose();
        for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
          if (![this.stone, this.side, this.brass].includes(m)) {
            if (m.map && ![this.noise, this.glow].includes(m.map))
              textures.add(m.map);
            m.dispose();
          }
        }
      } else if (o.isLine) {
        o.geometry.dispose();
        o.material.dispose();
      } else if (o.isSprite) o.material.dispose();
    });
    textures.forEach((t) => t.dispose());
    this.stage.clear();
    this.bridges = [];
    this.goalMarks = [];
    this.targets = [];
    this.animated = [];
    this.blocks = [];
    this.animation = null;
  }
  load(level, state) {
    this.disposeStage();
    this.level = level;
    this.state = state;
    this.cx = (Math.max(...level.map.map((r) => r.length)) - 1) / 2;
    this.cz = (level.map.length - 1) / 2;
    const multiCircuit = new Set(level.plates.map((p) => p.group)).size > 1;
    const off = ([x, z]) => [x - this.cx, z - this.cz];
    for (let z = 0; z < level.map.length; z++)
      for (let x = 0; x < level.map[z].length; x++) {
        const t = tile(level, x, z);
        if (!t) continue;
        const [wx, wz] = off([x, z]);
        const base = this.mesh(
          this.floorGeo,
          t.type === "bridge" ? this.brass : this.stone,
        );
        base.position.set(wx, -0.135, wz);
        base.userData = { x, z };
        if (t.type === "bridge") {
          this.bridges.push({ o: base, group: t.group });
          const e = new T.LineSegments(
            new T.EdgesGeometry(this.floorGeo),
            new T.LineBasicMaterial({
              color: circuitColor(t.group),
              transparent: true,
              opacity: 0.32,
            }),
          );
          e.position.set(wx, -0.135, wz);
          this.stage.add(e);
          if (multiCircuit)
            this.symbol(
              String(t.group + 1),
              circuitColor(t.group),
              wx,
              0.035,
              wz,
              0.42,
            );
        }
        if ((x + z) % 3 === 0 && t.type === "floor") {
          this.box(0.72, 0.008, 0.011, this.brass, wx, 0.008, wz + 0.35);
          this.box(0.011, 0.008, 0.13, this.brass, wx - 0.35, 0.008, wz + 0.29);
        }
        if (t.type === "ice") {
          const ice = this.box(
            0.92,
            0.028,
            0.92,
            new T.MeshPhysicalMaterial({
              color: 0x426f80,
              metalness: 0.45,
              roughness: 0.19,
              clearcoat: 1,
              transparent: true,
              opacity: 0.88,
            }),
            wx,
            0.016,
            wz,
          );
          for (let j = -1; j <= 1; j++)
            this.box(
              0.012,
              0.007,
              0.7,
              this.emission(0x5b8b9d, 0.25),
              wx + j * 0.23,
              0.036,
              wz,
            );
        }
        if (t.type === "light") {
          for (let j = -1; j <= 1; j++)
            this.box(
              0.65,
              0.012,
              0.025,
              this.emission(0xdac8a5, 0.7),
              wx,
              0.025,
              wz + j * 0.21,
            );
          const border = this.mesh(
            new T.RingGeometry(0.33, 0.35, 4),
            this.emission(0xc7b98b, 0.7),
          );
          border.rotation.x = -Math.PI / 2;
          border.rotation.z = Math.PI / 4;
          border.position.set(wx, 0.027, wz);
        }
        if (
          t.type !== "bridge" &&
          ((x + z) % 4 === 0 ||
            (!tile(level, x + 1, z) && !tile(level, x, z + 1)))
        ) {
          const h = 1.5 + ((x * 7 + z * 11) % 6) * 0.3;
          this.box(0.76, h, 0.76, this.side, wx, -0.27 - h / 2, wz);
          this.box(0.82, 0.09, 0.82, this.brass, wx, -0.45, wz);
        }
      }
    for (const p of level.plates || []) {
      const [x, z] = off([p.x, p.z]);
      const o = this.mesh(
        new T.CylinderGeometry(0.31, 0.35, 0.065, p.heavy ? 4 : 32),
        this.brass,
      );
      o.position.set(x, 0.04, z);
      o.rotation.y = Math.PI / 4;
      const ring = this.mesh(
        new T.TorusGeometry(0.32, 0.015, 6, 40),
        this.emission(circuitColor(p.group), 0.6),
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.set(x, 0.085, z);
      this.animated.push({ o: ring, kind: "plate", group: p.group });
      if (multiCircuit)
        this.symbol(
          String(p.group + 1),
          circuitColor(p.group),
          x,
          0.095,
          z,
          0.45,
        );
      else if (p.heavy) this.symbol("Ⅱ", C.cyan, x, 0.095, z, 0.35);
      for (const bridge of this.bridges.filter((b) => b.group === p.group)) {
        const path = [
          V(x, 0.035, z),
          V(x, 0.035, bridge.o.position.z),
          V(bridge.o.position.x, 0.035, bridge.o.position.z),
        ];
        const line = new T.Line(
          new T.BufferGeometry().setFromPoints(path),
          new T.LineBasicMaterial({
            color: circuitColor(p.group),
            transparent: true,
            opacity: 0.45,
          }),
        );
        this.stage.add(line);
      }
    }
    for (const p of level.pads || []) {
      const [x, z] = off(p);
      const o = this.mesh(
        new T.RingGeometry(0.28, 0.34, 6),
        this.emission(C.purple, 0.75),
      );
      o.rotation.x = -Math.PI / 2;
      o.position.set(x, 0.035, z);
      this.symbol("⇄", C.purple, x, 0.04, z, 0.45);
      this.halo(C.purple, x, 0.12, z, 1.5);
    }
    if (level.pads) {
      const p = level.pads.map(off);
      this.box(
        Math.abs(p[0][0] - p[1][0]) || 0.018,
        0.01,
        Math.abs(p[0][1] - p[1][1]) || 0.018,
        this.emission(C.purple, 0.6),
        (p[0][0] + p[1][0]) / 2,
        0.02,
        (p[0][1] + p[1][1]) / 2,
      );
    }
    level.goals.forEach((p, i) => {
      const [x, z] = off(p),
        color = i ? C.amber : C.cyan;
      const ring = this.mesh(
        new T.RingGeometry(0.34, 0.39, 4),
        this.emission(color, 1.6),
      );
      ring.rotation.x = -Math.PI / 2;
      ring.rotation.z = Math.PI / 4;
      ring.position.set(x, 0.035, z);
      const onPlate = level.plates.some(
        (p) => p.x === level.goals[i][0] && p.z === level.goals[i][1],
      );
      this.symbol(
        i ? "B" : "A",
        color,
        x + (onPlate ? 0.26 : 0),
        onPlate ? 0.11 : 0.045,
        z + (onPlate ? 0.26 : 0),
        onPlate ? 0.32 : 0.65,
      );
      this.halo(color, x, 0.1, z, 2);
      this.goalMarks.push(ring);
      const l = new T.PointLight(color, 1.7, 3, 2);
      l.position.set(x, 0.6, z);
      this.stage.add(l);
    });
    // Non-playable buttresses and gates sit outside the actual grid.
    const maxx = Math.max(...level.map.map((r) => r.length)) - 1;
    for (const p of level.id >= 13 || level.sceneDecor
      ? [
          [-0.9, 1],
          [maxx + 0.9, level.map.length - 2],
        ]
      : []) {
      const [x, z] = off(p);
      this.box(0.4, 2.8, 0.4, this.side, x, 1.1, z);
      this.box(0.48, 0.09, 0.48, this.brass, x, 2.52, z);
      this.box(0.06, 1.9, 0.08, this.emission(C.amber, 0.8), x, 1.25, z + 0.22);
      this.halo(C.amber, x, 1.8, z, 2);
    }
    state.blocks.forEach((b, i) => {
      const g = new T.Group();
      this.stage.add(g);
      const color = i ? C.amber : C.cyan;
      const mat = new T.MeshPhysicalMaterial({
        color: i ? 0xc48b58 : 0x559aa4,
        emissive: color,
        emissiveIntensity: 0.12,
        metalness: 0.5,
        roughness: 0.3,
        clearcoat: 0.4,
        clearcoatRoughness: 0.35,
        map: this.noise,
      });
      this.mesh(b.size === 1 ? this.cubeGeo : this.bodyGeo, mat, g);
      for (const y of b.size === 1 ? [-0.28, 0.28] : [-0.72, 0.72]) {
        this.box(0.985, 0.048, 0.985, this.brass, 0, y, 0, g);
        this.box(
          0.99,
          0.012,
          0.28,
          this.emission(color, 0.55),
          0,
          y + 0.027,
          0.32,
          g,
        );
      }
      for (const z of [-0.488, 0.488]) {
        const o = this.mesh(
          new T.PlaneGeometry(0.65, 0.65),
          new T.MeshBasicMaterial({
            map: labelTexture(i ? "B" : "A", i ? "#f6c589" : "#b1f1ec"),
            transparent: true,
            depthWrite: false,
          }),
          g,
        );
        o.position.set(0, 0, z);
        if (z < 0) o.rotation.y = Math.PI;
      }
      const cap = this.box(
        0.48,
        0.025,
        0.48,
        this.emission(color, 0.85),
        0,
        b.size === 1 ? 0.506 : 1.006,
        0,
        g,
      );
      // Keep identity legible after a cube rolls onto a different physical face.
      for (const sign of [-1, 1]) {
        const side = this.mesh(
          new T.PlaneGeometry(0.6, 0.6),
          new T.MeshBasicMaterial({
            map: labelTexture(i ? "B" : "A", i ? "#f6c589" : "#b1f1ec"),
            transparent: true,
            depthWrite: false,
          }),
          g,
        );
        side.position.set(sign * 0.49, 0, 0);
        side.rotation.y = (sign * Math.PI) / 2;
        const end = this.mesh(
          new T.PlaneGeometry(0.43, 0.43),
          new T.MeshBasicMaterial({
            map: labelTexture(i ? "B" : "A", i ? "#f6c589" : "#b1f1ec"),
            transparent: true,
            depthWrite: false,
          }),
          g,
        );
        end.position.y = sign * ((b.size === 1 ? 0.5 : 1) + 0.024);
        end.rotation.x = (-sign * Math.PI) / 2;
      }
      this.blocks.push(g);
      g.userData.cap = cap;
      this.setPose(g, b);
      const target = this.mesh(
        new T.RingGeometry(0.52, 0.54, 48),
        new T.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.65,
          depthWrite: false,
        }),
      );
      target.rotation.x = -Math.PI / 2;
      target.rotation.z = Math.PI / 4;
      this.targets.push(target);
    });
    this.preview = new T.Group();
    this.stage.add(this.preview);
    this.previewTiles = [];
    for (let i = 0; i < 2; i++) {
      const o = this.mesh(
        new T.PlaneGeometry(0.94, 0.94),
        new T.MeshBasicMaterial({
          color: C.cyan,
          transparent: true,
          opacity: 0.14,
          depthWrite: false,
          side: T.DoubleSide,
        }),
        this.preview,
      );
      o.rotation.x = -Math.PI / 2;
      this.previewTiles.push(o);
    }
    this.preview.visible = false;
    this.hintArrow = new T.ArrowHelper(
      V(1, 0, 0),
      V(),
      1.15,
      0xe1eee6,
      0.24,
      0.13,
    );
    this.hintArrow.visible = false;
    this.stage.add(this.hintArrow);
    this.sync(state, 0);
    this.resize();
  }
  symbol(text, color, x, y, z, size) {
    const m = new T.MeshBasicMaterial({
      map: labelTexture(text, "#" + new T.Color(color).getHexString()),
      transparent: true,
      depthWrite: false,
      side: T.DoubleSide,
    });
    const o = this.mesh(new T.PlaneGeometry(size, size), m);
    o.rotation.x = -Math.PI / 2;
    o.position.set(x, y, z);
    return o;
  }
  position(b) {
    return V(
      b.x - this.cx + (b.o === "X" ? 0.5 : 0),
      b.size === 1 ? 0.5 : b.o === "U" ? 1 : 0.5,
      b.z - this.cz + (b.o === "Z" ? 0.5 : 0),
    );
  }
  setPose(g, b) {
    g.position.copy(this.position(b));
    g.rotation.set(
      b.o === "Z" ? Math.PI / 2 : 0,
      0,
      b.o === "X" ? -Math.PI / 2 : 0,
    );
  }
  sync(state, active) {
    this.state = state;
    this.active = active;
    const open = groups(this.level, state);
    for (const b of this.bridges) b.o.visible = open.has(b.group);
    for (const a of this.animated)
      a.o.material.emissiveIntensity = open.has(a.group) ? 2 : 0.3;
    state.blocks.forEach((b, i) => {
      this.blocks[i].userData.cap.material.emissiveIntensity = b.heavy
        ? 0.5
        : 2;
      this.blocks[i].userData.cap.scale.setScalar(b.heavy ? 1 : 0.6);
      const p = this.position(b);
      this.targets[i].position.set(p.x, 0.045, p.z);
      this.targets[i].material.opacity = i === active ? 0.9 : 0.25;
      this.targets[i].visible = i === active;
      this.targets[i].scale.set(b.o === "X" ? 2 : 1, b.o === "Z" ? 2 : 1, 1);
    });
  }
  transition(before, after, action, onDone) {
    this.preview.visible = false;
    this.state = after;
    if (action === "exchange") {
      this.animation = {
        kind: "exchange",
        t: performance.now(),
        duration: 450,
        onDone,
      };
      return;
    }
    const i = action.block,
      old = before.blocks[i],
      rolled = roll(old, action.dir),
      g = this.blocks[i];
    const [dx, dz] = {
      up: [0, -1],
      down: [0, 1],
      left: [-1, 0],
      right: [1, 0],
    }[action.dir];
    const center = this.position(old),
      pivot = center.clone();
    pivot.y = 0;
    if (dx) pivot.x += dx * (old.o === "X" ? 1 : 0.5);
    if (dz) pivot.z += dz * (old.o === "Z" ? 1 : 0.5);
    this.animation = {
      kind: "roll",
      i,
      t: performance.now(),
      duration: this.reduced
        ? 50
        : 380 +
          (rolled.x !== after.blocks[i].x || rolled.z !== after.blocks[i].z
            ? 350
            : 0),
      center,
      pivot,
      axis: V(dz, 0, -dx),
      q: g.quaternion.clone(),
      rolled: this.position(rolled),
      end: this.position(after.blocks[i]),
      dead: after.dead,
      falling: after.blocks.map(
        (b) => !supported(this.level, b, groups(this.level, after)),
      ),
      onDone,
    };
  }
  previewMove(b, dir, valid) {
    const n = roll(b, dir);
    this.preview.visible = true;
    cells(n).forEach(([x, z], i) => {
      const o = this.previewTiles[i];
      o.visible = true;
      o.position.set(x - this.cx, 0.07, z - this.cz);
      o.material.color.set(valid ? C.cyan : 0xd78473);
    });
    if (cells(n).length === 1) this.previewTiles[1].visible = false;
  }
  clearHint() {
    if (this.hintArrow) this.hintArrow.visible = false;
    if (this.preview) this.preview.visible = false;
  }
  showHint(action, after) {
    this.clearHint();
    if (typeof action === "string") return;
    const b = this.state.blocks[action.block],
      p = this.position(b);
    const [dx, dz] = {
      up: [0, -1],
      down: [0, 1],
      left: [-1, 0],
      right: [1, 0],
    }[action.dir];
    this.hintArrow.position.set(p.x, p.y + (b.size === 1 ? 0.9 : 1.35), p.z);
    this.hintArrow.setDirection(V(dx, 0, dz));
    this.hintArrow.visible = true;
    this.preview.visible = true;
    const end = after?.blocks[action.block] || roll(b, action.dir);
    cells(end).forEach(([x, z], i) => {
      this.previewTiles[i].visible = true;
      this.previewTiles[i].position.set(x - this.cx, 0.075, z - this.cz);
      this.previewTiles[i].material.color.set(0xaddb9e);
    });
    if (cells(end).length === 1) this.previewTiles[1].visible = false;
  }
  resize() {
    const w = this.container.clientWidth,
      h = this.container.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    const aspect = w / h;
    const boardW = Math.max(
        ...(this.level?.map || ["........"]).map((r) => r.length),
      ),
      boardH = this.level?.map.length || 7;
    const projectedW = (boardW + boardH) * 0.707 + 3;
    const projectedH = (boardW + boardH) * 0.408 + 3.2;
    const span = Math.max(projectedH, projectedW / aspect);
    this.camera.left = (-span * aspect) / 2;
    this.camera.right = (span * aspect) / 2;
    this.camera.top = span / 2;
    this.camera.bottom = -span / 2;
    this.camera.updateProjectionMatrix();
    this.camera.position.set(18, 18 * 0.7071, 18);
    this.camera.lookAt(0, 0.05, 0);
  }
  quality(high) {
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, high ? 1.6 : 1));
    this.renderer.shadowMap.enabled = high;
    this.resize();
  }
  frame(now) {
    const t = now / 1000,
      dt = Math.min((now - this.last) / 1000, 0.05);
    this.last = now;
    if (this.dust && !this.reduced) this.dust.rotation.y += dt * 0.008;
    for (let i = 0; i < this.goalMarks.length; i++)
      this.goalMarks[i].material.emissiveIntensity =
        1.2 + Math.sin(t * 1.6 + i) * 0.3;
    const a = this.animation;
    if (a) {
      let u = Math.min((now - a.t) / a.duration, 1);
      if (a.kind === "roll") {
        const ratio = a.rolled.distanceTo(a.end) > 0.01 ? 0.58 : 1;
        const r = Math.min(u / ratio, 1),
          e = r * r * (3 - 2 * r),
          q = new T.Quaternion().setFromAxisAngle(a.axis, (e * Math.PI) / 2);
        const g = this.blocks[a.i];
        g.position.copy(a.center).sub(a.pivot).applyQuaternion(q).add(a.pivot);
        g.quaternion.copy(q).multiply(a.q);
        if (u > ratio)
          g.position.lerpVectors(a.rolled, a.end, (u - ratio) / (1 - ratio));
        if (a.dead && u > 0.8) {
          for (let j = 0; j < this.blocks.length; j++) {
            if (a.falling[j]) {
              const f = this.blocks[j];
              if (j !== a.i)
                f.position.copy(this.position(this.state.blocks[j]));
              f.position.y -= Math.pow((u - 0.8) / 0.2, 2) * 2;
            }
          }
        }
      } else
        this.blocks.forEach(
          (g, i) =>
            (g.userData.cap.material.emissiveIntensity =
              2 + Math.sin(u * Math.PI) * 4),
        );
      if (u === 1) {
        this.animation = null;
        this.sync(this.state, this.active);
        a.onDone?.();
      }
    }
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.frame);
  }
}
