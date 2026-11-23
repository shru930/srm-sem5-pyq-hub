/* 21MAB302T Discrete Mathematics — every Part B and Part C question from 9 end-semester papers.
   Units follow the CO column printed beside each question (CO1 = Unit 1 … CO5 = Unit 5). */
const PAPERS = [
  { k: "d23",  name: "Dec 2023",      n: 1, note: "older pattern: Part B 4 × 10 marks (answer any 4 of six), Part C 2 × 15 (answer one)" },
  { k: "m24",  name: "May 2024",      n: 2, note: "" },
  { k: "jl24", name: "Jul 2024",      n: 3, note: "" },
  { k: "n24",  name: "Nov 2024",      n: 4, note: "" },
  { k: "m25",  name: "May 2025",      n: 5, note: "" },
  { k: "jl25a", name: "Jul 2025 · I", n: 6, note: "" },
  { k: "jl25b", name: "Jul 2025 · II", n: 7, note: "listed on thehelpers.tech as Jul 2025 (Paper - 2)" },
  { k: "n25",  name: "Nov 2025",      n: 8, note: "" },
  { k: "m26",  name: "May 2026",      n: 9, note: "" }
];
const UNITS = {
  1: "Sets, relations & functions — set identities, posets and Hasse diagrams, relation matrices, Warshall, functions",
  2: "Combinatorics & number theory — inclusion–exclusion, pigeonhole, permutations, Euclidean algorithm",
  3: "Mathematical logic — equivalences, inference (direct, indirect, CP), inconsistency, induction",
  4: "Groups & coding theory — groups, subgroups, cyclic and permutation groups, rings, group codes",
  5: "Graph theory — degrees, handshaking, isomorphism, edge bounds, Kruskal's algorithm"
};

