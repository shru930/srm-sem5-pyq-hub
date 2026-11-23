// Coverage check: every paper must have Q21a–Q25b (8 marks) and Q26, Q27 (15 marks) exactly once.
const fs = require("fs"), path = require("path");
const rd = f => fs.readFileSync(path.join(__dirname, f), "utf8");
const src = rd("gen.js") + rd("data1.js") + rd("data2.js").replace(/if \(typeof module[^\n]*\n?$/, "");
const d = new Function(src + "; return {PAPERS,TOPICS,MCQ,familyOf};")();
const want = ["21a", "21b", "22a", "22b", "23a", "23b", "24a", "24b", "25a", "25b", "26", "27"];
let total = 0, ok = true;
for (const p of d.PAPERS) {
  const got = d.TOPICS.flatMap(t => t.items.filter(i => i.p === p.k).map(i => ({ q: i.q, m: t.m })));
  total += got.length;
  const qs = got.map(g => g.q);
  const miss = want.filter(w => !qs.includes(w)), dup = qs.filter((q, i) => qs.indexOf(q) !== i);
  const bad = got.filter(g => (g.q === "26" || g.q === "27") !== (g.m === 15)).map(g => g.q);
  if (miss.length || dup.length || bad.length) ok = false;
  console.log(p.name.padEnd(14), got.length, "missing:", miss.join(",") || "none", "dup:", dup.join(",") || "none", "marks:", bad.join(",") || "ok");
}
console.log("cards", d.TOPICS.length, "questions", total, ok ? "ALL COVERED" : "PROBLEM");
console.log("no family:", d.TOPICS.filter(t => !d.familyOf(t)).map(t => t.t));
console.log("undefined in answers:", d.TOPICS.filter(t => !t.a || t.a.includes("undefined")).map(t => t.t));
for (const k in d.MCQ) if (d.MCQ[k].length !== 20) console.log("bad key", k);
const h = rd("index.html");
[...h.matchAll(/<script>([\s\S]*?)<\/script>/g)].forEach((m, i) => { try { new Function(m[1]); console.log("script", i, "parses"); } catch (e) { console.log("script", i, "ERROR", e.message); } });
