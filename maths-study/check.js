// Coverage check: every paper's long questions appear exactly once.
const fs = require("fs"), path = require("path");
const rd = f => fs.readFileSync(path.join(__dirname, f), "utf8");
const d = new Function(rd("gen.js") + rd("data.js").replace(/if \(typeof module[^\n]*\n?$/, "") + "; return {PAPERS,TOPICS,familyOf};")();
const std = ["21a","21b","22a","22b","23a","23b","24a","24b","25a","25b","26","27"], old = ["21","22","23","24","25","26","27","28"];
let total = 0, ok = true;
for (const p of d.PAPERS) {
  const want = p.k === "d23" ? old : std;
  const qs = d.TOPICS.flatMap(t => t.items.filter(i => i.p === p.k).map(i => i.q)); total += qs.length;
  const miss = want.filter(w => !qs.includes(w)), extra = qs.filter(q => !want.includes(q)), dup = qs.filter((q, i) => qs.indexOf(q) !== i);
  if (miss.length || extra.length || dup.length) ok = false;
  console.log(p.name.padEnd(14), qs.length, "missing:", miss.join(",") || "none", "extra:", extra.join(",") || "none", "dup:", dup.join(",") || "none");
}
console.log("cards", d.TOPICS.length, "questions", total, ok ? "ALL COVERED" : "PROBLEM");
console.log("no family:", d.TOPICS.filter(t => !d.familyOf(t)).map(t => t.t));
console.log("undefined in answers:", d.TOPICS.filter(t => !t.a || t.a.includes("undefined")).map(t => t.t));
