// Splits an answer's HTML into its top-level blocks (paragraphs, tables, lists). Shared by the page and the tools.
function splitBlocks(html) {
  const out = [], re = /<(\/?)([a-zA-Z0-9]+)([^>]*)>/g, VOID = /^(br|hr|img|input|col|wbr)$/i;
  let depth = 0, start = 0, m;
  while ((m = re.exec(html))) {
    if (VOID.test(m[2]) || /\/\s*$/.test(m[3])) continue;
    if (!m[1]) { if (depth === 0) { const pre = html.slice(start, m.index).trim(); if (pre) out.push(pre); start = m.index; } depth++; }
    else { depth--; if (depth === 0) { out.push(html.slice(start, re.lastIndex).trim()); start = re.lastIndex; } }
  }
  const tail = html.slice(start).trim(); if (tail) out.push(tail);
  return out;
}
if (typeof module !== "undefined") module.exports = { splitBlocks };
