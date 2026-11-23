// Builds index.html (open this file in a browser) from ../shared/page.src.html + data.js
const fs = require("fs"), path = require("path");
const src = fs.readFileSync(path.join(__dirname, "../shared/page.src.html"), "utf8");
const data = fs.readFileSync(path.join(__dirname, "data.js"), "utf8");
if (data.includes("</script")) throw new Error("data.js must not contain a closing script tag");
const page = src.replace("__TITLE__", "CN PYQ Hub").replace("/*__DATA__*/", () => data);
const i = page.indexOf("<header");
const full = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
  page.slice(0, i) + "</head>\n<body>\n" + page.slice(i) + "\n</body>\n</html>\n";
// index.html is the standalone site: drop the host-only viewport tag
fs.writeFileSync(path.join(__dirname, "index.html"), full.replace(/<meta name="[a-z]+:viewport-fit-sides"[^>]*>\s*/, ""));
if (process.argv[2]) fs.writeFileSync(process.argv[2], page);
console.log("index.html", full.length, "bytes");
