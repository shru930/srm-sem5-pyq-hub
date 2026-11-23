// Lists every question whose card's unit differs from the unit its question number implies (Q21→1 … Q25→5).
const fs = require("fs"), path = require("path");
const rd = f => fs.readFileSync(path.join(__dirname, f), "utf8");
const src = rd("gen.js") + rd("data1.js") + rd("data2.js").replace(/if \(typeof module[^\n]*\n?$/, "");
const d = new Function(src + "; return {PAPERS,TOPICS};")();
console.log("card keys:", Object.keys(d.TOPICS[0]).join(","), "| item keys:", Object.keys(d.TOPICS[0].items[0]).join(","));
const name = Object.fromEntries(d.PAPERS.map(p => [p.k, p.name]));
let n = 0;
for (const t of d.TOPICS) for (const i of t.items) {
  const num = parseInt(i.q), exp = num <= 25 ? num - 20 : null;
  if (exp === null) { console.log("PART C ", name[i.p].padEnd(14), "Q" + i.q.padEnd(4), "unit", t.u, "|", t.t, "|", (i.x || "").slice(0, 70)); continue; }
  if (t.u !== exp) { n++; console.log("MISMATCH", name[i.p].padEnd(14), "Q" + i.q.padEnd(4), "card unit", t.u, "paper unit", exp, "|", t.t, "|", (i.x || "").slice(0, 80)); }
}
console.log("8-mark mismatches:", n);
