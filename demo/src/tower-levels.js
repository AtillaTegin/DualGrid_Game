import { bridgeLevels } from "./learning-levels.js";
import { arrangeCurriculum } from "./curriculum.js";
export { bridgeLevels };
const rect = (x, z, w, h, y) =>
  Array.from({ length: w * h }, (_, i) => [
    x + (i % w),
    z + Math.floor(i / w),
    y,
  ]);
const make = (o) => ({
  version: 1,
  tiles: [],
  rubble: [],
  keys: [],
  switches: [],
  doors: [],
  plates: [],
  lifts: [],
  ...o,
  tiles: o.tiles.filter(
    (p) =>
      !o.lifts.some((t) => t.at[0] === p[0] && t.at[1] === p[1]) &&
      !(o.rubble || []).some((t) => t.every((v, i) => v === p[i])),
  ),
});
export const towerLevels = [
  make({
    id: "V1",
    title: "Yuxarıdakı kilid, aşağıdakı çıxış",
    intro:
      "Liftə çıxıb F bas: platforma səni yuxarı aparacaq. Yuxarıdakı qızılı açarı götür, şalterin yanında F bas və aşağı qayıt. Aşağı çıxış yalnız hər ikisi hazır olanda açılır.",
    focus: "İki mərtəbə · açar və şalter zənciri",
    starts: [[0, 2, 0]],
    goals: [[0, 0, 0]],
    tiles: [
      ...rect(0, 0, 3, 3, 0),
      ...rect(4, 0, 3, 2, 1),
      [3, 2, 1],
      [4, 2, 1],
      [6, 2, 1],
    ],
    lifts: [
      {
        id: "L",
        at: [3, 2],
        stops: [0, 1],
        calls: [
          [2, 2, 0],
          [4, 2, 1],
        ],
      },
    ],
    keys: [{ id: "amber", at: [6, 2, 1] }],
    switches: [{ id: "return", at: [4, 0, 1], requires: { keys: ["amber"] } }],
    doors: [
      { at: [0, 0, 0], requires: { switches: ["return"], keys: ["amber"] } },
    ],
    exitRequires: { switches: ["return"] },
  }),
  make({
    id: "V2",
    title: "İki liftin qarşılıqlı icazəsi",
    intro:
      "A aşağıdakı mavi sensoru tutsun: B sağ liftlə yuxarı qalxsın. B yuxarı sensoru tutanda sol lift açılır. A qalxıb uzaq şalteri işə salsın; bundan sonra sensorlardan ayrılıb öz çıxışlarınıza gedə bilərsiniz. TAB blok seçir.",
    focus: "İki blok · sensor təhvili · iki ayrı şaxta",
    starts: [
      [0, 2, 0],
      [6, 2, 0],
    ],
    goals: [
      [1, 0, 1],
      [6, 0, 1],
    ],
    tiles: [
      ...rect(0, 1, 3, 2, 0),
      ...rect(5, 1, 3, 2, 0),
      ...rect(0, 0, 3, 2, 1),
      ...rect(5, 0, 3, 2, 1),
      [3, 0, 1],
      [4, 0, 1],
    ],
    lifts: [
      {
        id: "west",
        at: [1, 2],
        stops: [0, 1],
        calls: [
          [0, 2, 0],
          [1, 1, 1],
        ],
        requires: { plates: ["upper"] },
      },
      {
        id: "east",
        at: [6, 2],
        stops: [0, 1],
        calls: [
          [5, 2, 0],
          [6, 1, 1],
        ],
        requires: { plates: ["lower"] },
      },
    ],
    plates: [
      { id: "lower", at: [0, 1, 0] },
      { id: "upper", at: [7, 1, 1] },
    ],
    switches: [{ id: "final", at: [2, 0, 1] }],
    doors: [
      { at: [1, 0, 1], requires: { switches: ["final"] } },
      { at: [6, 0, 1], requires: { switches: ["final"] } },
    ],
    exitRequires: { switches: ["final"] },
  }),
  make({
    id: "V3",
    title: "Üç qatlı qazıntı yolu",
    intro:
      "Orta mərtəbədəki şalter ekskavatoru işə salır. X ilə qazma rejiminə keç, oxla qonşu qızılı süxuru qaz: altında keçilə bilən döşəmə açılır. X ilə hərəkətə qayıt. İkinci şaxtaya yol açıb üçüncü mərtəbədəki açarı götür, arxa pillədəki şalterlə aşağı çıxışı aç.",
    focus: "Üç mərtəbə · qazıntı · iki şaxtalı marşrut",
    starts: [[0, 0, 0]],
    goals: [[2, 0, 0]],
    tiles: [
      ...rect(0, 0, 3, 2, 0),
      ...rect(0, 0, 2, 2, 1),
      [2, 1, 1],
      [4, 1, 1],
      [4, 0, 1],
      [4, 2, 1],
      ...rect(3, 0, 3, 3, 2),
    ],
    rubble: [
      [3, 1, 1],
      [5, 1, 2],
    ],
    excavatorRequires: { switches: ["power"] },
    lifts: [
      {
        id: "entry",
        at: [0, 2],
        stops: [0, 1],
        calls: [
          [0, 1, 0],
          [0, 1, 1],
        ],
      },
      {
        id: "spire",
        at: [4, 3],
        stops: [1, 2],
        calls: [
          [4, 2, 1],
          [4, 2, 2],
        ],
      },
    ],
    switches: [
      { id: "power", at: [1, 0, 1] },
      { id: "return", at: [3, 0, 2], requires: { keys: ["core"] } },
    ],
    keys: [{ id: "core", at: [5, 1, 2] }],
    doors: [
      { at: [2, 0, 0], requires: { switches: ["return"], keys: ["core"] } },
    ],
    exitRequires: { switches: ["return"], dug: [0, 1] },
  }),
];

