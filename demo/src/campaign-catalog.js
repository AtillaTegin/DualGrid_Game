import { activeCampaignIds } from "./campaign-hardening.js";
import { towerLevels } from "./tower-levels.js";
export { towerLevels };
export const campaignTotal = activeCampaignIds.length + towerLevels.length;
const legacy = activeCampaignIds.filter((id) => id < 65),
  combinations = activeCampaignIds.filter((id) => id >= 65);
export const campaignCourse = [
  ...legacy
    .filter((id) => id <= 5)
    .map((id) => ({
      kind: "legacy",
      id: String(id),
      href: "index.html?level=" + id,
    })),
  ...towerLevels.map((l) => ({
    kind: "tower",
    id: l.id,
    href: "tower.html#" + l.id,
  })),
  ...legacy
    .filter((id) => id > 5)
    .map((id) => ({
      kind: "legacy",
      id: String(id),
      href: "index.html?level=" + id,
    })),
  ...combinations.map((id) => ({
    kind: "combination",
    id: String(id),
    href: "campaign.html#" + id,
  })),
];
export const campaignOrdinal = (kind, id) =>
  campaignCourse.findIndex((e) => e.kind === kind && e.id === String(id)) + 1;
export const towerOrdinal = (id) => campaignOrdinal("tower", id);
export function nextCampaignLevel(kind, id) {
  const pos = campaignOrdinal(kind, id);
  return pos > 0 ? campaignCourse[pos] || null : null;
}
export function rememberPage(href) {
  try {
    if (href) localStorage.setItem("dual-grid-last-page", href);
    else localStorage.removeItem("dual-grid-last-page");
  } catch {}
}
export function lastCampaignPage() {
  try {
    const href = localStorage.getItem("dual-grid-last-page");
    const allowed = [
      ...activeCampaignIds
        .filter((id) => id >= 65)
        .map((id) => "campaign.html#" + id),
      ...towerLevels.map((l) => "tower.html#" + l.id),
    ];
    return allowed.includes(href) ? href : null;
  } catch {
    return null;
  }
}
export function readTowerProgress() {
  try {
    return JSON.parse(localStorage.getItem("dual-grid-tower-v1")) || {};
  } catch {
    return {};
  }
}
export function completeTower(l, moves) {
  try {
    const all = readTowerProgress(),
      old = all[l.id];
    all[l.id] = {
      completed: true,
      version: l.version,
      best: Math.min(
        moves,
        old?.version === l.version ? old.best || Infinity : Infinity,
      ),
    };
    localStorage.setItem("dual-grid-tower-v1", JSON.stringify(all));
  } catch {}
}
