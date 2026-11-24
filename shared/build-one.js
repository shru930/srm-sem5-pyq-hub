// Builds share/PYQ-Hub.html: ONE offline file holding all three subjects (Maths, FLA, CN) with a switcher on top.
// Each subject's built index.html is embedded and opened in a full-page frame when you pick it.
// Run `npm run build` first. Usage: node shared/build-one.js [output path]
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const SUBJ = [["maths", "🧮 Discrete Maths", "maths-study"], ["fla", "🤖 FLA", "fla-study"], ["cn", "🌐 CN", "cn-study"]];
const out = process.argv[2] || path.join(root, "share", "PYQ-Hub.html");
// Optional local-only extras per subject: share/papers/<subject>/qimg.json = pictures of hard questions cropped from the papers.
const withQimg = (k, html) => {
  const f = path.join(root, "share", "papers", k, "qimg.json");
  if (!fs.existsSync(f)) return html;
  const i = html.indexOf("<script");
  return html.slice(0, i) + "<script>var QIMG=" + fs.readFileSync(f, "utf8") + ";</script>\n" + html.slice(i);
};
const blobs = SUBJ.map(([k, , dir]) => '<script type="application/json" id="d-' + k + '">' +
  JSON.stringify(withQimg(k, fs.readFileSync(path.join(root, dir, "index.html"), "utf8"))).replace(/<\//g, "<\\/") + "</script>").join("\n");
// Full question papers (local only, never in the repo): share/papers/<subject>/<n> - <name>.pdf, embedded as base64.
const PAPERS = SUBJ.map(([k, n]) => {
  const d = path.join(root, "share", "papers", k);
  if (!fs.existsSync(d)) return null;
  const fsx = fs.readdirSync(d).filter(f => f.endsWith(".pdf")).sort((a, b) => parseInt(a) - parseInt(b));
  return fsx.length ? { k, n, list: fsx.map((f, i) => ({ id: "p-" + k + "-" + i, name: f.replace(/^\d+\s*-\s*/, "").replace(/\.pdf$/, ""), b64: fs.readFileSync(path.join(d, f)).toString("base64") })) } : null;
}).filter(Boolean);
const paperSelect = PAPERS.length ? '<select id="pp" aria-label="Open a full question paper"><option value="">📄 Full paper…</option>' +
  PAPERS.map(s => '<optgroup label="' + s.n + '">' + s.list.map(p => '<option value="' + p.id + '">' + p.name + '</option>').join("") + "</optgroup>").join("") + "</select>" : "";
const paperBlobs = PAPERS.flatMap(s => s.list.map(p => '<script type="text/plain" id="' + p.id + '">' + p.b64 + "</script>")).join("\n");
const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>SRM Sem 5 PYQ Hub</title>
<style>
html,body{margin:0;height:100%;background:#fdc9e8;font:600 14px/1 "Segoe UI",system-ui,sans-serif}
body{display:flex;flex-direction:column}
nav{display:flex;gap:6px;padding:8px max(10px,env(safe-area-inset-left,0px));background:#fff3fa;border-bottom:1px solid #f3b3d6;overflow-x:auto;flex:none}
nav b{color:#cc4a92;align-self:center;margin-right:6px;white-space:nowrap}
nav button{border:1px solid #f3b3d6;background:#fff;color:#6a1f50;border-radius:999px;padding:8px 14px;font:inherit;cursor:pointer;white-space:nowrap}
nav button[aria-pressed="true"]{background:#cc4a92;border-color:#cc4a92;color:#fff}
nav select{margin-left:auto;border:1px solid #f3b3d6;background:#fff;color:#6a1f50;border-radius:999px;padding:8px 12px;font:inherit;cursor:pointer}
main{flex:1;position:relative}
iframe{position:absolute;inset:0;width:100%;height:100%;border:0;display:none}
iframe.on{display:block}
</style></head><body>
<nav><b>PYQ Hub</b>${SUBJ.map(([k, n]) => `<button data-k="${k}">${n}</button>`).join("")}${paperSelect}</nav>
<main>${SUBJ.map(([k]) => `<iframe id="f-${k}" title="${k}"></iframe>`).join("")}</main>
${blobs}
${paperBlobs}
<script>
(function(){
  var s=document.getElementById("pp");if(!s)return;
  s.addEventListener("change",function(){
    var el=document.getElementById(s.value);s.value="";if(!el)return;
    var bin=atob(el.textContent),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
    window.open(URL.createObjectURL(new Blob([u],{type:"application/pdf"})),"_blank");
  });
})();
</script>
<script>
(function(){
  var KEY="pyq-hub-subject", cur;
  function show(k){
    var f=document.getElementById("f-"+k);
    if(!f.srcdoc) f.srcdoc=JSON.parse(document.getElementById("d-"+k).textContent);
    document.querySelectorAll("iframe").forEach(function(x){ x.classList.toggle("on",x===f) });
    document.querySelectorAll("nav button").forEach(function(b){ b.setAttribute("aria-pressed",b.dataset.k===k) });
    cur=k; try{ localStorage.setItem(KEY,k) }catch(e){}
  }
  document.querySelectorAll("nav button").forEach(function(b){ b.addEventListener("click",function(){ show(b.dataset.k) }) });
  var start="maths"; try{ start=localStorage.getItem(KEY)||start }catch(e){}
  show(document.getElementById("f-"+start)?start:"maths");
})();
</script>
</body></html>
`;
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log(out, html.length, "bytes");
