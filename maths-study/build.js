// Builds index.html from ../shared/page.src.html (the page shared by all three sites) + gen.js + data.js
const fs = require("fs"), path = require("path");
const rd = f => fs.readFileSync(path.join(__dirname, f), "utf8");
const data = rd("gen.js") + "\n" + rd("data.js");
if (data.includes("</script")) throw new Error("data must not contain a closing script tag");
const page = rd("../shared/page.src.html").replace("__TITLE__", "Maths PYQ Hub").replace("/*__DATA__*/", () => data);
const i = page.indexOf("<header");
const full = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
  page.slice(0, i) + "</head>\n<body>\n" + page.slice(i) + "\n</body>\n</html>\n";
fs.writeFileSync(path.join(__dirname, "index.html"), full);
if (process.argv[2]) fs.writeFileSync(process.argv[2], page);
console.log("index.html", full.length, "bytes");
