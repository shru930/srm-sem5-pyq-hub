// Builds every site from shared/page.src.html + that site's data files.
// Each site gets index.html (opens in the pink theme, or the theme you last picked)
// and dive.html (always opens in the dive theme). Both pages can switch between pink, dive and sunset.
// Usage: node shared/build.js [cn|fla|maths]   (no argument = all three)
const fs = require("fs"), path = require("path");
const { skins } = require("./skins");
const SITES = {
  cn: { dir: "cn-study", files: ["data.js"], title: "CN PYQ Hub" },
  fla: { dir: "fla-study", files: ["gen.js", "data1.js", "data2.js"], title: "FLA PYQ Hub" },
  maths: { dir: "maths-study", files: ["gen.js", "figs.js", "data.js"], title: "Maths PYQ Hub" },
};
const root = path.join(__dirname, "..");
const rd = f => fs.readFileSync(path.join(root, f), "utf8");

function build(key) {
  const S = SITES[key]; if (!S) throw new Error("site must be one of " + Object.keys(SITES).join(", "));
  const data = S.files.map(f => rd(S.dir + "/" + f)).join("\n");
  if (data.includes("</script")) throw new Error("data must not contain a closing script tag");
  const page = skins(rd("shared/page.src.html").replace("__TITLE__", S.title).replace("/*__DATA__*/", () => data));
  const i = page.indexOf("<header");
  const doc = htmlAttrs => ('<!DOCTYPE html>\n<html lang="en"' + htmlAttrs + '>\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    page.slice(0, i) + "</head>\n<body>\n" + page.slice(i) + "\n</body>\n</html>\n").replace(/<meta name="[a-z]+:viewport-fit-sides"[^>]*>\s*/, "");
  const out = { "index.html": doc(""), "dive.html": doc(' data-skin-default="dive" data-skin-fixed') };
  for (const [f, html] of Object.entries(out)) { fs.writeFileSync(path.join(root, S.dir, f), html); console.log(S.dir + "/" + f, html.length, "bytes") }
}
module.exports = build;
if (require.main === module) (process.argv[2] ? [process.argv[2]] : Object.keys(SITES)).forEach(build);
