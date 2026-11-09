import { campaignData } from "./campaign-data.js";
import { legacyLevels } from "./legacy-levels.js";
export const showcase = { ...legacyLevels[4], sceneDecor: true };
export const levels = campaignData;
export function featuresFor(l) {
  const f = ["basics"];
  if (l.id >= 3) f.push("undo");
  if (l.starts.length > 1) f.push("two");
  if (l.showRoles) f.push("weight");
  if (l.plates.length) f.push("sensor");
  if (l.plates.some((p) => p.heavy)) f.push("heavy");
  if (l.sizes.some((s) => s === 2)) f.push("roll");
  if (l.starts.length === 2 && l.sizes.every((s) => s === 2)) f.push("both");
  if (l.plates.some((p) => p.heavy) && l.sizes.some((s) => s === 2))
    f.push("upright");
  const types = new Set(Object.values(l.specials).map((t) => t.type));
  if (types.has("light")) f.push("light");
  if (l.pads) f.push("exchange");
  if (types.has("ice")) f.push("ice");
  if (new Set(l.plates.map((p) => p.group)).size > 1) f.push("circuits");
  return f;
}
const introduced = new Set();
for (const l of levels) {
  if (l.intro === "Öz nişanına çat. Addım-addım kömək istənilən anda açıqdır.")
    l.intro =
      l.starts.length === 1
        ? "A kubunu A hərfli çıxışa apar. Kömək üçün H düyməsini bas."
        : "Hər blok öz hərfli çıxışına çatmalıdır. TAB ilə seçim et; kömək üçün H bas.";
  l.features = featuresFor(l);
  l.introduces = l.features.filter((f) => !introduced.has(f));
  l.features.forEach((f) => introduced.add(f));
}