// One short introduction, one constraint lesson, then distinct decision structures.
export const shapeLevels = [
  make({
    id: "S1",
    chapter: "Ölçü / 1 · Təlim",
    difficulty: "ASAN",
    title: "Bir kubdan dörd kontakt",
    focus: "G ilə böyümə · dörd işıqlı məqsəd",
    intro:
      "G işıqlı stansiyada G bas: kub 2×2×2 böyüyür. Böyük kub hər yuvarlanmada iki xana gedir. Dörd işıqlı çıxışı bütöv ört; yalnız koordinata gəlmək kifayət deyil.",
    forms: true,
    starts: [[0, 0, 0]],
    goals: [[2, 0, 0]],
    goalSizes: [2],
    resizePads: [[0, 0, 0]],
    tiles: rect(0, 0, 4, 2, 0),
    lifts: [],
  }),
  make({
    id: "S2",
    chapter: "Ölçü / 2 · Təlim",
    difficulty: "ASAN",
    title: "Tağın altından yalnız kiçik",
    focus: "Kiçil → alçaq keçid → yenidən böyü",
    intro:
      "Böyük kubla sağdakı G stansiyasına gəl və kiçil. Alçaq tağın altından kiçik kub keçir. Qarşı meydanın G stansiyasında yenidən böyüyüb dörd işığı ört. Tavanın içindən keçmək mümkün deyil.",
    forms: true,
    starts: [[0, 0, 0]],
    startSizes: [2],
    goals: [[8, 0, 0]],
    goalSizes: [2],
    resizePads: [
      [2, 0, 0],
      [8, 0, 0],
    ],
    tiles: [
      ...rect(0, 0, 4, 2, 0),
      [4, 1, 0],
      [5, 1, 0],
      [6, 1, 0],
      [7, 1, 0],
      ...rect(8, 0, 2, 3, 0),
    ],
    ceilings: [4, 5, 6, 7].map((x) => ({ at: [x, 1, 0], height: 1.5 })),
    lifts: [],
  }),
  make({
    id: "S3",
    chapter: "Ölçü / 3 · Qarşılıqlı dəstək",
    difficulty: "ORTA",
    title: "Dörd kontakt, bir uzaq səfər",
    focus: "A ölçü ilə yolu saxlayır · B bağlı qapını keçir",
    intro:
      "A dörd mavi kontaktı böyük izi ilə eyni vaxtda örtsün. B aşağı qırıq dövrə ilə yuxarıdakı qapıya getsin. B yuxarıdan son şalteri açandan sonra A kiçilib sol yan çıxışına getsin. A-nın çıxışı B-nin səfərindən, B-nin qapısı isə A-nın ölçüsündən asılıdır. TAB blok seçir.",
    forms: true,
    resizeActors: [0],
    starts: [
      [0, 0, 0],
      [0, 5, 0],
    ],
    goals: [
      [1, 3, 0],
      [6, 0, 0],
    ],
    goalSizes: [1, 1],
    resizePads: [[0, 0, 0]],
    tiles: [
      ...rect(0, 0, 2, 2, 0),
      [0, 2, 0],
      [0, 3, 0],
      [1, 3, 0],
      ...rect(0, 5, 5, 1, 0),
      [4, 4, 0],
      [4, 3, 0],
      [5, 3, 0],
      [6, 3, 0],
      [6, 2, 0],
      [6, 1, 0],
      [6, 0, 0],
    ],
    plates: [
      { id: "cover", actor: 0, at: [0, 0, 0], cells: rect(0, 0, 2, 2, 0) },
    ],
    switches: [{ id: "release", at: [6, 0, 0] }],
    doors: [
      { at: [6, 1, 0], requires: { plates: ["cover"] } },
      { at: [1, 3, 0], requires: { switches: ["release"] } },
    ],
    lifts: [],
  }),
  make({
    id: "S4",
    chapter: "Ölçü / 4 · Yük və marşrut",
    difficulty: "ORTA",
    title: "Geniş izlə keç, dar yoldan çıx",
    focus: "Ölçü + yük həddi + geri dönməyən forma seçimi",
    intro:
      "Nazik qabıq bir xanada 1 vahid yük götürür, kubun kütləsi 2-dir. Böyük iz yükü dörd xanaya paylayır. Qarşı stansiyada kiçiləndən sonra dar servis yoluna keç. Böyük kub servis tağından keçmir, kiçik kub qabıqdan qayıda bilmir.",
    forms: true,
    starts: [[0, 0, 0]],
    goals: [[2, 5, 0]],
    goalSizes: [1],
    resizePads: [
      [0, 0, 0],
      [6, 0, 0],
    ],
    tiles: [
      ...rect(0, 0, 8, 2, 0),
      [7, 2, 0],
      [7, 3, 0],
      [7, 4, 0],
      ...rect(2, 5, 6, 1, 0),
    ],
    shell: rect(2, 0, 4, 2, 0),
    shellThreshold: 1,
    ceilings: [
      { at: [7, 2, 0], height: 1.5 },
      { at: [7, 3, 0], height: 1.5 },
    ],
    lifts: [],
  }),
  make({
    id: "S5",
    chapter: "Ölçü / 5 · Lift kombinasiyası",
    difficulty: "ORTA",
    title: "Liftin yükü deyil, eni",
    focus: "Ölçü + təkxanalı lift + yuxarı kontakt kilidi",
    intro:
      "Böyük kub təkxanalı platformaya sığmır. Aşağı stansiyada kiçil, liftə min və yuxarı qalx. Yuxarıda dörd kontaktı örtmək üçün yenidən böyüməlisən. İşıqlı son şalter yalnız həmin ölçüdə aktivləşir, sonra kiçilib yan çıxışa get.",
    forms: true,
    starts: [[0, 1, 0]],
    startSizes: [2],
    goals: [[7, 0, 1]],
    goalSizes: [1],
    resizePads: [
      [0, 1, 0],
      [4, 1, 1],
    ],
    tiles: [
      ...rect(0, 0, 3, 3, 0),
      [3, 1, 0],
      ...rect(4, 1, 4, 2, 1),
      [7, 0, 1],
    ],
    lifts: [
      {
        id: "narrow",
        at: [3, 2],
        stops: [0, 1],
        calls: [
          [3, 1, 0],
          [4, 2, 1],
        ],
      },
    ],
    plates: [{ id: "roof", at: [4, 1, 1], cells: rect(4, 1, 2, 2, 1) }],
    switches: [{ id: "seal", at: [6, 1, 1], requires: { plates: ["roof"] } }],
    doors: [{ at: [7, 0, 1], requires: { switches: ["seal"] } }],
    exitRequires: { switches: ["seal"] },
  }),
  make({
    id: "S6",
    chapter: "Ölçü / 6 · Qazıntı kombinasiyası",
    difficulty: "ÇƏTİN",
    title: "Əvvəl qaz, sonra yükü yay",
    focus: "Qazıntı + forma + zəif körpü + kilidli eniş",
    intro:
      "Əvvəl kiçik kubla süxuru qaz və sol yan qoldakı G stansiyasına çat. Orada böyüyüb zəif qabıqdan keç. Sağ stansiyada kiçil, alçaq keçiddəki ikinci süxuru qaz və açarı götür. Son şalter aşağı liftin kilidini açır. X qazma, G ölçü, F liftdir.",
    forms: true,
    starts: [[0, 3, 1]],
    goals: [[8, 4, 0]],
    goalSizes: [1],
    resizePads: [
      [0, 0, 1],
      [6, 0, 1],
    ],
    tiles: [
      ...rect(0, 0, 2, 2, 1),
      [0, 3, 1],
      ...rect(2, 0, 6, 2, 1),
      [7, 2, 1],
      [7, 4, 1],
      ...rect(7, 3, 3, 2, 0),
    ],
    rubble: [
      [0, 2, 1],
      [7, 3, 1],
    ],
    shell: rect(2, 0, 4, 2, 1),
    shellThreshold: 1,
    ceilings: [
      { at: [7, 2, 1], height: 1.5 },
      { at: [7, 3, 1], height: 1.5 },
    ],
    keys: [{ id: "drill-key", at: [7, 3, 1] }],
    switches: [
      { id: "descent", at: [7, 4, 1], requires: { keys: ["drill-key"] } },
    ],
    lifts: [
      {
        id: "down",
        at: [8, 4],
        stops: [0, 1],
        calls: [
          [7, 4, 1],
          [7, 4, 0],
        ],
        requires: { switches: ["descent"] },
      },
    ],
    exitRequires: { switches: ["descent"] },
  }),
];
towerLevels.push(...shapeLevels);
// Removed from playable selection at the user's request; history remains available to tests.
export const retiredTowerLevels = towerLevels.filter(
  (l) => l.id === "V3" || l.id === "S6",
);
for (let i = towerLevels.length - 1; i >= 0; i--)
  if (retiredTowerLevels.includes(towerLevels[i])) towerLevels.splice(i, 1);
shapeLevels.splice(
  shapeLevels.findIndex((l) => l.id === "S6"),
  1,
);

export const advancedLevels = [
  make({
    id: "H1",
    chapter: "Zəmin / Təlim",
    difficulty: "ASAN",
    title: "Qayıdış haqqını saxla",
    focus: "Bir dəfəlik dayaq · iki qolun ardıcıllığı",
    intro:
      "× nişanlı plitə onun üstündən çıxanda qırılır. Sol qoldakı açarı əvvəl götür, sonra qırılan boğazdan sağ qola keç. Açarsız final bağlıdır; geri keçid artıq olmayacaq. Z qırılmanı da geri alır.",
    starts: [[2, 2, 0]],
    goals: [[6, 0, 0]],
    tiles: [
      [0, 0, 0],
      [1, 0, 0],
      [2, 0, 0],
      [0, 1, 0],
      [2, 1, 0],
      [0, 2, 0],
      [1, 2, 0],
      [2, 2, 0],
      [3, 2, 0],
      [4, 2, 0],
      [5, 2, 0],
      [6, 2, 0],
      [6, 1, 0],
      [6, 0, 0],
      [5, 0, 0],
    ],
    fragile: [[3, 2, 0]],
    keys: [{ id: "left", at: [0, 0, 0] }],
    doors: [{ at: [6, 1, 0], requires: { keys: ["left"] } }],
    lifts: [],
  }),
  make({
    id: "H2",
    chapter: "Qapılar / Alternativ şəbəkə",
    difficulty: "ÇƏTİN",
    title: "İki dövrə, əks qapılar",
    focus: "Təkrar çevrilən şalter · yeni geri yol · üç şərtli final",
    intro:
      "Sol üst şalter F ilə həm açılır, həm bağlanır. Açıq olanda orta qapı açılır, final isə kilidlənir. Aşağıdan açarı götür və sağ altdakı şalterlə yan qayıdışı aç. Sonda ilk şalteri söndürməlisən. Eyni yolu sadəcə geri getmək kifayət etmir.",
    starts: [[1, 0, 0]],
    goals: [[4, 0, 0]],
    tiles: [
      ...rect(0, 0, 5, 2, 0),
      [2, 2, 0],
      [4, 2, 0],
      ...rect(0, 3, 5, 2, 0),
    ],
    switches: [
      { id: "middle", at: [0, 0, 0], toggle: true },
      { id: "side", at: [4, 4, 0] },
    ],
    keys: [{ id: "lower", at: [0, 4, 0] }],
    doors: [
      {
        at: [2, 2, 0],
        requires: { switches: ["middle"], notSwitches: ["side"] },
      },
      { at: [4, 2, 0], requires: { switches: ["side"] } },
      {
        at: [4, 0, 0],
        requires: {
          switches: ["side"],
          notSwitches: ["middle"],
          keys: ["lower"],
        },
      },
    ],
    lifts: [],
  }),
  make({
    id: "H3",
    chapter: "Enerji / Təlim",
    difficulty: "ASAN",
    title: "İki tokenin birini saxla",
    focus: "Qorunan enerji · terminal və blok arasında bölgü",
    intro:
      "A iki enerji tokeni daşıyır. D terminalının üstünə gəl: Q bir token qoyur, E bir token götürür. Qapı üçün terminalda ən azı bir token, final üçün blokda dəqiq bir token lazımdır. Enerji yaranmır və yox olmur.",
    starts: [[0, 1, 0]],
    goals: [[6, 0, 0]],
    energy: [2],
    depots: [{ at: [2, 0, 0] }],
    tiles: [...rect(0, 0, 3, 2, 0), [3, 0, 0], [4, 0, 0], [5, 0, 0], [6, 0, 0]],
    doors: [{ at: [4, 0, 0], requires: { deposits: [{ index: 0, min: 1 }] } }],
    exitRequires: {
      energy: [{ actor: 0, min: 1, max: 1 }],
      deposits: [{ index: 0, min: 1, max: 1 }],
    },
    lifts: [],
  }),
  make({
    id: "H4",
    chapter: "Enerji / Məcburi təhvil",
    difficulty: "ÇƏTİN",
    title: "Dolu get, boş qayıt",
    focus: "İki blok · enerji ötürməsi · qapı ehtiyatı",
    intro:
      "A üç tokenlə sol yuxarı başlayır, B sağ aşağıdadır. Mərkəzi görüşdə T ilə seçilmiş blokdan qonşu partnyora bir token ver. A-nın sol finalı boş blok istəyir; B-nin sağ finalı iki token istəyir; üçüncü token D terminalında qalmalıdır. Əvvəl terminalın qapısını aç, sonra ehtiyatı kimin daşıyacağını planla.",
    starts: [
      [0, 0, 0],
      [7, 4, 0],
    ],
    goals: [
      [0, 3, 0],
      [7, 0, 0],
    ],
    energy: [3, 0],
    depots: [{ at: [4, 2, 0], withdrawActors: [0] }],
    tiles: [
      ...rect(0, 0, 3, 2, 0),
      [2, 2, 0],
      [3, 2, 0],
      [4, 2, 0],
      [5, 2, 0],
      [5, 3, 0],
      ...rect(5, 4, 3, 1, 0),
      [7, 3, 0],
      [7, 2, 0],
      [7, 1, 0],
      [7, 0, 0],
      [0, 2, 0],
      [0, 3, 0],
    ],
    doors: [
      { at: [5, 2, 0], requires: { deposits: [{ index: 0, min: 1 }] } },
      { at: [0, 3, 0], requires: { energy: [{ actor: 0, max: 0 }] } },
      { at: [7, 0, 0], requires: { energy: [{ actor: 1, min: 2 }] } },
    ],
    exitRequires: {
      energy: [
        { actor: 0, max: 0 },
        { actor: 1, min: 2, max: 2 },
      ],
      deposits: [{ index: 0, min: 1, max: 1 }],
    },
    lifts: [],
  }),
  make({
    id: "H5",
    chapter: "Portal / Təlim",
    difficulty: "ORTA",
    title: "Görünən ünvan, bağlı dönüş",
    focus: "Portal · ayrı adada icazə · yeni qayıdış",
    intro:
      "P portalının üstünə gəl və P bas: göstərilən adaya keçəcəksən. Sağ adadakı açar şalteri işlək edir. Şalteri F ilə açandan sonra aşağıdakı ayrı portal geri dönüşə icazə verir. Portalın ünvanı sabitdir, eyni anda yalnız bir keçid işləyir.",
    starts: [[0, 0, 0]],
    goals: [[0, 2, 0]],
    tiles: [
      ...rect(0, 0, 3, 3, 0),
      ...rect(6, 0, 3, 2, 0),
      [8, 2, 0],
      [8, 3, 0],
      [7, 3, 0],
      [6, 3, 0],
    ],
    portals: [
      { at: [2, 0, 0], to: [6, 0, 0] },
      { at: [6, 3, 0], to: [2, 2, 0], requires: { switches: ["home"] } },
    ],
    keys: [{ id: "remote", at: [8, 0, 0] }],
    switches: [{ id: "home", at: [8, 3, 0], requires: { keys: ["remote"] } }],
    doors: [{ at: [0, 2, 0], requires: { switches: ["home"] } }],
    lifts: [],
  }),
  make({
    id: "H6",
    chapter: "Kombinasiya / Çoxmərtəbəli plan",
    difficulty: "EKSPERT",
    title: "Üç adanın enerji müqaviləsi",
    focus: "İki blok · portal · enerji bölgüsü · lift · kilidli final",
    intro:
      "Beş tokenin heç biri itmir. B portala yalnız bir tokenlə daxil ola bilər; həmin anda D1-də iki, D2-də ən azı bir token qalmalıdır. Əvvəl aşağı terminalı doldur, B üçün enerji saxla, sonra A ilə uzaq adadakı liftə qalx. Yuxarıda ehtiyatı qur, B-ni keçir və T ilə görüşdə enerji ötür. Final: A-da 1, B-də 2, hər terminalda 1 token. Uzaq şalteri yalnız iki tokenli B aça bilir. A aşağıya dönür, B yuxarıda qalır. P portal, Q/E terminal, T ötürmədir.",
    starts: [
      [0, 0, 0],
      [1, 4, 0],
    ],
    goals: [
      [0, 4, 0],
      [10, 1, 1],
    ],
    energy: [5, 0],
    depots: [{ at: [8, 0, 1], withdrawActors: [0] }, { at: [1, 4, 0] }],
    tiles: [
      ...rect(0, 0, 3, 2, 0),
      [0, 2, 0],
      [0, 3, 0],
      [1, 3, 0],
      ...rect(0, 4, 3, 1, 0),
      ...rect(6, 0, 3, 2, 0),
      ...rect(7, 0, 4, 2, 1),
      [6, 2, 0],
    ],
    lifts: [
      {
        id: "spire",
        at: [7, 2],
        stops: [0, 1],
        calls: [
          [7, 1, 0],
          [7, 1, 1],
        ],
      },
    ],
    portals: [
      { at: [2, 0, 0], to: [6, 0, 0], actor: 0 },
      {
        at: [2, 4, 0],
        actor: 1,
        to: [9, 1, 1],
        requires: {
          deposits: [
            { index: 0, min: 2 },
            { index: 1, min: 1 },
          ],
          energy: [{ actor: 1, min: 1, max: 1 }],
        },
      },
      {
        at: [7, 0, 1],
        actor: 0,
        to: [0, 3, 0],
        requires: { switches: ["home"] },
      },
    ],
    switches: [
      {
        id: "home",
        actor: 1,
        at: [10, 0, 1],
        requires: { energy: [{ actor: 1, min: 2 }] },
      },
    ],
    doors: [
      {
        at: [0, 4, 0],
        requires: {
          switches: ["home"],
          energy: [{ actor: 0, min: 1, max: 1 }],
        },
      },
      {
        at: [10, 1, 1],
        requires: {
          switches: ["home"],
          energy: [{ actor: 1, min: 2, max: 2 }],
        },
      },
    ],
    exitRequires: {
      deposits: [
        { index: 0, min: 1, max: 1 },
        { index: 1, min: 1, max: 1 },
      ],
      energy: [
        { actor: 0, min: 1, max: 1 },
        { actor: 1, min: 2, max: 2 },
      ],
    },
  }),
];
towerLevels.push(...advancedLevels);

