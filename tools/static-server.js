// Minimal static file server for local preview/PDF export.
// Usage: node tools/static-server.js 8099

const http = require('http');
const fs = require('fs');
const path = require('path');

const port = Number(process.argv[2] || 8099);
const root = path.resolve(__dirname, '..');

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

function safePath(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]).replace(/\0/g, '');
  const joined = path.join(root, clean);
  const resolved = path.resolve(joined);
  if (!resolved.startsWith(root)) return null;
  return resolved;
}

const server = http.createServer((req, res) => {
  const reqPath = req.url === '/' ? '/html/html-interview-prep-guide.html' : req.url;
  const filePath = safePath(reqPath);
  if (!filePath) {
    res.writeHead(400);
    res.end('Bad request');
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Static server running at http://127.0.0.1:${port}/ (root: ${root})`);
});
