export const directionInfo = {
  up: { arrow: "↗", name: "YUXARI", key: "↑ / W" },
  down: { arrow: "↙", name: "AŞAĞI", key: "↓ / S" },
  left: { arrow: "↖", name: "SOLA", key: "← / A" },
  right: { arrow: "↘", name: "SAĞA", key: "→ / D" },
};
export function describeAction(action) {
  if (action === "undo")
    return {
      title: "SON GEDİŞİ GERİ AL",
      detail: "Z düyməsi ilə əvvəlki vəziyyətə qayıt.",
      arrow: "↶",
      key: "Z",
    };
  if (action === "exchange")
    return {
      title: "ROLLARI DƏYİŞ",
      detail: "Hər iki blok meydançadadır. E düyməsini bas.",
      arrow: "⇄",
      key: "E",
    };
  const d = directionInfo[action.dir],
    name = action.block === 0 ? "A" : "B";
  return {
    title: `${name} BLOKU · ${d.name}`,
    detail: `${name} blokunu seç, ${d.key} düyməsini bir dəfə bas.`,
    arrow: d.arrow,
    key: d.key,
    block: action.block,
  };
}
export function interpretSearch(result) {
  if (result.path) return { status: "ok", path: result.path };
  return { status: result.limited ? "limit" : "no-route", path: null };
}
