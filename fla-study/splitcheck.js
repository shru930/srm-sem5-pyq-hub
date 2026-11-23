// Checks the per-question answer map (SPLIT): every key is a real question and every block number exists.
const fs = require("fs"), path = require("path"), { splitBlocks } = require(path.join(__dirname, "blocks.js"));
const src = ["gen.js", "data1.js", "data2.js"].map(f => fs.readFileSync(path.join(__dirname, f), "utf8")).join("\n").replace(/if \(typeof module[^\n]*/, "");
const d = new Function(src + ";return {TOPICS,SPLIT}")();
const keys = new Set();
d.TOPICS.forEach(t => {
  const n = splitBlocks(t.a).length;
  t.items.forEach(x => {
    const k = x.p + ":" + x.q; keys.add(k);
    const sp = d.SPLIT[k];
    if (!sp) { if (t.items.length > 1) console.log("whole topic answer (shared card):", k, "|", t.t.slice(0, 50)); return; }
    const mx = Math.max(...sp.split(/[,-]/).map(Number));
    if (mx >= n) console.log("OUT OF RANGE", k, mx, n);
  });
});
Object.keys(d.SPLIT).forEach(k => { if (!keys.has(k)) console.log("UNKNOWN KEY", k); });
console.log("mapped", Object.keys(d.SPLIT).length, "of", keys.size, "questions");
