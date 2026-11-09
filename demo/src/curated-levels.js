// Individually authored puzzles. No pair generator, shifted-start variants or universal loot loop.
import { fortress65 } from "./campaign-hardening.js";
const cube = [1, 1, 1],
  domino = [1, 2, 1],
  plate = [2, 1, 2],
  big = [2, 2, 2];
const g = (x, z, dims) => ({ x, z, ...(dims ? { dims } : {}) });
const map = (w, h, test) =>
  Array.from({ length: h }, (_, z) =>
    Array.from({ length: w }, (_, x) => (test(x, z) ? "." : " ")).join(""),
  );
const levels = [];
function author(id, title, mechanics, rule, data) {
  levels.push({
    id: String(id),
    title,
    mechanics,
    source: "C" + id,
    family: "C",
    refined: true,
    physicalRoll: true,
    strict: true,
    revision: 4,
    charges: -1,
    resizeActors: [0],
    difficulty: "ÇƏTİN",
    rule,
    ...data,
  });
}
author(
  65,
  "Qırılan körpü və kilidli qayıdış",
  ["bir dəfəlik körpü", "açar", "qapı zənciri"],
  fortress65().rule,
  { ...fortress65(), difficulty: "ORTA" },
);
author(
  66,
  "İki kompas, bir təhvil",
  ["relay təhvili", "ayrı idarə oxları", "qırılan dayaq"],
  "A sol relay-i tutsun, B sağ relay-ə keçib onu təhvil alsın. Relay aktiv olanda A-nın sağ/solu, B-nin yuxarı/aşağısı çevrilir. Qırılan sol plitə A-nın sonrakı yolunu dəyişir. A yuxarı sağ çıxışa, B sağ relay-ə çatmalıdır.",
  {
    map: map(9, 6, (x, z) => x <= 2 || x >= 5 || z === 2),
    starts: [
      [1, 4],
      [2, 0],
    ],
    goals: [g(8, 0), g(6, 3)],
    fragile: [[2, 1]],
    walls: [
      [7, 1],
      [5, 4],
    ],
    gates: [
      {
        id: "handover",
        tiles: [
          [3, 2],
          [4, 2],
        ],
        rule: {
          type: "sensor",
          pads: [
            { x: 0, z: 1 },
            { x: 6, z: 3 },
          ],
        },
      },
    ],
    holo: [
      [3, 2],
      [4, 2],
    ],
    reverse: {
      kind: "split",
      sensors: [
        [0, 1],
        [6, 3],
      ],
    },
  },
);
author(
  67,
  "Yükdən formaya keçid",
  ["yük həddi", "kiçilmə", "alçaq tir", "forma kilidi"],
  "A iki vahid ağırlığındadır: qabıqda yükü iki xanaya yaymalıdır. B sağdakı relay-i saxlayır. A körpüdən əvvəl G ilə kiçilib tirin altından keçir; sağdakı dik forma kilidini açandan sonra uzun halda aşağı çıxışa çatır. Burada açar və xal dövrəsi yoxdur.",
  {
    map: map(10, 7, (x, z) => x <= 3 || x >= 6 || z === 3),
    starts: [
      [1, 1],
      [6, 5],
    ],
    shapes: [domino, cube],
    goals: [g(8, 4, domino), g(9, 5)],
    forms: [cube, domino],
    resizePads: [
      [4, 3],
      [7, 3],
      [8, 1],
    ],
    shell: Array.from({ length: 7 }, (_, z) => [
      [2, z],
      [3, z],
    ]).flat(),
    shellThreshold: 1,
    ceilings: [{ x: 5, z: 3, h: 1.5 }],
    formLatch: { at: [8, 1], dims: domino },
    gates: [
      {
        id: "partner",
        tiles: [[5, 3]],
        rule: { type: "sensor", pads: [{ x: 9, z: 5 }] },
      },
    ],
    doors: [
      { id: "form-exit", at: [8, 4], slide: "up", requires: { latch: true } },
    ],
  },
);
author(
  68,
  "Ağır örtük, yüngül səfər",
  ["dörd kontakt", "yüngül keçid", "təkistifadəli gediş", "AND kilidi"],
  "B aşağıdakı qırılan körpüdən sola keçib yalnız yüngül blokun girə bildiyi xananın açarını götürür. A dörd mavi kontaktı plitə kimi örtür. Yuxarı körpü həm açar, həm dörd kontakt tələb edir; B yalnız ondan geri keçə bilər.",
  {
    map: map(9, 7, (x, z) => x <= 3 || x >= 6 || z === 2 || z === 5),
    starts: [
      [0, 5],
      [7, 6],
    ],
    goals: [g(1, 1, plate), g(7, 1)],
    forms: [cube, plate],
    resizePads: [[1, 1]],
    light: [[0, 0]],
    fragile: [
      [4, 5],
      [5, 5],
    ],
    collectibles: [{ id: "light-key", kind: "key", at: [0, 0] }],
    collectAll: true,
    gates: [
      {
        id: "and-bridge",
        tiles: [
          [4, 2],
          [5, 2],
        ],
        rule: {
          type: "cover",
          actor: 0,
          cells: [
            [1, 1],
            [2, 1],
            [1, 2],
            [2, 2],
          ],
          requires: { allKeys: true },
        },
      },
    ],
    doors: [
      {
        id: "key-exit",
        at: [7, 1],
        slide: "side",
        requires: { allKeys: true },
      },
    ],
  },
);
author(
  69,
  "Birini aç, digərini bağla",
  ["iki vəziyyətli şalter", "qarşılıqlı qapılar", "blokları mərhələləmə"],
  "Ortadakı F şalteri sol qapını bağlayıb sağ qapını açır; yenidən F əksini edir. İki bloku əvvəl orta otağa yığmaq daha sərfəlidir. Qapı xanasında blok varsa şalter onu sıxmır: əvvəl bloku kənara çəkməlisən. Hər iki çıxış sağ adadadır.",
  {
    map: map(
      12,
      7,
      (x, z) =>
        x <= 3 ||
        (x >= 5 && x <= 7) ||
        x >= 9 ||
        (x === 4 && z === 1) ||
        (x === 8 && z === 5),
    ),
    starts: [
      [1, 0],
      [2, 6],
    ],
    goals: [g(10, 6), g(10, 0)],
    levers: [{ id: "route", at: [6, 3], toggle: true }],
    doors: [
      {
        id: "left-lock",
        at: [4, 1],
        slide: "up",
        requires: { notLevers: ["route"] },
      },
      {
        id: "right-lock",
        at: [8, 5],
        slide: "side",
        requires: { levers: ["route"] },
      },
    ],
  },
);
author(
  70,
  "Üç qolun yaddaşı",
  [
    "iki ziyarətlik plitə",
    "sensor ardıcıllığı",
    "90° rotor",
    "mərhələli yollar",
  ],
  "Sensor sırası: sol uc → yuxarı uc → sağ uc. Mərkəzi plitəyə yalnız iki dəfə girmək olar; tərk etdikdə qırılır. Yuxarı sensor yan yolları açır. Rotorun içində istiqamətlər 90° çevrilir. Son çıxış yuxarı soldadır; qayıdış yolunu əvvəlcədən saxla.",
  {
    map: map(
      9,
      7,
      (x, z) =>
        ([1, 3, 5].includes(z) && x >= 1 && x <= 7) ||
        ([1, 4, 7].includes(x) && z >= 1 && z <= 5) ||
        (x === 0 && z === 3) ||
        (x === 8 && z === 3) ||
        (z === 0 && (x === 1 || x === 4)),
    ),
    starts: [[4, 5]],
    goals: [g(1, 0)],
    switches: [
      [0, 3],
      [4, 0],
      [8, 3],
    ],
    needSwitches: true,
    visitable: [[4, 2]],
    reverse: {
      kind: "rotate",
      zone: [2, 3, 4]
        .flatMap((z) => [3, 4, 5].map((x) => [x, z]))
        .filter((p) => p[0] === 4 || p[1] === 3),
    },
    doors: [
      {
        id: "outer-left",
        at: [1, 2],
        slide: "side",
        requires: { routeAtLeast: 2 },
      },
      {
        id: "outer-right",
        at: [7, 2],
        slide: "side",
        requires: { routeAtLeast: 2 },
      },
      {
        id: "sequence-exit",
        at: [1, 0],
        slide: "up",
        requires: { routeComplete: true },
      },
    ],
  },
);
author(
  71,
  "İki bədən, iki ayrı körpü",
  [
    "böyük kub",
    "dörd xanaya yayılan yük",
    "relay saxlanması",
    "alçaq dar keçid",
  ],
  "Enli qabıq hər xanada yalnız 0.5 yük saxlayır: A onu yalnız 2×2×2 kub kimi keçə bilər. B relay-i A keçənəcən saxlayır, sonra alçaq dar keçiddən gedir. İki blok üçün eyni marşrut işləmir.",
  {
    map: map(
      10,
      7,
      (x, z) => x <= 3 || x >= 6 || z === 1 || z === 2 || z === 5,
    ),
    starts: [
      [1, 1],
      [1, 5],
    ],
    goals: [g(7, 1, big), g(8, 5)],
    forms: [cube, big],
    resizePads: [[1, 1]],
    shell: [
      [4, 1],
      [5, 1],
      [4, 2],
      [5, 2],
    ],
    shellThreshold: 0.5,
    ceilings: [
      { x: 4, z: 5, h: 1.5 },
      { x: 5, z: 5, h: 1.5 },
    ],
    gates: [
      {
        id: "wide-relay",
        tiles: [
          [4, 1],
          [5, 1],
          [4, 2],
          [5, 2],
        ],
        rule: { type: "sensor", pads: [{ x: 3, z: 3 }] },
      },
    ],
  },
);
author(
  72,
  "Ört, təhvil ver, formasını dəyiş",
  ["böyümə küncü", "dörd kontakt", "relay təhvili", "yenidən formalaşma"],
  "A divarın yanında sola/yuxarı böyüyüb dörd kontaktı örtür. B yuxarı körpüdən sağ relay-ə keçib aşağı körpünü açır. İndi A kiçilməlidir: plitə alçaq, bir xanalıq keçiddən sığmır. Sağ meydançada yenə plitə olub dörd işıqlı çıxışa yerləşir.",
  {
    map: map(8, 8, (x, z) => x <= 3 || x >= 5 || z === 1 || z === 5),
    starts: [
      [2, 2],
      [0, 0],
    ],
    goals: [g(5, 5, plate), g(6, 1)],
    forms: [cube, plate],
    resizePads: [
      [2, 2],
      [1, 1],
      [5, 5],
    ],
    growPads: [
      [2, 2],
      [5, 5],
    ],
    chooseAnchor: true,
    walls: [[3, 2]],
    ceilings: [{ x: 4, z: 5, h: 1.5 }],
    gates: [
      {
        id: "cover-top",
        tiles: [[4, 1]],
        rule: {
          type: "cover",
          actor: 0,
          cells: [
            [1, 1],
            [2, 1],
            [1, 2],
            [2, 2],
          ],
        },
      },
      {
        id: "handover-bottom",
        tiles: [[4, 5]],
        rule: { type: "sensor", pads: [{ x: 6, z: 1 }] },
      },
    ],
  },
);
author(
  73,
  "Yaxınlıq pilləkəni",
  ["partnyor dayağı", "iki perpendikulyar boşluq", "90° koordinatlar"],
  "Bənövşəyi yol hər xananın ən çox iki addım yaxınlığında partnyor istəyir. Əvvəl üfüqi, sonra şaquli boşluğu birlikdə keçirsiniz. Orta adada idarə 90° dönür; digər blok hələ bənövşəyi yoldaykən uzaqlaşma.",
  {
    map: map(
      11,
      8,
      (x, z) =>
        (x <= 2 && z <= 3) ||
        (x >= 5 && x <= 9 && z <= 3) ||
        (x >= 7 && z >= 6) ||
        (z === 2 && (x === 3 || x === 4)) ||
        (x === 8 && (z === 4 || z === 5)),
    ),
    starts: [
      [2, 1],
      [1, 3],
    ],
    goals: [g(10, 6), g(7, 7)],
    observer: [
      [3, 2],
      [4, 2],
      [8, 4],
      [8, 5],
    ],
    radius: 2,
    reverse: {
      kind: "rotate",
      zone: [1, 2, 3].flatMap((z) => [5, 6, 7, 8, 9].map((x) => [x, z])),
    },
  },
);
export const curatedLevels = levels;
