// Builds <site>/dive.html: a site restyled as a pixel-art "deep dive" (sky at the top, deep sea below).
// Same page, data and behaviour as that site's index.html; only the fonts, colours and hero art change.
// Usage: node shared/build-dive.js [maths|fla] [share copy path]
const fs = require("fs"), path = require("path");
const SITES = {
  maths: { dir: "maths-study", files: ["gen.js", "data.js"], title: "Maths PYQ · The Exam Dive" },
  fla: { dir: "fla-study", files: ["gen.js", "data1.js", "data2.js"], title: "FLA PYQ · The Exam Dive" },
};
const S = SITES[process.argv[2] || "maths"];
if (!S) throw new Error("site must be one of " + Object.keys(SITES).join(", "));
const root = path.join(__dirname, "..");
const rd = f => fs.readFileSync(path.join(root, f), "utf8");
const data = S.files.map(f => rd(S.dir + "/" + f)).join("\n");
if (data.includes("</script")) throw new Error("data must not contain a closing script tag");

// pixel art -> box-shadow (one shadow per filled cell)
const art = (rows, px, colors) => rows.map((r, y) => [...r].map((c, x) => colors[c] ? `${x * px}px ${y * px}px 0 ${colors[c]}` : "").filter(Boolean)).flat().join(",");
const cloud = art([
  "......wwww..........",
  "....wwwwwwww...www..",
  "..wwwwwwwwwwwwwwwww.",
  ".wwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwww",
  "sssssssssssssssssss.",
], 7, { w: "#ffffff", s: "#cfe6f5" });
const cloud2 = art([
  "....wwww.....",
  "..wwwwwwww...",
  ".wwwwwwwwwww.",
  "wwwwwwwwwwwww",
  ".sssssssssss.",
], 6, { w: "#f4fbff", s: "#c8e1f2" });
const sun = art([
  "....yyyy....", "..yyyyyyyy..", ".yyyyyyyyyy.", ".yyyyyyyyyy.", "yyyyyyyyyyyy", "yyyyyyyyyyyy",
  "yyyyyyyyyyyy", "yyyyyyyyyyyy", ".yyyyyyyyyy.", ".yyyyyyyyyy.", "..yyyyyyyy..", "....yyyy....",
], 7, { y: "#ffe58a" });
const fish = art([
  "..ccc...c",
  ".ccccc.cc",
  "ccekccccc",
  ".ccccc.cc",
  "..ccc...c",
], 4, { c: "#16305a", e: "#16305a", k: "#16305a" });

