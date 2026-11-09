import { curatedLevels } from "./curated-levels.js";
export const journeyLevels = curatedLevels;
export const journeyById = Object.fromEntries(
  journeyLevels.map((l) => [l.id, l]),
);
export const removedMods = [
  "M3.5",
  "M4",
  "M4.1",
  "M4.2",
  "M4.3",
  "M4.4",
  "M4.5",
];
export const refinements = {};
export const reviewDecisions = Object.fromEntries(
  removedMods.map((id) => [id, "drop"]),
);
