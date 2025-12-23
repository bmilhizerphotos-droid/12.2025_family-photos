import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const dist = "./dist";

const server = createServer((req, res) => {
  let url = req.url;

  // Default to index.html for root
  if (url === "/") url = "/index.html";

  // Compute path inside dist
  const filePath = join(dist, url);

  // If the file exists, return it
  if (existsSync(filePath)) {
    try {
      const content = readFileSync(filePath);
      res.writeHead(200);
      res.end(content);
      return;
    } catch (err) {
      console.error("Error serving file:", err);
    }
  }

  // SPA fallback — serve index.html for all unknown paths
  try {
    const index = readFileSync(join(dist, "index.html"));
    res.writeHead(200);
    res.end(index);
  } catch (err) {
    res.writeHead(500);
    res.end("Server error");
  }
});

server.listen(8080, () => {
  console.log("Frontend running on port 8080");
});