const css = `
/* ---------- deep dive theme (overrides the shared page) ---------- */
:root:root:root{
  --bg:#0b1630; --surface:#0f1d3a; --sunk:#091327; --ink:#e8f1ff; --muted:#8aa1c6; --line:#1f3a62;
  --accent:#4fd8ff; --aura:#4fd8ff; --aura2:#ff6fae; --sun:#ffe58a; --good:#4fd8ff; --hot:#ff6fae; --pill:#4fd8ff; --pill-ink:#061024;
  --heat-hi:#ff6fae; --heat-mid:#4fd8ff; --heat-lo:#3d6295;
  --u1:#4fd8ff; --u2:#ff6fae; --u3:#ffd36b; --u4:#7ff0b0; --u5:#b79bff;
  --shadow:0 0 0 2px #050a14,0 0 0 4px #1f3a62,0 4px 0 4px #08111f;
  --glow:0 0 0 2px #050a14,0 0 0 4px var(--accent),0 0 22px -2px color-mix(in srgb,var(--accent) 55%,transparent);
  --display:"VT323","Courier New",monospace;
  --body:"IBM Plex Mono",ui-monospace,Consolas,monospace;
  --mono:"IBM Plex Mono",ui-monospace,Consolas,monospace;
  --pixel:"Press Start 2P","VT323",monospace;
  color-scheme:dark;
}
*,*::before,*::after{border-radius:0!important}
body{background:var(--bg) linear-gradient(180deg,#0b1630 0,#0a1428 900px,#060c1a 2400px,#03060e 100%);background-attachment:scroll;font:14.5px/1.7 var(--body)}
body::after{content:"";position:fixed;inset:0;pointer-events:none;z-index:50;
  background:repeating-linear-gradient(0deg,rgba(0,0,0,.13) 0 1px,transparent 1px 3px)}
h1,h2,h3{font-variation-settings:normal}
h2{font-family:var(--display);font-weight:400;letter-spacing:.06em;text-transform:uppercase}

/* sky */
header.top{position:relative;overflow:hidden;padding-block:26px 70px;
  background:linear-gradient(180deg,#5aaee3 0,#7cc2ec 34%,#a9dbf3 62%,#6f9cc4 80%,#24416e 92%,var(--bg) 100%)}
.sky{position:absolute;inset:0;pointer-events:none}
.sky i{position:absolute;width:7px;height:7px;background:transparent}
.sky .c1{top:30px;left:4%;box-shadow:${cloud}}
.sky .c2{top:118px;left:52%;box-shadow:${cloud2}}
.sky .c3{top:190px;left:-30px;box-shadow:${cloud2};opacity:.9}
.sky .c4{top:56px;right:calc(4% + 140px);box-shadow:${cloud};transform:scale(.7)}
.sky .sun{top:150px;right:8%;width:7px;height:7px;box-shadow:${sun};filter:drop-shadow(0 0 22px rgba(255,229,138,.85));opacity:.92}
.sky .f1{width:4px;height:4px;bottom:26px;left:18%;box-shadow:${fish};opacity:.7}
.sky .f2{width:4px;height:4px;bottom:44px;right:26%;box-shadow:${fish};opacity:.5;transform:scaleX(-1)}
.hero{background:transparent;border:0;padding:8px 4px;overflow:visible}
.hero::before{display:none}
.wish{font:400 clamp(20px,3.6vw,28px)/1 var(--display);letter-spacing:.55em;color:#2a8fc4;text-transform:uppercase;margin:16px 0 6px;text-shadow:2px 2px 0 rgba(255,255,255,.55)}
.wish b{display:none}
.eyebrow{font:400 19px/1.1 var(--display);letter-spacing:.18em;color:#24497c}
h1{font:400 clamp(22px,5.2vw,44px)/1.25 var(--pixel);letter-spacing:.02em;margin-top:14px;color:#ff6fae;
  text-shadow:3px 0 0 #4fd8ff,-3px 0 0 #ffffff,0 5px 0 rgba(9,20,44,.55)}
.lede{font:400 21px/1.25 var(--display);letter-spacing:.06em;color:#1f3d68;max-width:44ch;margin-top:16px}
.cheer{font:400 20px/1 var(--display);letter-spacing:.14em;text-transform:uppercase;background:#0d1830;color:var(--accent);padding:10px 16px;margin-top:18px;box-shadow:var(--glow)}
.themeb{display:none}
.ring{background:#0d1830;box-shadow:var(--glow);padding:12px;width:160px;height:160px}
.ring circle{stroke-linecap:butt}
.ring .bgc{stroke:#1f3a62}
.ring .fg{stroke:var(--accent)}
.ring b{font:400 46px/1 var(--display);color:#fff}
.ring span{font:400 16px/1 var(--display);letter-spacing:.1em;color:var(--muted);text-transform:uppercase}
@media (max-width:560px){.ring{width:128px;height:128px;padding:8px}.ring b{font-size:38px}.sky .sun{top:14px;right:-20px;transform:scale(.7)}.sky .c4{display:none}.cheer{display:block}}

/* tabs */
.bar{background:color-mix(in srgb,var(--bg) 94%,transparent);border-bottom:2px solid #050a14}
.tabs{gap:12px;padding-block:14px 16px;padding-inline:4px}
.tabs button{font:400 20px/1 var(--display);letter-spacing:.14em;text-transform:uppercase;background:#0d1830;border:0;color:var(--muted);padding:10px 15px;box-shadow:var(--shadow)}
.tabs button:hover{color:var(--ink);border:0}
.tabs button[aria-selected="true"]{background:#0d1830;color:var(--accent);box-shadow:var(--glow)}

/* panels */
.ut,.tcard,.qrow,.rank,.note,.plan,.hcard,.vrow,.ucard,figure.fsm,details.more,.filters select,.filters input[type=search],.seg,.chipx,a.vid,.pchips button,.utabs button{
  border:0!important;box-shadow:var(--shadow);background:#0d1830}
.cards,.rows{gap:16px}
.units{gap:14px}
.ut{padding:13px 12px}
.ut[aria-pressed="true"],.tcard:has(>button[aria-expanded="true"]),.qrow.open,.hcard:hover,.pchips button[aria-pressed="true"],.utabs button[aria-selected="true"]{box-shadow:0 0 0 2px #050a14,0 0 0 4px var(--u,var(--accent)),0 0 22px -2px color-mix(in srgb,var(--u,var(--accent)) 50%,transparent)}
.ut .k,.tcard .num,.ucard b,.vrow .vn{font-family:var(--display);font-weight:400;font-size:30px}
.ut .n{font-size:12.5px}
.ut .pb,.meter,.hbar{height:8px;background:#091327}
.tcard>button:hover,.qh:hover{background:#12234a}
.tcard h3,.th h3{font:400 23px/1.15 var(--display);letter-spacing:.04em}
.tcard .pm{font:400 28px/1 var(--display);background:#091327;color:var(--u)}
.tbody,.qa{background:#0a152c;border-color:#1f3a62}
.qrow{border-left:6px solid var(--u)!important}
.pill,.pc,.pri,.lab,figure.fsm figcaption{font-family:var(--display);font-weight:400;font-size:17px;letter-spacing:.08em;line-height:1;text-transform:uppercase}
.pill.rep{background:var(--hot);color:#140612;font-size:17px;box-shadow:0 0 0 2px #050a14}
.pc{border-color:#1f3a62;font-size:16px}
.pc.d{background:#1a1030;color:var(--hot)}
.tick{border:2px solid #3d6295}
.qrow.done .tick{background:var(--accent);border-color:var(--accent);color:#061024}
.chev{font:400 18px/1 var(--display);letter-spacing:.08em;text-transform:uppercase}
.doneb,a.watch{font:400 19px/1 var(--display);letter-spacing:.12em;text-transform:uppercase;background:var(--accent);color:#061024;box-shadow:0 0 0 2px #050a14,0 4px 0 2px #1c6f8c}
.doneb:active,a.watch:active{transform:translateY(3px);box-shadow:0 0 0 2px #050a14,0 1px 0 2px #1c6f8c}
.seg{padding:4px}
.seg button{font:400 18px/1 var(--display);letter-spacing:.08em;text-transform:uppercase}
.seg button[aria-pressed="true"]{background:var(--accent);color:#061024;box-shadow:none}
.linkb{font:400 18px/1 var(--display);letter-spacing:.06em}
.unit-h h2,.block>h2{font-size:34px}
.orh h3{font:400 28px/1 var(--display);letter-spacing:.06em;text-transform:uppercase}
.pchips button,.utabs button{font:400 18px/1 var(--display);letter-spacing:.08em;text-transform:uppercase;padding:10px 14px}
th{background:#091327}
th,td{border-color:#1f3a62}
.ans .f,.ans pre{background:#091327}
.hn{font:400 21px/1.15 var(--display);letter-spacing:.03em}
.rrow:hover{background:#12234a}
.rrow .nm{font:400 20px/1.15 var(--display);letter-spacing:.03em}
figure.fsm .nd{fill:#0d1830}
figure.fsm text.el{stroke:#0d1830}
a.vid b{font-family:var(--display);font-size:16px}
::selection{background:var(--hot);color:#140612}
.sndb{position:fixed;top:max(12px,env(safe-area-inset-top,0px));right:12px;z-index:60;width:46px;height:46px;cursor:pointer;border:0;
  background:#0d1830;color:var(--accent);font:400 22px/1 var(--display);box-shadow:var(--shadow);display:grid;place-items:center}
.sndb:hover{box-shadow:var(--glow)}
.sndb[aria-pressed="false"]{color:var(--muted)}
.sndb svg{width:24px;height:24px;shape-rendering:crispEdges}
`;