export const faceLevels = [
  make({
    id: "F1",
    chapter: "Üzlər / Alt kontakt",
    difficulty: "ASAN",
    title: "Eyni xana, başqa alt üz",
    focus: "N1.1 · Alt üzün fiziki yaddaşı",
    intro:
      "Hər üz 0–5 ilə işarələnib. Oxla hər yuvarlanma alt üzü dəyişir; kamera bunu dəyişmir. Son kontakt yalnız 4 üzü aşağı olanda tamamlanır. Qısa düz yol həmin üzü vermir: kiçik meydanda başqa marşrut hazırla. Alt üz və növbəti addımlar solda göstərilir.",
    faceMode: true,
    starts: [[0, 1, 0]],
    goals: [[2, 1, 0]],
    tiles: rect(0, 0, 3, 3, 0),
    faceContacts: [{ id: "bottom", at: [2, 1, 0], value: 4 }],
    exitRequires: { contacts: ["bottom"] },
    lifts: [],
  }),
  make({
    id: "F2",
    chapter: "Üzlər / Yan terminal",
    difficulty: "ORTA",
    title: "Divara baxan imza",
    focus: "N1.2 · Yan üz · partnyorun keçidi",
    intro:
      "A üst meydanda sağ divarın kontaktına 4 üzü ilə baxmalıdır. A-nın kontakt yeri 2,1 xanasıdır; uyğunluq üçün şərq üzü 4 olmalıdır. B aşağı yoldan keçərkən A terminalı saxlasın. B-nin qapısı başqa üzlə açılmır. TAB blok seçir.",
    faceMode: true,
    starts: [
      [0, 1, 0],
      [0, 4, 0],
    ],
    goals: [
      [2, 1, 0],
      [5, 0, 0],
    ],
    tiles: [
      ...rect(0, 0, 3, 3, 0),
      ...rect(0, 4, 6, 1, 0),
      [5, 3, 0],
      [5, 2, 0],
      [5, 1, 0],
      [5, 0, 0],
    ],
    faceContacts: [
      { id: "side", actor: 0, at: [2, 1, 0], side: "r", value: 4 },
    ],
    doors: [{ at: [5, 1, 0], requires: { contacts: ["side"] } }],
    exitRequires: { contacts: ["side"] },
    lifts: [],
  }),
  make({
    id: "F3",
    chapter: "Üzlər / İzolyasiya",
    difficulty: "ASAN",
    title: "Qorunan üzü yerə gətir",
    focus: "N1.3 · Tək təhlükə xanası · təhlükəsiz hazırlıq",
    intro:
      "Qırmızı !1 xanasına yalnız 1 üzü aşağı olanda daxil olmaq olar. Başqa üzlə giriş rədd edilir; düşünməyə vaxt məhdudiyyəti yoxdur. Sol meydanda orientasiyanı hazırla, təhlükəni keçib sağ qoldakı çıxışa çat. Z hazırlığı da geri qaytarır.",
    faceMode: true,
    starts: [[0, 0, 0]],
    goals: [[5, 3, 0]],
    tiles: [
      ...rect(0, 0, 3, 3, 0),
      [3, 1, 0],
      [4, 1, 0],
      [4, 2, 0],
      [4, 3, 0],
      [5, 3, 0],
    ],
    faceHazards: [{ at: [3, 1, 0], value: 1 }],
    lifts: [],
  }),
  make({
    id: "F4",
    chapter: "Üzlər / Ardıcıllıq yaddaşı",
    difficulty: "ÇƏTİN",
    title: "Üç möhür, bir düzgün sıra",
    focus: "N1.4 · Üz + məkan + yaddaş",
    intro:
      "Üç möhürü 1→2→3 sırasında təsdiqlə. 1-ci pad alt 0, 2-ci alt 3, 3-cü alt 5 istəyir. Hər padın üstündə F bas; yanlış pad və ya yanlış üz sıranı sıfırlayır. Düzgün sıra olmadan aşağı soldakı final açılmır. Yolların iki geniş döngəsi orientasiyanı dəyişmək üçündür.",
    faceMode: true,
    starts: [[0, 0, 0]],
    goals: [[0, 4, 0]],
    tiles: rect(0, 0, 5, 5, 0).filter(
      (p) => p[1] !== 2 || p[0] === 0 || p[0] === 4,
    ),
    faceRoute: [
      { at: [2, 0, 0], value: 0 },
      { at: [4, 2, 0], value: 3 },
      { at: [2, 4, 0], value: 5 },
    ],
    doors: [{ at: [0, 4, 0], requires: { faceRouteComplete: true } }],
    exitRequires: { faceRouteComplete: true },
    lifts: [],
  }),
  make({
    id: "F5",
    chapter: "Üzlər / Forma və lift",
    difficulty: "ÇƏTİN",
    title: "Yuxarıda dönmək üçün yer yoxdur",
    focus: "Üz yaddaşı + ölçü + lift",
    intro:
      "Aşağı möhür meydanında 3 üzü aşağı gətirib F ilə möhürlə: liftin kilidi açılır. Yuxarı qalx, G stansiyasında böyük kub ol və dörd işıqlı məqsədi 4 üzü aşağı ört. Lift və ölçü dəyişməsi üz işarələrini saxlayır; yalnız yuvarlanma dəyişir. Məqsədə yanlış üzlə gəlsən, sadəcə böyümək kifayət etmir.",
    faceMode: true,
    forms: true,
    starts: [[0, 2, 0]],
    goals: [[6, 1, 1]],
    goalSizes: [2],
    tiles: [...rect(0, 0, 3, 3, 0), ...rect(4, 0, 4, 4, 1)],
    resizePads: [[4, 1, 1]],
    faceRoute: [{ at: [0, 0, 0], value: 3 }],
    faceContacts: [{ id: "top-final", at: [6, 1, 1], value: 4 }],
    exitRequires: { faceRouteComplete: true, contacts: ["top-final"] },
    lifts: [
      {
        id: "lift",
        at: [3, 1],
        stops: [0, 1],
        calls: [
          [2, 1, 0],
          [4, 1, 1],
        ],
        requires: { faceRouteComplete: true },
      },
    ],
  }),
  make({
    id: "F6",
    chapter: "Üzlər / Qarışıq ekspert",
    difficulty: "EKSPERT",
    title: "Möhürlər adalar arasında itməz",
    focus: "Üç üz möhürü + enerji + portal + mərtəbə",
    intro:
      "Üç tokenlə başla. D1-də birini saxla, birinci möhürü alt 1 ilə F basıb təsdiqlə. İki tokenlə portaldan ikinci adaya keç; orada alt 4 möhürü liftə icazə verir. Yuxarıda 2 üzü sağa baxanda üçüncü möhürü təsdiqlə. Son portal yalnız üç möhür hazır olanda geri aparır. Finalda blokda 2, terminalda 1 token qalmalıdır. Yanlış F sıranı sıfırlayır; Z ilə geri al.",
    faceMode: true,
    starts: [[0, 0, 0]],
    goals: [[0, 3, 0]],
    energy: [3],
    depots: [{ at: [1, 2, 0] }],
    tiles: [
      ...rect(0, 0, 3, 4, 0),
      ...rect(6, 0, 3, 2, 0),
      ...rect(8, 0, 3, 2, 1),
    ],
    faceRoute: [
      { at: [1, 1, 0], value: 1 },
      { at: [7, 1, 0], value: 4 },
      { at: [10, 0, 1], side: "r", value: 2 },
    ],
    portals: [
      {
        at: [2, 0, 0],
        to: [6, 0, 0],
        requires: {
          faceAtLeast: 1,
          deposits: [{ index: 0, min: 1 }],
          energy: [{ actor: 0, min: 2, max: 2 }],
        },
      },
      { at: [9, 1, 1], to: [0, 2, 0], requires: { faceRouteComplete: true } },
    ],
    lifts: [
      {
        id: "lift",
        at: [8, 2],
        stops: [0, 1],
        calls: [
          [8, 1, 0],
          [8, 1, 1],
        ],
        requires: { faceAtLeast: 2 },
      },
    ],
    doors: [{ at: [0, 3, 0], requires: { faceRouteComplete: true } }],
    exitRequires: {
      faceRouteComplete: true,
      energy: [{ actor: 0, min: 2, max: 2 }],
      deposits: [{ index: 0, min: 1, max: 1 }],
    },
  }),
];
towerLevels.push(...faceLevels);

