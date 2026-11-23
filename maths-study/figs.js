/* Diagrams drawn as SVG pictures inside the answers: Hasse diagrams, a Venn diagram and graphs
   (Kruskal spanning trees, isomorphism pairs, handshaking examples). They use the figure.fsm styles. */
const FIG = (function () {
  const f = v => (+v).toFixed(1);
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const pillW = s => Math.max(30, 14 + 7.8 * [...String(s)].length);
  const fig = (cap, body, key) => '<figure class="fsm mfig"><figcaption>' + cap + '</figcaption><div class="sc">' + body + '</div>' +
    (key ? '<div class="key">' + key + '</div>' : "") + "</figure>";

  // nodes {name: [x, y]} in px; edges [[a, b, label]]; o.hi = set of "ab" keys drawn bold (others faded); o.hot = nodes to colour
  function svg(nodes, edges, o) {
    o = o || {};
    const P = Object.entries(nodes), pad = 22, H = 30;
    const minX = Math.min(...P.map(([n, p]) => p[0] - pillW(n) / 2)), maxX = Math.max(...P.map(([n, p]) => p[0] + pillW(n) / 2));
    const minY = Math.min(...P.map(p => p[1][1])) - H / 2, maxY = Math.max(...P.map(p => p[1][1])) + H / 2;
    const W = maxX - minX + pad * 2, Ht = maxY - minY + pad * 2, X = x => x - minX + pad, Y = y => y - minY + pad;
    let s = '<svg viewBox="0 0 ' + f(W) + " " + f(Ht) + '" width="' + f(W) + '" height="' + f(Ht) + '" role="img" aria-label="' + esc(o.label || "diagram") + '">';
    const lab = [];
    edges.forEach(([a, b, w]) => {
      const p = nodes[a], q = nodes[b]; if (!p || !q) throw new Error("FIG: unknown vertex " + a + b);
      const on = !o.hi || o.hi.has(a + b) || o.hi.has(b + a);
      s += '<line x1="' + f(X(p[0])) + '" y1="' + f(Y(p[1])) + '" x2="' + f(X(q[0])) + '" y2="' + f(Y(q[1])) + '" class="ed"' +
        (o.hi ? (on ? ' style="stroke-width:3.2"' : ' style="stroke:var(--muted);stroke-width:1.3;stroke-dasharray:5 4;opacity:.55"') : "") + "/>";
      if (w != null) lab.push('<text class="el" x="' + f(X((p[0] + q[0]) / 2)) + '" y="' + f(Y((p[1] + q[1]) / 2) + 4) + '"' + (on ? "" : ' style="fill:var(--muted)"') + ">" + esc(w) + "</text>");
    });
    P.forEach(([n, p]) => {
      const w = pillW(n), hot = o.hot && o.hot.includes(n);
      s += '<rect class="nd" x="' + f(X(p[0]) - w / 2) + '" y="' + f(Y(p[1]) - H / 2) + '" width="' + f(w) + '" height="' + H + '" rx="15"' +
        (hot ? ' style="fill:var(--accent);stroke:var(--accent)"' : "") + "/>" +
        '<text x="' + f(X(p[0])) + '" y="' + f(Y(p[1]) + 4.5) + '" style="font-size:13px;font-weight:600' + (hot ? ";fill:var(--surface)" : "") + '">' + esc(n) + "</text>";
    });
    return s + lab.join("") + "</svg>";
  }
  const scale = (pts, k) => Object.fromEntries(Object.entries(pts).map(([n, [x, y]]) => [n, [x * k, y * k]]));
  const pair = svgs => '<div style="display:flex;flex-wrap:wrap;gap:6px 28px;justify-content:center;align-items:center">' + svgs.join("") + "</div>";
  const E = str => str.split(/\s+/).filter(Boolean).map(e => { const m = e.match(/^(U\d|V\d|\d|[A-Za-z])(U\d|V\d|\d|[A-Za-z])$/); return [m[1], m[2]] });

  // Hasse diagram of a poset given as a list of elements and a strict order lt(a, b)
  function hasse(els, lt, name) {
    const cov = []; els.forEach(a => els.forEach(b => { if (lt(a, b) && !els.some(c => lt(a, c) && lt(c, b))) cov.push([a, b]) }));
    const lvl = new Map(); const L = a => { if (lvl.has(a)) return lvl.get(a); const d = Math.max(-1, ...cov.filter(c => c[1] === a).map(c => L(c[0]))) + 1; lvl.set(a, d); return d };
    els.forEach(L);
    const gap = Math.max(...els.map(e => pillW(e))) + 22, VG = 78, top = Math.max(...lvl.values()), x = new Map();
    for (let l = 0; l <= top; l++) {
      const row = els.filter(e => lvl.get(e) === l);
      let want = row.map((e, i) => { const lo = cov.filter(c => c[1] === e).map(c => x.get(c[0])); return lo.length ? lo.reduce((s, v) => s + v, 0) / lo.length : (i - (row.length - 1) / 2) * gap });
      const ord = row.map((e, i) => [e, want[i], i]).sort((a, b) => a[1] - b[1] || a[2] - b[2]);
      for (let i = 1; i < ord.length; i++) ord[i][1] = Math.max(ord[i][1], ord[i - 1][1] + gap);
      const shift = want.reduce((s, v) => s + v, 0) / row.length - ord.reduce((s, v) => s + v[1], 0) / row.length;
      ord.forEach(([e, v]) => x.set(e, v + shift));
    }
    const nodes = Object.fromEntries(els.map(e => [e, [x.get(e), (top - lvl.get(e)) * VG]]));
    return fig("Hasse diagram · " + name, svg(nodes, cov.map(c => [c[0], c[1]]), { label: "Hasse diagram of " + name }),
      "Read it bottom to top: a line from a lower element up to a higher one means the lower one comes directly before it. Loops and implied (transitive) edges are left out.");
  }
  const div = s => s.map(String);
  const divides = (a, b) => a !== b && b % a === 0;
  const hDiv = (set, name) => hasse(div(set), (a, b) => divides(+a, +b), name);
  const sub = (a, b) => { const A = a === "∅" ? [] : a.slice(1, -1).split(","), B = b === "∅" ? [] : b.slice(1, -1).split(","); return A.length < B.length && A.every(e => B.includes(e)) };

  // Kruskal: read the edge list and the chosen tree from the worked answer, draw the graph with the tree in bold
  const LAY = {
    k_9_2: [{ A: [0, 0], B: [1, 0], C: [2, 0], D: [0, 1], E: [1, 1], F: [2, 1], G: [0, 2], H: [1, 2], I: [2, 2] }, 112],
    k_hex: [{ A: [-.65, -1.13], B: [.65, -1.13], C: [1.3, 0], D: [.65, 1.13], E: [-.65, 1.13], F: [-1.3, 0], G: [0, 0] }, 104],
    k_6: [{ A: [0, 0], B: [2, 0], C: [3, 1.1], D: [2, 2.2], E: [0, 2.2], F: [1, 1.1] }, 88],
    k_clrs: [{ A: [0, 1], B: [1, 0], C: [2, 0], D: [3, 0], J: [4, 1], H: [3, 2], G: [2, 2], E: [1, 2], F: [1.55, 1] }, 96],
    k_grid: [{ A: [0, 0], B: [1, 0], C: [2, 0], D: [3, 0], E: [0, 1], F: [1, 1], G: [2, 1], H: [3, 1], I: [0, 2], J: [1, 2], K: [2, 2], L: [3, 2] }, 96],
    k_m26: [{ A: [1.5, 0], C: [0, 1.5], D: [1.5, 3], E: [3, 1.5], B: [1.05, 1.35], F: [2.2, 1.85] }, 78],
  };
  LAY.k_9_3 = LAY.k_9_2;
  function kruskal(k, html) {
    const txt = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const edges = [...txt.split("Kruskal:")[0].matchAll(/\b([A-Z])([A-Z]) (\d+)\b/g)].map(m => [m[1], m[2], m[3]]);
    if (edges.length < 6) throw new Error("FIG: could not read the edges of " + k);
    const tree = new Set(txt.match(/Minimum spanning tree: ([^.]+)\./)[1].split(",").map(s => s.trim().slice(0, 2)));
    const total = (txt.match(/Total weight = [^.]*= (\d+)\./) || [])[1];
    const [pos, k2] = LAY[k];
    const g = fig("The graph with its minimum spanning tree", svg(scale(pos, k2), edges, { hi: tree, label: "weighted graph with minimum spanning tree" }),
      "Thick coloured edges = the spanning tree" + (total ? " (total weight " + total + ")" : "") + ". Faded dashed edges are not used. Copy this picture into your answer.");
    const cue = /Draw the tree with only these edges; it touches every vertex and has no cycle\.?/;
    return cue.test(html) ? html.replace(cue, "").replace(/(<\/p>|<\/div>)?\s*$/, m => m + g) : html + g;
  }
  Object.keys(G).filter(k => k.startsWith("k_")).forEach(k => { if (!LAY[k]) throw new Error("FIG: no layout for " + k); G[k] = kruskal(k, G[k]) });

  // pentagon / square layouts for the small graphs
  const ring = (names, r) => Object.fromEntries(names.map((n, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / names.length; return [n, [r * Math.cos(a), r * Math.sin(a)]] }));
  const box = (o, i) => ({ [o[0]]: [0, 0], [o[1]]: [2.2, 0], [o[2]]: [2.2, 1.8], [o[3]]: [0, 1.8], [i[0]]: [.65, .5], [i[1]]: [1.55, .5], [i[2]]: [1.55, 1.3], [i[3]]: [.65, 1.3] });

  const venn = (() => {
    const r = 58, A = [110, 92], B = [170, 92], C = [140, 146], h = Math.sqrt(r * r - 30 * 30);
    const c = (p, cls) => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + r + '" ' + cls + "/>";
    const s = '<svg viewBox="0 0 280 230" width="280" height="230" role="img" aria-label="Venn diagram of A, B, C with A ∩ B ∩ C′ shaded">' +
      '<rect x="8" y="8" width="264" height="214" rx="10" class="fin"/>' +
      '<path d="M140 ' + f(92 - h) + " A" + r + " " + r + " 0 0 1 140 " + f(92 + h) + " A" + r + " " + r + " 0 0 1 140 " + f(92 - h) + 'Z" style="fill:var(--accent);opacity:.45"/>' +
      c(C, 'style="fill:var(--surface)"') + c(A, 'class="fin" style="stroke-width:1.8"') + c(B, 'class="fin" style="stroke-width:1.8"') + c(C, 'class="fin" style="stroke-width:1.8"') +
      '<text x="62" y="52" style="font-size:16px;font-weight:600">A</text><text x="218" y="52" style="font-size:16px;font-weight:600">B</text><text x="140" y="218" style="font-size:16px;font-weight:600">C</text>' +
      '<text x="20" y="26" style="font-size:12px;text-anchor:start">U</text></svg>';
    return fig("Venn diagram · shaded = A ∩ B ∩ C′", s, "The shaded part is inside A and B but outside C. Shade A ∩ (B − C) and (A ∩ B) − (A ∩ C) separately: you get this same region both times, so the two sides are equal.");
  })();

  return {
    venn,
    h8: hDiv([1, 2, 3, 5, 7, 4, 6, 8], "divides on {1, …, 8}"),
    h7: hDiv([2, 5, 4, 10, 25, 12, 20], "divides on {2, 4, 5, 10, 12, 20, 25}"),
    hP: hasse(["∅", "{a}", "{b}", "{c}", "{a,b}", "{a,c}", "{b,c}", "{a,b,c}"], sub, "⊆ on P({a, b, c})"),
    h30: hDiv([1, 2, 3, 5, 6, 10, 15, 30], "D₃₀, divides"),
    h24: hDiv([1, 2, 3, 4, 6, 9, 8, 12, 18, 24], "divides on {1, 2, 3, 4, 6, 8, 9, 12, 18, 24}"),
    isoGH: fig("G and H", pair([
      svg(scale(ring(["U1", "U4", "U3", "U2", "U5"], 1), 72), E("U1U3 U1U4 U1U5 U2U3 U2U5 U3U4"), { hot: ["U1", "U3"], label: "graph G" }),
      svg(scale(ring(["V1", "V2", "V3", "V4", "V5"], 1), 72), E("V1V2 V1V3 V1V5 V2V3 V3V4 V4V5"), { hot: ["V1", "V3"], label: "graph H" })]),
      "Left G, right H. Coloured = the two degree-3 vertices; in both graphs they are joined, and the rest is a 5-cycle with one chord, so they match."),
    isoCube: fig("G1 and G2 (both are the cube graph)", pair([
      svg(scale(box(["1", "2", "3", "8"], ["6", "5", "4", "7"]), 82), E("12 23 38 81 65 54 47 76 16 25 34 87"), { label: "graph G1" }),
      svg(scale(box(["a", "d", "c", "h"], ["b", "e", "f", "g"]), 82), E("ad dc ch ha be ef fg gb ab de cf hg"), { label: "graph G2" })]),
      "Same position = matched vertex: 1→a, 2→d, 3→c, 8→h, 6→b, 5→e, 4→f, 7→g."),
    isoRect: fig("G1 and G2", pair([
      svg(scale(box(["A", "B", "C", "D"], ["E", "F", "G", "H"]), 82), E("AB BC CD DA EF FG GH HE BF DH"), { hot: ["B", "D", "F", "H"], label: "graph G1" }),
      svg(scale(box(["O", "P", "Q", "R"], ["S", "T", "U", "V"]), 82), E("OP PQ QR RO ST TU UV VS OS RV"), { hot: ["O", "R", "S", "V"], label: "graph G2" })]),
      "Coloured = degree-3 vertices. In G1 each has one coloured neighbour; in G2, O has two (R and S). So they are not isomorphic."),
    hsHouse: fig("Dec 2023 graph", svg(scale({ C: [1, 0], A: [0, 1], B: [2, 1], D: [0, 2.6], E: [2, 2.6], F: [1, 1.8] }, 82),
      E("CA CB AB AD BE DE AF FE BF FD").map(([a, b]) => [a, b, null]), { label: "house graph" }), "Degrees: A 4, B 4, C 2, D 3, E 3, F 4 → sum 20 = 2 × 10 edges."),
    hsM25: fig("May 2025 graph (redrawn from the edge list)", svg(scale({ A: [1, 0], B: [0, 1], C: [2, 1], E: [0, 2.4], D: [2, 2.4], F: [-.9, 3.1] }, 82),
      E("AB AC BC BE BD CE CD ED EF").map(([a, b]) => [a, b, null]), { label: "graph for May 2025" }), "Degrees: A 2, B 4, C 4, D 3, E 4, F 1 → sum 18 = 2 × 9 edges."),
  };
})();
