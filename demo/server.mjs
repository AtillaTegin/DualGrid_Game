import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.dirname(fileURLToPath(import.meta.url));
const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".json": "application/json",
};
const server = http.createServer(async (req, res) => {
  try {
    const p = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (p === "/health") {
      res
        .writeHead(200, { "Content-Type": "application/json" })
      .end(JSON.stringify({ app: "dual-grid", version: "0.7.0" }));
      return;
    }
    if (p === "/favicon.ico") {
      res
        .writeHead(200, { "Content-Type": "image/svg+xml" })
        .end(await readFile(path.join(root, "favicon.svg")));
      return;
    }
    const file = path.resolve(root, "." + (p === "/" ? "/index.html" : p));
    if (!file.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    const data = await readFile(file);
    res.writeHead(200, {
      "Content-Type": mime[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    });
    res.end(data);
  } catch {
    res.writeHead(404).end("Not found");
  }
});
const port = Number(process.env.PORT || 4173);
server.listen(port, "127.0.0.1", () =>
  console.log(`Dual Grid: http://127.0.0.1:${port}`),
);
server.on("error", (e) => {
  console.error(e.message);
  process.exit(1);
});
