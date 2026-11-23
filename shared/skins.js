// The three looks every site can switch between: pink (default), dive (pixel-art deep sea) and sunset (neon beach city).
// skins(page) adds the switch buttons, the hero art, the extra fonts, the click sounds and the CSS for each look.
// The dive and sunset CSS is written as plain CSS and then scoped with :root[data-skin="..."] so it only applies when chosen.

// pixel art -> box-shadow (one shadow per filled cell)
const art = (rows, px, colors) => rows.map((r, y) => [...r].map((c, x) => colors[c] ? `${x * px}px ${y * px}px 0 ${colors[c]}` : "").filter(Boolean)).flat().join(",");
const cloud = art(["......wwww..........", "....wwwwwwww...www..", "..wwwwwwwwwwwwwwwww.", ".wwwwwwwwwwwwwwwwwww", "wwwwwwwwwwwwwwwwwwww", "sssssssssssssssssss."], 7, { w: "#ffffff", s: "#cfe6f5" });
const cloud2 = art(["....wwww.....", "..wwwwwwww...", ".wwwwwwwwwww.", "wwwwwwwwwwwww", ".sssssssssss."], 6, { w: "#f4fbff", s: "#c8e1f2" });
const sun = art(["....yyyy....", "..yyyyyyyy..", ".yyyyyyyyyy.", ".yyyyyyyyyy.", "yyyyyyyyyyyy", "yyyyyyyyyyyy",
  "yyyyyyyyyyyy", "yyyyyyyyyyyy", ".yyyyyyyyyy.", ".yyyyyyyyyy.", "..yyyyyyyy..", "....yyyy...."], 7, { y: "#ffe58a" });
const fish = art(["..ccc...c", ".ccccc.cc", "ccekccccc", ".ccccc.cc", "..ccc...c"], 4, { c: "#16305a", e: "#16305a", k: "#16305a" });

