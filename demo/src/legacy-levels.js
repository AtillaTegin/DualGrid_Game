import { key } from "./logic.js";
const rect = (w, h) => Array.from({ length: h }, () => ".".repeat(w));
const islands = (w, h, areas) => {
  const rows = Array.from({ length: h }, () => Array(w).fill(" "));
  for (const [x, z, width, height] of areas)
    for (let j = z; j < z + height; j++)
      for (let i = x; i < x + width; i++) rows[j][i] = ".";
  return rows.map((row) => row.join(""));
};
const lane = (x, z, dx, dz, length, type, group = 0) =>
  Object.fromEntries(
    Array.from({ length }, (_, i) => [
      key(x + dx * i, z + dz * i),
      { type, group },
    ]),
  );
const threeIslands = () =>
  islands(13, 9, [
    [0, 0, 3, 9],
    [5, 0, 3, 9],
    [10, 0, 3, 9],
  ]);
const ringIslands = () =>
  islands(12, 11, [
    [0, 0, 4, 4],
    [8, 0, 4, 4],
    [8, 7, 4, 4],
    [0, 7, 4, 4],
  ]);
function level(id, title, subtitle, map, starts, goals, extra = {}) {
  return {
    id,
    title,
    subtitle,
    map,
    starts,
    goals,
    specials: {},
    plates: [],
    ...extra,
  };
}
export const legacyLevels = [
  level(
    1,
    "İlk rezonans",
    "Duruşunu dəyiş. Yolu anla.",
    rect(7, 5),
    [
      [1, 2],
      [5, 3],
    ],
    [
      [4, 2],
      [5, 3],
    ],
    {
      intro:
        "Hər blok 1×1×2 həcmindədir. Oxlar ilə onu çevir. Hər iki blok öz nişanında DİK dayanmalıdır.",
      hint: "A blokunu iki dəfə sağa çevir. Dik → uzanmış → dik.",
      par: 2,
    },
  ),
  level(
    2,
    "İki yaddaş",
    "Ayrı yollar. Ortaq məqsəd.",
    rect(7, 6),
    [
      [1, 1],
      [5, 4],
    ],
    [
      [5, 1],
      [1, 4],
    ],
    {
      intro:
        "TAB ilə blok dəyiş. A və B-nin kimliyi sabitdir; çıxışlarda uyğun işarəni tap.",
      hint: "Ən qısa düz xətt həmişə düzgün duruş vermir. Yan dövrə ilə orientasiyanı dəyiş.",
      par: 10,
    },
  ),
  level(
    3,
    "Saxlayan tərəf",
    "Bəzən ən doğru hərəkət dayanmaqdır.",
    ["...   ...", "...   ...", ".........", "...   ...", "...   ..."],
    [
      [1, 3],
      [2, 3],
    ],
    [
      [1, 1],
      [7, 2],
    ],
    {
      plates: [{ x: 1, z: 1, group: 0, heavy: false }],
      specials: Object.fromEntries(
        [3, 4, 5].map((x) => [key(x, 2), { type: "bridge", group: 0 }]),
      ),
      intro:
        "Dairəvi sensor üzərində qalan blok körpünü saxlayır. Körpü açılmadan boşluğa getmə.",
      hint: "A-nı öz çıxışı üzərindəki sensora gətir. Sonra B üçün körpü açıq qalacaq.",
      par: 19,
    },
  ),
  level(
    4,
    "Gücün ünvanı",
    "Kimlik qalır. Xüsusiyyət dəyişir.",
    rect(9, 7).map((row) => row.slice(0, 4) + " " + row.slice(5)),
    [
      [1, 4],
      [2, 2],
    ],
    [
      [7, 2],
      [2, 2],
    ],
    {
      pads: [
        [1, 2],
        [2, 2],
      ],
      specials: { [key(4, 3)]: { type: "light" } },
      intro:
        "Bənövşəyi cüt meydançalarda hər iki blok dik olsun. E ilə ağır və yüngül rolları dəyiş. Nazik keçid yalnız yüngül blok üçündür.",
      hint: "A-nı boş mübadilə meydançasına dik gətir. E bas. A artıq yüngüldür və nazik keçidi keçə bilər.",
      par: 14,
    },
  ),
  level(
    5,
    "Qarşılıqlı borc",
    "Kömək alan, yolu açan olur.",
    [
      "....  ....",
      "....  ....",
      "....  ....",
      "..........",
      "....  ....",
      "....  ....",
      "....  ....",
    ],
    [
      [2, 4],
      [1, 1],
    ],
    [
      [8, 3],
      [1, 4],
    ],
    {
      pads: [
        [1, 2],
        [2, 2],
      ],
      plates: [{ x: 1, z: 4, group: 0, heavy: true }],
      specials: {
        [key(4, 3)]: { type: "bridge", group: 0 },
        [key(5, 3)]: { type: "bridge", group: 0 },
        [key(6, 3)]: { type: "light" },
      },
      intro:
        "Ağır sensor həm AĞIR rol, həm DİK duruş istəyir. Rolları dəyişdir, sonra körpünü və yüngül keçidi birlikdə istifadə et.",
      hint: "Mübadilədən sonra B ağır sensor üzərində dik qalsın. A körpüdən və nazik keçiddən keçsin.",
      par: 21,
    },
  ),
  level(
    6,
    "Canlı sərhəd",
    "Dayanacağı sən yaradırsan.",
    [
      "           ",
      "      .... ",
      "      .... ",
      "...........",
      "...   .... ",
      "...   .... ",
      "...   .... ",
    ],
    [
      [7, 5],
      [1, 5],
    ],
    [
      [8, 3],
      [8, 1],
    ],
    {
      specials: Object.fromEntries(
        Array.from({ length: 9 }, (_, i) => [key(i + 2, 3), { type: "ice" }]),
      ),
      intro:
        "Yüngül blok tam buz üstündə olduqda duruşunu saxlayaraq sürüşür. Ağır blok onu itələnmədən dayandıra bilər.",
      hint: "Əvvəl A-nı öz çıxışına gətir. Sonra B-ni buz zolağına yönəlt. A canlı əyləc olacaq; B yuxarıdakı platformaya çıxa bilər.",
      par: 17,
    },
  ),
  level(
    7,
    "Soyuq aralıq",
    "Əyləc çıxış deyil. Onu vaxtında köçür.",
    islands(13, 10, [
      [0, 6, 4, 4],
      [8, 6, 5, 4],
      [11, 4, 1, 2],
      [8, 0, 5, 4],
    ]),
    [
      [10, 9],
      [1, 9],
    ],
    [
      [8, 1],
      [9, 2],
    ],
    {
      specials: {
        ...lane(0, 6, 1, 0, 3, "floor"),
        ...lane(3, 6, 1, 0, 10, "ice"),
      },
      intro:
        "A-nın çıxışı buzdan uzaqdadır. Əvvəl təhlükəsiz dayanacaq yarat, B daş səthə çıxandan sonra A-nı azad et.",
      hint: "A-nı buz zolağının sağ hissəsində saxla. B onun qabağında dayandıqdan sonra aşağıdakı daş sahəyə dönsün. Sonra hər iki blok dar boyundan yuxarı keçə bilər.",
      par: 22,
      difficulty: "ORTA+",
      lesson: "moving-brake",
    },
  ),
  level(
    8,
    "Etibarı ötür",
    "Körpünü saxlayan həmişə arxada qalmır.",
    islands(11, 7, [
      [0, 0, 4, 7],
      [7, 0, 4, 7],
    ]),
    [
      [1, 1],
      [2, 5],
    ],
    [
      [9, 5],
      [8, 1],
    ],
    {
      plates: [
        { x: 1, z: 5, group: 0, heavy: true },
        { x: 8, z: 1, group: 0, heavy: false },
      ],
      specials: lane(4, 3, 1, 0, 3, "bridge"),
      intro:
        "Eyni işarəli sensorlar eyni körpünü açır. B o biri tərəfdə nəzarəti qəbul etməlidir ki, A da yoluna davam edə bilsin.",
      hint: "A ağır sensoru saxlasın. B qarşı sahildəki dairəvi sensora dik çatsın; sonra A sol sahili tərk edə bilər.",
      par: 29,
      difficulty: "ORTA+",
      lesson: "handoff",
    },
  ),
  level(
    9,
    "İki donmuş xətt",
    "Bir əyləc. İki ayrı dayanacaq.",
    islands(15, 11, [
      [0, 6, 3, 5],
      [5, 0, 3, 11],
      [10, 0, 5, 5],
    ]),
    [
      [6, 9],
      [1, 9],
    ],
    [
      [11, 0],
      [13, 4],
    ],
    {
      specials: {
        ...lane(2, 8, 1, 0, 6, "ice"),
        ...lane(7, 2, 1, 0, 8, "ice"),
      },
      intro:
        "B-nin yolu iki buz keçidindən keçir. A əvvəl birinci zolaqda, sonra uzaq zolaqda onun dayanacağını yaratmalıdır.",
      hint: "A birinci buzun sonunda dayaq olsun. B orta adaya çıxandan sonra A yuxarı zolaqdan sağ adaya keçib ikinci əyləci qursun.",
      par: 31,
      difficulty: "ORTA+",
      lesson: "double-brake",
    },
  ),
  level(
    10,
    "Ağırlığın növbəsi",
    "Əvvəl körpü. Sonra görüş. Sonra yeni dayaq.",
    threeIslands(),
    [
      [1, 1],
      [1, 5],
    ],
    [
      [11, 1],
      [6, 7],
    ],
    {
      pads: [
        [5, 3],
        [6, 3],
      ],
      plates: [
        { x: 1, z: 7, group: 0, heavy: true },
        { x: 6, z: 1, group: 0 },
        { x: 6, z: 7, group: 1, heavy: true },
      ],
      specials: {
        ...lane(3, 3, 1, 0, 2, "bridge", 0),
        ...lane(8, 5, 1, 0, 2, "bridge", 1),
        [key(10, 5)]: { type: "light" },
      },
      intro:
        "Birinci körpünü A açır, ikincini B açmalıdır. Bunun üçün arada rolları dəyişmək və düzgün duruşda yenidən yer tutmaq lazımdır.",
      hint: "Əvvəl iki bloku orta adaya keçir. Mübadilədən sonra B öz çıxışındakı ağır sensoru saxlasın; A ikinci körpüdən yüngül keçsin.",
      par: 44,
      difficulty: "ÇƏTİN",
      lesson: "heavy-relay",
    },
  ),
  level(
    11,
    "Üç tərəfli dövrə",
    "Düyməni yox, nəzarəti təhvil ver.",
    ringIslands(),
    [
      [1, 1],
      [2, 2],
    ],
    [
      [1, 8],
      [2, 9],
    ],
    {
      plates: [
        { x: 1, z: 1, group: 0, heavy: true },
        { x: 9, z: 1, group: 0 },
        { x: 10, z: 2, group: 1, heavy: true },
        { x: 10, z: 9, group: 1 },
        { x: 9, z: 8, group: 2, heavy: true },
        { x: 1, z: 9, group: 2 },
      ],
      specials: {
        ...lane(4, 2, 1, 0, 4, "bridge", 0),
        ...lane(9, 4, 0, 1, 3, "bridge", 1),
        ...lane(4, 8, 1, 0, 4, "bridge", 2),
      },
      intro:
        "Üç müstəqil körpü ilə dolan. Hər adada əvvəl gələn blok digərinə təhlükəsiz keçid hazırlamalıdır.",
      hint: "Yuxarı sağ, aşağı sağ, sonra aşağı sol. Hər dəfə B növbəti dairəvi sensoru saxlasın ki, A əvvəlki ağır sensoru tərk edə bilsin.",
      par: 46,
      difficulty: "ÇƏTİN",
      lesson: "triple-handoff",
    },
  ),
  level(
    12,
    "İki yolun qiyməti",
    "Bir yol körpüdür. Digərinin sərhədi partnyorundur.",
    threeIslands(),
    [
      [1, 1],
      [1, 7],
    ],
    [
      [11, 1],
      [11, 7],
    ],
    {
      plates: [
        { x: 1, z: 7, group: 0, heavy: true },
        { x: 6, z: 7, group: 0 },
        { x: 6, z: 1, group: 1 },
      ],
      specials: {
        ...lane(3, 4, 1, 0, 2, "bridge", 0),
        ...lane(8, 6, 1, 0, 2, "bridge", 1),
        [key(8, 2)]: { type: "light" },
        ...lane(9, 2, 1, 0, 4, "ice"),
      },
      intro:
        "Son adaya iki yol var. Ağır blok üçün körpü, yüngül blok üçün buzlu keçid. Əmr sırası hər ikisinin taleyini dəyişir.",
      hint: "B orta adanın yuxarı sensorunu saxlasın. A aşağı körpüdən sağ adaya keçib buz zolağında əyləc hazırlasın. B sonra yuxarıdakı buzlu yoldan gələ bilər.",
      par: 46,
      difficulty: "ÇƏTİN",
      lesson: "split-route-brake",
    },
  ),
  level(
    13,
    "Gücün köçü",
    "Dövrənin ortasında rollar dəyişir.",
    ringIslands(),
    [
      [1, 1],
      [2, 2],
    ],
    [
      [1, 8],
      [9, 8],
    ],
    {
      pads: [
        [9, 1],
        [10, 1],
      ],
      plates: [
        { x: 1, z: 1, group: 0, heavy: true },
        { x: 9, z: 1, group: 0 },
        { x: 10, z: 2, group: 1, heavy: true },
        { x: 10, z: 9, group: 1 },
        { x: 9, z: 8, group: 2, heavy: true },
      ],
      specials: {
        ...lane(4, 2, 1, 0, 4, "bridge", 0),
        ...lane(9, 4, 0, 1, 3, "bridge", 1),
        ...lane(4, 8, 1, 0, 3, "bridge", 2),
        [key(7, 8)]: { type: "light" },
      },
      intro:
        "Yolun əvvəlini A açır, sonunu B açmalıdır. Erkən çıxış axtarma: əvvəl düzgün adada, düzgün rollarla birləş.",
      hint: "Yuxarı sağ adada rolları dəyiş. B ağır sensorları açacaq. Son körpüdə B öz çıxışını saxlayarkən A yüngül məhdudiyyətdən keçəcək.",
      par: 52,
      difficulty: "ÇƏTİN+",
      lesson: "ring-exchange",
    },
  ),
  level(
    14,
    "Gecikmiş görüş",
    "Görüşə çatmaq da tapmacanın bir hissəsidir.",
    threeIslands(),
    [
      [1, 1],
      [1, 7],
    ],
    [
      [11, 6],
      [6, 7],
    ],
    {
      pads: [
        [5, 1],
        [6, 1],
      ],
      plates: [
        { x: 1, z: 7, group: 0, heavy: true },
        { x: 6, z: 7, group: 0 },
      ],
      specials: {
        ...lane(3, 3, 1, 0, 2, "bridge"),
        ...lane(8, 2, 1, 0, 2, "light"),
      },
      intro:
        "Mübadilə meydançası başlanğıcda əlçatan deyil. Əvvəl körpünü ötür, sonra hər iki bloku orta adada dik görüşdür.",
      hint: "B orta adada körpünü saxlasın, A da keçsin. Mübadilədən sonra A yüngül yol ilə sağ adaya gedəcək.",
      par: 53,
      difficulty: "ÇƏTİN+",
      lesson: "handoff-exchange",
    },
  ),
  level(
    15,
    "İki eşik",
    "Bir keçid bitəndə növbəti məsuliyyət başlayır.",
    threeIslands(),
    [
      [1, 1],
      [1, 7],
    ],
    [
      [11, 7],
      [11, 1],
    ],
    {
      plates: [
        { x: 1, z: 7, group: 0, heavy: true },
        { x: 6, z: 1, group: 0 },
        { x: 6, z: 7, group: 1, heavy: true },
        { x: 11, z: 1, group: 1 },
      ],
      specials: {
        ...lane(3, 3, 1, 0, 2, "bridge", 0),
        ...lane(8, 5, 1, 0, 2, "bridge", 1),
      },
      intro:
        "İki körpünün idarəsi ayrıdır. Əvvəl orta adada birləş, sonra ikinci körpünü eyni qayda ilə təhvil ver.",
      hint: "B orta adanın yuxarı sensorunu saxlayanda A da keçsin. Sonra A aşağıdakı ağır sensoru saxlasın, B isə sağ adada nəzarəti qəbul etsin.",
      par: 55,
      difficulty: "ÇƏTİN+",
      lesson: "double-handoff",
    },
  ),
  level(
    16,
    "Observatoriyanın ürəyi",
    "Üç keçid. Son görüş. Bir ortaq həll.",
    islands(14, 12, [
      [0, 0, 5, 4],
      [9, 0, 5, 4],
      [9, 8, 5, 4],
      [0, 8, 5, 4],
    ]),
    [
      [1, 1],
      [3, 2],
    ],
    [
      [1, 10],
      [10, 9],
    ],
    {
      pads: [
        [12, 10],
        [12, 11],
      ],
      plates: [
        { x: 1, z: 1, group: 0, heavy: true },
        { x: 10, z: 1, group: 0 },
        { x: 12, z: 2, group: 1, heavy: true },
        { x: 12, z: 10, group: 1 },
        { x: 10, z: 9, group: 2, heavy: true },
      ],
      specials: {
        ...lane(5, 2, 1, 0, 4, "bridge", 0),
        ...lane(11, 4, 0, 1, 4, "bridge", 1),
        ...lane(5, 9, 1, 0, 3, "bridge", 2),
        [key(8, 9)]: { type: "light" },
      },
      intro:
        "Bütün səyahəti əvvəlcədən düşün. İlk iki körpüdə A ağır qalır. Son görüşdən sonra isə çıxışlara aparan güc B-yə ötürülür.",
      hint: "Hər iki blok aşağı sağ adaya çatana qədər rolları dəyişmək mümkün deyil. Orada cüt meydançalara dik gəl. B son ağır sensoru saxlasın, A sol adaya keçsin.",
      par: 57,
      difficulty: "USTA",
      lesson: "final-relay",
    },
  ),
];
// Special bridge/light tiles are actual cells even where the ASCII map has a gap.
for (const l of legacyLevels)
  for (const k of Object.keys(l.specials)) {
    const [x, z] = k.split(",").map(Number);
    const row = l.map[z].split("");
    row[x] = ".";
    l.map[z] = row.join("");
  }