// Retro click sounds, synthesised with Web Audio (no files, works offline). Toggle with the speaker button.
const sound = `
<button class="sndb" id="sndb" aria-pressed="true" title="Sound on/off"></button>
<script>
(function(){
  var KEYS="dive-sound", on=true, ctx=null;
  try{ on=localStorage.getItem(KEYS)!=="off" }catch(e){}
  var b=document.getElementById("sndb");
  var icon=function(){ b.setAttribute("aria-pressed",on); b.setAttribute("aria-label",on?"Sound on":"Sound off");
    b.innerHTML='<svg viewBox="0 0 12 12" fill="currentColor"><rect x="1" y="4" width="2" height="4"/><rect x="3" y="3" width="1" height="6"/><rect x="4" y="2" width="1" height="8"/><rect x="5" y="1" width="1" height="10"/>'+
      (on?'<rect x="7" y="5" width="1" height="2"/><rect x="8" y="3" width="1" height="1"/><rect x="8" y="8" width="1" height="1"/><rect x="9" y="4" width="1" height="4"/><rect x="10" y="2" width="1" height="8"/>'
         :'<rect x="7" y="4" width="1" height="1"/><rect x="8" y="5" width="1" height="1"/><rect x="9" y="6" width="1" height="1"/><rect x="10" y="7" width="1" height="1"/><rect x="10" y="4" width="1" height="1"/><rect x="9" y="5" width="1" height="1"/><rect x="8" y="6" width="1" height="1"/><rect x="7" y="7" width="1" height="1"/>')+'</svg>' };
  icon();
  function ac(){ if(!ctx){ var C=window.AudioContext||window.webkitAudioContext; if(!C) return null; ctx=new C() } if(ctx.state==="suspended") ctx.resume(); return ctx }
  // one note: wave type, start/end frequency, length (s), volume, delay (s)
  function tone(type,f1,f2,len,vol,delay){
    var c=ac(); if(!c) return; var t=c.currentTime+(delay||0), o=c.createOscillator(), g=c.createGain();
    o.type=type; o.frequency.setValueAtTime(f1,t); if(f2!==f1) o.frequency.exponentialRampToValueAtTime(f2,t+len);
    g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(0.0001,t+len);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t+len+0.02);
  }
  var S={
    tab:function(){ tone("square",660,660,0.05,0.05); tone("square",990,990,0.06,0.04,0.05) },
    open:function(){ tone("sine",320,900,0.12,0.12); tone("sine",500,1300,0.09,0.06,0.07) },          // bubble going up
    close:function(){ tone("sine",900,300,0.12,0.10) },
    done:function(){ [523,659,784,1047].forEach(function(f,i){ tone("square",f,f,0.09,0.045,i*0.065) }) }, // coin arpeggio
    undo:function(){ tone("square",440,220,0.12,0.04) },
    blip:function(){ tone("square",880,880,0.035,0.035) },
    on:function(){ tone("square",523,523,0.06,0.05); tone("square",784,784,0.08,0.05,0.07) }
  };
  b.addEventListener("click",function(){ on=!on; try{ localStorage.setItem(KEYS,on?"on":"off") }catch(e){} icon(); if(on) S.on() });
  document.addEventListener("click",function(e){
    if(!on) return; var t=e.target.closest("button,a,summary,select,input[type=checkbox],[role=tab],.qh"); if(!t||t===b) return;
    if(t.matches(".tick,.doneb")){ var r=t.closest(".qrow"); setTimeout(function(){ (r&&r.classList.contains("done")?S.done:S.undo)() },0); return }
    if(t.matches("[role=tab],.pchips button,.utabs button,.seg button,.ut")) return S.tab();
    if(t.matches(".tcard>button,.qh,summary")){
      var box=t.closest(".tcard,.qrow,details");
      setTimeout(function(){ var now=box&&(box.matches("details")?box.open:(box.matches(".qrow")?box.classList.contains("open")||!!box.querySelector(".qa"):!!box.querySelector(".tbody"))); (now?S.open:S.close)() },0); return }
    S.blip();
  },true);
})();
</script>`;