// Scope every rule of a stylesheet to one skin. Handles @media blocks; ":root" becomes the skin's root selector.
function scope(css, skin) {
  const P = `:root[data-skin="${skin}"]`, ROOT = `:root:root:root[data-skin="${skin}"]`;
  const sel = s => splitTop(s).map(x => x.trim()).filter(Boolean).map(x =>
    x === ":root" ? ROOT : x.startsWith("html") ? P + x.slice(4) : P + " " + x).join(",");
  let out = "", i = 0;
  css = css.replace(/\/\*[\s\S]*?\*\//g, "");
  while (i < css.length) {
    const o = css.indexOf("{", i); if (o < 0) break;
    const head = css.slice(i, o).trim();
    if (head.startsWith("@media")) {
      let d = 1, j = o + 1; while (d) { if (css[j] === "{") d++; else if (css[j] === "}") d--; j++ }
      out += head + "{" + scope(css.slice(o + 1, j - 1), skin) + "}\n"; i = j;
    } else {
      const c = css.indexOf("}", o); out += sel(head) + "{" + css.slice(o + 1, c).trim() + "}\n"; i = c + 1;
    }
  }
  return out;
}
function splitTop(s) { const r = []; let d = 0, cur = ""; for (const ch of s) { if (ch === "(" || ch === "[") d++; if (ch === ")" || ch === "]") d--; if (ch === "," && !d) { r.push(cur); cur = "" } else cur += ch } r.push(cur); return r }

const base = `
.sky,.sunset,.sndb,.w-dive,.w-sun{display:none}
.skinp{display:inline-flex;gap:2px;margin:14px 0 0 0;padding:3px;border:1px solid var(--line);border-radius:999px;background:var(--surface);vertical-align:middle}
.skinp button{border:0;background:none;border-radius:999px;padding:5px 11px;font-size:13.5px;font-weight:600;cursor:pointer;color:var(--muted)}
.skinp button:hover{color:var(--ink)}
.skinp button[aria-pressed="true"]{background:var(--pill);color:var(--pill-ink)}
@keyframes sway{0%,100%{rotate:-2.5deg}50%{rotate:2deg}}
@keyframes floor{to{background-position:0 40px}}
@keyframes twinkle{0%,100%{opacity:.85}50%{opacity:.25}}
@keyframes sunpulse{0%,100%{filter:drop-shadow(0 0 30px rgba(255,120,80,.55))}50%{filter:drop-shadow(0 0 60px rgba(255,62,165,.8))}}
@keyframes flicker{0%,92%,100%{opacity:1}93%{opacity:.4}95%{opacity:1}97%{opacity:.6}}
@keyframes drift{from{translate:-40px 0}to{translate:40px 0}}
@keyframes swim{0%{translate:0 0}50%{translate:60px -6px}100%{translate:0 0}}
@keyframes bubble{0%{translate:0 0;opacity:0}15%{opacity:.8}100%{translate:8px -160px;opacity:0}}
@keyframes rise{from{opacity:0;translate:0 14px}to{opacity:1;translate:0 0}}
::view-transition-old(root),::view-transition-new(root){animation-duration:.45s}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
`;

const dive = `
:root{
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
body::after{content:"";position:fixed;inset:0;pointer-events:none;z-index:50;background:repeating-linear-gradient(0deg,rgba(0,0,0,.13) 0 1px,transparent 1px 3px)}
h1,h2,h3{font-variation-settings:normal}
h2{font-family:var(--display);font-weight:400;letter-spacing:.06em;text-transform:uppercase}
header.top{position:relative;overflow:hidden;padding-block:26px 70px;background:linear-gradient(180deg,#5aaee3 0,#7cc2ec 34%,#a9dbf3 62%,#6f9cc4 80%,#24416e 92%,var(--bg) 100%)}
.sky{display:block;position:absolute;inset:0;pointer-events:none}
.sky i{position:absolute;width:7px;height:7px;background:transparent}
.sky .c1{top:30px;left:4%;box-shadow:${cloud}}
.sky .c2{top:118px;left:52%;box-shadow:${cloud2}}
.sky .c3{top:190px;left:-30px;box-shadow:${cloud2};opacity:.9}
.sky .c4{top:56px;right:calc(4% + 140px);box-shadow:${cloud};transform:scale(.7)}
.sky .sun{top:150px;right:8%;width:7px;height:7px;box-shadow:${sun};filter:drop-shadow(0 0 22px rgba(255,229,138,.85));opacity:.92}
.sky .f1{width:4px;height:4px;bottom:26px;left:18%;box-shadow:${fish};opacity:.7}
.sky .f2{width:4px;height:4px;bottom:44px;right:26%;box-shadow:${fish};opacity:.5;transform:scaleX(-1)}
.sky .c1,.sky .c3{animation:drift 14s ease-in-out infinite alternate}
.sky .c2,.sky .c4{animation:drift 19s ease-in-out infinite alternate-reverse}
.sky .f1{animation:swim 9s ease-in-out infinite}
.sky .f2{animation:swim 12s ease-in-out infinite reverse}
.sky .b1,.sky .b2,.sky .b3{width:6px;height:6px;bottom:0;border:2px solid rgba(190,240,255,.7);animation:bubble 5s linear infinite}
.sky .b1{left:30%}.sky .b2{left:62%;animation-delay:1.8s;animation-duration:6.5s}.sky .b3{left:84%;animation-delay:3.2s;width:4px;height:4px}
.hero>div>*{animation:rise .6s both}.hero>div>:nth-child(2){animation-delay:.06s}.hero>div>:nth-child(3){animation-delay:.12s}.hero>div>:nth-child(4){animation-delay:.18s}
.hero{background:transparent;border:0;padding:8px 4px;overflow:visible}
.hero::before{display:none}
.wish{font:400 clamp(20px,3.6vw,28px)/1 var(--display);letter-spacing:.55em;color:#2a8fc4;text-transform:uppercase;margin:16px 0 6px;text-shadow:2px 2px 0 rgba(255,255,255,.55)}
.wish b,.w-pink{display:none}
.w-dive{display:inline}
.eyebrow{font:400 19px/1.1 var(--display);letter-spacing:.18em;color:#24497c}
h1{font:400 clamp(22px,5.2vw,44px)/1.25 var(--pixel);letter-spacing:.02em;margin-top:14px;color:#ff6fae;text-shadow:3px 0 0 #4fd8ff,-3px 0 0 #ffffff,0 5px 0 rgba(9,20,44,.55)}
.lede{font:400 21px/1.25 var(--display);letter-spacing:.06em;color:#1f3d68;max-width:44ch;margin-top:16px}
.cheer{font:400 20px/1 var(--display);letter-spacing:.14em;text-transform:uppercase;background:#0d1830;color:var(--accent);padding:10px 16px;margin-top:18px;box-shadow:var(--glow)}
.themeb{display:none}
.skinp{background:#0d1830;border:0;box-shadow:var(--shadow);padding:4px;margin-top:18px}
.skinp button{font:400 18px/1 var(--display);letter-spacing:.08em;text-transform:uppercase;padding:8px 12px}
.skinp button[aria-pressed="true"]{background:var(--accent);color:#061024}
.ring{background:#0d1830;box-shadow:var(--glow);padding:12px;width:160px;height:160px}
.ring circle{stroke-linecap:butt}
.ring .bgc{stroke:#1f3a62}
.ring .fg{stroke:var(--accent)}
.ring b{font:400 46px/1 var(--display);color:#fff}
.ring span{font:400 16px/1 var(--display);letter-spacing:.1em;color:var(--muted);text-transform:uppercase}
@media (max-width:560px){.ring{width:128px;height:128px;padding:8px}.ring b{font-size:38px}.sky .sun{top:14px;right:-20px;transform:scale(.7)}.sky .c4{display:none}.cheer{display:block}}
.bar{background:color-mix(in srgb,var(--bg) 94%,transparent);border-bottom:2px solid #050a14}
.tabs{gap:12px;padding-block:14px 16px;padding-inline:4px}
.tabs button{font:400 20px/1 var(--display);letter-spacing:.14em;text-transform:uppercase;background:#0d1830;border:0;color:var(--muted);padding:10px 15px;box-shadow:var(--shadow)}
.tabs button:hover{color:var(--ink);border:0}
.tabs button[aria-selected="true"]{background:#0d1830;color:var(--accent);box-shadow:var(--glow)}
.ut,.tcard,.qrow,.rank,.note,.plan,.hcard,.vrow,.ucard,figure.fsm,details.more,.filters select,.filters input[type=search],.seg,.chipx,a.vid,.pchips button,.utabs button{border:0!important;box-shadow:var(--shadow);background:#0d1830}
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
.sndb{position:fixed;top:max(12px,env(safe-area-inset-top,0px));right:12px;z-index:60;width:46px;height:46px;cursor:pointer;border:0;background:#0d1830;color:var(--accent);box-shadow:var(--shadow);display:grid;place-items:center}
.sndb:hover{box-shadow:var(--glow)}
.sndb[aria-pressed="false"]{color:var(--muted)}
.sndb svg{width:24px;height:24px;shape-rendering:crispEdges}
`;

// Sunset: neon beach-city look (purple night sky, striped sun, palms, skyline, pink and orange neon).
const sunset = `
:root{
  --bg:#14061f; --surface:#21103a; --sunk:#190a2c; --ink:#fff1f8; --muted:#c9a3d6; --line:#45225d;
  --accent:#ff3ea5; --aura:#ff3ea5; --aura2:#ff9a3c; --sun:#ffd166; --good:#19e3c8; --hot:#ff9a3c; --pill:#ff3ea5; --pill-ink:#1a0518;
  --heat-hi:#ff3ea5; --heat-mid:#ff9a3c; --heat-lo:#6b3a8a;
  --u1:#ff3ea5; --u2:#ff9a3c; --u3:#ffd166; --u4:#19e3c8; --u5:#b46cff;
  --shadow:0 0 0 1px #45225d,0 14px 30px -18px rgba(255,62,165,.6);
  --glow:0 0 0 1.5px var(--accent),0 0 24px -4px color-mix(in srgb,var(--accent) 70%,transparent);
  --neon:linear-gradient(90deg,#ff3ea5,#ff9a3c);
  --display:"Anton",Impact,"Arial Narrow",sans-serif;
  color-scheme:dark;
}
body{background:var(--bg) linear-gradient(180deg,#1c0832 0,#14061f 1100px);background-attachment:scroll}
body::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:-1;background:radial-gradient(600px 400px at 10% 90%,rgba(255,62,165,.12),transparent 70%),radial-gradient(500px 400px at 95% 40%,rgba(255,154,60,.08),transparent 70%)}
h1,h2{font-variation-settings:normal}
h2{font-family:var(--display);font-weight:400;letter-spacing:.03em;text-transform:uppercase}
header.top{position:relative;overflow:hidden;padding-block:26px 96px;
  background:linear-gradient(180deg,#1d0638 0,#3c0d5e 20%,#7c1a78 40%,#d42a7c 58%,#ff6a3d 70%,#ffb04a 76%,#3a0e5a 76.2%,#1d0836 90%,var(--bg) 100%)}
.sunset{display:block;position:absolute;inset:0;pointer-events:none}
.sunset .sun{position:absolute;right:7%;bottom:24%;width:230px;height:230px;border-radius:50%;
  background:linear-gradient(180deg,#fff0a0 0,#ffd166 30%,#ff8a3d 62%,#ff3ea5 100%);
  -webkit-mask-image:linear-gradient(180deg,#000 0 52%,transparent 52% 56%,#000 56% 64%,transparent 64% 69%,#000 69% 76%,transparent 76% 82%,#000 82% 88%,transparent 88% 95%,#000 95%);
  mask-image:linear-gradient(180deg,#000 0 52%,transparent 52% 56%,#000 56% 64%,transparent 64% 69%,#000 69% 76%,transparent 76% 82%,#000 82% 88%,transparent 88% 95%,#000 95%)}
.sunset .city{position:absolute;left:0;right:0;bottom:24%;height:64px;width:100%;color:#2a0a44}
.sunset .sea{position:absolute;left:0;right:0;bottom:0;height:24%;background:linear-gradient(180deg,#43105f,#1d0836 70%,var(--bg))}
.sunset .palm{position:absolute;bottom:14%;height:250px;width:150px;color:#12041c;filter:drop-shadow(0 0 1px #000)}
.sunset .p1{left:-34px}
.sunset .p2{right:-30px;transform:scaleX(-1);height:200px;bottom:18%}
.sunset .palm{transform-origin:55% 100%;animation:sway 6s ease-in-out infinite}
.sunset .p2{animation-duration:7.5s;animation-delay:-2s}
.sunset .sun{animation:sunpulse 5s ease-in-out infinite}
.sunset .star{animation:twinkle 3s ease-in-out infinite}
.sunset .sea::after{content:"";position:absolute;left:-50%;right:-50%;top:0;bottom:-40%;transform-origin:50% 0;transform:perspective(160px) rotateX(58deg);
  background:repeating-linear-gradient(90deg,rgba(255,62,165,.55) 0 2px,transparent 2px 60px),repeating-linear-gradient(180deg,rgba(255,154,60,.45) 0 2px,transparent 2px 40px);
  animation:floor 1.6s linear infinite;-webkit-mask-image:linear-gradient(180deg,transparent,#000 30%);mask-image:linear-gradient(180deg,transparent,#000 30%)}
.sunset .sea{overflow:hidden}
.wish{animation:flicker 6s infinite}
.hero>div>*{animation:rise .6s both}.hero>div>:nth-child(2){animation-delay:.06s}.hero>div>:nth-child(3){animation-delay:.12s}.hero>div>:nth-child(4){animation-delay:.18s}
.tcard,.qrow,.ut{transition:box-shadow .2s,transform .2s}
.ut:hover,.tcard:hover{transform:translateY(-2px)}
.sunset .star{position:absolute;width:2px;height:2px;background:#fff;border-radius:50%;box-shadow:120px 30px 0 #fff,260px 70px 0 #ffd9f0,420px 18px 0 #fff,560px 52px 0 #ffd9f0,700px 26px 0 #fff,820px 64px 0 #fff,980px 34px 0 #ffd9f0,40px 90px 0 #fff;top:14px;left:10px;opacity:.8}
.hero{background:transparent;border:0;padding:8px 4px;overflow:visible}
.hero::before{display:none}
.wish{font:400 clamp(24px,4vw,34px)/1.1 "Pacifico",cursive;color:#ffd166;margin:6px 0 10px;text-shadow:0 0 14px rgba(255,62,165,.9),2px 2px 0 #7c1a78}
.wish b,.w-pink{display:none}
.w-sun{display:inline}
.eyebrow{color:#ffe3f1;letter-spacing:.2em}
h1{font:400 clamp(38px,8vw,72px)/.95 var(--display);text-transform:uppercase;letter-spacing:.01em;margin-top:10px;
  background:linear-gradient(180deg,#fff3b0 0,#ffd166 35%,#ff8a3d 65%,#ff3ea5 100%);-webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(3px 4px 0 #3c0d5e) drop-shadow(0 0 18px rgba(255,62,165,.55))}
h1 i{color:inherit}
.lede{color:#ffe3f1;text-shadow:0 1px 8px rgba(29,6,56,.8);font-weight:500}
.cheer{background:rgba(20,6,31,.72);color:#ffd166;border:1.5px solid #ff3ea5;box-shadow:var(--glow);font-family:var(--display);font-weight:400;letter-spacing:.08em;text-transform:uppercase;font-size:16px}
.themeb{display:none}
.skinp{background:rgba(20,6,31,.72);border-color:#ff3ea5;box-shadow:var(--glow)}
.skinp button{color:#f3c9e4;font-family:var(--display);font-weight:400;letter-spacing:.06em;text-transform:uppercase;font-size:15px}
.skinp button[aria-pressed="true"]{background:var(--neon);color:#1a0518}
.ring{background:rgba(20,6,31,.6);border-radius:50%;padding:12px;box-shadow:var(--glow);backdrop-filter:blur(4px)}
.ring .bgc{stroke:rgba(255,255,255,.14)}
.ring .fg{stroke:#ffd166}
.ring b{font:400 44px/1 var(--display);color:#fff}
.ring span{color:#f3c9e4}
@media (max-width:560px){.sunset .sun{width:150px;height:150px;right:-30px}.sunset .palm{height:170px;width:100px}.sunset .p2{display:none}}
.bar{background:color-mix(in srgb,var(--bg) 90%,transparent);border-bottom:1px solid #45225d}
.tabs button{font:400 17px/1 var(--display);letter-spacing:.06em;text-transform:uppercase;transform:skewX(-8deg);border-radius:8px;background:var(--surface);border:1px solid #45225d;color:#e9c4df}
.tabs button:hover{color:#fff;border-color:#ff3ea5}
.tabs button[aria-selected="true"]{background:var(--neon);color:#1a0518;border-color:transparent;box-shadow:0 0 22px -4px rgba(255,62,165,.8)}
.ut,.tcard,.qrow,.rank,.note,.plan,.hcard,.vrow,.ucard,figure.fsm,details.more{background:var(--surface);border-color:#45225d}
.ut[aria-pressed="true"],.tcard:has(>button[aria-expanded="true"]),.qrow.open,.hcard:hover{box-shadow:0 0 0 1.5px var(--u,var(--accent)),0 0 26px -6px var(--u,var(--accent))}
.ut .k,.tcard .num,.ucard b,.vrow .vn{font-family:var(--display);font-weight:400}
.tcard .pm{font-family:var(--display);font-weight:400}
.tbody,.qa{background:#1a0b2e;border-color:#45225d}
.pill.rep{background:var(--neon);color:#1a0518}
.doneb,a.watch{background:var(--neon);color:#1a0518;font-family:var(--display);font-weight:400;letter-spacing:.06em;text-transform:uppercase}
.seg button[aria-pressed="true"],.pchips button[aria-pressed="true"],.utabs button[aria-selected="true"]{background:var(--neon);color:#1a0518}
.unit-h h2,.block>h2{background:var(--neon);-webkit-background-clip:text;background-clip:text;color:transparent}
.ans .f,.ans pre{background:#190a2c}
th{background:#190a2c}
figure.fsm .nd{fill:#21103a}
figure.fsm text.el{stroke:#21103a}
::selection{background:#ff3ea5;color:#1a0518}
.sndb{position:fixed;top:max(12px,env(safe-area-inset-top,0px));right:12px;z-index:60;width:46px;height:46px;cursor:pointer;border:1.5px solid #ff3ea5;border-radius:50%;background:rgba(20,6,31,.85);color:#ffd166;box-shadow:var(--glow);display:grid;place-items:center}
.sndb[aria-pressed="false"]{color:var(--muted);border-color:#45225d}
.sndb svg{width:22px;height:22px;shape-rendering:crispEdges}
`;

const palm = '<svg class="palm PCLS" viewBox="0 0 150 250" fill="currentColor"><path d="M80 250 C74 200 70 150 84 98" stroke="currentColor" stroke-width="9" fill="none" stroke-linecap="round"/>' +
  '<path d="M84 98 C60 74 30 70 4 88 C30 78 56 82 84 104Z"/><path d="M84 98 C68 62 40 44 12 44 C40 54 62 74 82 106Z"/><path d="M84 98 C88 60 108 34 136 26 C114 44 98 68 88 104Z"/>' +
  '<path d="M84 98 C112 78 136 80 150 100 C130 90 108 92 86 106Z"/><path d="M84 98 C82 66 90 38 78 10 C96 38 96 70 90 104Z"/></svg>';
const city = '<svg class="city" viewBox="0 0 400 64" preserveAspectRatio="none" fill="currentColor"><path d="M0 64V44h14V30h10v14h8V20h12v24h6V36h10V12h4V4h2v8h4v52h6V28h14v10h8V22h10v42h6V34h12V16h8v48h8V40h10V26h14v12h6V8h6v8h6v48h8V30h12v34h6V42h10V24h8v-8h4v8h6v40h8V36h14V20h8v44h8V32h12v32h10V46h14V28h10v36h8V38h12v26z"/></svg>';

const art_html = '<div class="sky" aria-hidden="true"><i class="sun"></i><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i><i class="f1"></i><i class="f2"></i><i class="b1"></i><i class="b2"></i><i class="b3"></i></div>' +
  '<div class="sunset" aria-hidden="true"><i class="star"></i><div class="sun"></div>' + city + '<div class="sea"></div>' + palm.replace("PCLS", "p1") + palm.replace("PCLS", "p2") + "</div>";

// Runs in <head> before the page paints, so a saved choice never flashes pink first.
const headScript = `<script>(function(){var d=document.documentElement,s=d.getAttribute("data-skin-default")||"pink";
try{var v=localStorage.getItem("pyq-skin");if(v&&!d.hasAttribute("data-skin-fixed"))s=v}catch(e){}
if(!/^(pink|dive|sunset)$/.test(s))s="pink";d.setAttribute("data-skin",s)})()</script>`;

// Switch buttons + retro click sounds (Web Audio, only in dive and sunset; toggle with the speaker button).
const bodyScript = `
<button class="sndb" id="sndb" aria-pressed="true" title="Sound on/off"></button>
<script>
(function(){
  var d=document.documentElement;
  var mark=function(){ document.querySelectorAll(".skinp button").forEach(function(x){ x.setAttribute("aria-pressed",x.dataset.s===d.getAttribute("data-skin")) }) };
  document.querySelectorAll(".skinp button").forEach(function(x){ x.addEventListener("click",function(){
    var go=function(){ d.setAttribute("data-skin",x.dataset.s); mark() }; if(document.startViewTransition&&d.getAttribute("data-skin")!==x.dataset.s) document.startViewTransition(go); else go(); try{ localStorage.setItem("pyq-skin",x.dataset.s) }catch(e){} mark() }) });
  mark();
  var KEYS="dive-sound", on=true, ctx=null;
  try{ on=localStorage.getItem(KEYS)!=="off" }catch(e){}
  var b=document.getElementById("sndb");
  var icon=function(){ b.setAttribute("aria-pressed",on); b.setAttribute("aria-label",on?"Sound on":"Sound off");
    b.innerHTML='<svg viewBox="0 0 12 12" fill="currentColor"><rect x="1" y="4" width="2" height="4"/><rect x="3" y="3" width="1" height="6"/><rect x="4" y="2" width="1" height="8"/><rect x="5" y="1" width="1" height="10"/>'+
      (on?'<rect x="7" y="5" width="1" height="2"/><rect x="8" y="3" width="1" height="1"/><rect x="8" y="8" width="1" height="1"/><rect x="9" y="4" width="1" height="4"/><rect x="10" y="2" width="1" height="8"/>'
         :'<rect x="7" y="4" width="1" height="1"/><rect x="8" y="5" width="1" height="1"/><rect x="9" y="6" width="1" height="1"/><rect x="10" y="7" width="1" height="1"/><rect x="10" y="4" width="1" height="1"/><rect x="9" y="5" width="1" height="1"/><rect x="8" y="6" width="1" height="1"/><rect x="7" y="7" width="1" height="1"/>')+'</svg>' };
  icon();
  function ac(){ if(!ctx){ var C=window.AudioContext||window.webkitAudioContext; if(!C) return null; ctx=new C() } if(ctx.state==="suspended") ctx.resume(); return ctx }
  function tone(type,f1,f2,len,vol,delay){
    var c=ac(); if(!c) return; var t=c.currentTime+(delay||0), o=c.createOscillator(), g=c.createGain();
    o.type=type; o.frequency.setValueAtTime(f1,t); if(f2!==f1) o.frequency.exponentialRampToValueAtTime(f2,t+len);
    g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(0.0001,t+len);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t+len+0.02);
  }
  var S={
    tab:function(){ tone("square",660,660,0.05,0.05); tone("square",990,990,0.06,0.04,0.05) },
    open:function(){ tone("sine",320,900,0.12,0.12); tone("sine",500,1300,0.09,0.06,0.07) },
    close:function(){ tone("sine",900,300,0.12,0.10) },
    done:function(){ [523,659,784,1047].forEach(function(f,i){ tone("square",f,f,0.09,0.045,i*0.065) }) },
    undo:function(){ tone("square",440,220,0.12,0.04) },
    blip:function(){ tone("square",880,880,0.035,0.035) },
    on:function(){ tone("square",523,523,0.06,0.05); tone("square",784,784,0.08,0.05,0.07) }
  };
  b.addEventListener("click",function(){ on=!on; try{ localStorage.setItem(KEYS,on?"on":"off") }catch(e){} icon(); if(on) S.on() });
  document.addEventListener("click",function(e){
    if(!on||d.getAttribute("data-skin")==="pink") return; var t=e.target.closest("button,a,summary,select,input[type=checkbox],[role=tab],.qh"); if(!t||t===b) return;
    if(t.matches(".skinp button")) return S.on();
    if(t.matches(".tick,.doneb")){ var r=t.closest(".qrow"); setTimeout(function(){ (r&&r.classList.contains("done")?S.done:S.undo)() },0); return }
    if(t.matches("[role=tab],.pchips button,.utabs button,.seg button,.ut")) return S.tab();
    if(t.matches(".tcard>button,.qh,summary")){
      var box=t.closest(".tcard,.qrow,details");
      setTimeout(function(){ var now=box&&(box.matches("details")?box.open:(box.matches(".qrow")?box.classList.contains("open")||!!box.querySelector(".qa"):!!box.querySelector(".tbody"))); (now?S.open:S.close)() },0); return }
    S.blip();
  },true);
})();
</script>`;

const FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,400..700,100&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@400;600' +
  '&family=VT323&family=Press+Start+2P&family=IBM+Plex+Mono:wght@400;600&family=Anton&family=Pacifico&display=swap">';

function skins(page) {
  const need = (re, what) => { if (!re.test(page)) throw new Error("skins: page is missing " + what); };
  need(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis[^>]*>/, "fonts link");
  need(/<header class="top">/, "header");
  need(/<div class="wish"><b>11 11<\/b>trust your intuition<\/div>/, "wish line");
  need(/<button class="themeb" id="themeb"><\/button>/, "theme button");
  return page
    .replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis[^>]*>/, () => FONTS + "\n" + headScript)
    .replace("</style>", () => base + scope(dive, "dive") + scope(sunset, "sunset") + "</style>")
    .replace('<header class="top">', () => '<header class="top">' + art_html)
    .replace('<div class="wish"><b>11 11</b>trust your intuition</div>',
      '<div class="wish"><b>11 11</b><span class="w-pink">trust your intuition</span><span class="w-dive">the exam dive</span><span class="w-sun">study hard, stay golden</span></div>')
    .replace('<button class="themeb" id="themeb"></button>',
      '<span class="skinp" role="group" aria-label="Theme"><button data-s="pink">🌸 Pink</button><button data-s="dive">🌊 Dive</button><button data-s="sunset">🌴 Sunset</button></span>\n      <button class="themeb" id="themeb"></button>')
    + "\n" + bodyScript;
}
module.exports = { skins, scope };