export const controlLevels = [
  make({
    id: "R1",
    chapter: "Koordinatlar / Tərs zona",
    difficulty: "ASAN",
    title: "Ox və dünya eyni deyil",
    focus: "180° zona · canlı dünya oxları",
    intro:
      "Bənövşəyi zonada idarə tərsinə çevrilir. Sağa basanda blok sola gedir. Paneldə hər düymənin dünya istiqaməti göstərilir. Zonaya giriş normaldır, dəyişiklik növbəti əmrdən işləyir. Kənar sahədə idarə yenə normaldır.",
    starts: [[0, 0, 0]],
    goals: [[4, 2, 0]],
    tiles: [...rect(0, 0, 3, 2, 0), [2, 2, 0], [3, 2, 0], [4, 2, 0], [4, 1, 0]],
    control: { kind: "invert", zone: rect(1, 0, 2, 2, 0) },
    lifts: [],
  }),
  make({
    id: "R2",
    chapter: "Koordinatlar / Rotor",
    difficulty: "ASAN",
    title: "Kompasın dörddəbir dönüşü",
    focus: "90° zona · kamera sabit qalır",
    intro:
      "↻ meydanında yuxarı əmri sağa, sağ əmri aşağıya çevrilir. Kamera dönmür. Sol girişdən iç meydana keç, sonra yuxarı dar qoldakı çıxışa çat. Panelə baxaraq düymə ilə dünya istiqamətini ayır.",
    starts: [[0, 3, 0]],
    goals: [[4, 0, 0]],
    tiles: [[0, 3, 0], [1, 3, 0], ...rect(2, 2, 3, 2, 0), [4, 1, 0], [4, 0, 0]],
    control: { kind: "rotate", zone: rect(2, 2, 3, 2, 0) },
    lifts: [],
  }),
  make({
    id: "R3",
    chapter: "Koordinatlar / Yaddaş",
    difficulty: "ORTA",
    title: "Zonadan çıxsan da qütb qalır",
    focus: "Yadda qalan polarite · tarixə bağlı qapı",
    intro:
      "♦ zonasına hər yeni tam giriş qütbü dəyişir. Çıxanda əvvəlki vəziyyət qalır. Final qapısı yalnız tərs qütbdə açılır; zona finaldan ayrıdır. Eyni xanaya qayıtmaq kifayət deyil, düzgün yaddaş vəziyyətini hazırlamalısan.",
    starts: [[0, 1, 0]],
    goals: [[6, 1, 0]],
    tiles: [
      ...rect(0, 0, 3, 3, 0),
      [3, 1, 0],
      [4, 1, 0],
      [4, 0, 0],
      [5, 0, 0],
      [6, 0, 0],
      [6, 1, 0],
    ],
    control: { kind: "polarity", zone: [[1, 0, 0]] },
    doors: [
      { at: [6, 1, 0], requires: { polarity: [{ actor: 0, value: true }] } },
    ],
    lifts: [],
  }),
  make({
    id: "R4",
    chapter: "Koordinatlar / Ayrı bloklar",
    difficulty: "ÇƏTİN",
    title: "İki oxun estafeti",
    focus: "A üçün sağ-sol · B üçün yuxarı-aşağı · relay təhvili",
    intro:
      "Mavi sensorlardan biri tutulanda A-nın sağ-solu, B-nin yuxarı-aşağısı çevrilir. A üst sensoru tutsun, B aşağı boğazı keçib sağ sensoru təhvil alsın. A son çıxışına keçəndən sonra B sağ şaquli yolla yuxarı çıxa bilər. Sensor buraxılan kimi hər iki kompas yenilənir.",
    starts: [
      [0, 0, 0],
      [0, 4, 0],
    ],
    goals: [
      [6, 4, 0],
      [4, 0, 0],
    ],
    tiles: [
      ...rect(0, 0, 3, 2, 0),
      [2, 2, 0],
      [2, 3, 0],
      [3, 3, 0],
      [5, 3, 0],
      ...rect(0, 4, 7, 1, 0),
      [4, 3, 0],
      [4, 2, 0],
      [4, 1, 0],
      [4, 0, 0],
    ],
    plates: [
      { id: "west", at: [2, 1, 0], actor: 0 },
      { id: "east", at: [4, 4, 0], actor: 1 },
    ],
    control: { kind: "split", requires: { anyPlates: ["west", "east"] } },
    doors: [
      { at: [3, 4, 0], requires: { anyPlates: ["west", "east"] } },
      { at: [3, 3, 0], requires: { plates: ["east"] } },
    ],
    lifts: [],
  }),
  make({
    id: "R5",
    chapter: "Koordinatlar / Lift və enerji",
    difficulty: "ÇƏTİN",
    title: "Tərs qalx, normal qayıt",
    focus: "Polarite + lift icazəsi + enerji terminalı",
    intro:
      "Aşağı ♦ zonasına girib tərs qütbü hazırla: lift yalnız bu vəziyyətdə işləyir. Yuxarıda D1-ə bir token qoy və açarı götür. Üst ♦ zonasına daxil olub normal qütbə keç; yalnız bundan sonra P geri portalı açılır. Aşağı final normal qütb, açar, bir token və terminal ehtiyatı istəyir.",
    starts: [[0, 0, 0]],
    goals: [[0, 3, 0]],
    energy: [2],
    depots: [{ at: [7, 0, 1] }],
    tiles: [...rect(0, 0, 3, 4, 0), ...rect(4, 0, 4, 3, 1)],
    control: {
      kind: "polarity",
      zone: [
        [1, 1, 0],
        [5, 1, 1],
      ],
    },
    lifts: [
      {
        id: "lift",
        at: [3, 2],
        stops: [0, 1],
        calls: [
          [2, 2, 0],
          [4, 2, 1],
        ],
        requires: { polarity: [{ actor: 0, value: true }] },
      },
    ],
    keys: [{ id: "upper", at: [7, 2, 1] }],
    portals: [
      {
        at: [4, 0, 1],
        to: [1, 3, 0],
        requires: {
          polarity: [{ actor: 0, value: false }],
          deposits: [{ index: 0, min: 1 }],
          keys: ["upper"],
        },
      },
    ],
    doors: [
      {
        at: [0, 3, 0],
        requires: {
          polarity: [{ actor: 0, value: false }],
          keys: ["upper"],
          deposits: [{ index: 0, min: 1 }],
        },
      },
    ],
    exitRequires: { energy: [{ actor: 0, min: 1, max: 1 }] },
  }),
  make({
    id: "R6",
    chapter: "Koordinatlar / Qarışıq ekspert",
    difficulty: "EKSPERT",
    title: "Qütb, möhür və son böyük iz",
    focus: "Polarite + üz yaddaşı + enerji + portal + ölçü",
    intro:
      "Aşağı ♦ ilə tərs qütb hazırla, P ilə uzaq adaya keç. Birinci möhür alt 0 ilə liftə icazə verir. Üstdə D1-ə bir token qoy, ikinci möhürü alt 3 ilə təsdiqlə və ♦ ilə normal qütbə keçib geri portala gir. Evə dönəndə qütbü yenə tərs et. Son G stansiyasında böyüyüb dörd kontaktı alt 4 ilə ört. Enerji finalda blokda 1, terminalda 1 qalmalıdır. F möhür, G ölçü, P portal, Q/E terminaldır.",
    faceMode: true,
    forms: true,
    starts: [[0, 0, 0]],
    goals: [[0, 1, 0]],
    goalSizes: [2],
    energy: [2],
    depots: [{ at: [6, 0, 1] }],
    tiles: [
      ...rect(0, 0, 3, 3, 0),
      ...rect(6, 0, 3, 2, 0),
      ...rect(6, 0, 4, 4, 1),
    ],
    resizePads: [[0, 1, 0]],
    control: {
      kind: "polarity",
      zone: [
        [1, 1, 0],
        [7, 1, 1],
      ],
    },
    faceRoute: [
      { at: [6, 0, 0], value: 0 },
      { at: [8, 0, 1], value: 3 },
    ],
    faceContacts: [{ id: "last", at: [0, 1, 0], value: 4 }],
    portals: [
      {
        at: [2, 0, 0],
        to: [6, 0, 0],
        requires: { polarity: [{ actor: 0, value: true }] },
      },
      {
        at: [9, 3, 1],
        to: [2, 2, 0],
        requires: {
          faceRouteComplete: true,
          polarity: [{ actor: 0, value: false }],
          deposits: [{ index: 0, min: 1 }],
        },
      },
    ],
    lifts: [
      {
        id: "lift",
        at: [7, 2],
        stops: [0, 1],
        calls: [
          [7, 1, 0],
          [7, 1, 1],
        ],
        requires: { faceAtLeast: 1 },
      },
    ],
    exitRequires: {
      faceRouteComplete: true,
      contacts: ["last"],
      polarity: [{ actor: 0, value: true }],
      energy: [{ actor: 0, min: 1, max: 1 }],
      deposits: [{ index: 0, min: 1, max: 1 }],
    },
  }),
];
towerLevels.push(...controlLevels);

