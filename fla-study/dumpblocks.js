const fs = require("fs"), path = require("path"), { splitBlocks } = require(path.join(__dirname, "blocks.js"));
const files = process.argv.slice(2);
const src = files.map(f => fs.readFileSync(f, "utf8")).join("\n").replace(/if \(typeof module[^\n]*/g, "");
const d = new Function(src + ";return {TOPICS,PAPERS}")();
d.TOPICS.forEach((t, i) => {

  console.log(`\n### ${i} U${t.u} ${t.m}m ${t.t}`);
  t.items.forEach(x => console.log(`  Q ${x.p}:${x.q} ${x.x.slice(0, 110)}`));
  splitBlocks(t.a).forEach((b, k) => { const tag = b.match(/^<(\w+)/); console.log(`  [${k}] ${tag ? tag[1] : "txt"} ${b.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 95)}`); });
});
