// Prints how every question will be laid out on the page (plain text view of fmtQ's HTML).
const fs = require("fs"), path = require("path");
const rd = f => fs.readFileSync(path.join(__dirname, f), "utf8");
const page = rd("page.src.html");
const a = page.indexOf("function fmtQ(x){"), b = page.indexOf("const P=Object.fromEntries", a);
const esc = s => s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const fmtQ = new Function("esc", page.slice(a, b) + "; return fmtQ;")(esc);
const src = rd("gen.js") + rd("data1.js") + rd("data2.js").replace(/if \(typeof module[^\n]*\n?$/, "");
const d = new Function(src + "; return {TOPICS};")();
const only = process.argv[2];
for (const t of d.TOPICS) for (const i of t.items) {
  if (only && !(i.p + " " + i.q).includes(only)) continue;
  const h = fmtQ(i.x).replace(/<tr>/g, "\n   | ").replace(/<\/t[hd]>/g, " | ").replace(/<br>/g, "\n   ").replace(/<[^>]+>/g, "").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&");
  console.log("## " + i.p + " " + i.q + "\n   " + h + "\n");
}