export const wallLevels = [
  make({
    id: "W1",
    chapter: "Divarlar / İdarə pultu",
    difficulty: "ASAN",
    title: "Divarı çək, keçidi aç",
    focus: "K pultu · fiziki panel və hərəkət yolu",
    intro:
      "K pultunun üstünə gəl və K bas. Panel bir xana yana çəkilir, keçid açılır. Panel blokun içindən keçə bilməz; qarşısında başqa blok olsa əmr rədd edilir. Z panelin mövqeyini də geri qaytarır.",
    starts: [[0, 1, 0]],
    goals: [[5, 1, 0]],
    tiles: [...rect(0, 0, 2, 2, 0), [2, 1, 0], [3, 1, 0], [4, 1, 0], [5, 1, 0]],
    movingWalls: [
      {
        mode: "manual",
        console: [1, 1, 0],
        frames: [[[2, 1, 0]], [[2, 0, 0]]],
      },
    ],
    lifts: [],
  }),
  make({
    id: "W2",
    chapter: "Divarlar / Dövri piston",
    difficulty: "ASAN",
    title: "Pistonun boş fazasını seç",
    focus: "Növbə ilə faza · təhlükəsiz gözləmə",
    intro:
      "Piston yalnız qəbul edilmiş əmrdən sonra hərəkət edir; düşünərkən dayanır. Panel 4 faza ilə irəli-geri gedir. Boğaza çatanda SPACE ilə təhlükəsiz yerdə gözlə. Növbəti faza bloka dəyəcəksə əmr rədd edilir, gediş xərclənmir.",
    starts: [[0, 1, 0]],
    goals: [[6, 1, 0]],
    tiles: [
      ...rect(0, 0, 2, 2, 0),
      ...[2, 3, 4, 5, 6].map((x) => [x, 1, 0]),
      [6, 2, 0],
    ],
    movingWalls: [
      {
        mode: "cycle",
        frames: [[[3, 0, 0]], [[3, -1, 0]], [[3, 0, 0]], [[3, 1, 0]]],
      },
    ],
    lifts: [],
  }),
  make({
    id: "W3",
    chapter: "Divarlar / Geri dönməyən hərəkət",
    difficulty: "ORTA",
    title: "Bağlanmazdan əvvəl sol qolu bitir",
    focus: "Bir istiqamətli panel · marşrutun sırası",
    intro:
      "Hər qəbul edilmiş əmrdən sonra panel sağa bir xana çəkilir, son mövqedə dayanır. Əvvəl sol yuxarıdakı açarı götür, sonra sağ qoldan çıx. Açarı sonraya saxlamaq sol sahəni əlçatmaz edir. Vaxt saniyə ilə deyil, açıq göstərilən gediş fazası ilə ölçülür; Z planı geri qaytarır.",
    starts: [[0, 1, 0]],
    goals: [[6, 3, 0]],
    tiles: [
      [0, 0, 0],
      ...Array.from({ length: 7 }, (_, x) => [x, 1, 0]),
      [6, 0, 0],
      [6, 2, 0],
      [6, 3, 0],
    ],
    keys: [{ id: "left", at: [0, 0, 0] }],
    doors: [{ at: [6, 3, 0], requires: { keys: ["left"] } }],
    movingWalls: [
      {
        mode: "advance",
        frames: Array.from({ length: 9 }, (_, i) =>
          [0, 1, 2].map((z) => [i - 3, z, 0]),
        ),
      },
    ],
    lifts: [],
  }),
  make({
    id: "W4",
    chapter: "Divarlar / Alçaq sığınacaq",
    difficulty: "ORTA",
    title: "Tavan keçir, böyük kub sığmır",
    focus: "Ölçü + sürüşən alçaq tir",
    intro:
      "Tir dövrə ilə sağa-sola sürüşür; altında 1.5 vahid boşluq qalır. Kiçik kub keçə bilir, böyük kubun həm gövdəsi, həm yuvarlanma qövsü dəyir. İlk G stansiyasında kiçil, qarşıdakı G-də doğru fazada böyüyüb dörd işıqlı çıxışı ört.",
    forms: true,
    starts: [[0, 0, 0]],
    startSizes: [2],
    goals: [[6, 1, 0]],
    goalSizes: [2],
    resizePads: [
      [0, 0, 0],
      [6, 1, 0],
    ],
    tiles: [...rect(0, 0, 4, 3, 0), ...rect(4, 1, 4, 2, 0)],
    movingWalls: [
      {
        mode: "cycle",
        clearance: 1.5,
        frames: [3, 4, 5, 4].map((x) => [
          [x, 1, 0],
          [x, 2, 0],
        ]),
      },
    ],
    lifts: [],
  }),
  make({
    id: "W5",
    chapter: "Divarlar / Partnyor əyləci",
    difficulty: "ÇƏTİN",
    title: "Boş fazanı saxla, partnyoru burax",
    focus: "İki blok · ikiqat piston · əyləc və azad etmə",
    intro:
      "Pistonun iki hüceyrəsi B-nin körpüsünü eyni vaxtda kəsir. A mavi əyləc sensorunu tutanda cari faza donur. Əvvəl SPACE ilə açıq fazanı hazırla, sonra A ilə sensoru tut. B qarşıya keçib uzaq şalteri açsın; A-nın çıxışı yalnız bundan sonra açılır. Sensoru yanlış fazada tutmaq keçid yaratmır.",
    starts: [
      [0, 0, 0],
      [5, 1, 0],
    ],
    goals: [
      [2, 1, 0],
      [10, 0, 0],
    ],
    tiles: [
      ...rect(0, 0, 3, 2, 0),
      ...rect(4, 0, 2, 3, 0),
      [6, 1, 0],
      [7, 1, 0],
      [8, 1, 0],
      ...rect(9, 0, 2, 3, 0),
    ],
    plates: [{ id: "brake", at: [1, 0, 0], actor: 0 }],
    switches: [{ id: "free", at: [9, 2, 0], actor: 1 }],
    doors: [{ at: [2, 1, 0], requires: { switches: ["free"] } }],
    movingWalls: [
      {
        mode: "cycle",
        brake: { plates: ["brake"] },
        frames: [1, 0, 1, 2].map((z) => [
          [7, z, 0],
          [8, z, 0],
        ]),
      },
    ],
    lifts: [],
  }),
  make({
    id: "W6",
    chapter: "Divarlar / Qarışıq ekspert",
    difficulty: "EKSPERT",
    title: "Arxa pultdan açılan qayıdış",
    focus: "İki panel + mərtəbə + enerji + üz möhürü + portal",
    intro:
      "Aşağı K pultu liftə yolu açır. Yuxarıda sol keçiddən aşağı qola gir: açarı götür, D1-də bir token saxla. Oradakı K pultu sol keçidi bağlayıb sağ qayıdışı açır; panelin süpürdüyü yerdə dayanmaq olmaz. Sağdan dönüb alt 4 ilə üz möhürünü F basaraq təsdiqlə. Möhür vurulandan sonra liftin geri icazəsi bağlanır. Portal yalnız yeni panel mövqeyi, möhür, açar və enerji hazır olanda geri aparır. Finalda blokda 2 token qalmalıdır.",
    faceMode: true,
    starts: [[0, 0, 0]],
    goals: [[0, 3, 0]],
    energy: [3],
    depots: [{ at: [7, 3, 1] }],
    tiles: [
      ...rect(0, 0, 2, 3, 0),
      [2, 1, 0],
      [0, 3, 0],
      ...rect(4, 0, 5, 2, 1),
      [6, 2, 1],
      [8, 2, 1],
      ...rect(6, 3, 3, 1, 1),
    ],
    keys: [{ id: "lower", at: [6, 3, 1] }],
    faceRoute: [{ at: [8, 0, 1], value: 4 }],
    movingWalls: [
      {
        mode: "manual",
        console: [1, 0, 0],
        frames: [[[2, 1, 0]], [[2, 0, 0]]],
      },
      {
        mode: "manual",
        console: [7, 3, 1],
        frames: [[[8, 2, 1]], [[6, 2, 1]]],
      },
    ],
    lifts: [
      {
        id: "lift",
        at: [3, 1],
        stops: [0, 1],
        calls: [
          [2, 1, 0],
          [4, 1, 1],
        ],
        requires: {
          wallPhases: [{ index: 0, phase: 1 }],
          faceRouteIncomplete: true,
        },
      },
    ],
    portals: [
      {
        at: [4, 0, 1],
        to: [0, 2, 0],
        requires: {
          wallPhases: [{ index: 1, phase: 1 }],
          faceRouteComplete: true,
          keys: ["lower"],
          deposits: [{ index: 0, min: 1 }],
        },
      },
    ],
    doors: [
      { at: [0, 3, 0], requires: { faceRouteComplete: true, keys: ["lower"] } },
    ],
    exitRequires: {
      energy: [{ actor: 0, min: 2, max: 2 }],
      deposits: [{ index: 0, min: 1, max: 1 }],
    },
  }),
];
towerLevels.push(...wallLevels);