const TOPICS = [
/* ================= UNIT 1 ================= */
{ u:1, m:15, t:"Warshall's algorithm — transitive closure of a relation", items:[
  {p:"m24", q:"26", x:"Let R = {(1,2), (1,5), (2,2), (3,3), (3,4), (4,4), (5,1)} defined on A = {1,2,3,4,5}; then find the transitive closure of R using Warshall's algorithm."},
  {p:"jl24", q:"26", x:"Let R = {(1,1),(1,3),(2,1),(2,4),(3,2),(3,3),(4,1),(4,5),(5,1),(5,5)} defined on A = {1,2,3,4,5}; then find the transitive closure of R by using Warshall's algorithm."},
  {p:"n24", q:"21a", m:8, x:"Using Warshall's algorithm, find the transitive closure of the relation defined on the set A = {1,2,3,4}, R = {(1,2), (2,1), (2,3), (3,4), (4,1)}."},
  {p:"m25", q:"26", x:"Let R = {(1,1), (1,3), (2,3), (3,4), (4,1), (4,2)} be the relation on A = {1,2,3,4}. Find the transitive closure of R using Warshall's algorithm."},
  {p:"jl25a", q:"27", x:"(i) If A, B and C are sets, prove analytically that A − (B ∩ C) = (A − B) ∪ (A − C). (5 marks) (ii) Find the transitive closure of the relation R = {(1,1),(1,2),(2,1),(2,2),(3,3),(3,5),(4,3),(4,4),(4,5),(5,4),(5,5)} defined on the set A = {1,2,3,4,5} using Warshall's algorithm. (10 marks)"},
  {p:"jl25b", q:"26", x:"Find the transitive closure of R = {(1,2), (2,1), (2,3), (3,4), (4,2), (4,4), (5,1), (5,5)} on A = {1,2,3,4,5} using Warshall's algorithm."},
  {p:"n25", q:"26", x:"Using Warshall's algorithm, find the transitive closure of the relation R = {(1,1), (1,3), (1,5), (2,3), (2,4), (3,3), (3,5), (4,2), (4,4), (5,4)} on the set A = {1,2,3,4,5}."},
  {p:"m26", q:"26", x:"By using Warshall's algorithm, find the transitive closure of the relation R = {(1,2), (2,3), (3,4), (5,1), (5,4)} on the set A = {1,2,3,4,5}."}
], a: `
<p><b>Warshall's algorithm.</b> Start with W<sub>0</sub> = M<sub>R</sub>. For k = 1, 2, …, n: look at <b>column k</b> and <b>row k</b> of W<sub>k−1</sub>. If column k has 1s in rows i<sub>1</sub>, i<sub>2</sub>, … and row k has 1s in columns j<sub>1</sub>, j<sub>2</sub>, …, put a 1 at every position (i, j). Everything else is copied. W<sub>n</sub> is the matrix of the transitive closure R<sup>+</sup>.</p>
<p>(Reason: after step k, W<sub>k</sub>[i][j] = 1 exactly when there is a path from i to j whose interior vertices are among 1…k.)</p>
<p><b>May 2024 Q26</b></p>` + G.w_m2 + `
<p><b>Jul 2024 Q26</b></p>` + G.w_m3 + `
<p><b>Nov 2024 Q21(a)</b> (8 marks)</p>` + G.w_m4 + `
<p><b>May 2025 Q26</b></p>` + G.w_m5 + `
<p><b>Jul 2025 · I Q27</b></p>
<p><b>(i)</b> x ∈ A − (B ∩ C) ⇔ x ∈ A and x ∉ B ∩ C ⇔ x ∈ A and (x ∉ B or x ∉ C) ⇔ (x ∈ A and x ∉ B) or (x ∈ A and x ∉ C) ⇔ x ∈ (A − B) or x ∈ (A − C) ⇔ x ∈ (A − B) ∪ (A − C). Each step is reversible, so the two sets are equal.</p>
<p><b>(ii)</b></p>` + G.w_m6 + `
<p><b>Jul 2025 · II Q26</b></p>` + G.w_m7 + `
<p><b>Nov 2025 Q26</b></p>` + G.w_m8 + `
<p><b>May 2026 Q26</b></p>` + G.w_m9 },

{ u:1, m:8, t:"Set identities — prove analytically and with set laws", items:[
  {p:"m24", q:"21a", x:"If A, B and C are sets, prove both by set identities and analytically that A ∩ (B − C) = (A ∩ B) − (A ∩ C)."},
  {p:"jl24", q:"21a", x:"Prove the following statement analytically, where A, B and C are sets, and verify it using set identities: (A ∩ B) − C = (A − C) ∩ (B − C)."},
  {p:"m25", q:"21a", x:"If A, B and C are sets, prove that both analytically and graphically A ∩ (B − C) = (A ∩ B) − (A ∩ C)."}
], a: `
<p><b>Method.</b> <i>Analytically</i>: take an arbitrary element x and show x ∈ LHS ⇔ x ∈ RHS. <i>By identities</i>: use X − Y = X ∩ Y′, De Morgan, distributive, associative and complement laws. <i>Graphically</i>: shade both sides on a Venn diagram of A, B, C.</p>
<p><b>A ∩ (B − C) = (A ∩ B) − (A ∩ C)</b> (May 2024, May 2025)</p>
<p><i>Analytically.</i> x ∈ (A ∩ B) − (A ∩ C) ⇔ x ∈ A, x ∈ B and not (x ∈ A and x ∈ C). Since x ∈ A, “not (x ∈ A and x ∈ C)” is just x ∉ C. So ⇔ x ∈ A, x ∈ B, x ∉ C ⇔ x ∈ A and x ∈ B − C ⇔ x ∈ A ∩ (B − C).</p>
<pre>(A ∩ B) − (A ∩ C) = (A ∩ B) ∩ (A ∩ C)′           X − Y = X ∩ Y′
                  = (A ∩ B) ∩ (A′ ∪ C′)          De Morgan
                  = (A ∩ B ∩ A′) ∪ (A ∩ B ∩ C′)  distributive
                  = ∅ ∪ (A ∩ B ∩ C′)             A ∩ A′ = ∅
                  = A ∩ (B ∩ C′) = A ∩ (B − C)</pre>
<p><i>Graphically.</i> Both sides are the region inside A and B but outside C: shade it on two Venn diagrams and they match.</p>
<p><b>(A ∩ B) − C = (A − C) ∩ (B − C)</b> (Jul 2024)</p>
<p><i>Analytically.</i> x ∈ (A − C) ∩ (B − C) ⇔ (x ∈ A, x ∉ C) and (x ∈ B, x ∉ C) ⇔ x ∈ A, x ∈ B, x ∉ C ⇔ x ∈ (A ∩ B) − C.</p>
<pre>(A − C) ∩ (B − C) = (A ∩ C′) ∩ (B ∩ C′)
                  = (A ∩ B) ∩ (C′ ∩ C′)     commutative, associative
                  = (A ∩ B) ∩ C′            idempotent
                  = (A ∩ B) − C</pre>` },

{ u:1, m:8, t:"Partial orders, posets and Hasse diagrams", items:[
  {p:"m24", q:"21b", x:"Draw the Hasse diagram representing the partial ordering P = {(a,b) | a divides b} on the set {1,2,3,4,5,6,7,8} starting from the digraph of P and also prove that P is a partial ordered relation."},
  {p:"jl24", q:"21b", x:"Draw the Hasse diagram for the divisibility relation on {2,4,5,10,12,20,25} starting from the digraph and also prove that the given relation is a partial ordered relation."},
  {p:"m25", q:"21b", x:"Draw the Hasse diagram representing the partial ordering {(A, B) | A ⊆ B} on the power set P(S) where S = {a, b, c}."},
  {p:"jl25a", q:"21a", x:"(i) Define partially ordered set. (2 marks) (ii) Draw the Hasse diagram for the poset {D₃₀, ≤} where ≤ is the relation “is a divisor of”. (6 marks)"},
  {p:"n24", q:"26", m:15, x:"a) Define partially ordered set. (3 marks) b) Prove that the relation ⊆ of set inclusion is a partial ordering relation on the power set P(S), where S = {a, b, c}. Also draw the Hasse diagram representing the above poset. (12 marks)"}
], a: `
<p><b>Poset.</b> A relation R on A is a <b>partial order</b> if it is <b>reflexive</b> (aRa), <b>antisymmetric</b> (aRb and bRa ⇒ a = b) and <b>transitive</b> (aRb, bRc ⇒ aRc). (A, R) is then a partially ordered set.</p>
<p><b>Divisibility is a partial order</b> on any set of positive integers: a | a (reflexive); a | b and b | a ⇒ a = b (antisymmetric, since both are positive); a | b, b | c ⇒ b = ak, c = bl ⇒ c = a(kl) ⇒ a | c (transitive).</p>
<p><b>Set inclusion ⊆ is a partial order</b> on P(S): A ⊆ A; A ⊆ B and B ⊆ A ⇒ A = B; A ⊆ B, B ⊆ C ⇒ A ⊆ C.</p>
<p><b>From digraph to Hasse diagram:</b> (1) draw the digraph with every pair; (2) remove the self-loops (reflexivity is understood); (3) remove every edge implied by transitivity (a → c when a → b → c); (4) draw every remaining edge upward and remove the arrowheads.</p>
<p><b>{1,…,8}, divides</b> (May 2024). Covering pairs (a below b with nothing in between): 1–2, 1–3, 1–5, 1–7, 2–4, 2–6, 3–6, 4–8.</p>
<pre>        8
        |
        4       6
        |      / \\
        2 ----+   3     5     7
         \\        |    /     /
          +------ 1 --+-----+</pre>
<p>Level 0: 1. Level 1: 2, 3, 5, 7. Level 2: 4 (over 2), 6 (over 2 and 3). Level 3: 8 (over 4).</p>
<p><b>{2,4,5,10,12,20,25}, divides</b> (Jul 2024). Covering pairs: 2–4, 2–10, 5–10, 5–25, 4–12, 4–20, 10–20. Minimal elements 2 and 5; maximal elements 12, 20, 25.</p>
<pre>   12      20      25
     \\    /  \\     |
       4      10   |
        \\    /  \\  |
          2       5</pre>
<p><b>P(S), S = {a,b,c}, ⊆</b> (May 2025, Nov 2024). The Hasse diagram is a cube: ∅ at the bottom; {a}, {b}, {c}; then {a,b}, {a,c}, {b,c}; then {a,b,c} at the top. Each set is joined to the sets with one more element that contain it (12 edges).</p>
<pre>              {a,b,c}
            /    |    \\
       {a,b}  {a,c}  {b,c}
        |   \\ /   \\ /   |
        |    X     X    |
       {a}   {b}       {c}
            \\   |    /
               ∅</pre>
<p><b>D<sub>30</sub></b> (Jul 2025 · I) = divisors of 30 = {1, 2, 3, 5, 6, 10, 15, 30}. It is also a cube: 1 at the bottom; 2, 3, 5; then 6 (over 2, 3), 10 (over 2, 5), 15 (over 3, 5); 30 at the top.</p>` },

{ u:1, m:8, t:"Functions — one-one, onto, inverse and composition", items:[
  {p:"d23", q:"21", m:10, x:"If f : Z → N is defined by f(x) = 2x − 1 if x > 0, f(x) = −2x if x ≤ 0, (a) prove that the function is 1-1 and onto; (b) determine f⁻¹."},
  {p:"jl25a", q:"21b", x:"If f : Z → N is defined by f(x) = 2x − 1 if x > 0, −2x if x ≤ 0, prove that i) f is one-one ii) f is onto iii) find f⁻¹."},
  {p:"n24", q:"21b", x:"If f : A → B and g : B → C are invertible functions, then prove that g∘f : A → C is also invertible and also prove that (g∘f)⁻¹ = f⁻¹ ∘ g⁻¹."},
  {p:"jl25b", q:"21a", x:"Let A = {x ∈ R | x ≠ 2}, B = {x ∈ R | x ≠ 1}. Define f : A → B by f(x) = x/(x − 2). Prove f is 1-1 and onto. Also find f⁻¹."},
  {p:"n25", q:"21b", x:"(i) Show that the function f : R − {−4} → R − {1} defined by f(x) = x/(x + 4) is one-to-one and onto and hence find its inverse. (4 marks) (ii) Draw the Hasse diagram for the divisibility relation on A = {1,2,3,4,6,8,9,12,18,24}. (4 marks)"}
], a: `
<p><b>Definitions.</b> f is <b>one-one</b> if f(x<sub>1</sub>) = f(x<sub>2</sub>) ⇒ x<sub>1</sub> = x<sub>2</sub>; <b>onto</b> if every y in the codomain equals f(x) for some x; f is invertible exactly when it is one-one and onto, and then f⁻¹(y) = the unique x with f(x) = y.</p>
<p><b>f : Z → N, f(x) = 2x − 1 (x > 0), −2x (x ≤ 0)</b> (Dec 2023, Jul 2025 · I). Here N = {0, 1, 2, …}.</p>
<ul><li>Positive x go to the odd numbers 1, 3, 5, …; x ≤ 0 go to the even numbers 0, 2, 4, ….</li>
<li><b>One-one:</b> an odd and an even value are never equal, so f(x<sub>1</sub>) = f(x<sub>2</sub>) means both are in the same branch. If both > 0: 2x<sub>1</sub> − 1 = 2x<sub>2</sub> − 1 ⇒ x<sub>1</sub> = x<sub>2</sub>. If both ≤ 0: −2x<sub>1</sub> = −2x<sub>2</sub> ⇒ x<sub>1</sub> = x<sub>2</sub>.</li>
<li><b>Onto:</b> an odd y has x = (y + 1)/2 > 0 with f(x) = y; an even y has x = −y/2 ≤ 0 with f(x) = y.</li>
<li><b>Inverse:</b> f⁻¹(y) = (y + 1)/2 if y is odd; f⁻¹(y) = −y/2 if y is even.</li></ul>
<p><b>(g∘f)⁻¹ = f⁻¹∘g⁻¹</b> (Nov 2024). f and g are bijections. <i>One-one:</i> g(f(a<sub>1</sub>)) = g(f(a<sub>2</sub>)) ⇒ f(a<sub>1</sub>) = f(a<sub>2</sub>) (g one-one) ⇒ a<sub>1</sub> = a<sub>2</sub> (f one-one). <i>Onto:</i> for c ∈ C pick b with g(b) = c, then a with f(a) = b; then (g∘f)(a) = c. So g∘f is invertible. Now (g∘f)∘(f⁻¹∘g⁻¹) = g∘(f∘f⁻¹)∘g⁻¹ = g∘I<sub>B</sub>∘g⁻¹ = I<sub>C</sub>, and (f⁻¹∘g⁻¹)∘(g∘f) = f⁻¹∘I<sub>B</sub>∘f = I<sub>A</sub>. The inverse is unique, so (g∘f)⁻¹ = f⁻¹∘g⁻¹.</p>
<p><b>f(x) = x/(x − 2), A = R − {2} → B = R − {1}</b> (Jul 2025 · II). <i>One-one:</i> x<sub>1</sub>/(x<sub>1</sub> − 2) = x<sub>2</sub>/(x<sub>2</sub> − 2) ⇒ x<sub>1</sub>x<sub>2</sub> − 2x<sub>1</sub> = x<sub>1</sub>x<sub>2</sub> − 2x<sub>2</sub> ⇒ x<sub>1</sub> = x<sub>2</sub>. <i>Onto:</i> solve y = x/(x − 2): yx − 2y = x ⇒ x = 2y/(y − 1), defined for y ≠ 1, and x ≠ 2 (x = 2 would give 2y − 2 = 2y, impossible). So every y ∈ B is hit. <b>f⁻¹(y) = 2y/(y − 1).</b></p>
<p><b>f(x) = x/(x + 4), R − {−4} → R − {1}</b> (Nov 2025 (i)). Same steps: one-one since x<sub>1</sub>(x<sub>2</sub> + 4) = x<sub>2</sub>(x<sub>1</sub> + 4) ⇒ 4x<sub>1</sub> = 4x<sub>2</sub>. Solving y = x/(x + 4): x = 4y/(1 − y), valid for y ≠ 1 and never −4. <b>f⁻¹(y) = 4y/(1 − y).</b></p>
<p><b>Nov 2025 (ii) Hasse diagram, divisibility on {1,2,3,4,6,8,9,12,18,24}.</b> Covering pairs: 1–2, 1–3, 2–4, 2–6, 3–6, 3–9, 4–8, 4–12, 6–12, 6–18, 9–18, 8–24, 12–24. Levels: 1 | 2, 3 | 4, 6, 9 | 8, 12, 18 | 24.</p>` },

{ u:1, m:8, t:"Relations — matrices, operations and equivalence relations", items:[
  {p:"n25", q:"21a", x:"Let A = {1,2,3} and define a relation R on A as (a, b) ∈ R iff a + b is even. (i) Find the relational matrix M_R. (ii) Find the inverse relation matrix M_R⁻¹. (iii) Find the complement relation matrix M_Rᶜ. (iv) Find M_R²."},
  {p:"m26", q:"21a", x:"If the relation on the set of integers is such that (a, b) ∈ R if and only if 3a + 4b = 7n for some integer n, then prove that R is an equivalence relation."},
  {p:"m26", q:"21b", x:"If R and S are relations on a set A represented by M_R = [0 1 0; 1 1 1; 1 0 0] and M_S = [0 1 0; 0 1 1; 1 1 1], find the matrices that represent (i) R ∪ S (ii) R ∩ S (iii) R ∘ S (iv) R ⊕ S."}
], a: `
<p><b>Nov 2025 — a + b even on {1,2,3}.</b> R = {(1,1), (1,3), (2,2), (3,1), (3,3)}.</p>
<pre>M_R  = 1 0 1      M_R⁻¹ = (M_R)ᵀ = 1 0 1      M_Rᶜ = 0 1 0      M_R² = M_R ⊙ M_R = 1 0 1
       0 1 0                       0 1 0             1 0 1                          0 1 0
       1 0 1                       1 0 1             0 1 0                          1 0 1</pre>
<p>M<sub>R</sub> is symmetric, so the inverse relation equals R. The complement flips every entry. M<sub>R</sub><sup>2</sup> uses the Boolean product (entry (i, j) is 1 if some k has (i,k) and (k,j) both 1); it equals M<sub>R</sub> because R is transitive (it is an equivalence relation with classes {1,3} and {2}).</p>
<p><b>May 2026 — 3a + 4b = 7n is an equivalence relation.</b></p>
<ul><li><b>Reflexive:</b> 3a + 4a = 7a, so (a, a) ∈ R.</li>
<li><b>Symmetric:</b> if 3a + 4b = 7n then 3b + 4a = 7a + 7b − (3a + 4b) = 7(a + b − n), so (b, a) ∈ R.</li>
<li><b>Transitive:</b> if 3a + 4b = 7n and 3b + 4c = 7m, adding gives 3a + 7b + 4c = 7(n + m), so 3a + 4c = 7(n + m − b), and (a, c) ∈ R.</li></ul>
<p>Hence R is an equivalence relation. (Equivalently, 3a + 4b ≡ 3a − 3b ≡ 3(a − b) (mod 7), so aRb ⇔ a ≡ b (mod 7).)</p>
<p><b>May 2026 — operations on relation matrices.</b> ∪ is entry-wise OR, ∩ is entry-wise AND, ⊕ (symmetric difference) is entry-wise XOR, and R∘S is the Boolean product M<sub>R</sub> ⊙ M<sub>S</sub> (first R, then S).</p>
<pre>M_R∪S = 0 1 0    M_R∩S = 0 1 0    M_R∘S = M_R ⊙ M_S = 0 1 1    M_R⊕S = 0 0 0
        1 1 1            0 1 1                        1 1 1            1 0 0
        1 1 1            1 0 0                        0 1 0            0 1 1</pre>
<p>Example entry of R∘S: row 1 of M<sub>R</sub> is 010, so row 1 of the product is row 2 of M<sub>S</sub> = 011. Row 2 of M<sub>R</sub> is 111: OR of all rows of M<sub>S</sub> = 111. Row 3 is 100: row 1 of M<sub>S</sub> = 010.</p>` },

{ u:1, m:8, t:"Minsets and maxsets", items:[
  {p:"jl25b", q:"21b", x:"Find the minsets and maxsets generated by A = {1,7,8}, B = {1,6,9,10}, C = {1,9,10} where U = {1,2,3,4,5,6,7,8,9,10} and prove that minsets form a partition of U."}
], a: `
<p>A <b>minset</b> generated by A, B, C is an intersection A* ∩ B* ∩ C* where each X* is X or its complement X′. A <b>maxset</b> is a union A* ∪ B* ∪ C*.</p>
<div class="tw"><table><tr><th>Minset</th><th>Elements</th></tr>
<tr><td class="m">A ∩ B ∩ C</td><td class="m">{1}</td></tr>
<tr><td class="m">A ∩ B ∩ C′</td><td class="m">∅</td></tr>
<tr><td class="m">A ∩ B′ ∩ C</td><td class="m">∅</td></tr>
<tr><td class="m">A ∩ B′ ∩ C′</td><td class="m">{7, 8}</td></tr>
<tr><td class="m">A′ ∩ B ∩ C</td><td class="m">{9, 10}</td></tr>
<tr><td class="m">A′ ∩ B ∩ C′</td><td class="m">{6}</td></tr>
<tr><td class="m">A′ ∩ B′ ∩ C</td><td class="m">∅</td></tr>
<tr><td class="m">A′ ∩ B′ ∩ C′</td><td class="m">{2, 3, 4, 5}</td></tr></table></div>
<p><b>Partition:</b> the non-empty minsets {1}, {7,8}, {9,10}, {6}, {2,3,4,5} are pairwise disjoint (each element satisfies exactly one combination of “in / not in” A, B, C) and their union is U. So they form a partition of U.</p>
<p><b>Maxsets</b> are the complements of minsets (De Morgan): A ∪ B ∪ C = {1,6,7,8,9,10}; A ∪ B ∪ C′ = U − ∅ … in general (A* ∪ B* ∪ C*) = U − (opposite minset). Listing them: A∪B∪C = U − {2,3,4,5}; A∪B∪C′ = U; A∪B′∪C = U − {6}; A∪B′∪C′ = U − {9,10}; A′∪B∪C = U − {7,8}; A′∪B∪C′ = U; A′∪B′∪C = U; A′∪B′∪C′ = U − {1}.</p>` },

/* ================= UNIT 2 ================= */
{ u:2, m:8, t:"Inclusion–exclusion — students in courses, integers not divisible", items:[
  {p:"m24", q:"22a", x:"There are 250 students in an engineering college. Of these 188 have taken a course in Fortran, 100 have taken a course in C and 35 have taken a course in Java. Further 88 have taken courses in both Fortran and C, 23 have taken courses in both C and Java and 29 have taken courses in both Fortran and Java. If 19 of these students have taken all the three courses, how many of these 250 students have not taken a course in any of these three languages?"},
  {p:"m25", q:"22a", x:"There are 250 students in an Engineering college. Of these 188 have taken a course in Fortran, 100 have taken a course in C and 35 have taken a course in Java. Further 88 have taken courses in both Fortran and C, 23 have taken courses in both C and Java and 29 have taken courses in both Fortran and Java. If 19 of these students have taken all the three courses, how many of these 250 students have not taken a course in any of these 3 programming languages?"},
  {p:"jl24", q:"22a", x:"Find the number of integers between 1 to 100 that are not divisible by 2, 3, 5 and 7."},
  {p:"n24", q:"22a", x:"Find the number of integers between 1 and 250 both inclusive that are not divisible by any of the integers 2, 3, 5 and 7."},
  {p:"jl25a", q:"22b", x:"Find the number of integers between 1 and 250 both inclusive that are not divisible by any of the integers 2, 3, 5 and 7."},
  {p:"jl25b", q:"22b", x:"Find the number of integers between 1 and 250 (both inclusive) that are not divisible by any of the integers 2, 3, 5 and 7."},
  {p:"n25", q:"22a", x:"How many integers between 1 and 300 (both inclusive) are divisible by (i) at least one of 3, 5, 7? (ii) 3 and by 5 but not by 7? (iii) 5 but by neither 3 nor 7?"},
  {p:"m26", q:"22a", x:"A total of 1232 students have taken a course in Tamil, 879 have taken a course in English and 114 have taken a course in Hindi. Further, 103 have taken courses in both Tamil and English, 23 have taken courses in both Tamil and Hindi and 14 have taken in both English and Hindi. If 2092 students have taken at least one of Tamil, English and Hindi, how many students have taken a course in all the three languages?"}
], a: `
<p><b>Principle of inclusion–exclusion</b> for three sets:</p>
<p class="f">|A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |B ∩ C| − |A ∩ C| + |A ∩ B ∩ C|</p>
<p>“None of them” = total − |A ∪ B ∪ C|.</p>
<p><b>250 students — Fortran, C, Java</b> (May 2024, May 2025). |F ∪ C ∪ J| = 188 + 100 + 35 − 88 − 23 − 29 + 19 = <b>202</b>. Not taken any: 250 − 202 = <b>48 students</b>.</p>
<p><b>1232 Tamil, 879 English, 114 Hindi</b> (May 2026). 2092 = 1232 + 879 + 114 − 103 − 23 − 14 + x = 2085 + x, so <b>x = 7 students</b> took all three.</p>
<p><b>1 to 100, not divisible by 2, 3, 5, 7</b> (Jul 2024)</p>` + G.ie_100 + `
<p><b>1 to 250, not divisible by 2, 3, 5, 7</b> (Nov 2024, Jul 2025 · I, Jul 2025 · II)</p>` + G.ie_250 + `
<p><b>1 to 300</b> (Nov 2025)</p>` + G.ie_300 },

{ u:2, m:8, t:"Euclidean algorithm — gcd and linear combination", items:[
  {p:"d23", q:"22", m:10, x:"Find the integers m and n such that 512m + 320n = 64 and state Euclid algorithm."},
  {p:"jl24", q:"22b", x:"Use the Euclidean algorithm to find integers m and n such that 512m + 320n = 64."},
  {p:"m24", q:"22b", x:"Use Euclidean algorithm to find the integers ‘m and n’ such that 28844m + 15712n = 4."},
  {p:"n24", q:"22b", x:"Use the Euclidean algorithm to find GCD(3587, 1819) and also express the gcd as a linear combination of the given two numbers."},
  {p:"m25", q:"22b", x:"Use the Euclidean division algorithm to find the gcd of (18, 19, 35, 87). Also express the gcd as a linear combination of the given numbers."},
  {p:"jl25a", q:"22a", x:"Use Euclidean algorithm to find the integers x and y such that 154x + 250y = 2."},
  {p:"jl25b", q:"22a", x:"Use Euclidean algorithm to find gcd(12345, 54321) and express linear combination of the given numbers."},
  {p:"m26", q:"22b", x:"Use the Euclidean algorithm to find the gcd(12345, 54321) and express the gcd as a linear combination of the given numbers."},
  {p:"n25", q:"27", m:15, x:"Use the Euclidean algorithm to find (i) gcd(12345, 54321). (ii) Express the gcd as a linear combination of the given numbers. (iii) Also, find LCM(12345, 54321)."}
], a: `
<p><b>Euclid's algorithm.</b> For a > b > 0 write a = qb + r with 0 ≤ r &lt; b; then gcd(a, b) = gcd(b, r). Repeat until the remainder is 0; the last non-zero remainder is the gcd. Running the steps backwards gives integers m, n with gcd(a, b) = ma + nb (Bézout).</p>
<p><b>512m + 320n = 64</b> (Dec 2023, Jul 2024)</p>` + G.e_512 + `
<p><b>28844m + 15712n = 4</b> (May 2024)</p>` + G.e_28844 + `
<p><b>gcd(3587, 1819)</b> (Nov 2024)</p>` + G.e_3587 + `
<p><b>gcd(18, 19, 35, 87)</b> (May 2025)</p>` + G.e_four + `
<p><b>154x + 250y = 2</b> (Jul 2025 · I) — so x = 13, y = −8.</p>` + G.e_154 + `
<p><b>gcd(12345, 54321)</b> (Jul 2025 · II, May 2026; Nov 2025 Q27 adds the LCM)</p>` + G.e_12345l },

{ u:2, m:8, t:"Pigeonhole principle and permutations", items:[
  {p:"n25", q:"22b", x:"(i) If there are 26 points within a rectangle measuring 20 cm by 15 cm, show that at least two are within 5 cm of each other. (4 marks) (ii) Find the number of ways of preparing a garland with 3 yellow, 4 pink and 2 red roses such that the two red roses come together. (4 marks)"}
], a: `
<p><b>Pigeonhole principle.</b> If n + 1 or more objects go into n boxes, some box holds at least two objects.</p>
<p><b>(i)</b> Divide the 20 cm × 15 cm rectangle into a 5 × 5 grid of 25 small rectangles, each 4 cm × 3 cm. With 26 points (pigeons) and 25 small rectangles (holes), two points lie in the same small rectangle. The largest distance inside a 4 × 3 rectangle is its diagonal √(4² + 3²) = 5 cm. So these two points are within 5 cm of each other.</p>
<p><b>(ii)</b> Treat the two red roses as one unit. That gives 3 + 4 + 1 = 8 units around a circle: (8 − 1)! = 7! = 5040 circular arrangements. The two red roses can swap inside the unit: × 2! = 10080. A garland can be turned over, so clockwise and anticlockwise arrangements are the same: ÷ 2. <b>Answer: 5040</b> (roses treated as distinguishable, as in the standard textbook version).</p>
<p>If roses of the same colour are identical: fix the red pair, arrange 3 Y and 4 P in the 7 remaining places: 7!/(3! 4!) = 35 circular arrangements; allowing the garland to be flipped gives (35 + 3)/2 = 19, since 3 of the 35 are symmetric.</p>` },

/* ================= UNIT 3 ================= */
{ u:3, m:8, t:"Theory of inference — derive a conclusion (direct, indirect, CP rule)", items:[
  {p:"d23", q:"24", m:10, x:"Show that t ∧ s can be derived from the following statements: p → q, q → ¬r, r, p ∨ (t ∧ s)."},
  {p:"m24", q:"23a", x:"Show that b can be derived from the premises a → b, c → b, d → (a ∨ c), d by the indirect method."},
  {p:"m26", q:"23a", x:"Show that b can be derived from the premises a → b, c → b, d → (a ∨ c) and d by indirect method."},
  {p:"jl24", q:"23a", x:"Construct an argument using rules of inference to show that the hypotheses “Radha works hard”, “If Radha works hard then she is a dull girl” and “If Radha is a dull girl, then she will not get a job” imply the conclusion “Radha will not get a job”."},
  {p:"jl24", q:"23b", x:"Derive r → s using the CP-rule from the premises p → (q → s), (¬r ∨ p), q."},
  {p:"n24", q:"23a", x:"Using indirect method of proof, derive p → ¬s from the premises p → q ∨ r, q → ¬p, s → ¬r, p."},
  {p:"n25", q:"23b", x:"If A works hard, then B or C will enjoy themselves. If B enjoys himself, then A will not work hard. If D enjoys himself, then C will not. Therefore, if A works hard, D will not enjoy himself. Translate the above statement into symbolic form and prove the conclusion by using the CP rule."}
], a: `
<p><b>Rules.</b> Rule P: a premise may be introduced at any step. Rule T: a formula implied by earlier formulas may be introduced. <b>Indirect method:</b> add ¬(conclusion) as a premise and derive a contradiction. <b>CP rule:</b> to derive A → B, add A as an extra premise and derive B.</p>
<p><b>t ∧ s from p → q, q → ¬r, r, p ∨ (t ∧ s)</b> (Dec 2023)</p>
<pre>1. r              Rule P
2. q → ¬r         Rule P
3. ¬q             Rule T, 1, 2 (modus tollens)
4. p → q          Rule P
5. ¬p             Rule T, 3, 4 (modus tollens)
6. p ∨ (t ∧ s)    Rule P
7. t ∧ s          Rule T, 5, 6 (disjunctive syllogism)</pre>
<p><b>b from a → b, c → b, d → (a ∨ c), d — indirect method</b> (May 2024, May 2026)</p>
<pre>1. ¬b             Rule P (assumed: negation of the conclusion)
2. a → b          Rule P
3. ¬a             Rule T, 1, 2
4. c → b          Rule P
5. ¬c             Rule T, 1, 4
6. ¬a ∧ ¬c        Rule T, 3, 5
7. ¬(a ∨ c)       Rule T, 6 (De Morgan)
8. d → (a ∨ c)    Rule P
9. ¬d             Rule T, 7, 8
10. d             Rule P
11. d ∧ ¬d        Rule T, 9, 10 — contradiction</pre>
<p>So the assumption ¬b is false and b follows.</p>
<p><b>Radha</b> (Jul 2024). Let p: Radha works hard, q: she is a dull girl, r: she gets a job. Premises p, p → q, q → ¬r; conclusion ¬r.</p>
<pre>1. p          Rule P
2. p → q      Rule P
3. q          Rule T, 1, 2 (modus ponens)
4. q → ¬r     Rule P
5. ¬r         Rule T, 3, 4 (modus ponens)   “Radha will not get a job”</pre>
<p><b>r → s by CP from p → (q → s), ¬r ∨ p, q</b> (Jul 2024)</p>
<pre>1. r              Rule P (additional premise, CP)
2. ¬r ∨ p         Rule P
3. p              Rule T, 1, 2 (disjunctive syllogism)
4. p → (q → s)    Rule P
5. q → s          Rule T, 3, 4
6. q              Rule P
7. s              Rule T, 5, 6
8. r → s          Rule CP, 1, 7</pre>
<p><b>p → ¬s from p → q ∨ r, q → ¬p, s → ¬r, p — indirect</b> (Nov 2024)</p>
<pre>1. ¬(p → ¬s)      Rule P (negated conclusion)
2. p ∧ s          Rule T, 1  (¬(p → ¬s) ≡ p ∧ s)
3. p              Rule T, 2
4. s              Rule T, 2
5. p → q ∨ r      Rule P
6. q ∨ r          Rule T, 3, 5
7. q → ¬p         Rule P
8. ¬q             Rule T, 3, 7 (modus tollens)
9. r              Rule T, 6, 8
10. s → ¬r        Rule P
11. ¬r            Rule T, 4, 10
12. r ∧ ¬r        Rule T, 9, 11 — contradiction</pre>
<p><b>A, B, C, D</b> (Nov 2025). a: A works hard; b, c, d: B, C, D enjoy themselves. Premises a → (b ∨ c), b → ¬a, d → ¬c. Conclusion a → ¬d.</p>
<pre>1. a              Rule P (additional premise, CP)
2. a → (b ∨ c)    Rule P
3. b ∨ c          Rule T, 1, 2
4. b → ¬a         Rule P
5. ¬b             Rule T, 1, 4 (modus tollens)
6. c              Rule T, 3, 5
7. d → ¬c         Rule P
8. ¬d             Rule T, 6, 7 (modus tollens)
9. a → ¬d         Rule CP, 1, 8</pre>` },

{ u:3, m:8, t:"Inconsistent premises — the Rama problem and others", items:[
  {p:"d23", q:"28", m:15, x:"Show that the following set of statements is inconsistent: If Rama gets his degree, he will go for a job. If he goes for a job, he will get married. If he goes for higher studies, he will not get married. Rama gets his degree and goes for higher study."},
  {p:"m25", q:"23a", x:"Show that the following set of premises are inconsistent. If Rama gets his degree, he will go for a job. If he gets a job he will get married soon. If he goes for higher study he will not get married. Rama gets his degree and goes for higher study."},
  {p:"jl25a", q:"23a", x:"Prove that the following set of premises is inconsistent. (i) If Rama gets his degree, he will go for a job. (ii) If he goes for a job, he will get married soon. (iii) If he goes for higher study, he will not get married. (iv) Rama gets his degree and goes for higher study."},
  {p:"jl25b", q:"23b", x:"Show that the following set of premises is inconsistent: If Rama gets his degree, he will go for a job. If he goes for a job, he will get married soon. If he goes for higher study, he will not get married. Rama gets his degree and goes for higher study."},
  {p:"m24", q:"23b", x:"Prove that the premises p → q, q → r, s → ¬r and p ∧ s are inconsistent."}
], a: `
<p>A set of premises is <b>inconsistent</b> if their conjunction implies a contradiction (F). Derive some formula and its negation.</p>
<p><b>Rama</b> (Dec 2023, May 2025, Jul 2025 · I, Jul 2025 · II). d: Rama gets his degree, j: he goes for a job, m: he gets married, h: he goes for higher study. Premises: d → j, j → m, h → ¬m, d ∧ h.</p>
<pre>1. d ∧ h          Rule P
2. d              Rule T, 1 (simplification)
3. h              Rule T, 1
4. d → j          Rule P
5. j              Rule T, 2, 4 (modus ponens)
6. j → m          Rule P
7. m              Rule T, 5, 6
8. h → ¬m         Rule P
9. ¬m             Rule T, 3, 8
10. m ∧ ¬m        Rule T, 7, 9 — contradiction (F)</pre>
<p>Hence the premises are inconsistent. For 15 marks (Dec 2023) also write the definition of inconsistency, the rules P and T, and the symbol table above.</p>
<p><b>p → q, q → r, s → ¬r, p ∧ s</b> (May 2024)</p>
<pre>1. p ∧ s     Rule P
2. p         Rule T, 1
3. s         Rule T, 1
4. p → q     Rule P
5. q         Rule T, 2, 4
6. q → r     Rule P
7. r         Rule T, 5, 6
8. s → ¬r    Rule P
9. ¬r        Rule T, 3, 8
10. r ∧ ¬r   Rule T, 7, 9 — contradiction</pre>` },

{ u:3, m:8, t:"Mathematical induction", items:[
  {p:"m25", q:"23b", x:"Prove by mathematical induction n³ + 2n is divisible by 3, for n ≥ 1."},
  {p:"jl25a", q:"23b", x:"Use mathematical induction to prove that 8ⁿ − 3ⁿ is divisible by 5, for n ≥ 1."},
  {p:"jl25b", q:"23a", x:"Use mathematical induction to prove that (3ⁿ + 7ⁿ − 2) is divisible by 8 for n ≥ 1."},
  {p:"m26", q:"23b", x:"Prove by mathematical induction that 1/(1·2) + 1/(2·3) + 1/(3·4) + … + 1/(n(n+1)) = n/(n+1)."}
], a: `
<p><b>Principle.</b> If P(1) is true (basis) and P(k) ⇒ P(k + 1) for every k ≥ 1 (inductive step), then P(n) is true for all n ≥ 1.</p>
<p><b>n³ + 2n divisible by 3</b> (May 2025). Basis: 1 + 2 = 3. Assume k³ + 2k = 3m. Then (k + 1)³ + 2(k + 1) = k³ + 3k² + 3k + 1 + 2k + 2 = (k³ + 2k) + 3(k² + k + 1) = 3m + 3(k² + k + 1) = 3(m + k² + k + 1). Divisible by 3.</p>
<p><b>8ⁿ − 3ⁿ divisible by 5</b> (Jul 2025 · I). Basis: 8 − 3 = 5. Assume 8<sup>k</sup> − 3<sup>k</sup> = 5m. Then 8<sup>k+1</sup> − 3<sup>k+1</sup> = 8·8<sup>k</sup> − 3·3<sup>k</sup> = 8(8<sup>k</sup> − 3<sup>k</sup>) + 8·3<sup>k</sup> − 3·3<sup>k</sup> = 8·5m + 5·3<sup>k</sup> = 5(8m + 3<sup>k</sup>).</p>
<p><b>3ⁿ + 7ⁿ − 2 divisible by 8</b> (Jul 2025 · II). Basis: 3 + 7 − 2 = 8. Assume 3<sup>k</sup> + 7<sup>k</sup> − 2 = 8m. Then 3<sup>k+1</sup> + 7<sup>k+1</sup> − 2 = 3·3<sup>k</sup> + 7·7<sup>k</sup> − 2 = 3(3<sup>k</sup> + 7<sup>k</sup> − 2) + 4·7<sup>k</sup> + 4 = 24m + 4(7<sup>k</sup> + 1). 7<sup>k</sup> is odd, so 7<sup>k</sup> + 1 is even and 4(7<sup>k</sup> + 1) is a multiple of 8. Divisible by 8.</p>
<p><b>Σ 1/(k(k+1)) = n/(n+1)</b> (May 2026). Basis: 1/(1·2) = 1/2 = 1/(1 + 1). Assume the sum up to k is k/(k + 1). Adding the next term: k/(k + 1) + 1/((k + 1)(k + 2)) = (k(k + 2) + 1)/((k + 1)(k + 2)) = (k + 1)²/((k + 1)(k + 2)) = (k + 1)/(k + 2). That is the formula for n = k + 1.</p>` },

{ u:3, m:8, t:"Truth tables, equivalences and duals", items:[
  {p:"n24", q:"23b", x:"i) Construct the truth table for (P → (Q → R)) → ((P → Q) → (P → R)). (4 marks) ii) Prove the equivalence without using truth tables: p → (q → p) ≡ ¬p → (p → q). (4 marks)"},
  {p:"n25", q:"23a", x:"(i) Write down the dual of the following equivalence and prove the duals without using a truth table: ¬(p ∧ q) → (¬p ∨ (¬p ∨ q)) ≡ (¬p ∨ q). (4 marks) (ii) Use mathematical induction to prove that 2ⁿ < n! for every integer n ≥ 4. (4 marks)"}
], a: `
<p><b>Nov 2024 (i).</b> Let X = P → (Q → R), Y = (P → Q) → (P → R).</p>
<div class="tw"><table class="bits"><tr><th>P</th><th>Q</th><th>R</th><th>Q→R</th><th>X</th><th>P→Q</th><th>P→R</th><th>Y</th><th>X→Y</th></tr>
<tr><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr>
<tr><td>T</td><td>T</td><td>F</td><td>F</td><td>F</td><td>T</td><td>F</td><td>F</td><td>T</td></tr>
<tr><td>T</td><td>F</td><td>T</td><td>T</td><td>T</td><td>F</td><td>T</td><td>T</td><td>T</td></tr>
<tr><td>T</td><td>F</td><td>F</td><td>T</td><td>T</td><td>F</td><td>F</td><td>T</td><td>T</td></tr>
<tr><td>F</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr>
<tr><td>F</td><td>T</td><td>F</td><td>F</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr>
<tr><td>F</td><td>F</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr>
<tr><td>F</td><td>F</td><td>F</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr></table></div>
<p>The last column is all T: the formula is a <b>tautology</b>.</p>
<p><b>Nov 2024 (ii).</b> Use a → b ≡ ¬a ∨ b.</p>
<pre>p → (q → p)  ≡ ¬p ∨ (¬q ∨ p) ≡ (¬p ∨ p) ∨ ¬q ≡ T ∨ ¬q ≡ T
¬p → (p → q) ≡ p ∨ (¬p ∨ q)  ≡ (p ∨ ¬p) ∨ q ≡ T ∨ q  ≡ T</pre>
<p>Both sides are tautologies, so they are equivalent.</p>
<p><b>Nov 2025 (i).</b> First remove →: ¬(p ∧ q) → (¬p ∨ (¬p ∨ q)) ≡ (p ∧ q) ∨ (¬p ∨ q). The <b>dual</b> swaps ∧ and ∨ (and T and F): <b>(p ∨ q) ∧ (¬p ∧ (¬p ∧ q)) ≡ ¬p ∧ q</b>.</p>
<pre>Original: (p ∧ q) ∨ ¬p ∨ q ≡ ((p ∨ ¬p) ∧ (q ∨ ¬p)) ∨ q ≡ (¬p ∨ q) ∨ q ≡ ¬p ∨ q
Dual:     (p ∨ q) ∧ ¬p ∧ q ≡ ((p ∧ ¬p) ∨ (q ∧ ¬p)) ∧ q ≡ (¬p ∧ q) ∧ q ≡ ¬p ∧ q</pre>
<p><b>Nov 2025 (ii) 2ⁿ &lt; n! for n ≥ 4.</b> Basis n = 4: 16 &lt; 24. Assume 2<sup>k</sup> &lt; k! for some k ≥ 4. Then 2<sup>k+1</sup> = 2·2<sup>k</sup> &lt; 2·k! &lt; (k + 1)·k! = (k + 1)!, since k + 1 ≥ 5 > 2.</p>` },

/* ================= UNIT 4 ================= */
{ u:4, m:8, t:"Group (and ring) proofs for a given operation", items:[
  {p:"jl24", q:"24a", x:"If * is defined on R such that a*b = a + b − ab for a, b ∈ R then show that {R, *} is an abelian group."},
  {p:"m25", q:"24a", x:"If * is defined on R such that a*b = a + b − ab for a, b ∈ R then show that {R, *} is an abelian group."},
  {p:"n25", q:"24a", x:"Prove that {R − {1}, *} where * is defined by a * b = a + b − ab is an abelian group."},
  {p:"n24", q:"24a", x:"Show that the set of all positive rational numbers forms an abelian group under the binary operation * defined by a * b = (ab)/2, for a, b ∈ Q⁺."},
  {p:"m26", q:"24a", x:"If * is defined on Q⁺ such that a * b = ab/3, for a, b ∈ Q⁺, show that (Q⁺, *) is an abelian group."},
  {p:"jl25a", q:"24a", x:"Show that (Z, +, ·) is a commutative ring with identity where the operations + and · are defined for any a, b ∈ Z as a + b = a + b − 1 and a · b = a + b − ab."}
], a: `
<p><b>Abelian group checklist:</b> (1) closure, (2) associativity, (3) identity e with a*e = a, (4) every a has an inverse a⁻¹ with a*a⁻¹ = e, (5) commutativity a*b = b*a.</p>
<p><b>a * b = a + b − ab</b> (Jul 2024, May 2025, Nov 2025). Work on <b>R − {1}</b> (on all of R the element 1 has no inverse, so the papers that say R mean R − {1}).</p>
<ul><li><b>Closure:</b> a * b = 1 − (1 − a)(1 − b). If a, b ≠ 1 then (1 − a)(1 − b) ≠ 0, so a * b ≠ 1.</li>
<li><b>Associative:</b> (a * b) * c = a + b + c − ab − bc − ca + abc = a * (b * c) (expand both; symmetric in a, b, c).</li>
<li><b>Identity:</b> a * e = a + e − ae = a ⇒ e(1 − a) = 0 ⇒ e = 0.</li>
<li><b>Inverse:</b> a + a′ − aa′ = 0 ⇒ a′ = a/(a − 1), defined because a ≠ 1, and a′ ≠ 1.</li>
<li><b>Commutative:</b> a + b − ab = b + a − ba.</li></ul>
<p><b>a * b = ab/2 on Q⁺</b> (Nov 2024). Closure: ab/2 ∈ Q⁺. Associative: (a*b)*c = (ab/2)c/2 = abc/4 = a*(b*c). Identity: ae/2 = a ⇒ <b>e = 2</b>. Inverse: aa′/2 = 2 ⇒ <b>a′ = 4/a</b> ∈ Q⁺. Commutative: ab/2 = ba/2.</p>
<p><b>a * b = ab/3 on Q⁺</b> (May 2026). Same steps: associative (abc/9), identity <b>e = 3</b>, inverse <b>a′ = 9/a</b>, commutative.</p>
<p><b>Ring (Z, ⊕, ⊙) with a ⊕ b = a + b − 1, a ⊙ b = a + b − ab</b> (Jul 2025 · I).</p>
<ul><li>(Z, ⊕) is an abelian group: closed, associative ((a ⊕ b) ⊕ c = a + b + c − 2), identity 1 (a + 1 − 1 = a), inverse 2 − a, commutative.</li>
<li>⊙ is closed, associative (a + b + c − ab − bc − ca + abc both ways) and commutative; identity for ⊙ is 0 (a + 0 − 0 = a).</li>
<li>Distributive: a ⊙ (b ⊕ c) = a + (b + c − 1) − a(b + c − 1) = 2a + b + c − ab − ac − 1 = (a ⊙ b) ⊕ (a ⊙ c).</li></ul>
<p>So it is a commutative ring with identity (zero element 1, unity 0).</p>` },

{ u:4, m:8, t:"Subgroups and cyclic groups — the key theorems", items:[
  {p:"d23", q:"25", m:10, x:"State and prove the necessary and sufficient condition for a subset to be a subgroup of a group."},
  {p:"m24", q:"24a", x:"Prove that the necessary and sufficient condition for a non empty subset H of a group (G,*) to be a subgroup is a, b ∈ H ⇒ a * b⁻¹ ∈ H."},
  {p:"n24", q:"24b", x:"Prove that every subgroup of a cyclic group is again cyclic."},
  {p:"jl25b", q:"24a", x:"Prove that every subgroup of a cyclic group is cyclic."}
], a: `
<p><b>Theorem 1</b> (Dec 2023, May 2024). A non-empty subset H of a group (G, *) is a subgroup ⇔ a, b ∈ H ⇒ a * b⁻¹ ∈ H.</p>
<p><i>Necessary.</i> If H is a subgroup and a, b ∈ H, then b⁻¹ ∈ H (inverses) and a * b⁻¹ ∈ H (closure).</p>
<p><i>Sufficient.</i> Suppose the condition holds. (1) <b>Identity:</b> take a ∈ H; a * a⁻¹ = e ∈ H. (2) <b>Inverse:</b> for b ∈ H, e * b⁻¹ = b⁻¹ ∈ H. (3) <b>Closure:</b> for a, b ∈ H, b⁻¹ ∈ H, so a * (b⁻¹)⁻¹ = a * b ∈ H. (4) <b>Associativity</b> is inherited from G. So H is a subgroup.</p>
<p><b>Theorem 2</b> (Nov 2024, Jul 2025 · II). Every subgroup of a cyclic group is cyclic.</p>
<p><i>Proof.</i> Let G = ⟨a⟩ and H a subgroup. If H = {e}, H = ⟨e⟩ is cyclic. Otherwise H contains some a<sup>k</sup> with k ≠ 0, and then also a<sup>−k</sup>, so H contains a positive power of a. Let m be the <b>smallest</b> positive integer with a<sup>m</sup> ∈ H. Claim H = ⟨a<sup>m</sup>⟩. Take any a<sup>t</sup> ∈ H and divide: t = qm + r, 0 ≤ r &lt; m. Then a<sup>r</sup> = a<sup>t</sup> · (a<sup>m</sup>)<sup>−q</sup> ∈ H (closure). By the minimality of m, r = 0. So a<sup>t</sup> = (a<sup>m</sup>)<sup>q</sup>, and every element of H is a power of a<sup>m</sup>. Hence H is cyclic.</p>` },

{ u:4, m:8, t:"Permutation groups", items:[
  {p:"d23", q:"23", m:10, x:"Let G be a set of permutations defined on {1,2,3}. Then prove that G is a group under composition."},
  {p:"m25", q:"24b", x:"If the permutations of the elements of {1,2,3,4,5} are given by α = (1 2 3 4 5 / 2 3 1 4 5), β = (1 2 3 4 5 / 1 2 3 5 4), γ = (1 2 3 4 5 / 5 4 3 1 2), δ = (1 2 3 4 5 / 3 2 1 5 4), find αβ, βα, α², αβγ."}
], a: `
<p><b>S<sub>3</sub> is a group</b> (Dec 2023). The six permutations of {1,2,3}: p<sub>1</sub> = identity, p<sub>2</sub> = (1 2 3 → 2 3 1), p<sub>3</sub> = (1 2 3 → 3 1 2), p<sub>4</sub> = (1 2 3 → 1 3 2), p<sub>5</sub> = (1 2 3 → 3 2 1), p<sub>6</sub> = (1 2 3 → 2 1 3).</p>
<ul><li><b>Closure:</b> a composition of two bijections of {1,2,3} is again a bijection of {1,2,3}, i.e. one of the six. (Write the 6 × 6 composition table: every entry is some p<sub>i</sub>.)</li>
<li><b>Associative:</b> composition of functions is associative.</li>
<li><b>Identity:</b> p<sub>1</sub>.</li>
<li><b>Inverses:</b> p<sub>2</sub>⁻¹ = p<sub>3</sub>, p<sub>3</sub>⁻¹ = p<sub>2</sub>; p<sub>4</sub>, p<sub>5</sub>, p<sub>6</sub> are their own inverses (they swap two elements).</li></ul>
<p>So (S<sub>3</sub>, ∘) is a group of order 6. It is not abelian: p<sub>2</sub>p<sub>4</sub> ≠ p<sub>4</sub>p<sub>2</sub>.</p>
<p><b>May 2025.</b> Product αβ means “first α, then β” (left to right, the usual convention in this course). In cycle notation α = (1 2 3), β = (4 5), γ = (1 5 2 4), δ = (1 3)(4 5).</p>
<ul><li><b>αβ</b>: 1 → 2 → 2, 2 → 3 → 3, 3 → 1 → 1, 4 → 4 → 5, 5 → 5 → 4. αβ = (1 2 3 4 5 / 2 3 1 5 4).</li>
<li><b>βα</b>: same result (α and β move disjoint elements), βα = (1 2 3 4 5 / 2 3 1 5 4).</li>
<li><b>α²</b> = α∘α: 1 → 3, 2 → 1, 3 → 2: α² = (1 2 3 4 5 / 3 1 2 4 5).</li>
<li><b>αβγ</b> = (αβ) then γ: 1 → 2 → 4, 2 → 3 → 3, 3 → 1 → 5, 4 → 5 → 2, 5 → 4 → 1: αβγ = (1 2 3 4 5 / 4 3 5 2 1).</li></ul>` },

{ u:4, m:8, t:"Group codes — code words from a parity check or generator matrix", items:[
  {p:"m24", q:"24b", x:"Find the code words generated by the parity check matrix H = [1 1 0; 0 1 1; 1 0 0; 0 1 0; 0 0 1], when the encoding function is R : B³ → B⁵."},
  {p:"jl25a", q:"24b", x:"Let H = [0 1 1; 0 1 1; 1 0 0; 0 1 0; 0 0 1] be a parity check matrix. Determine the (2,5) group code function e_H : B² → B⁵."},
  {p:"jl24", q:"24b", x:"Find the code words generated by the encoding function R : B³ → B⁶ with respect to the generator matrix G = [1 0 0 1 1 1; 0 1 0 1 0 1; 0 0 1 0 1 1]."},
  {p:"jl25b", q:"24b", x:"Find the code words generated by the encoding function e : B³ → B⁶ with respect to parity check matrix H = [1 1 1; 1 0 1; 0 1 1; 1 0 0; 0 1 0; 0 0 1]."},
  {p:"m26", q:"24b", x:"Find the code words generated by the encoding function e : B³ → B⁶ with respect to the parity check matrix H = [1 1 1; 1 0 1; 0 1 1; 1 0 0; 0 1 0; 0 0 1]."},
  {p:"n25", q:"24b", x:"Find the code words generated by the parity check matrix H = [1 1 0 1 0 0; 1 0 1 0 1 0; 0 1 1 0 0 1], when the encoding function is e : B³ → B⁶."},
  {p:"n24", q:"27", m:15, x:"a) Find the minimum distance between the codes x = 10110, y = 11110, z = 10011. (3 marks) b) Find the code words generated by the parity check matrix H = [1 1 1; 1 0 1; 0 1 1; 1 0 0; 0 1 0; 0 0 1] when the encoding function is e : B³ → B⁶. (12 marks)"}
], a: `
<p><b>Group code from H.</b> H = [A ; I<sub>r</sub>] (n × r). A message b = b<sub>1</sub>…b<sub>k</sub> is sent as e<sub>H</sub>(b) = b<sub>1</sub>…b<sub>k</sub>x<sub>1</sub>…x<sub>r</sub>, where the check bits satisfy x = b·A (mod 2). These code words form a group under ⊕ (they are exactly the words w with w·H = 0).</p>
<p><b>Hamming distance</b> d(x, y) = number of places where x and y differ; the weight |x| is the number of 1s. <b>Minimum distance</b> of a code = smallest distance between two different code words; the code detects k errors if it is ≥ k + 1 and corrects k errors if it is ≥ 2k + 1.</p>
<p><b>Nov 2024 (a).</b> d(x, y) = |10110 ⊕ 11110| = |01000| = 1; d(x, z) = |00101| = 2; d(y, z) = |01101| = 3. <b>Minimum distance = 1.</b></p>
<p><b>H = [111; 101; 011; 100; 010; 001]</b> (Nov 2024 (b), Jul 2025 · II, May 2026)</p>` + G.c_H3 + `
<p><b>May 2024</b></p>` + G.c_m2 + `
<p><b>Jul 2025 · I</b></p>` + G.c_m6 + `
<p><b>Nov 2025</b></p>` + G.c_m8 + `
<p><b>Jul 2024 — from the generator matrix G</b></p>` + G.c_m3 },

{ u:4, m:15, t:"Generator matrix → parity check matrix → decode received words", items:[
  {p:"m24", q:"27", x:"Find the code words generated by the generator matrix G = [1 0 0 1 1; 0 1 1 1 0], find the corresponding parity check matrix and use it to decode the following received words and hence find the original message. Are all the words decoded uniquely? (i) 11110 (ii) 11101 (iii) 11011 (iv) 10101 (v) 10011 (vi) 11111 (vii) 01100"},
  {p:"jl24", q:"27", x:"Find the code words generated by the generator matrix G = [1 0 1 1 0; 0 1 0 1 1], find the corresponding parity check matrix and use it to decode the following received words and hence, to find the original message. Are all the words decoded uniquely? (i) 11101 (ii) 11011 (iii) 11010"},
  {p:"jl25a", q:"26", x:"Given the generator matrix G = [1 0 0 0 1 1 0; 0 1 0 0 1 0 1; 0 0 1 0 0 1 1; 0 0 0 1 1 1 1] corresponding to the encoding function e_G : B⁴ → B⁷, find the corresponding parity check matrix and use it to decode the following received words and hence to find the original message: 1100001, 1110111, 0010001, 0011100."},
  {p:"jl25b", q:"27", x:"Given the generator matrix G = [1 0 0 0 1 1 0; 0 1 0 0 1 0 1; 0 0 1 0 0 1 1; 0 0 0 1 1 1 1] corresponding to the encoding function e_G : B⁴ → B⁷, find the corresponding parity check matrix and use it to decode the following received words and hence to find the original message: 1100001, 1110111, 0010001, 0011100."},
  {p:"m26", q:"27", x:"Given the generator matrix G = [1 0 0 1 1 0; 0 1 0 0 1 1; 0 0 1 1 0 1] corresponding to the encoding function e : B³ → B⁶, find the corresponding parity check matrix and use it to decode the following received words and hence, to find the original message. Are all the words decoded uniquely? (i) 110101 (ii) 001111 (iii) 110001 (iv) 111111"}
], a: `
<p><b>Method.</b> (1) Code words = b·G for every message b. (2) G = [I<sub>k</sub> | A] ⇒ parity check matrix H = [A<sup>T</sup> | I<sub>n−k</sub>]. (3) For a received word w compute the syndrome H·w<sup>T</sup>. Zero ⇒ no error. Equal to column i of H ⇒ the error is in bit i, flip it. (4) The original message is the first k bits of the corrected word.</p>
<p><b>May 2024 Q27</b></p>` + G.d_m2 + `
<p><b>Jul 2024 Q27</b></p>` + G.d_m3 + `
<p><b>Jul 2025 · I Q26 and Jul 2025 · II Q27</b> (the same question; this is the (7,4) Hamming code, which corrects every single error)</p>` + G.d_m6 + `
<p><b>May 2026 Q27</b></p>` + G.d_m9 },

/* ================= UNIT 5 ================= */
{ u:5, m:8, t:"Kruskal's algorithm — minimum spanning tree", items:[
  {p:"d23", q:"27", m:15, x:"Find the minimum spanning tree for the following weighted graph using Kruskal's algorithm. (Figure: A B C top row, D E F middle, G H I bottom; AB 5, BC 4, AD 2, DB 3, BE 5, BF 6, CF 3, DE 7, EF 1, DG 6, DH 8, EH 3, HF 4, FI 4, GH 4, HI 3.)"},
  {p:"m25", q:"27", m:15, x:"Use Kruskal's algorithm to find a minimum spanning tree for the following weighted graph. (Figure: AB 5, BC 4, AD 2, DB 3, BE 5, BF 6, CF 3, DE 7, EF 1, DG 6, DH 8, EH 3, HF 4, FI 4, GH 4, HI 2.)"},
  {p:"jl24", q:"25b", x:"Use Kruskal's algorithm to find a minimum spanning tree for the following weighted graph. (Figure: same 9-vertex graph as May 2025 Q27 with the middle row labelled F, E, D.)"},
  {p:"m24", q:"25b", x:"Find the minimum spanning tree for the following weighted graph using Kruskal's algorithm. (Figure: hexagon A B C D E F with centre G; AB 20, BC 15, CD 3, DE 17, EF 29, FA 23; AG 1, BG 4, CG 9, DG 16, EG 25, FG 40.)"},
  {p:"n24", q:"25b", x:"Find the minimum spanning tree of the following weighted graph using Kruskal's algorithm. Also find the minimum total weight of the spanning tree. (Figure: AB 16, AF 21, AE 19, BF 11, BC 5, BD 6, CD 10, FD 14, FE 40, ED 18.)"},
  {p:"jl25a", q:"25b", x:"Find the minimum spanning tree for the weighted graph using Kruskal's algorithm. Also determine the minimum total weight. (Figure: same graph as Nov 2024 Q25b.)"},
  {p:"jl25b", q:"25a", x:"Find the minimum spanning tree for the following weighted graph using Kruskal's algorithm. (Figure: AB 4, AE 8, BE 11, BC 8, CF 2, EF 7, FG 6, EG 1, CH 4, CD 7, DH 14, DJ 9, HJ 10, GH 2.)"},
  {p:"n25", q:"25b", x:"Use Kruskal's algorithm to find a minimum spanning tree for the weighted graph. (Figure: 3 × 4 grid A–D / E–H / I–L.)"},
  {p:"m26", q:"25b", x:"Find the minimum spanning tree of the weighted graph using Kruskal's algorithm. (Figure: vertices A–F; AB 5, AC 1, BF 2, CD 3, DE 5, AE 4, BD 4, EF 6.)"}
], a: `
<p><b>Kruskal's algorithm.</b> (1) Sort all edges by weight. (2) Take the cheapest edge that does not form a cycle with the edges already chosen. (3) Repeat until n − 1 edges are chosen. The result is a minimum spanning tree. Ties may be taken in any order (the total weight is the same).</p>
<p><b>9-vertex graph, HI = 2</b> (May 2025 Q27, Jul 2024 Q25b)</p>` + G.k_9_2 + `
<p><b>9-vertex graph, HI = 3</b> (Dec 2023 Q27)</p>` + G.k_9_3 + `
<p><b>Hexagon with centre G</b> (May 2024)</p>` + G.k_hex + `
<p><b>6-vertex graph A–F</b> (Nov 2024, Jul 2025 · I)</p>` + G.k_6 + `
<p><b>Jul 2025 · II</b> (the classic 9-vertex textbook graph)</p>` + G.k_clrs + `
<p><b>Grid graph</b> (Nov 2025)</p>` + G.k_grid + `
<p><b>May 2026</b></p>` + G.k_m26 },

{ u:5, m:8, t:"Edge bounds — disconnected graphs and bipartite graphs", items:[
  {p:"m24", q:"25a", x:"Prove that the maximum number of edges in a simple disconnected graph G with n vertices and k components is (n − k)(n − k + 1)/2."},
  {p:"jl25a", q:"25a", x:"Prove that the maximum number of edges in a simple disconnected graph G with n vertices and k components is (n − k)(n − k + 1)/2."},
  {p:"jl25b", q:"25b", x:"Prove that maximum number of edges in a simple disconnected graph G with n vertices and k components is (n − k)(n − k + 1)/2."},
  {p:"m26", q:"25a", x:"Let G be a simple graph with n vertices and k connected components. Then prove that the maximum number of edges in G is (n − k)(n − k + 1)/2."},
  {p:"n24", q:"25a", x:"Prove that the maximum number of edges in a bipartite graph with n vertices is at most (n/2)²."},
  {p:"n25", q:"25a", x:"(i) Prove that the number of edges in a bipartite graph with n vertices is at most n²/4. (4 marks) (ii) Determine whether the graphs G and H are isomorphic. (4 marks) (Figure: G on U1…U5 with edges U1U3, U1U4, U1U5, U2U3, U2U5, U3U4; H on V1…V5 with edges V1V2, V1V3, V1V5, V2V3, V3V4, V4V5.)"}
], a: `
<p><b>Theorem</b> (May 2024, Jul 2025 · I, Jul 2025 · II, May 2026). A simple graph with n vertices and k components has at most (n − k)(n − k + 1)/2 edges.</p>
<p><i>Proof.</i> Let the components have n<sub>1</sub>, …, n<sub>k</sub> vertices, n<sub>1</sub> + … + n<sub>k</sub> = n, each n<sub>i</sub> ≥ 1. A simple component with n<sub>i</sub> vertices has at most n<sub>i</sub>(n<sub>i</sub> − 1)/2 edges (complete graph). So</p>
<p class="f">edges ≤ ½ Σ n<sub>i</sub>(n<sub>i</sub> − 1) = ½ (Σ n<sub>i</sub>² − n).</p>
<p>Now Σ (n<sub>i</sub> − 1) = n − k. Squaring, (Σ (n<sub>i</sub> − 1))² = Σ (n<sub>i</sub> − 1)² + (cross terms ≥ 0), so Σ (n<sub>i</sub> − 1)² ≤ (n − k)². Expanding the left side: Σ n<sub>i</sub>² − 2n + k ≤ (n − k)², i.e. Σ n<sub>i</sub>² ≤ (n − k)² + 2n − k. Therefore</p>
<p class="f">edges ≤ ½ [(n − k)² + 2n − k − n] = ½ [(n − k)² + (n − k)] = (n − k)(n − k + 1)/2.</p>
<p>Equality: k − 1 isolated vertices and one complete graph K<sub>n−k+1</sub>.</p>
<p><b>Bipartite graph: at most n²/4 edges</b> (Nov 2024, Nov 2025). Let the parts have x and n − x vertices. The most edges is when every vertex of one part is joined to every vertex of the other: x(n − x). Now x(n − x) = n²/4 − (x − n/2)² ≤ n²/4, with equality at x = n/2. So |E| ≤ (n/2)² = n²/4.</p>
<p><b>Nov 2025 (ii) isomorphism.</b> Both graphs have 5 vertices and 6 edges, and degree sequence (3, 3, 2, 2, 2). In G the degree-3 vertices U1, U3 are adjacent; in H, V1 and V3 are adjacent. Mapping U1 → V1, U3 → V3, U4 → V2, U2 → V4, U5 → V5 sends every edge to an edge: U1U3 → V1V3, U1U4 → V1V2, U1U5 → V1V5, U2U3 → V4V3, U2U5 → V4V5, U3U4 → V3V2. So <b>G and H are isomorphic</b>.</p>` },

{ u:5, m:8, t:"Graph isomorphism", items:[
  {p:"jl24", q:"25a", x:"Determine whether the following graphs are isomorphic, explain, and also find the adjacency matrix for G1 and G2. (Figure: G1 on 1…8 and G2 on a…h, each an outer square joined to an inner square.)"},
  {p:"m25", q:"25b", x:"Determine whether the following graphs are isomorphic or not. (Figure: G1 = outer rectangle A B C D with inner rectangle E F G H and edges BF, DH; G2 = outer rectangle O P Q R with inner rectangle S T U V and edges OS, RV.)"}
], a: `
<p><b>Isomorphism test.</b> Two graphs are isomorphic if there is a one-to-one correspondence of vertices that preserves adjacency. Necessary (invariant) checks: same number of vertices, edges, degree sequence, and the same pattern of adjacency among vertices of each degree. If an invariant differs, they are not isomorphic; if they agree, exhibit the mapping.</p>
<p><b>Jul 2024.</b> G1: outer square 1–2–3–8 and inner square 6–5–4–7 joined by 1–6, 2–5, 3–4, 8–7. G2 has the same shape: outer square a–d–c–h, inner square b–e–f–g, joined by a–b, d–e, c–f, h–g. (The figure prints the bottom-left vertex of G2 as “b” again; it is a separate vertex, called h here.) Both have 8 vertices, 12 edges, every degree 3, and both are the cube graph. The mapping 1 → a, 2 → d, 3 → c, 8 → h, 6 → b, 5 → e, 4 → f, 7 → g preserves every edge, so <b>G1 ≅ G2</b>. The adjacency matrices are then equal when rows and columns are written in the matched order:</p>
<pre>      1 2 3 4 5 6 7 8          a d c f e b g h
  1   0 1 0 0 0 1 0 1      a   0 1 0 0 0 1 0 1
  2   1 0 1 0 1 0 0 0      d   1 0 1 0 1 0 0 0
  3   0 1 0 1 0 0 0 1      c   0 1 0 1 0 0 0 1
  4   0 0 1 0 1 0 1 0      f   0 0 1 0 1 0 1 0
  5   0 1 0 1 0 1 0 0      e   0 1 0 1 0 1 0 0
  6   1 0 0 0 1 0 1 0      b   1 0 0 0 1 0 1 0
  7   0 0 0 1 0 1 0 1      g   0 0 0 1 0 1 0 1
  8   1 0 1 0 0 0 1 0      h   1 0 1 0 0 0 1 0</pre>
<p><b>May 2025.</b> Both graphs have 8 vertices, 10 edges and degree sequence (3, 3, 3, 3, 2, 2, 2, 2). Look at the degree-3 vertices: in G1 they are B, D, F, H and each has <b>exactly one</b> degree-3 neighbour (B–F, D–H). In G2 they are O, R, S, V, and O is adjacent to <b>two</b> degree-3 vertices (R and S). Adjacency between degree-3 vertices is preserved by any isomorphism, so <b>G1 and G2 are not isomorphic</b>.</p>` },

{ u:5, m:8, t:"Degrees, handshaking theorem and Eulerian graphs", items:[
  {p:"d23", q:"26", m:10, x:"(a) State and prove the handshaking theorem and also verify the theorem for the following graph. (Figure: house shape A, B, C with square A B E D and diagonals AE, BD meeting at F.) (b) Define Eulerian graph and give one example."},
  {p:"m25", q:"25a", x:"Find the number of vertices, the number of edges and the degree of each vertex from the following graph. Also verify the handshaking theorem. (Figure: vertices A, B, C, D, E, F.)"}
], a: `
<p><b>Handshaking theorem.</b> In any graph, Σ deg(v) = 2|E|.</p>
<p><i>Proof.</i> Every edge has two ends and contributes exactly 1 to the degree of each end (a loop contributes 2 to its vertex). So adding all degrees counts every edge twice. <b>Corollary:</b> the number of odd-degree vertices is even (the sum of degrees is even).</p>
<p><b>Dec 2023.</b> Vertices A, B, C, D, E, F (F is the crossing point of the diagonals). Edges: CA, CB, AB, AD, BE, DE, AF, FE, BF, FD — 10 edges. Degrees: A 4, B 4, C 2, D 3, E 3, F 4. Sum = 4 + 4 + 2 + 3 + 3 + 4 = 20 = 2 × 10 ✓.</p>
<p><b>Eulerian graph:</b> a connected graph with a closed walk (Euler circuit) that uses every edge exactly once. A connected graph is Eulerian ⇔ every vertex has even degree. Example: a cycle C<sub>4</sub>, or K<sub>5</sub> (every degree 4).</p>
<p><b>May 2025.</b> As read from the figure: edges AB, AC, BC, BE, BD, CE, CD, ED, EF — <b>6 vertices, 9 edges</b>. Degrees: A 2, B 4, C 4, D 3, E 4, F 1. Sum = 18 = 2 × 9 ✓. Odd-degree vertices D and F: two of them, an even number, as the corollary says.</p>` }
];