let page = rd("shared/page.src.html")
  .replace("__TITLE__", S.title)
  .replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis[^>]*>/,
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&family=IBM+Plex+Mono:wght@400;600&display=swap">')
  .replace("</style>", () => css + "</style>")
  .replace('<header class="top">', '<header class="top"><div class="sky" aria-hidden="true"><i class="sun"></i><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i><i class="f1"></i><i class="f2"></i></div>')
  .replace('<div class="wish"><b>11 11</b>trust your intuition</div>', '<div class="wish">the exam dive</div>')
  .replace("/*__DATA__*/", () => data);
for (const k of ["VT323", 'class="sky"', "the exam dive", "deep dive theme"]) if (!page.includes(k)) throw new Error("missing " + k);
const i = page.indexOf("<header");
const full = '<!DOCTYPE html>\n<html lang="en" data-theme="dark">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="theme-color" content="#0b1630">\n' +
  page.slice(0, i) + "</head>\n<body>\n" + page.slice(i) + "\n" + sound + "\n</body>\n</html>\n";
const out = full.replace(/<meta name="[a-z]+:viewport-fit-sides"[^>]*>\s*/, "");
fs.writeFileSync(path.join(root, S.dir, "dive.html"), out);
if (process.argv[3]) fs.writeFileSync(process.argv[3], out);
console.log(S.dir + "/dive.html", out.length, "bytes");