export const bondLevels = [
  make({
    id: "B1",
    chapter: "Rezonans / Eyni xətt",
    difficulty: "ASAN",
    title: "Şüanı qapıya uyğunlaşdır",
    focus: "Eyni sətir və ya sütun · görünən əlaqə",
    intro:
      "A və B eyni sətirdə və ya sütunda olanda rezonans yaranır. İki blok eyni mərtəbədə olmalı, aralarında bərk divar olmamalıdır. B-ni A-nın çıxış sırasına gətir, sonra A ilə qapını keç. TAB seçimi dəyişir; yaşıl şüa uyğunluğu göstərir.",
    starts: [
      [0, 0, 0],
      [4, 3, 0],
    ],
    goals: [
      [2, 1, 0],
      [4, 1, 0],
    ],
    tiles: [...rect(0, 0, 3, 3, 0), ...rect(4, 0, 3, 4, 0)],
    doors: [{ at: [2, 1, 0], requires: { relation: { type: "line" } } }],
    exitRequires: { relation: { type: "line" } },
    relationDisplay: { type: "line" },
    lifts: [],
  }),
  make({
    id: "B2",
    chapter: "Rezonans / Sonlu bağ",
    difficulty: "ASAN",
    title: "Birini qabağa çox göndərmə",
    focus: "Manhattan məsafəsi · dartmadan məhdudiyyət",
    intro:
      "Bağın limiti 4 xanadır: sağ-sol və yuxarı-aşağı fərqləri toplanır. Bloklar bir-birini dartmır. Limit aşılacaqsa addım rədd edilir və gediş sayılmır. İki fərqli cığır boyunca növbə ilə irəlilə, partnyoru arxada buraxma.",
    starts: [
      [0, 0, 0],
      [0, 3, 0],
    ],
    goals: [
      [6, 0, 0],
      [6, 2, 0],
    ],
    hardLink: 4,
    tiles: [
      [0, 0, 0],
      [1, 0, 0],
      [2, 0, 0],
      [3, 0, 0],
      [3, 1, 0],
      [4, 1, 0],
      [5, 1, 0],
      [5, 0, 0],
      [6, 0, 0],
      ...rect(0, 3, 7, 1, 0),
      [6, 2, 0],
    ],
    lifts: [],
  }),
  make({
    id: "B3",
    chapter: "Rezonans / İki uzun blok",
    difficulty: "ORTA",
    title: "Paralel deyil, perpendikulyar",
    focus: "Həqiqi domino forması · qarşılıqlı orientasiya kilidi",
    intro:
      "Hər iki blok 1×2×1 dominodur: yuvarlananda ayağa qalxır və ya iki xana uzanır. Qapı yalnız biri X boyunca, digəri Z boyunca uzananda açılır. Dik və paralel mövqelər keçidi bağlayır. A üfüqi, B şaquli yer izi ilə işıqlı məqsədlərini örtməlidir.",
    dominoMode: true,
    shapes: [
      [1, 2, 1],
      [1, 2, 1],
    ],
    starts: [
      [0, 0, 0],
      [5, 0, 0],
    ],
    goals: [
      [1, 3, 0],
      [7, 1, 0],
    ],
    goalDims: [
      [2, 1, 1],
      [1, 1, 2],
    ],
    tiles: [...rect(0, 0, 3, 4, 0), ...rect(5, 0, 3, 4, 0)],
    doors: [
      { at: [1, 2, 0], requires: { relation: { type: "perpendicular" } } },
      { at: [2, 2, 0], requires: { relation: { type: "perpendicular" } } },
    ],
    relationDisplay: { type: "perpendicular" },
    exitRequires: { relation: { type: "perpendicular" } },
    lifts: [],
  }),
  make({
    id: "B4",
    chapter: "Rezonans / Cüt addım",
    difficulty: "ASAN",
    title: "Bir əmr, iki yoxlanılan yol",
    focus: "L bağ stansiyası · atomik cüt hərəkət",
    intro:
      "Hər iki blok L stansiyasında dayananda L bas. Bundan sonra bir ox hər iki bloku eyni istiqamətə aparır. İkisindən biri maneəyə və ya boşluğa düşəcəksə hər ikisi yerində qalır. Bir cığırda açıq görünən yol o birində bağlı ola bilər. Finala bağlı rejimdə çat.",
    starts: [
      [0, 0, 0],
      [5, 0, 0],
    ],
    goals: [
      [2, 2, 0],
      [7, 2, 0],
    ],
    linkMode: "same",
    linkStations: [
      [
        [0, 0, 0],
        [5, 0, 0],
      ],
    ],
    tiles: [
      ...rect(0, 0, 3, 3, 0).filter((p) => p[0] !== 1 || p[1] !== 1),
      ...rect(5, 0, 4, 4, 0).filter((p) => p[0] !== 7 || p[1] !== 1),
    ],
    exitRequires: { linked: true },
    lifts: [],
  }),
  make({
    id: "B5",
    chapter: "Rezonans / Əks addım və enerji",
    difficulty: "ÇƏTİN",
    title: "Görüşdə bağı aç, enerjini paylaş",
    focus: "Əks cüt hərəkət · iki stansiya · enerji ötürməsi",
    intro:
      "İlk L cütündə bağı aktiv et: A sağa gedəndə B sola gedir. Cığırlar ortadakı ikinci L stansiyasına gətirir. Orada L ilə bağı aç, görüş xanasına yaxınlaş və T ilə enerjini böl. Son qapılar hər blokda bir token istəyir; bağlı halda görüş xanasına birlikdə girmək mümkün deyil.",
    starts: [
      [0, 0, 0],
      [8, 4, 0],
    ],
    goals: [
      [3, 1, 0],
      [5, 1, 0],
    ],
    energy: [2, 0],
    linkMode: "opposite",
    linkStations: [
      [
        [0, 0, 0],
        [8, 4, 0],
      ],
      [
        [3, 2, 0],
        [5, 2, 0],
      ],
    ],
    tiles: [
      [0, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
      [2, 1, 0],
      [2, 2, 0],
      [3, 2, 0],
      [3, 1, 0],
      [8, 4, 0],
      [7, 4, 0],
      [7, 3, 0],
      [6, 3, 0],
      [6, 2, 0],
      [5, 2, 0],
      [5, 1, 0],
      [4, 2, 0],
    ],
    doors: [
      { at: [2, 1, 0], requires: { linked: true } },
      { at: [6, 3, 0], requires: { linked: true } },
      { at: [3, 1, 0], requires: { energy: [{ actor: 0, min: 1, max: 1 }] } },
      { at: [5, 1, 0], requires: { energy: [{ actor: 1, min: 1, max: 1 }] } },
    ],
    exitRequires: {
      linked: false,
      energy: [
        { actor: 0, min: 1, max: 1 },
        { actor: 1, min: 1, max: 1 },
      ],
    },
    lifts: [],
  }),
  make({
    id: "B6",
    chapter: "Rezonans / Qarışıq plan",
    difficulty: "ÇƏTİN",
    title: "Qapıdan əvvəl partnyoru yerləşdir",
    focus: "Məsafə + görünən xətt + portal + panel",
    intro:
      "Bağın limiti 6-dır. A üst portalla sağ adaya keçsin, amma B hələ soldaykən çox uzaqlaşmasın. K motoru yalnız iki blok eyni xəttdə olanda işləyir; panel A-nın yolundan çəkilib başqa xətti kəsir. B aşağı portalla gələndən sonra A əvvəl sağ aşağı çıxıntıya keçməlidir ki, B rezonans qapısını keçə bilsin. Sonra A yuxarı finala qayıdır. P portal, K panel, TAB seçimdir.",
    starts: [
      [0, 0, 0],
      [1, 0, 0],
    ],
    goals: [
      [8, 0, 0],
      [8, 2, 0],
    ],
    hardLink: 6,
    relationDisplay: { type: "line" },
    tiles: [
      ...rect(0, 0, 3, 3, 0),
      [6, 0, 0],
      [7, 0, 0],
      [8, 0, 0],
      [9, 0, 0],
      [9, 1, 0],
      [9, 2, 0],
      [6, 2, 0],
      [7, 2, 0],
      [8, 2, 0],
    ],
    movingWalls: [
      {
        mode: "manual",
        console: [6, 0, 0],
        requires: { relation: { type: "line" } },
        frames: [[[7, 0, 0]], [[7, 1, 0]]],
      },
    ],
    portals: [
      { at: [2, 0, 0], to: [6, 0, 0], actor: 0 },
      {
        at: [2, 2, 0],
        to: [6, 2, 0],
        actor: 1,
        requires: { wallPhases: [{ index: 0, phase: 1 }] },
      },
    ],
    doors: [{ at: [7, 2, 0], requires: { relation: { type: "line" } } }],
    exitRequires: { relation: { type: "line" } },
    lifts: [],
  }),
];
towerLevels.push(...bondLevels);

export const topologyLevels = [
  make({
    id: "T1",
    chapter: "Bağlantılar / Cüt portal",
    difficulty: "ASAN",
    title: "Əvvəl çıxış ağzını boşalt",
    focus: "İki tərəfli portal · dolu təyinatın yoxlanması",
    intro:
      "A portalın üstündə başlayır, amma təyinatda B dayanıb. Əvvəl B-ni çıxış ağzından uzaqlaşdır, sonra A ilə P bas. Bir P yalnız bir keçid edir; qarşı portal səni avtomatik geri atmır. Hər blok öz nişanına çatsın.",
    starts: [
      [0, 0, 0],
      [5, 0, 0],
    ],
    goals: [
      [7, 1, 0],
      [5, 2, 0],
    ],
    tiles: [[0, 0, 0], [0, 1, 0], [1, 1, 0], ...rect(5, 0, 3, 3, 0)],
    portals: [
      { at: [0, 0, 0], to: [5, 0, 0] },
      { at: [5, 0, 0], to: [0, 0, 0] },
    ],
    lifts: [],
  }),
  make({
    id: "T2",
    faceMode: true,
    chapter: "Bağlantılar / Dönən tikiş",
    difficulty: "ASAN",
    title: "Eyni domino, yeni istiqamət",
    focus: "90° çıxış · həqiqi forma və üz dönüşü",
    intro:
      "A uzanmış dominodur. P portalı çıxışda onu şaquli ox ətrafında 90° döndərir: X izi Z izinə çevrilir, ölçü və kütlə dəyişmir. Uzaq dar meydanda bu duruş lazımdır. P bas, sonra iki xanalıq işıqlı məqsədi ört.",
    dominoMode: true,
    shapes: [[2, 1, 1]],
    starts: [[0, 0, 0]],
    goals: [[7, 0, 0]],
    goalDims: [[1, 1, 2]],
    tiles: [...rect(0, 0, 2, 1, 0), ...rect(5, 0, 3, 2, 0)],
    portals: [{ at: [0, 0, 0], to: [5, 0, 0], rotate: 1 }],
    lifts: [],
  }),
  make({
    id: "T3",
    chapter: "Bağlantılar / Sarınan kənar",
    difficulty: "ASAN",
    title: "Sol kənar sağ sahilə bağlanır",
    focus: "Kənardan bir addım · görünən uyğun sərhəd",
    intro:
      "α nişanlı sol kənardan sola addım sağ adadakı α kənarına keçir. P lazım deyil: bu xəritənin açıq bağlantısıdır. Sarınma yalnız 1×1×1 kub üçündür. Sağdakı qarşı işarədən sağa addımlasan geri dönərsən.",
    starts: [[1, 0, 0]],
    goals: [[5, 2, 0]],
    tiles: [...rect(0, 0, 2, 2, 0), ...rect(5, 1, 3, 2, 0)],
    seams: [
      { from: [0, 1, 0], dir: "left", to: [7, 1, 0] },
      { from: [7, 1, 0], dir: "right", to: [0, 1, 0] },
    ],
    lifts: [],
  }),
  make({
    id: "T4",
    chapter: "Bağlantılar / Ünvan seçicisi",
    difficulty: "ORTA",
    title: "Eyni giriş, iki ayrı ada",
    focus: "Partnyor sensoru · başlanğıc vəziyyətindən seçilən ünvan",
    intro:
      "A əsas adadakı P girişindən gedir. B üst sensoru tutanda yuxarı, alt sensoru tutanda aşağı ada seçilir; ikisi də boşdursa keçid bağlıdır. A hər adadan bir açar almalıdır. Ünvan P basılan andakı sensorla seçilir, keçid ortasında dəyişmir. Hər iki açardan sonra A aşağı, B əsas adadakı məqsədinə getsin.",
    starts: [
      [0, 0, 0],
      [1, 1, 0],
    ],
    goals: [
      [6, 5, 0],
      [0, 2, 0],
    ],
    tiles: [
      ...rect(0, 0, 3, 3, 0),
      ...rect(5, 0, 3, 2, 0),
      ...rect(5, 5, 2, 3, 0),
    ],
    plates: [
      { id: "north", at: [2, 0, 0], actor: 1 },
      { id: "south", at: [2, 2, 0], actor: 1 },
    ],
    portals: [
      {
        at: [0, 0, 0],
        actor: 0,
        branches: [
          {
            label: "Yuxarı ada",
            to: [5, 0, 0],
            requires: { plates: ["north"] },
          },
          {
            label: "Aşağı ada",
            to: [5, 5, 0],
            requires: { plates: ["south"] },
          },
        ],
      },
      { at: [5, 1, 0], to: [0, 1, 0], actor: 0 },
      { at: [5, 7, 0], to: [0, 1, 0], actor: 0 },
    ],
    keys: [
      { id: "north", at: [6, 0, 0] },
      { id: "south", at: [6, 7, 0] },
    ],
    doors: [
      { at: [6, 5, 0], requires: { keys: ["north", "south"] } },
      { at: [0, 2, 0], requires: { keys: ["north", "south"] } },
    ],
    lifts: [],
  }),
  make({
    id: "T5",
    chapter: "Bağlantılar / Ölçü və üz kombinasiyası",
    difficulty: "ORTA",
    title: "Kiçik sarın, böyük imza ilə bitir",
    focus: "Kub sərhədi + ölçü + alt üz",
    intro:
      "Böyük kub sarınan kənardan keçmir. İlk G-də kiçil, α kənarından sola addımlayıb sağ adaya çıx. Uzaqdakı G stansiyasında 5 üzü aşağı hazırla, böyü və dörd kontaktı ört. Sərhəddən addım adi yuvarlanma kimi üzü dəyişir; P portalından fərqli qaydadır.",
    faceMode: true,
    forms: true,
    starts: [[0, 0, 0]],
    startSizes: [2],
    goals: [[6, 2, 0]],
    goalSizes: [2],
    resizePads: [
      [0, 0, 0],
      [6, 2, 0],
    ],
    tiles: [...rect(0, 0, 3, 3, 0), ...rect(5, 1, 4, 4, 0)],
    seams: [
      { from: [0, 2, 0], dir: "left", to: [8, 2, 0] },
      { from: [8, 2, 0], dir: "right", to: [0, 2, 0] },
    ],
    faceContacts: [{ id: "arrival", at: [6, 2, 0], value: 5 }],
    exitRequires: { contacts: ["arrival"] },
    lifts: [],
  }),
  make({
    id: "T6",
    chapter: "Bağlantılar / Qarışıq plan",
    difficulty: "ÇƏTİN",
    title: "Dönüşdən sonra enerji görüşü",
    focus: "Domino dönüşü + ünvan seçimi + iki mərhələli enerji bölgüsü",
    intro:
      "A uzanmış domino ilə 3 token daşıyır. B üst sensoru tutsun: ilk portal yalnız A-da 3 token olanda açılır və dominonu 90° döndərir. Uzaqdakı açarı götür. Geri portalın çərçivəsi yalnız Z boyunca uzanmış dominonu qəbul edir; 270° dönüş səni əvvəlki X duruşunda əsas adaya qaytarır. B-ni yanına gətir, T ilə iki token ver. Sonra B alt sensoru seçsin: ikinci ünvan A-da 1, B-də 2 token və ilk açar istəyir. A aşağı adadakı ikinci açarı alıb uzanmış finalı örtsün, B öz aşağı sol çıxışına getsin.",
    dominoMode: true,
    shapes: [
      [2, 1, 1],
      [1, 1, 1],
    ],
    starts: [
      [0, 0, 0],
      [1, 2, 0],
    ],
    goals: [
      [5, 6, 0],
      [0, 4, 0],
    ],
    goalDims: [
      [2, 1, 1],
      [1, 1, 1],
    ],
    energy: [3, 0],
    tiles: [
      ...rect(0, 0, 3, 5, 0),
      ...rect(5, 0, 3, 2, 0),
      ...rect(5, 4, 2, 3, 0),
    ],
    plates: [
      { id: "north", at: [2, 2, 0], actor: 1 },
      { id: "south", at: [2, 4, 0], actor: 1 },
    ],
    portals: [
      {
        at: [0, 0, 0],
        actor: 0,
        entryDims: [2, 1, 1],
        branches: [
          {
            label: "Dönən ada",
            to: [5, 0, 0],
            rotate: 1,
            requires: {
              plates: ["north"],
              energy: [{ actor: 0, min: 3, max: 3 }],
            },
          },
          {
            label: "Son ada",
            to: [5, 4, 0],
            requires: {
              plates: ["south"],
              keys: ["north"],
              energy: [
                { actor: 0, min: 1, max: 1 },
                { actor: 1, min: 2, max: 2 },
              ],
            },
          },
        ],
      },
      {
        at: [7, 0, 0],
        to: [0, 0, 0],
        actor: 0,
        rotate: 3,
        entryDims: [1, 1, 2],
      },
    ],
    keys: [
      { id: "north", at: [7, 0, 0] },
      { id: "south", at: [6, 6, 0] },
    ],
    doors: [{ at: [0, 4, 0], requires: { keys: ["north", "south"] } }],
    exitRequires: {
      keys: ["north", "south"],
      energy: [
        { actor: 0, min: 1, max: 1 },
        { actor: 1, min: 2, max: 2 },
      ],
    },
    lifts: [],
  }),
];
towerLevels.push(...topologyLevels);

export const floorLevels = [
  make({
    id: "G1",
    chapter: "Zəmin / Giriş haqqı",
    difficulty: "ASAN",
    title: "İkinci girişi qayıdışa saxla",
    focus: "İki girişlik plitə · görünən aşınma",
    intro:
      "2 nişanlı plitəyə iki dəfə daxil olmaq olar. Üstündə dayanmaq və F/TAB haqq xərcləmir. Son girişdən sonra plitə səni çıxana qədər saxlayır, sonra yenidən istifadə olunmur. Sağdakı açarı götürüb sol çıxışa qayıt. Z giriş sayını da geri qaytarır.",
    starts: [[0, 1, 0]],
    goals: [[0, 0, 0]],
    tiles: [...rect(0, 0, 2, 3, 0), [2, 1, 0], ...rect(3, 0, 2, 3, 0)],
    visitTiles: [{ at: [2, 1, 0], limit: 2 }],
    keys: [{ id: "return", at: [4, 0, 0] }],
    doors: [{ at: [0, 0, 0], requires: { keys: ["return"] } }],
    lifts: [],
  }),
  make({
    id: "G2",
    chapter: "Zəmin / İki enerji döşəməsi",
    difficulty: "ORTA",
    title: "Bir yolu aç, digərini saxla",
    focus: "Şalterlə həqiqiləşən döşəmə · iki ayrı marşrut",
    intro:
      "Mərkəzi F şalteri açıq olanda üst mavi yol realdır; bağlı olanda alt narıncı yol realdır. Əvvəl üst adadan açarı alıb möhkəm mərkəzə qayıt, sonra rejimi dəyiş və alt çıxışa get. Dayaq olmayan hüceyrələr tor konturla göstərilir; boşluqdan keçmək olmur.",
    starts: [[0, 3, 0]],
    goals: [[5, 4, 0]],
    tiles: [
      ...rect(0, 1, 2, 3, 0),
      [2, 1, 0],
      [3, 1, 0],
      ...rect(4, 0, 2, 2, 0),
      [2, 3, 0],
      [3, 3, 0],
      [4, 3, 0],
      [5, 3, 0],
      [5, 4, 0],
    ],
    phaseFloors: [
      {
        cells: [
          [2, 1, 0],
          [3, 1, 0],
        ],
        requires: { switches: ["grid"] },
      },
      {
        cells: [
          [2, 3, 0],
          [3, 3, 0],
          [4, 3, 0],
          [5, 3, 0],
        ],
        requires: { notSwitches: ["grid"] },
      },
    ],
    switches: [{ id: "grid", at: [0, 2, 0], toggle: true }],
    keys: [{ id: "upper", at: [5, 0, 0] }],
    doors: [{ at: [5, 4, 0], requires: { keys: ["upper"] } }],
    lifts: [],
  }),
  make({
    id: "G3",
    chapter: "Zəmin / Partnyorun dairəsi",
    difficulty: "ASAN",
    title: "Yolu təkbaşına yarada bilməzsən",
    focus: "Digər blokun müşahidəsi · 3 xanalıq Manhattan məsafəsi",
    intro:
      "◎ yolunu yalnız digər blokun 3 xanalıq müşahidəsi real edir. Blok özü özünə dayaq yaratmır. İki paralel sahildə növbə ilə irəlilə; partnyoru çox geridə qoyan addım rədd edilir. Dairə almaz şəklindədir: ox istiqamətlərində məsafələr toplanır. Görüntü seçilmiş blokun istifadə edə bildiyi yolu göstərir.",
    starts: [
      [0, 0, 0],
      [0, 2, 0],
    ],
    goals: [
      [6, 0, 0],
      [6, 2, 0],
    ],
    tiles: [...rect(0, 0, 7, 1, 0), ...rect(0, 2, 7, 1, 0)],
    observerFloors: [
      {
        cells: [2, 3, 4, 5]
          .map((x) => [x, 0, 0])
          .concat([1, 2, 3, 4].map((x) => [x, 2, 0])),
        radius: 3,
      },
    ],
    lifts: [],
  }),
  make({
    id: "G4",
    chapter: "Zəmin / İstifadə sırası",
    difficulty: "ÇƏTİN",
    title: "Mərkəzi üçüncü dəfə işlətmə",
    focus: "İki girişlik qovşaq · açarın açdığı xarici dövrə",
    intro:
      "Mərkəzi qovşağın iki giriş haqqı var. Əvvəl sağ açarı götür: o, yuxarı xarici qapını açır. Xarici dövrə ilə ikinci açarı alıb qovşağa qayıt və alt çıxışa get. Yuxarı qolu ilk seçsən, qapı hələ bağlı olacaq və əlavə qayıdış son giriş haqqını xərcləyəcək.",
    starts: [[0, 2, 0]],
    goals: [[2, 4, 0]],
    tiles: [
      [0, 2, 0],
      [1, 2, 0],
      [2, 2, 0],
      [3, 2, 0],
      [4, 2, 0],
      [2, 1, 0],
      [2, 0, 0],
      [3, 0, 0],
      [4, 0, 0],
      [4, 1, 0],
      [2, 3, 0],
      [2, 4, 0],
    ],
    visitTiles: [{ at: [2, 2, 0], limit: 2 }],
    keys: [
      { id: "right", at: [4, 2, 0] },
      { id: "top", at: [2, 0, 0] },
    ],
    doors: [
      { at: [3, 0, 0], requires: { keys: ["right"] } },
      { at: [2, 4, 0], requires: { keys: ["right", "top"] } },
    ],
    lifts: [],
  }),
  make({
    id: "G5",
    chapter: "Zəmin / Uzaq müşayiət",
    difficulty: "ÇƏTİN",
    title: "Portalın o biri tərəfində dayaq hazırla",
    focus: "Sensor döşəməsi + müşahidə + portal + daimi enerji",
    intro:
      "A sol sensoru saxlasın ki, B aşağı qırıq yolu keçə bilsin. B sağ sahildə portalın çıxışına 3 xana yaxınlaşanda A P ilə uzaq ◎ adasına keçə bilər. A orada F şalterini açıb dayağı daimiləşdirsin. Bundan sonra B əvvəlki məqsədinə geri dönə bilir; A uzaq çıxışa gedir. Şalter açılmadan B-ni geri çəkmək A-nın dayağını söndürər.",
    starts: [
      [0, 0, 0],
      [0, 3, 0],
    ],
    goals: [
      [7, 0, 0],
      [0, 3, 0],
    ],
    tiles: [
      ...rect(0, 0, 2, 2, 0),
      [0, 3, 0],
      [1, 3, 0],
      [2, 3, 0],
      [2, 4, 0],
      [3, 4, 0],
      [4, 4, 0],
      [4, 3, 0],
      [5, 3, 0],
      [6, 3, 0],
      [7, 3, 0],
      ...rect(6, 0, 2, 2, 0),
    ],
    plates: [{ id: "start", at: [0, 0, 0], actor: 0 }],
    phaseFloors: [
      {
        cells: [[3, 4, 0]],
        requires: {
          anyOf: [{ plates: ["start"] }, { switches: ["solidify"] }],
        },
      },
    ],
    observerFloors: [
      {
        cells: rect(6, 0, 2, 2, 0),
        radius: 3,
        permanentRequires: { switches: ["solidify"] },
      },
    ],
    switches: [{ id: "solidify", at: [7, 1, 0], actor: 0 }],
    portals: [{ at: [1, 0, 0], to: [6, 0, 0], actor: 0 }],
    lifts: [],
  }),
  make({
    id: "G6",
    chapter: "Zəmin / Qarışıq ekspert",
    difficulty: "EKSPERT",
    title: "Üç ehtiyatın son təhvili",
    focus: "Giriş haqqı + iki relay + enerji + birtərəfli qayıdış",
    intro:
      "Sol körpü yalnız iki girişi saxlayır: hər blok bir dəfə keçəcək. D1-də bir token saxla, B-yə T ilə bir token ver. A orta sensoru tutanda B sağ enerji yolunu keçsin və uzaq sensoru təhvil alsın. B orada qalarkən A da sağa keçib F qayıdış icazəsini açsın. Sonra B P ilə sol çıxışa dönür; köhnə körpü artıq yoxdur. Final: A-da 1, B-də 1, D1-də 1 token.",
    starts: [
      [0, 0, 0],
      [1, 2, 0],
    ],
    goals: [
      [10, 0, 0],
      [0, 2, 0],
    ],
    energy: [3, 0],
    depots: [{ at: [4, 2, 0], withdrawActors: [0] }],
    tiles: [
      ...rect(0, 0, 3, 3, 0),
      [3, 1, 0],
      ...rect(4, 0, 2, 4, 0),
      [6, 1, 0],
      [7, 1, 0],
      ...rect(8, 0, 3, 3, 0),
    ],
    visitTiles: [{ at: [3, 1, 0], limit: 2 }],
    plates: [
      { id: "mid", at: [5, 0, 0], actor: 0 },
      { id: "far", at: [10, 1, 0], actor: 1 },
    ],
    phaseFloors: [
      {
        cells: [[7, 1, 0]],
        requires: {
          anyPlates: ["mid", "far"],
          deposits: [{ index: 0, min: 1 }],
          energy: [{ actor: 1, min: 1 }],
        },
      },
    ],
    switches: [{ id: "return", at: [9, 0, 0], actor: 0 }],
    portals: [
      {
        at: [8, 0, 0],
        to: [1, 2, 0],
        actor: 1,
        requires: { switches: ["return"] },
      },
    ],
    doors: [
      {
        at: [10, 0, 0],
        requires: {
          switches: ["return"],
          energy: [{ actor: 0, min: 1, max: 1 }],
        },
      },
      {
        at: [0, 2, 0],
        requires: {
          switches: ["return"],
          energy: [{ actor: 1, min: 1, max: 1 }],
        },
      },
    ],
    exitRequires: {
      energy: [
        { actor: 0, min: 1, max: 1 },
        { actor: 1, min: 1, max: 1 },
      ],
      deposits: [{ index: 0, min: 1, max: 1 }],
    },
    lifts: [],
  }),
];
towerLevels.push(...floorLevels);
towerLevels.push(...bridgeLevels);
arrangeCurriculum(towerLevels);
