/*
  Render Markdown notes to styled HTML for clean PDF export.

  Usage:
    node tools/render-md-to-html.js notes/html-interview-prep-guide.md html/html-interview-prep-guide.html "HTML Interview Prep Guide"
*/

const fs = require('fs');
const path = require('path');

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function mdToHtml(md) {
  // Minimal markdown renderer (good enough for our notes):
  // - headings (#, ##)
  // - horizontal rules (---)
  // - bold (**)
  // - inline code (`code`)
  // - fenced code blocks (```lang)
  // - unordered lists (- )
  // - paragraphs

  const lines = md.replace(/\r\n/g, '\n').split('\n');
  let html = '';
  let inCode = false;
  let codeLang = '';
  let codeBuf = [];
  let inUl = false;

  function closeUl() {
    if (inUl) {
      html += '</ul>\n';
      inUl = false;
    }
  }

  function flushParagraph(par) {
    if (!par.trim()) return;
    closeUl();

    // Inline formatting
    let s = escapeHtml(par);
    // bold
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // inline code
    s = s.replace(/`([^`]+?)`/g, '<code>$1</code>');

    html += `<p>${s}</p>\n`;
  }

  let paragraphBuf = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // fenced code
    const fence = line.match(/^```(.*)\s*$/);
    if (fence) {
      if (!inCode) {
        // start
        closeUl();
        if (paragraphBuf.length) {
          flushParagraph(paragraphBuf.join(' '));
          paragraphBuf = [];
        }
        inCode = true;
        codeLang = (fence[1] || '').trim();
        codeBuf = [];
      } else {
        // end
        inCode = false;
        const code = escapeHtml(codeBuf.join('\n'));
        const langClass = codeLang ? ` class="language-${escapeHtml(codeLang)}"` : '';
        html += `<pre><code${langClass}>${code}</code></pre>\n`;
        codeLang = '';
        codeBuf = [];
      }
      continue;
    }

    if (inCode) {
      codeBuf.push(line);
      continue;
    }

    // horizontal rule
    if (/^---+$/.test(line.trim())) {
      if (paragraphBuf.length) {
        flushParagraph(paragraphBuf.join(' '));
        paragraphBuf = [];
      }
      closeUl();
      html += '<hr>\n';
      continue;
    }

    // headings
    const h1 = line.match(/^#\s+(.+)$/);
    if (h1) {
      if (paragraphBuf.length) {
        flushParagraph(paragraphBuf.join(' '));
        paragraphBuf = [];
      }
      closeUl();
      html += `<h1>${escapeHtml(h1[1].trim())}</h1>\n`;
      continue;
    }
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      if (paragraphBuf.length) {
        flushParagraph(paragraphBuf.join(' '));
        paragraphBuf = [];
      }
      closeUl();
      html += `<h2>${escapeHtml(h2[1].trim())}</h2>\n`;
      continue;
    }
    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      if (paragraphBuf.length) {
        flushParagraph(paragraphBuf.join(' '));
        paragraphBuf = [];
      }
      closeUl();
      html += `<h3>${escapeHtml(h3[1].trim())}</h3>\n`;
      continue;
    }

    // list item
    const li = line.match(/^\s*-\s+(.+)$/);
    if (li) {
      if (paragraphBuf.length) {
        flushParagraph(paragraphBuf.join(' '));
        paragraphBuf = [];
      }
      if (!inUl) {
        html += '<ul>\n';
        inUl = true;
      }
      let s = escapeHtml(li[1]);
      s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      s = s.replace(/`([^`]+?)`/g, '<code>$1</code>');
      html += `<li>${s}</li>\n`;
      continue;
    }

    // blank line ends paragraph
    if (!line.trim()) {
      if (paragraphBuf.length) {
        flushParagraph(paragraphBuf.join(' '));
        paragraphBuf = [];
      }
      continue;
    }

    // default: collect into paragraph
    paragraphBuf.push(line.trim());
  }

  if (paragraphBuf.length) flushParagraph(paragraphBuf.join(' '));
  closeUl();
  return html;
}

function buildHtmlDoc({ title, bodyHtml }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <style>
    :root {
      --text: #111827;
      --muted: #6b7280;
      --border: #e5e7eb;
      --codebg: #0b1020;
      --code: #e5e7eb;
      --accent: #2563eb;
    }

    @page { margin: 18mm; }

    html, body { padding: 0; margin: 0; }
    body {
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif;
      color: var(--text);
      line-height: 1.55;
      font-size: 12.2pt;
      background: white;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 24px;
    }

    h1 { font-size: 24pt; margin: 0 0 10px; }
    h2 { font-size: 16.5pt; margin: 22px 0 10px; border-bottom: 1px solid var(--border); padding-bottom: 6px; }
    h3 { font-size: 13.5pt; margin: 18px 0 8px; }

    p { margin: 10px 0; }
    ul { margin: 8px 0 12px 20px; }
    li { margin: 6px 0; }

    hr { border: none; border-top: 1px solid var(--border); margin: 18px 0; }

    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 0.95em;
      background: #f3f4f6;
      padding: 1px 6px;
      border-radius: 6px;
    }

    pre {
      background: var(--codebg);
      color: var(--code);
      padding: 14px 16px;
      border-radius: 10px;
      overflow: auto;
      margin: 12px 0;
      border: 1px solid rgba(255,255,255,0.08);
    }

    pre code { background: transparent; padding: 0; color: inherit; }

    a { color: var(--accent); text-decoration: none; }
    a:hover { text-decoration: underline; }

    .footer {
      margin-top: 28px;
      padding-top: 12px;
      border-top: 1px solid var(--border);
      color: var(--muted);
      font-size: 10.5pt;
    }

    /* Print niceties */
    pre, blockquote, ul, ol { break-inside: avoid; }
    h2, h3 { break-after: avoid; }
  </style>
</head>
<body>
  <div class="container">
    ${bodyHtml}
    <div class="footer">
      Generated from markdown for sharing (PDF-friendly).
    </div>
  </div>
</body>
</html>`;
}

function main() {
  const [inputPath, outputPath, title] = process.argv.slice(2);
  if (!inputPath || !outputPath) {
    console.error('Usage: node tools/render-md-to-html.js <input.md> <output.html> [title]');
    process.exit(1);
  }

  const md = fs.readFileSync(path.resolve(inputPath), 'utf8');
  const body = mdToHtml(md);
  const htmlDoc = buildHtmlDoc({ title: title || path.basename(inputPath), bodyHtml: body });
  fs.writeFileSync(path.resolve(outputPath), htmlDoc, 'utf8');
  console.log(`Wrote ${outputPath}`);
}

main();
