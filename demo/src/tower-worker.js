import { solveTower } from "./tower-engine.js";
self.onmessage = ({ data }) =>
  postMessage({ ...solveTower(data.level, data.state), request: data.request });
