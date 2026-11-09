export const learningStages = [
  "ASAN",
  "ASAN+",
  "ORTAYA KEÇİD",
  "ORTA",
  "ORTA+",
  "ÇƏTİN",
  "EKSPERT",
];
const sequences = {
  V: ["V0", "V0b", "V1", "V2"],
  S: ["S1", "S1b", "S2", "S2b", "S3", "S4", "S5"],
  H: ["H1", "H3", "H4b", "H3b", "H5", "H2", "H4", "H6"],
  F: ["F1", "F1b", "F3b", "F3", "F2", "F4", "F5", "F6"],
  R: ["R1", "R1b", "R2", "R3", "R3b", "R4", "R5", "R6"],
  W: ["W1", "W1b", "W2", "W2b", "W3", "W4", "W5", "W6"],
  B: ["B1", "B1b", "B2", "B3b", "B3", "B4", "B5", "B6"],
  T: ["T1", "T1b", "T2", "T3", "T3b", "TC1", "T4", "TC2", "TC3", "T5", "T6"],
  G: ["G1", "G1b", "G2", "G3b", "G3", "G4", "G5", "G6"],
};
const stages = {
  V1: 2,
  V2: 3,
  S2: 1,
  S3: 3,
  S4: 3,
  S5: 4,
  H1: 0,
  H3: 0,
  H5: 2,
  H2: 5,
  H4: 5,
  H6: 6,
  F1: 0,
  F3: 1,
  F2: 3,
  F4: 5,
  F5: 5,
  F6: 6,
  R1: 0,
  R2: 1,
  R3: 3,
  R4: 5,
  R5: 5,
  R6: 6,
  W1: 0,
  W2: 1,
  W3: 3,
  W4: 3,
  W5: 5,
  W6: 6,
  B1: 0,
  B2: 1,
  B3: 3,
  B4: 1,
  B5: 4,
  B6: 5,
  T1: 0,
  T2: 1,
  T3: 1,
  T4: 3,
  T5: 3,
  T6: 5,
  G1: 0,
  G2: 3,
  G3: 2,
  G4: 5,
  G5: 5,
  G6: 6,
};
export function arrangeCurriculum(levels) {
  const rank = new Map(),
    experts = [];
  let next = 0;
  for (const list of Object.values(sequences))
    for (let i = 0; i < list.length; i++) {
      const id = list[i],
        l = levels.find((l) => l.id === id);
      if (!l) throw Error("Missing course level " + id);
      const old = l.learning || {},
        stage = Object.hasOwn(stages, id) ? stages[id] : old.stage;
      // Old data used 5 as expert in planning notes; final published scale has seven steps.
      l.learning = {
        requires: [],
        ...old,
        stage,
        teaches: old.teaches || l.focus || l.title,
        optional: stage === 6,
        relief: id === "B4" || id === "T5",
      };
      l.difficulty = learningStages[stage];
      if (stage === 6) experts.push(id);
      else rank.set(id, next++);
    }
  for (const id of experts) rank.set(id, next++);
  if (rank.size !== levels.length)
    throw Error("Every active level needs a course position");
  levels.sort((a, b) => rank.get(a.id) - rank.get(b.id));
}
