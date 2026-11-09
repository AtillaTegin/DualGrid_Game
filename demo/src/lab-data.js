import { families, catalog } from "./lab-catalog.js";
import { removedMods } from "./journey-data.js";
export { families };
const rect = (w = 7, h = 5) => Array(h).fill(".".repeat(w));
const goal = (x, z, extra = {}) => ({ x, z, ...extra });
const col = (x, h = 5) => Array.from({ length: h }, (_, z) => [x, z]);
const zone = () => [2, 3, 4].flatMap((x) => col(x));
const cube = [1, 1, 1],
  long = [1, 2, 1];
const specs = {};
function add(id, rule, config = {}) {
  specs[id] = {
    id,
    title: catalog[id]?.title || families[id]?.[0],
    family: id.split(".")[0],
    rule,
    map: rect(),
    starts: [[1, 1]],
    goals: [goal(5, 1)],
    ...config,
  };
}
const phantom = {
  illusion: [[2, 1]],
  allowDiscovery: true,
  required: ["discover"],
};
add(
  "M1",
  "Adi görünən (2,1) xanası saxtadır. Bir dəfə yoxla, düşəndən sonra Z və ya R ilə qayıt, kənardan keçib A çıxışına çat.",
  phantom,
);
add(
  "M1.1",
  "Önündəki adi plitəni sına. Gizli boşluğu kəşf et, Z/R ilə qayıt və başqa yoldan çıx. Kəşf yadda qalır.",
  phantom,
);
add(
  "M1.2",
  "Çatlı plitəyə bas və onu tərk et: arxanca qırılır. Sonra çıxışa çat.",
  { fragile: [[2, 1]], required: ["collapse"] },
);
add(
  "M1.3",
  "A-nın kütləsi 2-dir. Qabıq bir xanaya ən çox 1 yük götürür. Sağa yuvarlanıb iki xanaya uzan, yenə sağa qalx.",
  {
    shapes: [long],
    shell: [
      [2, 1],
      [3, 1],
    ],
    shellThreshold: 1,
    goals: [goal(4, 1, { dims: long })],
    required: ["pressure"],
  },
);
const islands = [
  "....  ...",
  "....  ...",
  ".........",
  "....  ...",
  "....  ...",
];
add(
  "M1.4",
  "A-nı dairəli relay üzərinə gətir. İşıq zolağı bərk yol olacaq; B-ni körpüdən sağ çıxışa keçir. A relay-də qalsın.",
  {
    map: islands,
    starts: [
      [1, 3],
      [2, 3],
    ],
    goals: [goal(1, 1), goal(6, 2)],
    holo: [
      [4, 2],
      [5, 2],
    ],
    gates: [
      {
        id: "h",
        tiles: [
          [4, 2],
          [5, 2],
        ],
        rule: { type: "sensor", pads: [{ x: 1, z: 1 }] },
      },
    ],
    required: ["holo"],
  },
);
add(
  "M1.5",
  "Bənövşəyi yol yalnız partnyor 2 xana yaxınlıqda olanda saxlayır. İki bloku növbə ilə irəli apar; hər addımda ikisinin də dayağı yoxlanır.",
  {
    map: islands,
    starts: [
      [3, 1],
      [2, 2],
    ],
    goals: [goal(7, 1), goal(7, 3)],
    observer: [
      [4, 2],
      [5, 2],
    ],
    radius: 2,
    required: ["observer"],
  },
);
add(
  "M1.6",
  "İki nöqtəli plitəyə iki ayrı dəfə daxil ol, sonra çıx. İkinci ziyarətdən sonra tərk ediləndə qırılır. A çıxışına çat.",
  { visitable: [[2, 1]], required: ["budget", "collapse"] },
);
add(
  "M2",
  "Bənövşəyi zonada oxlar 180° çevrilir. Zonaya daxil ol, sonra sağa getmək üçün SOL bas və çıxışa çat.",
  { reverse: { kind: "invert", zone: zone() }, required: ["remap"] },
);
add(
  "M2.1",
  "Zonada sağ→sol, sol→sağ, yuxarı→aşağı olur. Girişdən əvvəlki mövqe əmrin xəritəsini müəyyən edir.",
  { reverse: { kind: "invert", zone: zone() }, required: ["remap"] },
);
add(
  "M2.2",
  "Zonada idarə 90° dönür: YUXARI dünyada sağa aparır. Ekranın sağındakı kompası izlə.",
  { reverse: { kind: "rotate", zone: zone() }, required: ["remap"] },
);
add(
  "M2.3",
  "Nazik zolağa hər giriş polariteni dəyişir. Çıxanda idarə avtomatik düzəlmir. Tərs idarə ilə ən az bir addım et, çıxışa çat.",
  {
    reverse: { kind: "latch", zone: col(2) },
    required: ["latched-move"],
    goals: [goal(4, 1)],
  },
);
add(
  "M2.4",
  "Relay tutulanda A-nın sağ/solu, B-nin yuxarı/aşağısı tərsdir. Əvvəl A-nı sağ relay-ə apar; sonra B-ni yuxarı çıxışa apar. Hər ikisinin çevrilməsini sına.",
  {
    starts: [
      [1, 1],
      [1, 3],
    ],
    goals: [goal(5, 1), goal(1, 1)],
    reverse: {
      kind: "split",
      sensors: [
        [1, 3],
        [5, 1],
      ],
    },
    required: ["remap"],
    requireRemapped: 3,
  },
);
add(
  "M3",
  "G ilə kubu uzun bloka çevir. Uzun blok dik olanda 1, uzananda 2 xana tutur. Düz forma ilə A çıxışına çat.",
  {
    forms: [cube, long],
    goals: [goal(4, 1, { dims: long })],
    required: ["resize"],
  },
);
add(
  "M3.1",
  "Sol G meydançasında kiçil. Aşağı tavanlı dar boğazı kub kimi keç. Sağ meydançada yenə böyü və dik çıxışa yerləş.",
  {
    map: ["... ...", ".......", "... ..."],
    shapes: [long],
    forms: [cube, long],
    resizePads: [
      [1, 1],
      [5, 1],
    ],
    ceilings: [{ x: 3, z: 1, h: 1 }],
    goals: [goal(5, 1, { dims: long })],
    required: ["resize"],
    requireResizes: 2,
  },
);
add(
  "M3.2",
  "A-nı G ilə 2×2×1 plitəyə çevir. İki diaqonal sensoru eyni anda örtəndə B-nin keçidi açılır. A yerində qalsın, B sağa getsin.",
  {
    starts: [
      [1, 1],
      [3, 3],
    ],
    forms: [cube, [2, 1, 2]],
    goals: [goal(1, 1, { dims: [2, 1, 2] }), goal(5, 3)],
    gates: [
      {
        id: "c",
        tiles: [[4, 3]],
        rule: {
          type: "cover",
          cells: [
            [1, 1],
            [2, 2],
          ],
          actor: 0,
        },
      },
    ],
    required: ["resize"],
  },
);
add(
  "M3.3",
  "G ilə 2×2×2 kub yarat. İndi hər yuvarlanma iki xana keçir. Böyük halda hərəkət et və böyük çıxış konturuna yerləş.",
  {
    map: rect(8, 5),
    forms: [cube, [2, 2, 2]],
    goals: [goal(5, 1, { dims: [2, 2, 2] })],
    required: ["resize", "large-roll"],
  },
);
const formLock = {
  forms: [cube, long],
  formLatch: { at: [3, 1], dims: long },
  gates: [{ id: "s", tiles: [[4, 1]], rule: { type: "latch" } }],
  goals: [goal(5, 1, { dims: cube })],
  required: ["shape-lock", "resize"],
};
add(
  "M3.4",
  "G ilə dik domino yarat, (3,1) forma kilidinə dik yerləş. Kilid yadda qalır. Kiçil və kub çıxışına get.",
  formLock,
);
add(
  "M3.5",
  "Cəmi iki G enerjin var: böyü, dik forma kilidini işə sal, sonra kiçil. Z ehtiyatı da geri qaytarır.",
  { ...formLock, charges: 2, requireResizes: 2 },
);
add(
  "M3.6",
  "X ilə böyümə lövbərini seç. Sağda maneə var: 2×2 plitə sola və yuxarı böyüməlidir. X üç dəfə, sonra G. Tam kontura yerləş.",
  {
    starts: [[2, 2]],
    forms: [cube, [2, 1, 2]],
    chooseAnchor: true,
    walls: [[3, 2]],
    goals: [goal(1, 1, { dims: [2, 1, 2] })],
    required: ["resize"],
  },
);
const realEcho = {
  realtime: true,
  echo: { start: [5, 3], delay: 4, mirror: "x" },
  required: ["echo"],
};
add(
  "M4",
  "Qırmızı kölgə A-nın hərəkətlərini 2 saniyə sonra X üzrə güzgüləyir. Təmas təhlükəlidir. A çıxışına çat və ilk kölgə addımını gör. P pauza, Q yarım saniyəlik sınaq addımıdır.",
  realEcho,
);
add(
  "M4.1",
  "Kölgə hər uğurlu əmrdə növbədən bir addım oxuyur; gecikmə 3 əmrdir. A çıxışına gedərkən növbəni izlə.",
  { echo: { start: [5, 3], delay: 3, mirror: "none" }, required: ["echo"] },
);
add(
  "M4.2",
  "Kölgənin X güzgüsü açıqdır: A sağa → kölgə sola. Gecikmə 1 əmr. Qırmızı gövdəyə toxunmadan çıx.",
  { echo: { start: [5, 3], delay: 1, mirror: "x" }, required: ["echo"] },
);
add(
  "M4.3",
  "Q (WAIT) də növbəni irəli aparır. Başlanğıc növbədə sol və yuxarı var. Ən az bir Q et, kölgənin addımını gör, sonra çıx.",
  {
    echo: { start: [5, 3], delay: 2, mirror: "none", seed: ["left", "up"] },
    required: ["wait", "echo"],
    goals: [goal(4, 1)],
  },
);
add(
  "M4.4",
  "Kölgə dik dominodur; sənin kubun kimi davranmır. Sağındakı divara yuvarlana bilməyəndə əmr boş gözləmə kimi xərclənir. Bu hadisəni yarat, sonra çıx.",
  {
    echo: { start: [5, 3], shape: long, delay: 1, mirror: "none" },
    walls: [[6, 3]],
    required: ["echo-blocked"],
  },
);
add(
  "M4.5",
  "Həqiqi 2 saniyəlik gecikmə. Kölgə yuxarı zolaqdadır, sən aşağı çıxışa get. P ilə saxlaya, Q ilə saatı 0.5 saniyə irəli apara bilərsən.",
  {
    ...realEcho,
    echo: { start: [5, 1], delay: 4, mirror: "x" },
    goals: [goal(5, 3)],
  },
);
add(
  "M5",
  "Divar 2 saniyədən bir soldan bir sütun tutur. Ən az bir dəyişməni gör və sağ çıxışa çat. P pauza, Q planlama addımıdır.",
  {
    realtime: true,
    wall: { kind: "shrink", every: 4, max: 3 },
    required: ["wall"],
  },
);
add(
  "M5.1",
  "Divar hər iki uğurlu əmrdən sonra bir sütun irəliləyir. Düşünərkən saat işləmir. Sağ çıxışa get.",
  { wall: { kind: "shrink", every: 2, max: 3 }, required: ["wall"] },
);
add(
  "M5.2",
  "Pistonun 4 fazası var: açıq → xəbərdarlıq → sıxılma → xəbərdarlıq. Sıxılma anında qırmızı xananın üstündə qalma. Q ilə gözlə.",
  {
    map: ["       ", ".......", "       "],
    wall: { kind: "piston", cells: [[3, 1]], every: 1 },
    required: ["wall"],
  },
);
add(
  "M5.3",
  "Dik domino sığınacağa sığmır; uzanmış gövdə sığır. Sağa uzan, Q ilə sıxılmanı sığınacaqda keçir, sonra sağa qalx.",
  {
    map: rect(8, 4),
    starts: [[2, 1]],
    shapes: [long],
    goals: [goal(5, 1, { dims: long })],
    wall: {
      kind: "piston",
      cells: [
        [3, 1],
        [4, 1],
      ],
      every: 1,
    },
    shelter: {
      cells: [
        [3, 1],
        [4, 1],
      ],
      height: 1,
    },
    required: ["shelter"],
  },
);
add(
  "M5.4",
  "B-ni aşağı əyləc relay-inə apar və orada saxla. Sonrakı əmrlərdə divar donur; A keçidi aşsın. Son mövqelər: A sağda, B relay-də.",
  {
    starts: [
      [1, 1],
      [0, 2],
    ],
    goals: [goal(5, 1), goal(0, 3)],
    wall: { kind: "piston", cells: [[3, 1]], every: 1, brake: { x: 0, z: 3 } },
    required: ["brake"],
  },
);
add(
  "M5.5",
  "Piston hər 2 saniyədə növbəti fazaya keçir. Qırmızı sıxılma fazasından yayın, sağ çıxışa çat. H köməyi saatı saxlayır.",
  {
    map: ["       ", ".......", "       "],
    realtime: true,
    wall: { kind: "piston", cells: [[3, 1]], every: 4 },
    required: ["wall"],
  },
);
const fake = {
  fake: { kind: "fixed", at: [3, 1], dest: [1, 3] },
  map: rect(8, 5),
  goals: [goal(6, 3)],
  required: ["teleport"],
};
add(
  "M6",
  "Parlaq qapıya gir. O final deyil: səni aşağıya atır. Sonra görünən A çıxışına çat. Bu sınaqda ilk qapının davranışını yoxlamaq vacibdir.",
  fake,
);
add(
  "M6.1",
  "Saxta qapı həmişə eyni aşağı təyinata aparır. Bir dəfə istifadə et və həqiqi çıxışa çat.",
  fake,
);
add(
  "M6.2",
  "Eyni qapı ünvanları növbə ilə dəyişir: (1,3), (5,3), (6,0). Ən az iki dəfə gir, sonra həqiqi çıxışı tap. Növbəti ünvan HUD-da açıqdır.",
  {
    ...fake,
    fake: {
      kind: "cycle",
      at: [3, 1],
      destinations: [
        [1, 3],
        [5, 3],
        [6, 0],
      ],
    },
    requirePortals: 2,
  },
);
add(
  "M6.3",
  "B (1,3) relay-də deyilsə qapı A-nı başlanğıca qaytarır. Əvvəl B-ni yerləşdir, sonra A ilə qapıya gir. B orada qalsın.",
  {
    starts: [
      [1, 1],
      [1, 4],
    ],
    goals: [goal(3, 1), goal(1, 3)],
    fake: {
      kind: "permission",
      at: [3, 1],
      dest: [1, 1],
      permission: { x: 1, z: 3 },
    },
    required: ["permission"],
    needExitFlag: true,
  },
);
add(
  "M6.4",
  "Qapı tələdir, amma keçəndə uzaq körpünü daimi açır. Saxta finaldan keç və aşağı sağdakı həqiqi çıxışa çat.",
  {
    ...fake,
    map: [".....   ", ".....   ", ".....   ", "........", ".....   "],
    fake: { kind: "latch", at: [3, 1], dest: [1, 3] },
    gates: [{ id: "l", tiles: [[5, 3]], rule: { type: "latch" } }],
  },
);
const contact = {
  useFaces: true,
  contact: { at: [2, 1], face: 2 },
  goals: [goal(2, 1, { face: 2 })],
  required: ["contact"],
};
add(
  "N1",
  "Kubun hər üzünün 0–5 nömrəsi var. Bir sağ yuvarlanma sağdakı 2-ni alt üzə gətirir. 2 kontaktının üstündə alt üz 2 olsun.",
  contact,
);
add(
  "N1.1",
  "İşıqlı 2 kontaktına alt üz 2 ilə çat. Sağ panel alt, üst və yan üzləri göstərir.",
  contact,
);
add(
  "N1.2",
  "Divar yan terminaldır. Bir sağ yuvarlanmadan sonra sağ üz 0 olur. (2,1)-də dayan və sağ üzünü 0 terminalına uyğunlaşdır.",
  {
    useFaces: true,
    walls: [[3, 1]],
    contact: { at: [2, 1], side: "r", face: 0 },
    goals: [goal(2, 1, { face: 0, side: "r" })],
    required: ["contact"],
  },
);
add(
  "N1.3",
  "Elektrikli hər iki plitəyə yalnız alt üz 2 ilə basmaq olar. Hər ikisini ayrıca keç. Ardıcıl düz yuvarlanma üzü dəyişir: kənarda dövrə vurub orientasiyanı düzəlt.",
  {
    useFaces: true,
    faceHazards: [
      { at: [2, 1], face: 2 },
      { at: [3, 1], face: 2 },
    ],
    required: ["shield-2,1", "shield-3,1"],
    goals: [goal(4, 1)],
  },
);
add(
  "N1.4",
  "Kontakt sırası: (2,1) alt2 → (2,2) alt4 → (3,2) alt0. Sağ, aşağı, sağ. Səhv kontakt sıranı sıfırlayır.",
  {
    useFaces: true,
    sequence: [
      { at: [2, 1], face: 2 },
      { at: [2, 2], face: 4 },
      { at: [3, 2], face: 0 },
    ],
    goals: [goal(3, 2)],
    required: ["sequence"],
  },
);
const energy = {
  starts: [
    [1, 1],
    [2, 1],
  ],
  energy: [2, 0],
  energyMode: "pair",
  required: ["transfer"],
};
add(
  "N2",
  "A-da 2 enerji var, B-də 0. A seçili ikən T ilə qonşu B-yə 1 ötür. Hərəsində 1 qalanda sınaq tamamlanır.",
  { ...energy, goals: [goal(1, 1, { energy: 1 }), goal(2, 1, { energy: 1 })] },
);
add(
  "N2.1",
  "Bloklar kənarla qonşu olanda T seçilmiş blokdan digərinə 1 enerji verir. 1/1 bölüşdür və hərəsini öz çıxışına apar.",
  { ...energy, goals: [goal(4, 1, { energy: 1 }), goal(1, 2, { energy: 1 })] },
);
add(
  "N2.2",
  "A başlanğıc terminalında T-ni iki dəfə bassın: 2 enerji körpüdə saxlanır. İndi açılan enerji keçidindən sağ çıxışa get.",
  {
    map: ["       ", ".......", "       "],
    energy: [2],
    energyMode: "storage",
    terminal: [1, 1],
    gates: [{ id: "e", tiles: [[3, 1]], rule: { type: "energy", amount: 2 } }],
    required: ["stored"],
  },
);
add(
  "N2.3",
  "Ümumi 3 enerji qorunur. A-dan B-yə iki T ötür, sonra A 1 enerji ilə, B 2 enerji ilə çıxışına çatsın.",
  {
    ...energy,
    energy: [3, 0],
    goals: [goal(4, 1, { energy: 1 }), goal(4, 2, { energy: 2 })],
  },
);
add(
  "N2.4",
  "T ilə sol terminaldan batareyanı götür: köhnə keçid bağlanır. Sağ terminalda T ilə yerləşdir: final keçidi açılır. Enerji itmir.",
  {
    map: [".....  ", ".......", ".....  "],
    starts: [[1, 1]],
    energy: [0],
    energyMode: "battery",
    terminals: [
      [1, 1],
      [4, 1],
    ],
    gates: [
      { id: "b0", tiles: [[2, 0]], rule: { type: "battery", slot: 0 } },
      { id: "b1", tiles: [[5, 1]], rule: { type: "battery", slot: 1 } },
    ],
    goals: [goal(6, 1)],
    required: ["battery"],
  },
);
const seam = {
  map: ["... ...", "... ...", "... ...", "... ..."],
  portal: { from: [1, 1], to: [5, 1], back: true },
  goals: [goal(6, 2)],
  required: ["portal"],
};
add(
  "N3",
  "Halqanın üstündə Enter bas: iki ayrı ada birləşir. Təyinat əvvəlcədən bəllidir. Sağ adadakı çıxışa get.",
  seam,
);
add(
  "N3.1",
  "Çıxış tikişi B ilə doludur: A-nın Enter əmri bütöv rədd ediləcək. Əvvəl B-ni sağa çək, sonra A-nı ötür.",
  {
    ...seam,
    starts: [
      [1, 1],
      [5, 1],
    ],
    goals: [goal(6, 2), goal(6, 1)],
  },
);
add(
  "N3.2",
  "Uzun gövdə X istiqamətində uzanıb. Enter tikişi onu 90° döndərib Z istiqamətində yerləşdirir. Sonra aşağı yuvarlanıb dik çıxışa çat.",
  {
    map: ["....    ", ".... .  ", ".... .  ", ".... .  ", ".... .  "],
    starts: [[1, 1]],
    shapes: [[2, 1, 1]],
    portal: { from: [1, 1], to: [5, 1], yaw: 90, back: true },
    goals: [goal(5, 3, { dims: long })],
    required: ["portal"],
  },
);
add(
  "N3.3",
  "Sol və sağ kənar bir-birinə tikilib. Sol kənardan SOL bas: sağdan çıxacaqsan. Bu bağlantını istifadə et, sonra A çıxışına get.",
  {
    map: rect(6, 3),
    starts: [[0, 1]],
    goals: [goal(4, 1)],
    wrap: true,
    required: ["wrap"],
  },
);
add(
  "N3.4",
  "B aşağı relay-də dayananda tikiş aşağı sağ adaya gedir; başqa vaxt yuxarı adaya. Əvvəl B-ni yerləşdir, A ilə Enter bas.",
  {
    map: ["...  ...", "...     ", "...     ", "...  ...", "...  ..."],
    starts: [
      [1, 1],
      [1, 4],
    ],
    portal: {
      from: [1, 1],
      to: [5, 0],
      back: true,
      branch: { sensor: { x: 1, z: 3 }, yes: [5, 3], no: [5, 0] },
    },
    goals: [goal(6, 4), goal(1, 3)],
    required: ["portal"],
  },
);
const resonance = {
  map: ["... ...", ".......", "... ...", "... ..."],
  starts: [
    [0, 2],
    [2, 1],
  ],
  goals: [goal(5, 1), goal(0, 1)],
  gates: [{ id: "a", tiles: [[3, 1]], rule: { type: "alignment" } }],
  required: ["alignment"],
};
add(
  "N4",
  "İki kub eyni sətirdə və ya sütunda olanda rezonans körpüsü açılır. B-ni A-nın arxasına çək, eyni sətirdə A-nı sağa keçir.",
  resonance,
);
add(
  "N4.1",
  "Düymə yoxdur: iki blokun nisbi xətti körpünü idarə edir. Xətt pozulanda körpü bağlanır, üstündəki blok düşür.",
  resonance,
);
add(
  "N4.2",
  "Bağ ən çox 2 xana Manhattan məsafəsinə uzanır. A və B-ni növbə ilə yaxın apar. A sağa 6-ya, B 4-ə çatmalıdır.",
  {
    starts: [
      [0, 1],
      [1, 1],
    ],
    goals: [goal(6, 1), goal(4, 1)],
    tether: 2,
    required: ["tether"],
  },
);
add(
  "N4.3",
  "İki domino bir-birinə perpendikulyar uzananda kilid açılır. A sağa uzansın, B yuxarı uzansın, sonra A yuxarı çıxışa getsin.",
  {
    starts: [
      [1, 1],
      [4, 3],
    ],
    shapes: [long, long],
    goals: [goal(2, 0, { dims: [2, 1, 1] }), goal(4, 1, { dims: [1, 1, 2] })],
    gates: [
      {
        id: "p",
        tiles: [
          [2, 0],
          [3, 0],
        ],
        rule: { type: "perpendicular" },
      },
    ],
    required: ["perpendicular"],
  },
);
add(
  "N4.4",
  "L əks addım bağını açır/bağlayır. Əvvəl B-ni bir yuxarı çək ki divardan yayınsın. L bas, A-nı sağa iki dəfə yuvarla: B eyni anda sola gedəcək.",
  {
    starts: [
      [1, 1],
      [5, 3],
    ],
    goals: [goal(3, 1), goal(3, 2)],
    walls: [[4, 3]],
    link: "opposite",
    required: ["linked"],
  },
);
export const archivedExperiments = Object.values(specs);
const seenExamples = new Map();
export const labAliases = {};
export const experiments = archivedExperiments
  .filter((l) => !removedMods.includes(l.id))
  .filter((l) => {
    const config = Object.fromEntries(
      Object.entries(l)
        .filter(
          ([k]) =>
            ![
              "id",
              "title",
              "rule",
              "family",
              "starts",
              "goals",
              "required",
            ].includes(k),
        )
        .sort(([a], [b]) => a.localeCompare(b)),
    );
    config.actors = l.starts.length;
    config.goalConstraints = l.goals.map(({ x, z, ...rest }) => rest);
    const signature = JSON.stringify(config),
      existing = seenExamples.get(signature);
    if (existing) {
      labAliases[l.id] = existing;
      return false;
    }
    seenExamples.set(signature, l.id);
    return true;
  });
export const byId = Object.fromEntries(experiments.map((l) => [l.id, l]));
for (const [alias, id] of Object.entries(labAliases)) byId[alias] = byId[id];
