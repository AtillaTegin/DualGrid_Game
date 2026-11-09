// Mandatory objects are in the world, not instruction-only milestones.
const key = (id, x, z) => ({ id, kind: "key", at: [x, z] });
const point = (id, x, z) => ({ id, kind: "point", at: [x, z] });
export function fortress65() {
  return {
    map: [
      "         ",
      ".........",
      " .     ..",
      " .    ...",
      " .    ...",
      " ....... ",
    ],
    starts: [[1, 1]],
    goals: [{ x: 0, z: 1 }],
    fragile: [[4, 1]],
    collectAll: true,
    collectibles: [
      key("amber", 7, 1),
      point("north", 8, 1),
      point("east", 8, 3),
      point("south-east", 7, 4),
    ],
    levers: [{ id: "return", at: [6, 3], requires: { allKeys: true } }],
    doors: [
      {
        id: "return-route",
        at: [1, 2],
        slide: "side",
        requires: { levers: ["return"] },
      },
      {
        id: "exit",
        at: [0, 1],
        slide: "up",
        requires: { levers: ["return"], allPoints: true },
      },
    ],
    rule: "Qırılan körpünü keçib qızılı açarı götür. Uzaq şalterə yaxınlaşıb F bas: aşağı qayıdış yolu açılır. Bütün işıq xallarını yol boyu topla; onlar çıxış qapısını açır. Körpüdən geri dönmək olmur.",
    switches: undefined,
    needSwitches: undefined,
  };
}

export const retainedLegacyIds = [
  1, 2, 3, 4, 5, 23, 25, 27, 28, 29, 32, 35, 38, 39, 41, 43, 49, 53, 57,
];
export const optionalPracticeIds = [];
export const activeCampaignIds = [
  ...retainedLegacyIds,
  ...Array.from({ length: 9 }, (_, i) => 65 + i),
];
const groups = [
  [23, 24],
  [25, 26],
  [29, 30, 31],
  [32, 33, 34],
  [35, 36, 37],
  [38, 40, 47, 50],
  [39, 44, 45, 48],
  [41, 42, 46],
  [43, 52, 58, 59],
  [49, 51, 56],
  [53, 54, 55],
  [57, 60],
];
export function canonicalLegacyId(id) {
  if (retainedLegacyIds.includes(id)) return id;
  return groups.find((g) => g.includes(id))?.[0] || 23;
}