// Mark each paper's part of a shared answer: a paragraph that starts with a bold heading and names a paper
// (in its first 90 characters) opens a section for those papers; the text before the first one is common to all.
(function () {
  const names = PAPERS.map(p => [p.k, new RegExp(p.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?!I)")]);
  TOPICS.forEach(t => {
    if (t.items.length < 2) return;
    const re = /<p>\s*<b>/g, cuts = []; let m;
    while ((m = re.exec(t.a))) {
      const end = t.a.indexOf("</p>", m.index), txt = t.a.slice(m.index, end).replace(/<[^>]+>/g, "").slice(0, 90);
      const ks = names.filter(([k, r]) => r.test(txt)).map(([k]) => k);
      if (ks.length) cuts.push([m.index, ks]);
    }
    if (!cuts.length) return;
    let out = t.a.slice(0, cuts[0][0]);
    cuts.forEach(([at, ks], i) => { out += '<div data-for="' + ks.join(",") + '">' + t.a.slice(at, i + 1 < cuts.length ? cuts[i + 1][0] : t.a.length) + "</div>"; });
    t.a = out;
  });
})();

const MCQ = {};
const MCQ_NOTES = [];
const FAMILIES = [
  [1, "Warshall's algorithm", ["Warshall"]],
  [1, "Set identities", ["Set identities"]],
  [1, "Posets and Hasse diagrams", ["Partial orders"]],
  [1, "Functions", ["Functions"]],
  [1, "Relations and relation matrices", ["Relations —"]],
  [1, "Minsets and maxsets", ["Minsets"]],
  [2, "Inclusion–exclusion", ["Inclusion"]],
  [2, "Euclidean algorithm", ["Euclidean"]],
  [2, "Pigeonhole and permutations", ["Pigeonhole"]],
  [3, "Inference (direct, indirect, CP)", ["Theory of inference"]],
  [3, "Inconsistent premises", ["Inconsistent"]],
  [3, "Mathematical induction", ["Mathematical induction"]],
  [3, "Truth tables, equivalences, duals", ["Truth tables"]],
  [4, "Group / ring proofs", ["Group (and ring)"]],
  [4, "Subgroup and cyclic group theorems", ["Subgroups and cyclic"]],
  [4, "Permutation groups", ["Permutation groups"]],
  [4, "Group codes", ["Group codes"]],
  [4, "Decoding with parity check matrix", ["Generator matrix"]],
  [5, "Kruskal's algorithm", ["Kruskal"]],
  [5, "Edge bounds", ["Edge bounds"]],
  [5, "Graph isomorphism", ["Graph isomorphism"]],
  [5, "Handshaking and Eulerian", ["Degrees, handshaking"]]
];
function familyOf(t) {
  for (const [u, name, keys] of FAMILIES) if (u === t.u && keys.some(k => t.t.includes(k))) return name;
  return null;
}

// Dr. E. Sujatha (Mathemagic) playlists: Set Theory, Number Theory, Mathematical Logics, Group Theory, Graph Theory.
// Each video: [number on this site, title, video id, playlist id, , position in its own playlist]
const PLAYLIST = (function () {
  const L = [
    ["PLFKQJwaciaEI", ["Basics of set theory|OSCLtKsoCTw","Operations on Set|KhpYVwz0DjM","Algebraic laws|VVFWYGy-doA","Analytical proof|VolwXEsXlOo","Relations|ewflsAASODY","Properties of relation|D84Chg_wJRM","Problems on relation|uPVhDMxa-h0","Relations as graphs|O88T8yxDlC0","Relation as matrix|1FnYA7Bz19Q","Closure of a relation|ueAvWLS1Tqo","Warshall's Algorithm|gMy2e3nw07s","Function - Introduction|9K9r-HrrkDo","Composition of functions|u7-IyndUcOo","Set Theory MCQ|F5IqRrmx6q4"]],
    ["PLaVz6oqdl57U", ["Calculator tip: nCr|F39DtjluXbk","Introduction - Permutation and Combination|EWLul2Qvr64","Problems in Permutation and Combinations|4RJyFOZq8-c","Principle of inclusion and exclusion|z03YrlHasdU","Pigeon hole principle|hAf-Dzqa2Kg","Divisibility|4sGg0GL-jKg","Euclid's algorithm|Qw-h7wzZoko","Division algorithm|CywUgjocGRI","Extended Euclid's algorithm|jXyXL13E-hk","Extended Euclid's algorithm (extension)|E1J-6ewac-I","Number Theory MCQ|15ozcsuDOdY"]],
    ["PLBzOUSeaoUHI", ["Proposition|j1V5-4Frjlo","Tautology, Contradiction and Contingency|QN8-qmkZ7LM","Converse, Contrapositive and Inverse|zE2X-tuUmbA","Problems using laws of proposition and equivalence|vQxMn48-rXU","More problems on equivalence - part 2|VrK9JT1ij1s","Theory of inference|OdrDYbmUGi0","Direct Method 1|V4XGg25UyOE","Theory of Inference - Direct Method 2|9nfiM_hgk6w","Indirect Method|daf2RkQWDZ8","Inconsistency|aoi3YXoobpA","Rule CP|5VwvFMWtxF8","Principle of Mathematical Induction|rylyZdjsfGg","Principle of mathematical induction - PMI 2|ORiw2101jNg","Principle of Mathematical Induction - PMI 3|auTWMu7J7n8","Problems on Mathematical Induction - PMI 4|mFfWaAHWu-Y","Mathematical Logics - MCQ|jEsAnrft4jk"]],
    ["PLPmc96b2iIS8", ["Introduction to group theory|Z2bYfNh8CpQ","Properties of group|AMmCoNnWjiE","Group Theory - Problem set 1|g6U3OO4p5Ls","Problems in finite group|JOu6hHL55VU","Subgroups|zIeudhxoGQc","Group Homomorphism|9D0wNSSuvxo","Permutation Groups - Part I|GaXWSae6kQY","Permutation Group - Part 2|6hvMhgnfmDA","Rings and Fields|4Iw8KmMfV7o","Rings and Fields - Problems|QV8UzU-pWME","Order of group and element|RYLTvBOXkfA","Cyclic groups|mN8NACbjtG8","Cyclic group - Addition Modulo 5|MN_fwS8hQ_I","MCQ in group theory and coding theory|ll523vnDPCo","Basics of Coding|bC0iolghqno","Basics of error correction using matrices|-RsK9aFPFgs","Encoding word - Part I|_FsBqBNP22c","Encoding words - Part II|o52qzyhlEYQ","Decoding received word - Part I|802T6ja2pgA"]],
    ["PLduVfXpbJagg", ["Trees|fIet7VVtRj0","Kruskal's Algorithm|OAqfiWupQPQ","Degree of a vertex|jGQzLAtAAc4","Bipartite graph|YosQBQLPZhc","Handshaking theorem|JdUG-ylsQC8","Graph Isomorphism|p1eANsLijsg","Paths, Circuits and Connectivity|5LxVeJ2Ov60","Eulerian and Hamiltonian|NjKXjP4PACY","MCQ Graph theory|Bx0Qc7XoXgk","Graph Colouring|chIFkMEeM30"]]
  ];
  const videos = []; let n = 0;
  // her playlists list the newest video first, so position = (count − index)
  L.forEach(([list, vs]) => vs.forEach((s, i) => { const [t, id] = s.split("|"); videos.push([++n, t, id, list, undefined, vs.length - i]); }));
  return {
    title: "Dr. E. Sujatha (Mathemagic): Set, Number, Logic, Group and Graph Theory playlists", list: "PLFKQJwaciaEI", videos,
    map: [
      ["Warshall", [11, 10, 9]],
      ["Set identities", [3, 4, 2]],
      ["Partial orders", [6, 8]],
      ["Functions", [12, 13]],
      ["Relations —", [9, 6, 7, 5]],
      ["Minsets", [2]],
      ["Inclusion", [18]],
      ["Euclidean", [21, 23, 24, 22]],
      ["Pigeonhole", [19, 17, 16]],
      ["Theory of inference", [31, 32, 33, 34, 36]],
      ["Inconsistent", [35]],
      ["Mathematical induction", [37, 38, 39, 40]],
      ["Truth tables", [27, 29, 30]],
      ["Group (and ring)", [42, 43, 44, 50, 51]],
      ["Subgroups and cyclic", [46, 53, 52]],
      ["Permutation groups", [48, 49]],
      ["Group codes", [56, 57, 58, 59]],
      ["Generator matrix", [60, 57, 58]],
      ["Kruskal", [62]],
      ["Edge bounds", [64, 67]],
      ["Graph isomorphism", [66]],
      ["Degrees, handshaking", [65, 63, 68]]
    ]
  };
})();

const SITE = {
  key: "dm", title: "Maths PYQ Hub", code: "SRM · 21MAB302T · Semester 5", h1: "Discrete Mathematics",
  lede: "Every 8, 10 and 15 mark question from nine end-semester papers, December 2023 to May 2026. Pick a unit, tap a question, read its worked answer.",
  marksIntro: "Marks printed across all nine papers, counting both options of every either/or question. Units follow the CO column printed beside each question: CO1 = Unit 1 … CO5 = Unit 5.",
  partC: "Seventeen 15 mark questions were set. Warshall's algorithm is one of the two choices in almost every paper; the other is usually a coding-theory decode.",
  plan: '<li><b>Warshall\'s algorithm</b> (Unit 1). A 15 mark option in 7 of 9 papers. Same steps every time.</li>' +
    '<li><b>Group codes and decoding</b> (Unit 4). Code words from H or G in every paper, and the decode question is the other 15 mark option.</li>' +
    '<li><b>Kruskal</b> (Unit 5) in every paper, and the <b>(n − k)(n − k + 1)/2</b> proof in 4 papers.</li>' +
    '<li><b>Inclusion–exclusion and Euclid</b> (Unit 2). One of them is in every paper; the numbers repeat (250 students, 512m + 320n, 12345 and 54321).</li>' +
    '<li><b>Rama inconsistency, inference proofs, induction</b> (Unit 3).</li>' +
    '<li><b>a * b = a + b − ab abelian group</b> and the <b>subgroup / cyclic</b> theorems (Unit 4), then <b>Hasse diagrams</b> and <b>functions</b> (Unit 1).</li>',
  sources: "Nine papers from thehelpers.tech (its “Jan 2024” link opens the same file as Dec 2023, so it is counted once). The December 2023 paper uses an older pattern: Part B has six 10 mark questions (answer any four) and Part C has Q27 and Q28. Every question is filed under the unit given by the CO column printed beside it. Figures are described in words where the question has a graph.",
  mcqSub: "",
  paperWord: "paper"
};
if (typeof module !== "undefined") module.exports = { PAPERS, UNITS, TOPICS, MCQ, FAMILIES, familyOf, PLAYLIST, SITE };
