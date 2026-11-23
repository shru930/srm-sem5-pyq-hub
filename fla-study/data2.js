const A_PDA_DEF = `<p>A <b>PDA</b> is P = (Q, Σ, Γ, δ, q<sub>0</sub>, Z<sub>0</sub>, F) with δ: Q × (Σ ∪ {ε}) × Γ → finite subsets of Q × Γ*. A move (q, a, X) → (p, γ) reads a, pops X and pushes γ. An <b>instantaneous description</b> is (state, remaining input, stack). Acceptance is by <b>final state</b> or by <b>empty stack</b>; the two are equivalent.</p>`;

const A_CFG2PDA = `<p><b>CFG to PDA (empty stack, one state q):</b> start with S on the stack. (1) For each production A → α: δ(q, ε, A) contains (q, α) — expand. (2) For each terminal a: δ(q, a, a) = (q, ε) — match and pop. The PDA simulates a leftmost derivation.</p>`;

const A_PDA2CFG = `<p><b>PDA to CFG (empty-stack PDA).</b> Variables are S and triples [q X p] meaning “starting in q with X on top, the PDA can pop X and end in p”.</p>
<ul>
<li>S → [q<sub>0</sub> Z<sub>0</sub> p] for every state p.</li>
<li>For δ(q, a, X) ∋ (r, ε): [q X r] → a.</li>
<li>For δ(q, a, X) ∋ (r, Y<sub>1</sub>Y<sub>2</sub>…Y<sub>k</sub>): [q X p<sub>k</sub>] → a [r Y<sub>1</sub> p<sub>1</sub>][p<sub>1</sub> Y<sub>2</sub> p<sub>2</sub>]…[p<sub>k−1</sub> Y<sub>k</sub> p<sub>k</sub>] for all choices of states p<sub>1</sub>…p<sub>k</sub>.</li>
</ul>
<p>Finally delete variables that have no productions or can never finish.</p>`;

const A_TM_DEF = `<p>A <b>Turing machine</b> is M = (Q, Σ, Γ, δ, q<sub>0</sub>, B, F): Q states, Σ input alphabet, Γ tape alphabet (Σ ⊂ Γ), δ: Q × Γ → Q × Γ × {L, R}, q<sub>0</sub> start state, B blank, F accepting states. An <b>instantaneous description</b> α q β shows the tape contents αβ with the head on the first symbol of β in state q. M halts when no move is defined.</p>`;

const A_PNP = `
<ul>
<li><b>Class P:</b> decision problems solved by a deterministic Turing machine in polynomial time O(nᵏ). Examples: sorting, shortest path (Dijkstra), minimum spanning tree, linear programming, primality testing, 2-SAT.</li>
<li><b>Class NP:</b> problems solved by a <b>non-deterministic</b> TM in polynomial time; equivalently, a proposed solution (certificate) can be <b>verified</b> in polynomial time. A non-deterministic algorithm has two stages: guess, then verify. Examples: SAT, Hamiltonian cycle, subset sum, clique, graph colouring. P ⊆ NP; whether P = NP is open.</li>
<li><b>Polynomial-time reduction</b> A ≤<sub>p</sub> B: a polynomial-time function f with x ∈ A ⇔ f(x) ∈ B. If B is easy then A is easy.</li>
<li><b>NP-hard:</b> every problem in NP reduces to it in polynomial time. It need not be in NP, and need not even be decidable. Examples: halting problem, optimisation version of travelling salesman, 0/1 knapsack optimisation.</li>
<li><b>NP-complete:</b> in NP <b>and</b> NP-hard — the hardest problems in NP. Examples: SAT (Cook–Levin theorem, the first), 3-SAT, clique, vertex cover, Hamiltonian cycle, TSP decision version, subset sum, graph 3-colouring.</li>
</ul>
<p><b>Relationship:</b> NP-complete = NP ∩ NP-hard. If any NP-complete problem has a polynomial algorithm then P = NP; if P ≠ NP then no NP-complete problem is in P (NP-complete ∩ P = ∅). To prove a new problem X NP-complete: (1) show X ∈ NP; (2) reduce a known NP-complete problem to X in polynomial time.</p>
<p><b>Diagram:</b> a large oval NP containing a small oval P on one side and the region NP-complete on the other; NP-hard is a region that overlaps NP exactly in NP-complete and extends outside NP.</p>`;

const A_PCP_DEF = `<p><b>Post's Correspondence Problem (PCP).</b> Given two lists of k strings over Σ, A = (w<sub>1</sub>, …, w<sub>k</sub>) and B = (x<sub>1</sub>, …, x<sub>k</sub>), is there a non-empty sequence of indices i<sub>1</sub>, i<sub>2</sub>, …, i<sub>m</sub> (repeats allowed) with w<sub>i1</sub>w<sub>i2</sub>…w<sub>im</sub> = x<sub>i1</sub>x<sub>i2</sub>…x<sub>im</sub>? Such a sequence is a <b>solution</b>. <b>MPCP</b> (modified PCP) is the same question with the extra condition that the sequence must start with index 1.</p>`;

const A_PCP_UNDEC = `<p><b>PCP is undecidable — proof outline.</b> Reduce L<sub>u</sub> (does TM M accept w?), which is undecidable, to MPCP, and MPCP to PCP.</p>
<p><b>Step 1: MPCP reduces to PCP.</b> Given an MPCP instance A = (w<sub>1</sub>..w<sub>k</sub>), B = (x<sub>1</sub>..x<sub>k</sub>), build a PCP instance with new symbols * and $: y<sub>i</sub> = w<sub>i</sub> with * <b>after</b> every symbol; z<sub>i</sub> = x<sub>i</sub> with * <b>before</b> every symbol. Add a start pair y<sub>0</sub> = *y<sub>1</sub>, z<sub>0</sub> = z<sub>1</sub>, and an end pair y<sub>k+1</sub> = $, z<sub>k+1</sub> = *$. Only pair 0 has both strings starting with the same symbol, so every PCP solution must begin with it; removing the *s and $ gives an MPCP solution, and conversely. So MPCP has a solution ⇔ the new PCP instance has one.</p>
<p><b>Step 2: L<sub>u</sub> reduces to MPCP.</b> From (M, w) build pairs so that a partial solution spells out the sequence of IDs of M on w, with the B string always one ID ahead:</p>
<div class="tw"><table>
<tr><th>Group</th><th>List A</th><th>List B</th><th>Purpose</th></tr>
<tr><td>First pair</td><td class="m">#</td><td class="m">#q0w#</td><td>Start ID</td></tr>
<tr><td>Copy</td><td class="m">X, #</td><td class="m">X, #</td><td>Copy tape symbols and separators</td></tr>
<tr><td>Moves</td><td class="m">qX, ZqX, q#, Zq#</td><td class="m">Yp, pZY, Yp#, pZY#</td><td>One pair per move of δ (right / left, on a symbol or at the blank end)</td></tr>
<tr><td>Erase</td><td class="m">XqY, Xq, qY (q accepting)</td><td class="m">q</td><td>Accepting state eats the tape</td></tr>
<tr><td>Finish</td><td class="m">q##</td><td class="m">#</td><td>Lets list A catch up</td></tr>
</table></div>
<p>List A can only catch up with list B if M reaches an accepting state, so the MPCP instance has a solution ⇔ M accepts w.</p>
<p><b>Conclusion:</b> if PCP were decidable, MPCP would be decidable, and then L<sub>u</sub> would be decidable — a contradiction. Hence PCP is undecidable.</p>`;

const A_RICE = `<p><b>Rice's theorem.</b> Every <b>non-trivial</b> property of the recursively enumerable languages is undecidable. A property P is a set of RE languages; it is trivial if it is empty or contains all RE languages. Formally, L<sub>P</sub> = {⟨M⟩ | L(M) has property P} is not recursive when P is non-trivial. (A property of the <i>language</i>, not of the machine: “M has 5 states” is not covered.)</p>
<p><b>Proof.</b> Assume ∅ ∉ P (otherwise work with the complement of P). Since P is non-trivial, some language L ∈ P is accepted by a TM M<sub>L</sub>. Reduce L<sub>u</sub> to L<sub>P</sub>: given (M, w), build a TM M′ that on input x (1) simulates M on w, ignoring x; (2) if M accepts w, simulates M<sub>L</sub> on x and accepts if M<sub>L</sub> accepts.</p>
<ul>
<li>If M accepts w: L(M′) = L, which has property P.</li>
<li>If M does not accept w: M′ accepts nothing, L(M′) = ∅, which does not have P.</li>
</ul>
<p>So (M, w) ∈ L<sub>u</sub> ⇔ ⟨M′⟩ ∈ L<sub>P</sub>. If L<sub>P</sub> were decidable, L<sub>u</sub> would be decidable, a contradiction. ∎</p>
<p><b>Consequences — all undecidable:</b> is L(M) empty? finite? regular? context-free? does L(M) contain ε? is L(M) = Σ*?</p>
<p><b>Rice's theorem for RE index sets</b> (when L<sub>P</sub> is recursively enumerable): L<sub>P</sub> is RE iff (1) containment: if L ∈ P and L ⊆ L′ (L′ RE) then L′ ∈ P; (2) if an infinite L is in P, some finite subset of L is in P; (3) the set of finite languages in P is enumerable. Examples: “L ≠ ∅” satisfies all three, so L<sub>ne</sub> is RE; “L = ∅” fails (1), so L<sub>e</sub> is not RE.</p>`;

const A_RECRE = `<div class="tw"><table>
<tr><th>Point</th><th>Recursive (decidable)</th><th>Recursively enumerable (RE)</th></tr>
<tr><td>Machine</td><td>A TM that <b>halts on every input</b>: accepts members, rejects non-members</td><td>A TM that accepts members; on non-members it may reject or <b>loop forever</b></td></tr>
<tr><td>Also called</td><td>Decidable, Turing-decidable; the TM is an algorithm</td><td>Turing-recognisable, semi-decidable, type 0</td></tr>
<tr><td>Membership</td><td>Always answered yes/no</td><td>Only “yes” is guaranteed</td></tr>
<tr><td>Complement</td><td>Closed: swap accept and reject</td><td>Not closed</td></tr>
<tr><td>Union, intersection, concatenation, star</td><td>Closed</td><td>Closed</td></tr>
<tr><td>Examples</td><td>All regular, context-free and context-sensitive languages; {aⁿbⁿcⁿ}</td><td>L<sub>u</sub> = {(M,w) | M accepts w}, the halting problem, PCP (RE but not recursive)</td></tr>
</table></div>
<p><b>Hierarchy:</b> regular ⊂ CFL ⊂ CSL ⊂ recursive ⊂ RE ⊂ all languages. Languages that are not even RE: L<sub>d</sub>, L<sub>e</sub>, the complement of L<sub>u</sub>.</p>
<p><b>Theorems:</b> (1) If L is recursive, so is its complement. (2) If L and its complement are both RE, then L is recursive (run both machines in parallel; one must accept). (3) So for any L exactly one holds: both L and L′ recursive; neither RE; or one is RE-not-recursive and the other is not RE.</p>`;

const A_DECID = A_RECRE + `
<p><b>Decidable problem:</b> its language is recursive — an algorithm always gives the right yes/no answer. Examples: does a DFA accept w? is the language of a DFA empty? are two DFAs equivalent? does a CFG generate w (CYK)? is L(CFG) empty?</p>
<p><b>Undecidable problem:</b> no algorithm exists. Examples:</p>
<ul>
<li><b>Halting problem:</b> does TM M halt on input w? (RE but not recursive.)</li>
<li><b>Universal language L<sub>u</sub>:</b> does M accept w?</li>
<li><b>Post's correspondence problem.</b></li>
<li><b>Emptiness L<sub>e</sub>, equivalence of two TMs, any non-trivial property</b> of RE languages (Rice).</li>
<li>For CFGs: is G ambiguous? is L(G) = Σ*? is L(G<sub>1</sub>) ∩ L(G<sub>2</sub>) empty?</li>
</ul>
<p>Undecidability is proved by <b>diagonalisation</b> (L<sub>d</sub>) and then by <b>reduction</b>: if a known undecidable problem A reduces to B, then B is undecidable.</p>`;

TOPICS.push(
/* ================= UNIT 3 ================= */
{ u:3, m:8, t:"Designing a PDA for a given language", items:[
  {p:"n23", q:"23a", x:"Construct a PDA to accept the following language L on Σ={a,b} by empty stack. L = {wcwᴿ | w ∈ Σ⁺}."},
  {p:"n23", q:"23b", x:"Construct a PDA to accept the language L = {aⁿbᵐcⁿ⁺ᵐ | n,m ≥ 1} by empty stack and by final state."},
  {p:"m24", q:"23a", x:"Design a PDA to accept L = {aⁿbᵐcᵐdⁿ | m,n ≥ 1}."},
  {p:"m24", q:"23b", x:"Construct a PDA to accept L = {wwᴿ, w ∈ {a,b}}."},
  {p:"jl24", q:"23b", x:"Construct a PDA accepting by empty stack the languages {aⁿbⁿ | n ≥ 1}. Draw the transition diagram for the PDA. Show by instantaneous description that the PDA accepts the string “0011”."},
  {p:"n24", q:"23a", x:"Construct a Push Down Automata (PDA) for the given languages over Σ={a,b,c}. i) {aᵐ⁺ⁿ bᵐ cⁿ | n,m>=0} ii) {aⁿ bⁿ c²ⁿ | n>=0}."},
  {p:"m25", q:"23a", x:"A deterministic pushdown automaton (DPDA) and a non-deterministic pushdown automaton (NPDA) accepts which set of languages? Design a pushdown automata for a language L={aⁱbʲcᵏ : i = j OR j=k for Σ={a,b,c}}."},
  {p:"m25", q:"23b", x:"Construct a context free grammar generating the following language and hence equivalent PDA accepting the language. L={aⁿbᵐaⁿ : m,n>=1} ∪ {aⁿcⁿ : n>=1}."},
  {p:"jl25a", q:"23a", x:"i. Design a PDA that accepts a set of Strings over {a, b} with equal number of a's and b's. ii. Let G be the grammar given by S → 0BB, B → 0S | 1S | 0. Construct a PDA. Test if 010⁴ is in the language."},
  {p:"jl25a", q:"23b", x:"i. Let L = {aⁿbⁿcᵐdᵐ | n, m ≥ 1}. Find a PDA for L. ii. Convert the PDA P = ({q0,q1},{0,1},{X, Z0}, δ, q0, Z0, F) to a CFG, if δ is given by: 1. δ(q0,1,Z0) = {(q0,XZ0)} 2. δ(q0,1,X) = {(q0,XX)} 3. δ(q0,0,X) = {(q1,X)} 4. δ(q0,ε,Z0) = {(q0,ε)} 5. δ(q1,1,X) = {(q1,ε)} 6. δ(q1,0,Z0) = {(q0,Z0)}."},
  {p:"d25", q:"23a", x:"Construct a non deterministic push down automata for the language and trace the acceptance or rejection of the input string “baab”. L = {w ∈ {a,b}* : nₐ(w) = n_b(w)} over the alphabet Σ = {a,b}."},
  {p:"m26", q:"23b", x:"Design a Pushdown Automata for aⁿbⁿcᵐdᵐ."}
], a: A_PDA_DEF + `
<p>In every table a row “(q, a, X) → (p, γ)” means δ(q, a, X) contains (p, γ); the top of the stack is on the left of γ.</p>
<p><b>1. {aⁿbⁿ | n ≥ 1} by empty stack, with ID for 0011 (Jul 2024).</b> Use 0 for a and 1 for b.</p>
<pre>(q0, 0, Z0) → (q0, XZ0)      push X for each 0
(q0, 0, X)  → (q0, XX)
(q0, 1, X)  → (q1, ε)        pop X for each 1
(q1, 1, X)  → (q1, ε)
(q1, ε, Z0) → (q1, ε)        empty the stack: accept</pre>
<p>ID: (q0, 0011, Z0) ⊢ (q0, 011, XZ0) ⊢ (q0, 11, XXZ0) ⊢ (q1, 1, XZ0) ⊢ (q1, ε, Z0) ⊢ (q1, ε, ε). Input finished and stack empty: <b>accepted</b>. Diagram: q0 with a loop “0, Z0/XZ0; 0, X/XX”, arrow “1, X/ε” to q1, loop “1, X/ε; ε, Z0/ε” on q1.</p>
<p><b>2. {wcwᴿ | w ∈ {a,b}⁺} by empty stack (Nov 2023).</b> Deterministic: c marks the middle.</p>
<pre>(q0, a, Z0) → (q0, aZ0)    (q0, b, Z0) → (q0, bZ0)
(q0, a, a) → (q0, aa)      (q0, a, b) → (q0, ab)
(q0, b, a) → (q0, ba)      (q0, b, b) → (q0, bb)
(q0, c, a) → (q1, a)       (q0, c, b) → (q1, b)      middle
(q1, a, a) → (q1, ε)       (q1, b, b) → (q1, ε)      match
(q1, ε, Z0) → (q1, ε)</pre>
<p>Trace abcba: (q0, abcba, Z0) ⊢ (q0, bcba, aZ0) ⊢ (q0, cba, baZ0) ⊢ (q1, ba, baZ0) ⊢ (q1, a, aZ0) ⊢ (q1, ε, Z0) ⊢ (q1, ε, ε).</p>
<p><b>3. {wwᴿ | w ∈ {a,b}*} (May 2024).</b> Same pushes as above, but there is no marker, so the PDA <b>guesses</b> the middle (non-deterministic):</p>
<pre>(q0, a/b, any) → push the symbol       (six rules as in 2)
(q0, ε, Z0) → (q1, Z0)   (q0, ε, a) → (q1, a)   (q0, ε, b) → (q1, b)    guess the middle
(q1, a, a) → (q1, ε)     (q1, b, b) → (q1, ε)
(q1, ε, Z0) → (q2, Z0)   q2 final (or pop Z0 for empty stack)</pre>
<p><b>4. {aⁿbᵐcⁿ⁺ᵐ | n, m ≥ 1} (Nov 2023).</b> Push one X for every a and every b; pop one X for every c.</p>
<pre>(q0, a, Z0) → (q0, XZ0)    (q0, a, X) → (q0, XX)
(q0, b, X) → (q1, XX)      (q1, b, X) → (q1, XX)
(q1, c, X) → (q2, ε)       (q2, c, X) → (q2, ε)
(q2, ε, Z0) → (q2, ε)             by empty stack
(q2, ε, Z0) → (qf, Z0), F = {qf}  by final state</pre>
<p><b>5. {aⁿbᵐcᵐdⁿ | m, n ≥ 1} (May 2024).</b> Push A per a, push B per b, pop B per c, pop A per d.</p>
<pre>(q0, a, Z0) → (q0, AZ0)    (q0, a, A) → (q0, AA)
(q0, b, A) → (q1, BA)      (q1, b, B) → (q1, BB)
(q1, c, B) → (q2, ε)       (q2, c, B) → (q2, ε)
(q2, d, A) → (q3, ε)       (q3, d, A) → (q3, ε)
(q3, ε, Z0) → (qf, Z0)</pre>
<p><b>6. {aⁿbⁿcᵐdᵐ | n, m ≥ 1} (Jul 2025 · I, May 2026).</b> Two independent matches, one after the other.</p>
<pre>(q0, a, Z0) → (q0, AZ0)    (q0, a, A) → (q0, AA)
(q0, b, A) → (q1, ε)       (q1, b, A) → (q1, ε)
(q1, c, Z0) → (q2, CZ0)    (q2, c, C) → (q2, CC)
(q2, d, C) → (q3, ε)       (q3, d, C) → (q3, ε)
(q3, ε, Z0) → (qf, Z0)</pre>
<p><b>7. {aᵐ⁺ⁿbᵐcⁿ | m, n ≥ 0} (Nov 2024 i).</b> Push X per a; pop one X for every b and for every c.</p>
<pre>(q0, a, Z0) → (q0, XZ0)    (q0, a, X) → (q0, XX)
(q0, b, X) → (q1, ε)       (q1, b, X) → (q1, ε)
(q0, c, X) → (q2, ε)       (q1, c, X) → (q2, ε)       (q2, c, X) → (q2, ε)
(q0, ε, Z0) → (qf, Z0)     (q1, ε, Z0) → (qf, Z0)     (q2, ε, Z0) → (qf, Z0)</pre>
<p><b>8. {aⁿbⁿc²ⁿ} (Nov 2024 ii).</b> This language is <b>not context-free</b>: the number of a's, b's and c's are all tied together, and the pumping lemma for CFLs fails exactly as for aⁿbⁿcⁿ (pumping can change at most two of the three blocks). So <b>no PDA exists</b>; say this and give the proof sketch. If the question meant {aⁿb²ⁿ}, push two X's per a and pop one per b.</p>
<p><b>9. {aⁱbʲcᵏ | i = j or j = k} (May 2025).</b> DPDAs accept the <b>deterministic CFLs</b>, a proper subset of the CFLs; NPDAs accept <b>all</b> context-free languages. This language needs non-determinism: at the start the PDA guesses which condition to check.</p>
<pre>(q0, ε, Z0) → (p0, Z0)  and  (q0, ε, Z0) → (r0, Z0)          the guess
Branch i = j:  push X per a in p0; pop X per b in p1; then read any number of c's in p2; accept with Z0 on top.
Branch j = k:  read any number of a's in r0; push X per b in r1; pop X per c in r2; accept with Z0 on top.</pre>
<p><b>10. CFG and PDA for {aⁿbᵐaⁿ | m, n ≥ 1} ∪ {aⁿcⁿ | n ≥ 1} (May 2025).</b></p>
<pre>S → A | C
A → aAa | aBa        B → bB | b
C → aCc | ac</pre>
<p>PDA (one state q, start stack symbol S, empty stack): δ(q, ε, S) = {(q, A), (q, C)}; δ(q, ε, A) = {(q, aAa), (q, aBa)}; δ(q, ε, B) = {(q, bB), (q, b)}; δ(q, ε, C) = {(q, aCc), (q, ac)}; δ(q, a, a) = δ(q, b, b) = δ(q, c, c) = (q, ε).</p>
<p><b>11. Equal number of a's and b's (Jul 2025 · I, Dec 2025).</b> The stack holds the surplus: A's if more a's so far, B's if more b's.</p>
<pre>(q0, a, Z0) → (q0, AZ0)    (q0, b, Z0) → (q0, BZ0)
(q0, a, A) → (q0, AA)      (q0, b, B) → (q0, BB)
(q0, a, B) → (q0, ε)       (q0, b, A) → (q0, ε)
(q0, ε, Z0) → (qf, Z0)     accept (non-deterministic choice with the first row)</pre>
<p>Trace <span class="m">baab</span>: (q0, baab, Z0) ⊢ (q0, aab, BZ0) ⊢ (q0, ab, Z0) ⊢ (q0, b, AZ0) ⊢ (q0, ε, Z0) ⊢ (qf, ε, Z0): <b>accepted</b> (two a's, two b's).</p>
<p><b>12. Grammar S → 0BB, B → 0S | 1S | 0 to PDA; test 010⁴ (Jul 2025 · I ii).</b> δ(q, ε, S) = (q, 0BB); δ(q, ε, B) = {(q, 0S), (q, 1S), (q, 0)}; δ(q, 0, 0) = δ(q, 1, 1) = (q, ε).</p>
<pre>(q, 010000, S) ⊢ (q, 010000, 0BB) ⊢ (q, 10000, BB) ⊢ (q, 10000, 1SB) ⊢ (q, 0000, SB)
⊢ (q, 0000, 0BBB) ⊢ (q, 000, BBB) ⊢ (q, 000, 0BB) ⊢ (q, 00, BB) ⊢ (q, 00, 0B) ⊢ (q, 0, B)
⊢ (q, 0, 0) ⊢ (q, ε, ε)</pre>
<p>Stack empty with the input consumed: <b>010⁴ = 010000 is in the language.</b> (Derivation: S ⇒ 0BB ⇒ 01SB ⇒ 010BBB ⇒ 0100BB ⇒ 01000B ⇒ 010000.)</p>
<p><b>13. PDA to CFG (Jul 2025 · I b ii).</b> Using the triple construction:</p>
<pre>S → [q0 Z0 q0] | [q0 Z0 q1]
(1) [q0 Z0 q0] → 1[q0 X q0][q0 Z0 q0] | 1[q0 X q1][q1 Z0 q0]
    [q0 Z0 q1] → 1[q0 X q0][q0 Z0 q1] | 1[q0 X q1][q1 Z0 q1]
(2) [q0 X q0]  → 1[q0 X q0][q0 X q0]  | 1[q0 X q1][q1 X q0]
    [q0 X q1]  → 1[q0 X q0][q0 X q1]  | 1[q0 X q1][q1 X q1]
(3) [q0 X q0]  → 0[q1 X q0]        [q0 X q1] → 0[q1 X q1]
(4) [q0 Z0 q0] → ε
(5) [q1 X q1]  → 1
(6) [q1 Z0 q0] → 0[q0 Z0 q0]       [q1 Z0 q1] → 0[q0 Z0 q1]</pre>
<p>[q1 X q0] has no production, so [q0 X q0] can never finish; [q0 Z0 q1] and [q1 Z0 q1] never finish either. Renaming A = [q0 Z0 q0], B = [q0 X q1], C = [q1 Z0 q0], D = [q1 X q1], the simplified grammar is:</p>
<pre>S → A        A → 1BC | ε        B → 1BD | 0D        C → 0A        D → 1</pre>` },

{ u:3, m:8, t:"Deterministic vs non-deterministic PDA", items:[
  {p:"jl24", q:"23a", x:"What are deterministic PDA and non-deterministic PDA? With example explain deterministic PDA and non-deterministic PDA."}
], a: A_PDA_DEF + `
<p><b>Deterministic PDA (DPDA):</b> in every situation at most one move is possible. Conditions: (1) δ(q, a, X) has at most one element for every q, a ∈ Σ ∪ {ε}, X; (2) if δ(q, ε, X) is not empty, then δ(q, a, X) is empty for every a ∈ Σ.</p>
<p><b>Non-deterministic PDA (NPDA):</b> δ may offer several moves; a string is accepted if <i>some</i> sequence of choices leads to acceptance.</p>
<div class="tw"><table>
<tr><th>Point</th><th>DPDA</th><th>NPDA</th></tr>
<tr><td>Moves per (state, input, stack top)</td><td>At most one</td><td>Zero, one or many</td></tr>
<tr><td>ε-moves</td><td>Allowed only when no input move exists for that pair</td><td>Free</td></tr>
<tr><td>Languages</td><td>Deterministic CFLs (a proper subset)</td><td>All context-free languages</td></tr>
<tr><td>Power</td><td>Less; NPDA cannot always be converted to DPDA</td><td>More</td></tr>
<tr><td>Ambiguity</td><td>Every DCFL has an unambiguous grammar</td><td>May be inherently ambiguous</td></tr>
<tr><td>Closure</td><td>Closed under complement; not under union</td><td>Closed under union; not under complement</td></tr>
<tr><td>Use</td><td>Parsers (LR) for programming languages</td><td>General CFL recognition</td></tr>
</table></div>
<p><b>Example of a DPDA — L = {wcwᴿ | w ∈ {a,b}*}.</b> Push every symbol; on c switch state; then pop on a match. The marker c tells the machine exactly when to switch, so there is never a choice.</p>
<pre>(q0, a, any) → push a      (q0, b, any) → push b
(q0, c, X) → (q1, X)
(q1, a, a) → (q1, ε)       (q1, b, b) → (q1, ε)       (q1, ε, Z0) → (q2, Z0)</pre>
<p><b>Example of an NPDA — L = {wwᴿ | w ∈ {a,b}*}.</b> Same idea but with no marker: in q0 the machine may push the next symbol <i>or</i> take an ε-move to q1 to start matching. It must guess the middle, and no DPDA can accept this language.</p>
<p>Trace abba on the NPDA: (q0, abba, Z0) ⊢ (q0, bba, aZ0) ⊢ (q0, ba, baZ0) ⊢ [guess] (q1, ba, baZ0) ⊢ (q1, a, aZ0) ⊢ (q1, ε, Z0) ⊢ (q2, ε, Z0) accepted.</p>` },

{ u:3, m:8, t:"Converting a CFG to a PDA and checking a string", items:[
  {p:"n24", q:"23b", x:"Convert the given CFG to PDA and check for the string 010⁴: S → 0BB, B → 0S | 1S | 0."},
  {p:"d25", q:"23b", x:"Convert the given context free grammar to a push down automata and check the acceptance of the string “a*a”: E → E+E | E*E | a."},
  {p:"m26", q:"23a", x:"Convert the following CFG to PDA: S → aA, A → aABC | bB | a, B → b, C → c. Check whether the string abcba is accepted."}
], a: A_CFG2PDA + `
<p><b>Nov 2024 — S → 0BB, B → 0S | 1S | 0.</b> P = ({q}, {0,1}, {S, B, 0, 1}, δ, q, S, ∅).</p>
<pre>δ(q, ε, S) = {(q, 0BB)}
δ(q, ε, B) = {(q, 0S), (q, 1S), (q, 0)}
δ(q, 0, 0) = {(q, ε)}        δ(q, 1, 1) = {(q, ε)}</pre>
<p>Check 010⁴ = 010000:</p>
<pre>(q, 010000, S) ⊢ (q, 010000, 0BB) ⊢ (q, 10000, BB) ⊢ (q, 10000, 1SB) ⊢ (q, 0000, SB)
⊢ (q, 0000, 0BBB) ⊢ (q, 000, BBB) ⊢ (q, 000, 0BB) ⊢ (q, 00, BB) ⊢ (q, 00, 0B) ⊢ (q, 0, B)
⊢ (q, 0, 0) ⊢ (q, ε, ε)      accepted by empty stack</pre>
<p><b>Dec 2025 — E → E+E | E*E | a.</b></p>
<pre>δ(q, ε, E) = {(q, E+E), (q, E*E), (q, a)}
δ(q, a, a) = δ(q, +, +) = δ(q, *, *) = {(q, ε)}</pre>
<p>Check a*a:</p>
<pre>(q, a*a, E) ⊢ (q, a*a, E*E) ⊢ (q, a*a, a*E) ⊢ (q, *a, *E) ⊢ (q, a, E) ⊢ (q, a, a) ⊢ (q, ε, ε)</pre>
<p><b>Accepted.</b> It follows the leftmost derivation E ⇒ E*E ⇒ a*E ⇒ a*a.</p>
<p><b>May 2026 — S → aA, A → aABC | bB | a, B → b, C → c.</b></p>
<pre>δ(q, ε, S) = {(q, aA)}
δ(q, ε, A) = {(q, aABC), (q, bB), (q, a)}
δ(q, ε, B) = {(q, b)}        δ(q, ε, C) = {(q, c)}
δ(q, a, a) = δ(q, b, b) = δ(q, c, c) = {(q, ε)}</pre>
<p>Check abcba: (q, abcba, S) ⊢ (q, abcba, aA) ⊢ (q, bcba, A). The next input is b, so only A → bB can match: ⊢ (q, bcba, bB) ⊢ (q, cba, B) ⊢ (q, cba, b). Stack top b does not match input c and no other move exists. Every other choice for A fails earlier. <b>abcba is not accepted.</b></p>
<p>The grammar generates aa, abb, aaabc, aabbbc, …; for example aaabc is accepted: (q, aaabc, S) ⊢ (q, aaabc, aA) ⊢ (q, aabc, A) ⊢ (q, aabc, aABC) ⊢ (q, abc, ABC) ⊢ (q, abc, aBC) ⊢ (q, bc, BC) ⊢ (q, bc, bC) ⊢ (q, c, C) ⊢ (q, c, c) ⊢ (q, ε, ε).</p>` },

{ u:3, m:8, t:"Converting a PDA to a CFG (8 marks)", items:[
  {p:"jl25b", q:"23a", x:"Convert the following Pushdown Automaton (PDA) into an equivalent Context-Free Grammar (CFG). States: {q0,q1,qf}, Alphabet: {a,b}, Stack Alphabet: {A,Z}, Start State: q0, Accepting State: qf. δ(q0,a,Z)=(q0,AZ), δ(q0,a,A)=(q0,AA), δ(q0,b,A)=(q1,ε), δ(q1,b,A)=(q1,ε), δ(q1,ε,Z)=(qf,Z). Provide the CFG with appropriate non-terminals, terminals, production rules, and start symbol."}
], a: A_PDA2CFG + `
<p><b>The PDA</b> pushes an A for each a, pops an A for each b, and moves to qf when only Z is left: L = {aⁿbⁿ | n ≥ 1}. It accepts by final state, so first add δ(qf, ε, Z) = (qf, ε) to make it an empty-stack PDA.</p>
<p><b>Productions (useful ones):</b></p>
<pre>S → [q0 Z qf]
δ(q0,a,Z)=(q0,AZ):   [q0 Z qf] → a [q0 A q1] [q1 Z qf]
δ(q0,a,A)=(q0,AA):   [q0 A q1] → a [q0 A q1] [q1 A q1]
δ(q0,b,A)=(q1,ε):    [q0 A q1] → b
δ(q1,b,A)=(q1,ε):    [q1 A q1] → b
δ(q1,ε,Z)=(qf,Z):    [q1 Z qf] → [qf Z qf]
δ(qf,ε,Z)=(qf,ε):    [qf Z qf] → ε</pre>
<p>The construction also produces rules with other state choices (such as [q0 A q0] or [q1 A q0]); those variables have no terminating production and are deleted as useless.</p>
<p><b>Renamed grammar.</b> G = (V, T, P, S) with V = {S, B, D}, T = {a, b}:</p>
<pre>S → aB            (from [q0 Z qf], with [q1 Z qf] ⇒ ε)
B → aBD | b       B = [q0 A q1]
D → b             D = [q1 A q1]</pre>
<p><b>Check:</b> S ⇒ aB ⇒ aaBD ⇒ aabD ⇒ aabb. The grammar generates aⁿbⁿ (n ≥ 1), the same language as the PDA.</p>` },

{ u:3, m:15, t:"PDA to CFG + derivations and parse tree (15 marks)", items:[
  {p:"n23", q:"27", x:"i. Convert PDA to CFG. PDA is given by P = ({p,q}, {0,1}, {X,Z}, d, q, Z) where d is: d(p,1,Z) = {(p,XZ)}, d(p,ε,Z) = {(p,ε)}, d(p,1,X) = {(p,XX)}, d(q,1,Z) = {(q,ε)}, d(p,0,X) = {(q,X)}, d(q,0,Z) = {(p,Z)}. (8) ii. Consider the following grammar for list structures: S → a | ^ | (T), T → T,S | S. Find the leftmost derivation, rightmost derivation and parse tree for (((a,a),^,(a)),a). (7)"}
], a: A_PDA2CFG + `
<p><b>(i) Productions.</b> Taking p as the start state (it is the state that pushes) and Z as the start stack symbol:</p>
<pre>S → [p Z p] | [p Z q]
d(p,1,Z)=(p,XZ):  [p Z p] → 1[p X p][p Z p] | 1[p X q][q Z p]
                  [p Z q] → 1[p X p][p Z q] | 1[p X q][q Z q]
d(p,1,X)=(p,XX):  [p X p] → 1[p X p][p X p] | 1[p X q][q X p]
                  [p X q] → 1[p X p][p X q] | 1[p X q][q X q]
d(p,0,X)=(q,X):   [p X p] → 0[q X p]        [p X q] → 0[q X q]
d(q,0,Z)=(p,Z):   [q Z p] → 0[p Z p]        [q Z q] → 0[p Z q]
d(p,ε,Z)=(p,ε):   [p Z p] → ε
d(q,1,Z)=(q,ε):   [q Z q] → 1</pre>
<p><b>Simplification.</b> As printed, no move pops X in state q, so [q X p] and [q X q] have no productions; then [p X p] and [p X q] can never finish, and every production containing them is useless. What remains reachable is <b>S → [p Z p], [p Z p] → ε</b>: the printed PDA accepts only ε by empty stack.</p>
<p>The intended machine is almost certainly the textbook one with d(q,1,X) = (q,ε) (pop X on 1). With that move, [q X q] → 1 and the grammar becomes (A = [pZp], B = [pXq], C = [qZp], D = [qXq]):</p>
<pre>S → A        A → 1BC | ε        B → 1BD | 0D        C → 0A        D → 1</pre>
<p>Write the full production list first; the marks are for applying the construction rule to each move.</p>
<p><b>(ii) Grammar S → a | ^ | (T), T → T,S | S; string (((a,a),^,(a)),a).</b></p>
<p><b>Leftmost derivation:</b></p>
<pre>S ⇒ (T) ⇒ (T,S) ⇒ (S,S) ⇒ ((T),S) ⇒ ((T,S),S) ⇒ ((T,S,S),S) ⇒ ((S,S,S),S)
  ⇒ (((T),S,S),S) ⇒ (((T,S),S,S),S) ⇒ (((S,S),S,S),S) ⇒ (((a,S),S,S),S)
  ⇒ (((a,a),S,S),S) ⇒ (((a,a),^,S),S) ⇒ (((a,a),^,(T)),S) ⇒ (((a,a),^,(S)),S)
  ⇒ (((a,a),^,(a)),S) ⇒ (((a,a),^,(a)),a)</pre>
<p><b>Rightmost derivation:</b></p>
<pre>S ⇒ (T) ⇒ (T,S) ⇒ (T,a) ⇒ (S,a) ⇒ ((T),a) ⇒ ((T,S),a) ⇒ ((T,(T)),a) ⇒ ((T,(S)),a)
  ⇒ ((T,(a)),a) ⇒ ((T,S,(a)),a) ⇒ ((T,^,(a)),a) ⇒ ((S,^,(a)),a) ⇒ (((T),^,(a)),a)
  ⇒ (((T,S),^,(a)),a) ⇒ (((T,a),^,(a)),a) ⇒ (((S,a),^,(a)),a) ⇒ (((a,a),^,(a)),a)</pre>
<p><b>Parse tree:</b> root S → ( T ). T → T , S with the right S → a. The left T → S → ( T ); that T → T , S (S → (T) → (S) → (a)); its left T → T , S (S → ^); its left T → S → ( T ) with T → T , S giving a , a. Draw it level by level; the leaves read left to right give the string.</p>
<p>The scan prints the string as (((a,a),^(a)),a) with a comma missing after ^; the grammar can only produce the version with the comma.</p>` },

/* ================= UNIT 4 ================= */
{ u:4, m:8, t:"Designing a Turing machine for a language or a function", items:[
  {p:"n23", q:"24a", x:"Design a Turing Machine to recognize the language L = {0ⁿ1ⁿ | n ≥ 1}; also specify the ID to trace the string 0011."},
  {p:"n23", q:"24b", x:"Construct Turing machine for the 2's complement of the binary number."},
  {p:"m24", q:"24b", x:"Construct a TM that accepts strings with “aba” as a substring on the input Σ = {a,b}."},
  {p:"jl24", q:"24b", x:"Construct a TM for the language L = {aⁿbⁿcⁿ | n ≥ 0}."},
  {p:"n24", q:"24a", x:"Construct a Turing Machine for the language {aⁿ bⁿ cⁿ | n>=0}. Check that the string ‘aaabbbccc’ is accepted."},
  {p:"n24", q:"24b", x:"Design a Turing Machine for addition operation and compute using the same Turing machine for ‘2+3’ with appropriate steps."},
  {p:"m25", q:"24a", x:"Give the tuple definition of Turing Machine (TM) with instantaneous description. Construct a TM for language L={www ; w ∈ (a,b)*}."},
  {p:"jl25a", q:"24a", x:"i. Design a Turing machine that can compute proper subtraction, m ∸ n and simulate its action. ii. Design a TM to recognize the language {0ⁿ 1ⁿ 0ⁿ | n ≥ 1}."},
  {p:"jl25a", q:"24b", x:"Design TM to recognize the language {wwᴿ | w in (a,b)*} by using checking off symbols techniques."},
  {p:"jl25b", q:"24a", x:"Design a Turing machine to check whether the given input is prime or not using multiple tracks."},
  {p:"jl25b", q:"24b", x:"Design a Turing machine to compute addition of two unary numbers."},
  {p:"d25", q:"24b", x:"Construct a Turing machine to accept the below language. L = {aⁿbⁿcⁿ : n>=1} over the alphabet Σ = {a,b,c}. Demonstrate the working over the input string “aabbcc”."},
  {p:"m26", q:"24b", x:"Construct a Turing Machine for the string ending with b where Σ={a,b}."}
], a: A_TM_DEF + `
<p>Each line “(q, X) → (p, Y, D)” means δ(q, X) = (p, Y, D).</p>
<p><b>1. L = {0ⁿ1ⁿ | n ≥ 1}, with ID for 0011.</b> Idea: mark the leftmost 0 as X, go right to the first 1 and mark it Y, come back; repeat.</p>
<pre>(q0, 0) → (q1, X, R)      (q0, Y) → (q3, Y, R)
(q1, 0) → (q1, 0, R)      (q1, Y) → (q1, Y, R)      (q1, 1) → (q2, Y, L)
(q2, 0) → (q2, 0, L)      (q2, Y) → (q2, Y, L)      (q2, X) → (q0, X, R)
(q3, Y) → (q3, Y, R)      (q3, B) → (q4, B, R)      q4 accepts</pre>
<pre>q0 0011 ⊢ X q1 011 ⊢ X0 q1 11 ⊢ X q2 0Y1 ⊢ q2 X0Y1 ⊢ X q0 0Y1 ⊢ XX q1 Y1 ⊢ XXY q1 1
⊢ XX q2 YY ⊢ X q2 XYY ⊢ XX q0 YY ⊢ XXY q3 Y ⊢ XXYY q3 B ⊢ XXYYB q4     accepted</pre>
<p><b>2. L = {aⁿbⁿcⁿ}</b> (Jul 2024, Nov 2024, Dec 2025). Mark one a (X), one b (Y), one c (Z) per pass.</p>
<pre>(q0, a) → (q1, X, R)      (q0, Y) → (q4, Y, R)      (q0, B) → (qf, B, R)   [only when n ≥ 0 is allowed]
(q1, a) → (q1, a, R)      (q1, Y) → (q1, Y, R)      (q1, b) → (q2, Y, R)
(q2, b) → (q2, b, R)      (q2, Z) → (q2, Z, R)      (q2, c) → (q3, Z, L)
(q3, a/b/Y/Z) → (q3, same, L)                       (q3, X) → (q0, X, R)
(q4, Y) → (q4, Y, R)      (q4, Z) → (q4, Z, R)      (q4, B) → (qf, B, R)</pre>
<p><b>aabbcc:</b> q0 aabbcc ⊢ X q1 abbcc ⊢ Xa q1 bbcc ⊢ XaY q2 bcc ⊢ XaYb q2 cc ⊢ XaY q3 bZc ⊢* q3 XaYbZc ⊢ X q0 aYbZc ⊢ XX q1 YbZc ⊢ XXY q1 bZc ⊢ XXYY q2 Zc ⊢ XXYYZ q2 c ⊢ XXYY q3 ZZ ⊢* X q3 XYYZZ ⊢ XX q0 YYZZ ⊢ XXY q4 YZZ ⊢* XXYYZZ q4 B ⊢ XXYYZZB qf: <b>accepted</b>. For <b>aaabbbccc</b> the same loop runs three times, giving XXXYYYZZZ before q4 scans to the blank: accepted.</p>
<p><b>3. L = {0ⁿ1ⁿ0ⁿ | n ≥ 1}</b> (Jul 2025 · I ii): use machine 2 with a → 0, b → 1, c → 0 (the third block). q1 skips 0s and Ys until a 1; q2 skips 1s and Zs until a 0.</p>
<p><b>4. 2's complement of a binary number.</b> Go to the right end; moving left, keep bits unchanged up to and including the first 1, then complement every bit.</p>
<pre>(q0, 0) → (q0, 0, R)      (q0, 1) → (q0, 1, R)      (q0, B) → (q1, B, L)
(q1, 0) → (q1, 0, L)      (q1, 1) → (q2, 1, L)
(q2, 0) → (q2, 1, L)      (q2, 1) → (q2, 0, L)      (q2, B) → (qf, B, R)</pre>
<p>Example 10100 → 01100.</p>
<p><b>5. Strings containing “aba”.</b></p>
<pre>(q0, a) → (q1, a, R)      (q0, b) → (q0, b, R)
(q1, a) → (q1, a, R)      (q1, b) → (q2, b, R)
(q2, a) → (qf, a, R)      (q2, b) → (q0, b, R)      qf accepts</pre>
<p><b>6. Strings ending with b (May 2026).</b></p>
<pre>(q0, a) → (q0, a, R)      (q0, b) → (q0, b, R)      (q0, B) → (q1, B, L)
(q1, b) → (qf, b, R)      no move on a or B: reject</pre>
<p><b>7. Addition of two unary numbers</b> (Nov 2024, Jul 2025 · II). Input 1ᵐ + 1ⁿ. Replace + by 1, then erase the last 1.</p>
<pre>(q0, 1) → (q0, 1, R)      (q0, +) → (q1, 1, R)
(q1, 1) → (q1, 1, R)      (q1, B) → (q2, B, L)
(q2, 1) → (qf, B, L)</pre>
<p><b>2 + 3:</b> q0 11+111 ⊢ 1 q0 1+111 ⊢ 11 q0 +111 ⊢ 111 q1 111 ⊢* 111111 q1 B ⊢ 11111 q2 1 ⊢ 1111 qf 1B. Tape: 11111 = 5.</p>
<p><b>8. Proper subtraction m ∸ n</b> (m − n if m ≥ n, else 0). Input 0ᵐ10ⁿ. Repeatedly erase a leading 0 and change one 0 after the 1 into a 1.</p>
<pre>(q0, 0) → (q1, B, R)      (q0, 1) → (q5, B, R)
(q1, 0) → (q1, 0, R)      (q1, 1) → (q2, 1, R)
(q2, 1) → (q2, 1, R)      (q2, 0) → (q3, 1, L)      (q2, B) → (q4, B, L)
(q3, 0) → (q3, 0, L)      (q3, 1) → (q3, 1, L)      (q3, B) → (q0, B, R)
(q4, 1) → (q4, B, L)      (q4, 0) → (q4, 0, L)      (q4, B) → (q6, 0, R)
(q5, 0) → (q5, B, R)      (q5, 1) → (q5, B, R)      (q5, B) → (q6, B, R)</pre>
<p><b>Simulation, 2 ∸ 1 (0010):</b> q0 0010 ⊢ B q1 010 ⊢ B0 q1 10 ⊢ B01 q2 0 ⊢ B0 q3 11 ⊢ B q3 011 ⊢ q3 B011 ⊢ B q0 011 ⊢ BB q1 11 ⊢ BB1 q2 1 ⊢ BB11 q2 B ⊢ BB1 q4 1 ⊢ BB q4 1 ⊢ B q4 B ⊢ B0 q6. One 0 remains: 2 ∸ 1 = 1.</p>
<p><b>9. {wwᴿ} by checking off symbols.</b> Check off the leftmost symbol, run to the right end, check that the last unchecked symbol is the same, come back.</p>
<pre>(q0, a) → (q1, X, R)      (q0, b) → (q2, X, R)      (q0, X) → (qf, X, R)   all checked: accept
(q1, a/b) → (q1, same, R)   (q1, X or B) → (q3, same, L)      (q3, a) → (q5, X, L)
(q2, a/b) → (q2, same, R)   (q2, X or B) → (q4, same, L)      (q4, b) → (q5, X, L)
(q5, a/b) → (q5, same, L)   (q5, X) → (q0, X, R)
(q0, B) → (qf, B, R)        for the empty string</pre>
<p>If q3 sees b (or q4 sees a), or X is met at once (odd length), there is no move and the string is rejected.</p>
<p><b>10. {www}</b> (May 2025). High-level design: (a) use a second track to count the length in threes and reject unless |x| = 3k; while doing so place markers after positions k and 2k (advance a slow marker one cell for every three cells of a fast pass). (b) Repeatedly check off the first unchecked symbol of part 1, then the first unchecked symbol of part 2 and of part 3, rejecting on a mismatch. (c) Accept when all three parts are fully checked off. The language is not context-free, so no PDA can do this, but a TM with marked cells can.</p>
<p><b>11. Prime test with multiple tracks</b> (Jul 2025 · II). Three tracks: track 1 holds the input n in unary (never changed), track 2 holds a trial divisor d (starts at 2), track 3 is a working copy of n.</p>
<ol>
<li>If n is 0 or 1, reject. Write d = 2 on track 2.</li>
<li>If d = n, accept (prime).</li>
<li>Copy track 1 to track 3. Repeatedly subtract d from track 3 (cross off d symbols, using track 2 as the counter).</li>
<li>If track 3 becomes exactly empty, d divides n: reject (not prime).</li>
<li>If fewer than d symbols remain, add one 1 to track 2 (d = d + 1) and go to step 2.</li>
</ol>
<p>A cell of a k-track tape holds a k-tuple, so this is an ordinary TM with tape alphabet Γ = Γ<sub>1</sub> × Γ<sub>2</sub> × Γ<sub>3</sub>.</p>` },

{ u:4, m:8, t:"Variants of Turing machines, universal TM, programming techniques", items:[
  {p:"m25", q:"24b", x:"Write short notes on ANY two of the following: 1. Extensions of TM 2. Universal Turing Machine 3. Recursive and Recursively Enumerable Languages."},
  {p:"d25", q:"24a", x:"Discuss on any two variants of Turing Machine with necessary examples and illustrations."},
  {p:"m26", q:"24a", x:"Write short note on Multitape and Multihead Turing Machines."}
], a: `
<p>All variants below accept exactly the recursively enumerable languages: each can be simulated by the basic single-tape TM (Church–Turing thesis).</p>
<p><b>1. Multitape TM.</b> A finite control with k tapes, each with its own head. One move depends on the state and the k symbols scanned: δ(q, X<sub>1</sub>…X<sub>k</sub>) = (p, Y<sub>1</sub>…Y<sub>k</sub>, D<sub>1</sub>…D<sub>k</sub>); each head writes and moves L, R or stays independently. The input starts on tape 1; the others are blank. <b>Simulation by one tape:</b> use 2k tracks — for each tape one track with its contents and one track with a marker under its head; one multitape move is simulated by sweeping across all markers. n moves cost O(n²) single-tape moves. <b>Example:</b> {wwᴿ} or {0ⁿ1ⁿ}: copy the first half to tape 2, then compare the two tapes in one pass, taking linear time instead of quadratic.</p>
<p><b>2. Multihead TM.</b> One tape with k heads. A move depends on the state and the k symbols under the heads; each head writes and moves independently. <b>Simulation:</b> a single-tape TM with k + 1 tracks: one track for the tape contents and one track per head holding a marker at that head's position. <b>Example:</b> palindrome checking with two heads, one at each end, moving towards each other.</p>
<p><b>3. Non-deterministic TM.</b> δ(q, X) is a set of choices; the input is accepted if some sequence of choices reaches an accepting state. A deterministic TM simulates it by breadth-first search over the tree of IDs. Same power, possibly exponentially more time.</p>
<p><b>4. Multi-track tape.</b> Each cell holds a tuple of symbols; used for marking, counting and arithmetic (see the prime-test design). <b>5. Two-way infinite tape,</b> simulated by a two-track one-way tape (upper track = right half, lower track = left half). <b>6. Restricted models</b> of equal power: semi-infinite tape, two-stack PDA, counter machines with two counters. <b>Storage in the finite control</b> and <b>subroutines</b> are programming techniques, not new models.</p>
<p><b>Universal Turing machine (UTM).</b> A TM U that takes ⟨M, w⟩ — the binary code of any TM M followed by an input w — and simulates M on w; U accepts ⟨M, w⟩ iff M accepts w. Its language is L<sub>u</sub> = {⟨M, w⟩ | M accepts w}. U is usually described with three tapes: tape 1 holds the code of M and w, tape 2 holds M's simulated tape, tape 3 holds M's current state. For each step U looks up the matching transition code 0ⁱ10ʲ10ᵏ10ˡ10ᵐ on tape 1, updates tape 2 and tape 3. The UTM is the model of a stored-program computer. L<sub>u</sub> is recursively enumerable but not recursive.</p>
<p><b>Recursive and recursively enumerable languages.</b></p>` + A_RECRE },

{ u:4, m:8, t:"Closure of recursive languages under union and complement", items:[
  {p:"m24", q:"24a", x:"Prove that Union of two recursive languages is recursive. Also discuss the complement property."}
], a: `
<p>A language is <b>recursive</b> if some Turing machine accepts it and <b>halts on every input</b>.</p>
<p><b>Theorem 1: the union of two recursive languages is recursive.</b></p>
<p><b>Proof.</b> Let L<sub>1</sub> and L<sub>2</sub> be recursive, accepted by always-halting TMs M<sub>1</sub> and M<sub>2</sub>. Build M that on input w:</p>
<ol>
<li>runs M<sub>1</sub> on w. M<sub>1</sub> halts. If it accepts, M accepts.</li>
<li>Otherwise M runs M<sub>2</sub> on w. M<sub>2</sub> halts. If it accepts, M accepts; else M rejects.</li>
</ol>
<p>M always halts, because both simulations halt, and M accepts w iff w ∈ L<sub>1</sub> or w ∈ L<sub>2</sub>. So L(M) = L<sub>1</sub> ∪ L<sub>2</sub> is recursive. ∎ (Diagram: w → M<sub>1</sub>; “yes” → accept; “no” → M<sub>2</sub>; “yes” → accept, “no” → reject.)</p>
<p>For <b>RE</b> languages the machines may not halt, so M must run M<sub>1</sub> and M<sub>2</sub> in parallel (alternating steps, or on two tapes) and accept if either accepts: RE languages are also closed under union.</p>
<p><b>Theorem 2: the complement of a recursive language is recursive.</b></p>
<p><b>Proof.</b> Let M always halt and accept L. Build M′ from M by swapping the outcomes: M′ accepts when M halts without accepting and rejects when M accepts (make the accepting states of M non-accepting halting states, and add a new accepting state reached whenever M would halt in a non-accepting state). M′ always halts and L(M′) = Σ* − L. ∎</p>
<p><b>Complement of RE languages.</b> RE languages are <b>not</b> closed under complement: L<sub>u</sub> is RE but its complement is not. Swapping does not work because M may loop on strings outside L.</p>
<p><b>Theorem 3:</b> if L and its complement are both RE, then L is recursive. Run a TM for L and a TM for the complement in parallel; every w is in exactly one of them, so one machine accepts after finitely many steps; answer accordingly. Hence for any language only three situations are possible: both L and L′ recursive; neither RE; one RE-but-not-recursive and the other not RE.</p>
<p>Recursive languages are also closed under intersection (accept only if both M<sub>1</sub> and M<sub>2</sub> accept), concatenation and Kleene star.</p>` },

{ u:4, m:15, t:"Turing machine problems — 15 mark versions", items:[
  {p:"m24", q:"26", x:"Obtain the code for <M, 1011> such that M = ({q0, q1, q2, q3, q4}, {0, 1}, {0, 1, X, Y, B}, δ, q0, B, {q4}) where δ is: δ(q0,0) = (q1,X,R), δ(q0,Y) = (q3,Y,R), δ(q1,0) = (q1,0,R), δ(q1,1) = (q2,Y,L), δ(q1,Y) = (q1,Y,R), δ(q2,0) = (q2,0,L), δ(q2,X) = (q0,X,R), δ(q2,Y) = (q2,Y,L), δ(q3,Y) = (q3,Y,R), δ(q3,B) = (q4,B,R). Also design a TM which adds two numbers."},
  {p:"m24", q:"27", x:"Construct a Turing machine that accepts all palindromes over {0, 1}."},
  {p:"jl24", q:"27", x:"a. Construct Turing machine (TM) that replace all occurrence of 111 by 101 from sequence of 0's and 1's. b. Construct a Turing machine for proper subtraction, which is defined as m − n if m > n."},
  {p:"m25", q:"27", x:"Design a Turing machine which computes multiplication of two numbers."},
  {p:"jl25b", q:"27", x:"Construct a transition diagram for Turing Machine to accept the language L = {w wᴿ | w ∈ (a + b)*}."},
  {p:"d25", q:"27", x:"A company is developing a very simple compiler backend that uses a Turing Machine model to simulate arithmetic operations. Design a Turing Machine (TM) that can multiply two non-zero positive integers represented in unary notation (e.g., 3 = 111, 2 = 11). After computation, the expected output in the tape for the given inputs 111 and 11 is …BB111111BB…. where B represents blanks in the tape. Define the states and transitions of the Turing Machine for this problem either using a transition table or transition diagram. Illustrate the intermediary steps/tape contents in the working of the TM on the given inputs 111 and 11. You can assume your own delimiters in the input representation."},
  {p:"m26", q:"27", x:"Design a Turing Machine that takes a string w in {0,1}* as input and outputs ww. Show the action of the Turing Machine on the strings 10 and 010."}
], a: A_TM_DEF + `
<p><b>1. Code for ⟨M, 1011⟩ (May 2024 Q26).</b> <b>Scheme:</b> number the states q0…q4 as 1…5, the tape symbols 0, 1, B, X, Y as 1…5 and the directions L, R as 1, 2. A move δ(q<sub>i</sub>, X<sub>j</sub>) = (q<sub>k</sub>, X<sub>l</sub>, D<sub>m</sub>) is coded 0ⁱ10ʲ10ᵏ10ˡ10ᵐ. The code of M is the list of move codes separated by 11; ⟨M, w⟩ is the code of M, then 111, then w.</p>` + G.tm_code_table + `
<p><b>⟨M, 1011⟩ =</b></p>
<pre style="white-space:pre-wrap;word-break:break-all">` + G.tm_code + `</pre>
<p>M is the machine for {0ⁿ1ⁿ}; 1011 starts with 1, for which q0 has no move, so M halts without accepting. (The textbook numbering starts symbols with X<sub>1</sub> = 0, X<sub>2</sub> = 1, X<sub>3</sub> = B and makes q<sub>2</sub> the accepting state; state your numbering in the answer.)</p>
<p><b>TM that adds two numbers:</b> input 0ᵐ10ⁿ (or 1ᵐ+1ⁿ); replace the separator by a 0, then erase the last 0.</p>
<pre>(q0, 0) → (q0, 0, R)      (q0, 1) → (q1, 0, R)
(q1, 0) → (q1, 0, R)      (q1, B) → (q2, B, L)
(q2, 0) → (qf, B, L)</pre>
<p>Example 00100 (2 + 2): ⊢* 00000 q1 B ⊢ 0000 q2 0 ⊢ 000 qf 0: tape 0000 = 4.</p>
<p><b>2. Palindromes over {0,1} (May 2024 Q27).</b> Erase the first symbol, remember it in the state, go to the right end, check and erase the last symbol, return; repeat.</p>
<pre>(q0, 0) → (q1, B, R)      (q0, 1) → (q2, B, R)      (q0, B) → (qf, B, R)   nothing left: accept
(q1, 0/1) → (q1, same, R)      (q1, B) → (q3, B, L)
(q2, 0/1) → (q2, same, R)      (q2, B) → (q4, B, L)
(q3, 0) → (q5, B, L)      (q3, B) → (qf, B, R)      odd length, middle symbol: accept
(q4, 1) → (q5, B, L)      (q4, B) → (qf, B, R)
(q5, 0/1) → (q5, same, L)      (q5, B) → (q0, B, R)</pre>
<p>q3 on 1 and q4 on 0 have no move: reject. <b>Trace 101:</b> q0 101 ⊢ B q2 01 ⊢ B0 q2 1 ⊢ B01 q2 B ⊢ B0 q4 1 ⊢ B q5 0 ⊢ q5 B0 ⊢ B q0 0 ⊢ BB q1 B ⊢ B q3 B ⊢ accept. <b>Trace 10:</b> q0 10 ⊢ B q2 0 ⊢ B0 q2 B ⊢ B q4 0: no move, rejected.</p>
<p><b>3. {wwᴿ} with a transition diagram (Jul 2025 · II Q27).</b> Use machine 2 with a, b in place of 0, 1 and <b>remove</b> the two odd-length accepting moves (q3, B) and (q4, B). Diagram: q0 in the centre; upper branch q0 –a/B,R→ q1 (loop a/a,R; b/b,R) –B/B,L→ q3 –a/B,L→ q5; lower branch q0 –b/B,R→ q2 (same loop) –B/B,L→ q4 –b/B,L→ q5; q5 (loop a/a,L; b/b,L) –B/B,R→ q0; q0 –B/B,R→ qf. Trace abba: q0 abba ⊢ B q1 bba ⊢* Bbba q1 B ⊢ Bbb q3 a ⊢ Bb q5 b ⊢* q5 Bbb ⊢ B q0 bb ⊢ BB q2 b ⊢ BBb q2 B ⊢ BB q4 b ⊢ B q5 B ⊢ BB q0 B ⊢ accept.</p>
<p><b>4. Replace every 111 by 101 (Jul 2024 Q27a).</b> Count consecutive 1s in the state; on the third 1 step back and change the middle one.</p>
<pre>(q0, 0) → (q0, 0, R)      (q0, 1) → (q1, 1, R)      (q0, B) → (qf, B, L)
(q1, 0) → (q0, 0, R)      (q1, 1) → (q2, 1, R)      (q1, B) → (qf, B, L)
(q2, 0) → (q0, 0, R)      (q2, 1) → (q3, 1, L)      (q2, B) → (qf, B, L)
(q3, 1) → (q4, 0, R)      (q4, 1) → (q0, 1, R)</pre>
<p>Example 0111011: at the third 1 the head steps back, writes 0 and continues after the block: 0101011.</p>
<p><b>5. Proper subtraction (Jul 2024 Q27b):</b> input 0ᵐ10ⁿ, output 0^(m−n) if m &gt; n, otherwise blank.</p>
<pre>(q0, 0) → (q1, B, R)      (q0, 1) → (q5, B, R)
(q1, 0) → (q1, 0, R)      (q1, 1) → (q2, 1, R)
(q2, 1) → (q2, 1, R)      (q2, 0) → (q3, 1, L)      (q2, B) → (q4, B, L)
(q3, 0) → (q3, 0, L)      (q3, 1) → (q3, 1, L)      (q3, B) → (q0, B, R)
(q4, 1) → (q4, B, L)      (q4, 0) → (q4, 0, L)      (q4, B) → (q6, 0, R)
(q5, 0) → (q5, B, R)      (q5, 1) → (q5, B, R)      (q5, B) → (q6, B, R)</pre>
<p>Each cycle cancels one 0 on the left against one 0 on the right. If the right block runs out first (q2 sees B), q4 erases the 1s and restores the 0 that was just removed. If the left block runs out first (q0 sees 1), q5 erases everything. Trace 0010: … ⊢ B0 q6, one 0 left = 2 − 1.</p>
<p><b>6. Multiplication (May 2025 Q27, Dec 2025 Q27).</b> Input 0ᵐ10ⁿ1 (or 1ᵐ # 1ⁿ # with your own delimiters); output 0^(mn) written after the second separator. <b>Idea:</b> for each 0 of the first block (erased one at a time), copy the whole second block to the end of the tape.</p>
<pre>Main loop
(q0, 0) → (q6, B, R)      erase one 0 of the first number
(q6, 0) → (q6, 0, R)      (q6, 1) → (q1, 1, R)        go to the second number
Copy subroutine (starts in q1 on the first 0 of 0ⁿ)
(q1, 0) → (q2, X, R)      mark a 0
(q2, 0) → (q2, 0, R)      (q2, 1) → (q2, 1, R)        (q2, B) → (q3, 0, L)   append a 0
(q3, 0) → (q3, 0, L)      (q3, 1) → (q3, 1, L)        (q3, X) → (q1, X, R)
(q1, 1) → (q4, 1, L)      block copied
(q4, X) → (q4, 0, L)      restore the Xs              (q4, 1) → (q5, 1, R)
Return
(q5, 0) → (q7, 0, L)      (q7, 1) → (q8, 1, L)
(q8, 0) → (q9, 0, L)      (q9, 0) → (q9, 0, L)        (q9, B) → (q0, B, R)   next round
(q8, B) → (q10, B, R)     first number used up
(q10, 1) → (q11, B, R)    (q11, 0) → (q11, B, R)      (q11, 1) → (q12, B, R)   erase 10ⁿ1, halt in q12</pre>
<p><b>Working on 111 × 11</b> (written 000 1 00 1):</p>
<div class="tw"><table>
<tr><th>Stage</th><th>Tape</th></tr>
<tr><td>Start</td><td class="m">000 1 00 1</td></tr>
<tr><td>After round 1 (one 0 erased, 00 copied)</td><td class="m">B00 1 00 1 00</td></tr>
<tr><td>After round 2</td><td class="m">BB0 1 00 1 0000</td></tr>
<tr><td>After round 3</td><td class="m">BBB 1 00 1 000000</td></tr>
<tr><td>Clean-up (q10–q12)</td><td class="m">BBBBBBB 000000</td></tr>
</table></div>
<p>Result: six symbols = 111111 = 6, the expected …BB111111BB…. Inside a round the copy subroutine goes 00 → X0 (append 0) → XX (append 0) → restore 00.</p>
<p><b>7. Copy machine w → ww (May 2026 Q27).</b> Mark each symbol of w in turn (0 → X, 1 → Y) and append a copy at the right end written as A (for 0) or C (for 1), so copies are not confused with the original. A final pass turns X, A into 0 and Y, C into 1.</p>
<pre>(q0, 0) → (q1, X, R)      (q0, 1) → (q2, Y, R)
(q1, 0/1/A/C) → (q1, same, R)      (q1, B) → (q3, A, L)
(q2, 0/1/A/C) → (q2, same, R)      (q2, B) → (q3, C, L)
(q3, 0/1/A/C) → (q3, same, L)      (q3, X) → (q0, X, R)      (q3, Y) → (q0, Y, R)
(q0, A) → (q4, A, L)      (q0, C) → (q4, C, L)      (q0, B) → (qf, B, R)   all of w copied
(q4, X) → (q4, 0, L)      (q4, Y) → (q4, 1, L)      (q4, B) → (q5, B, R)
(q5, 0/1) → (q5, same, R)      (q5, A) → (q5, 0, R)      (q5, C) → (q5, 1, R)      (q5, B) → (qf, B, L)</pre>
<p><b>On 10:</b> q0 10 ⊢ Y q2 0 ⊢ Y0 q2 B ⊢ Y q3 0C ⊢ q3 Y0C ⊢ Y q0 0C ⊢ YX q1 C ⊢ YXC q1 B ⊢ YX q3 CA ⊢ Y q3 XCA ⊢ YX q0 CA ⊢ Y q4 XCA ⊢ q4 Y0CA ⊢ q4 B10CA ⊢ q5 10CA ⊢* 1010 q5 B ⊢ halt. Tape: <b>1010</b>.</p>
<p><b>On 010:</b> after three rounds the tape is XYX ACA; q0 reads A and starts the clean-up: XYX → 010 and ACA → 010. Tape: <b>010010</b>.</p>` },

/* ================= UNIT 5 ================= */
{ u:5, m:8, t:"Post's Correspondence Problem — definition, instances, undecidability", items:[
  {p:"n23", q:"25a", x:"Define PCP. Let Σ = {0, 1}. Let A and B be the lists of three strings each defined as: List A (wᵢ): 1, 10111, 10; List B (xᵢ): 111, 10, 0."},
  {p:"m24", q:"25b", x:"Let Σ = {0, 1}. Let A & B be strings. Find the instance of PCP. List A (wᵢ): 1, 10111, 10; List B (xᵢ): 111, 10, (0)."},
  {p:"jl24", q:"25a", x:"Define PCP and prove that PCP is undecidable."},
  {p:"m25", q:"25a", x:"1. Does the PCP with two lists A = (y, yxy³, yx) and B = (y³, yx, x) have a solution? If yes give the solution. 2. Discuss NP-hard and NP-complete problems with suitable examples."},
  {p:"jl25b", q:"25a", x:"Let Σ={0,1}, A and B be the lists of three strings each, defined as List A: wᵢ = 1, 10111, 10; List B: xᵢ = 111, 10, 0. Find the instance of PCP."},
  {p:"d25", q:"25b", x:"Let Σ = {a, b}. Consider the lists A and B of strings over Σ defined as follows: List A = {a, bab, bb, abba}, List B = {ab, b, bab, ba}. Find whether there exists a sequence of indices i₁,i₂,...,iₖ such that A_{i1}A_{i2}...A_{ik} = B_{i1}B_{i2}...B_{ik}. If yes, provide one valid sequence. (3 marks) Does there exist a valid MPCP solution? (2 marks) Briefly explain whether the PCP problem is decidable. (3 marks)"},
  {p:"m26", q:"25b", x:"Let M and N be lists of three strings each, as defined in the following table. Find whether there is a solution for the given instance of PCP. M = (ab, bab, bbaaa) and N = (a, ba, bab)."}
], a: A_PCP_DEF + `
<p><b>How to search:</b> start with a pair where one string is a prefix of the other; keep track of the surplus (the part by which one side is ahead); the next pair must continue that surplus.</p>
<p><b>A = (1, 10111, 10), B = (111, 10, 0)</b> (Nov 2023, May 2024, Jul 2025 · II).</p>
<ul>
<li>Pair 1 (1 / 111): B ahead; pair 3 does not match at the start; so begin with <b>pair 2</b>: A = 10111, B = 10. A is ahead by 111.</li>
<li>Add <b>pair 1</b>: A = 101111, B = 10111. A ahead by 1.</li>
<li>Add <b>pair 1</b> again: A = 1011111, B = 10111111. B ahead by 1.</li>
<li>Add <b>pair 3</b>: A = 101111110, B = 101111110. Equal.</li>
</ul>
<p><b>Solution: i = 2, 1, 1, 3.</b> w₂w₁w₁w₃ = 10111·1·1·10 = <span class="m">101111110</span> = 10·111·111·0 = x₂x₁x₁x₃. So this PCP instance has a solution.</p>
<p><b>A = (y, yxy³, yx), B = (y³, yx, x)</b> (May 2025). The same instance with y for 1 and x for 0. <b>Yes: 2, 1, 1, 3.</b> A: yxyyy·y·y·yx = <span class="m">yxyyyyyyx</span>; B: yx·yyy·yyy·x = <span class="m">yxyyyyyyx</span>.</p>
<p><b>A = (a, bab, bb, abba), B = (ab, b, bab, ba)</b> (Dec 2025).</p>
<ul>
<li>Pair 1: A = a, B = ab. B ahead by b.</li>
<li>Pair 3: A = abb, B = abbab. B ahead by ab.</li>
<li>Pair 4: A = abbabba, B = abbabba. Equal.</li>
</ul>
<p><b>Yes: 1, 3, 4</b> gives <span class="m">abbabba</span> on both sides. Because this solution begins with index 1, it is also a <b>valid MPCP solution</b>. <b>Decidability:</b> PCP is undecidable in general: no algorithm decides every instance, although a particular instance may be solved by search (PCP is recursively enumerable: a solution, if one exists, is found by trying all sequences).</p>
<p><b>M = (ab, bab, bbaaa), N = (a, ba, bab)</b> (May 2026). <b>No solution.</b> Reason 1: every string of M is longer than its partner in N (2 &gt; 1, 3 &gt; 2, 5 &gt; 3), so for any sequence the M string is strictly longer than the N string and they can never be equal. Reason 2 (by search): pair 3 mismatches at the second symbol; starting with pair 1 (ab / a) the next pair must have N starting with b, and both pair 2 (abbab vs aba) and pair 3 (abbbaaa vs abab) mismatch at the third symbol; starting with pair 2 (bab / ba) both continuations mismatch at the fourth symbol.</p>
<p><b>May 2025 part 2 — NP-hard and NP-complete:</b></p>` + A_PNP + A_PCP_UNDEC },

{ u:5, m:15, t:"PCP, MPCP and Rice's theorem — 15 mark versions", items:[
  {p:"jl24", q:"26", x:"a. State and explain RICE theorem. b. Prove that MPCP reduces to PCP."},
  {p:"jl25a", q:"26", x:"i. Prove that PCP is Undecidable. ii. Does the following instance of list A and B have a PCP solution? Find the instance of MPCP. List A (wᵢ): ab, bbab, baa, b; List B (xᵢ): abbb, a, aa, bbb."}
], a: A_PCP_DEF + A_PCP_UNDEC + `
<p><b>Jul 2025 · I Q26(ii) — A = (ab, bbab, baa, b), B = (abbb, a, aa, bbb).</b></p>
<ul>
<li>Pair 1: A = ab, B = abbb. B ahead by bb.</li>
<li>Pair 2: A = abbbab, B = abbba. A ahead by b.</li>
<li>Pair 4: A = abbbabb, B = abbbabbb. B ahead by b.</li>
<li>Pair 3: A = abbbabbbaa, B = abbbabbbaa. Equal.</li>
</ul>
<p><b>PCP solution: 1, 2, 4, 3</b> → <span class="m">abbbabbbaa</span>. It starts with pair 1, so it is also a solution of the MPCP instance.</p>
<p><b>The corresponding PCP instance built from the MPCP instance</b> (the reduction of step 1: * after each symbol in list C, * before each symbol in list D, plus a start pair 0 and an end pair 5):</p>
<div class="tw"><table>
<tr><th>i</th><th>List C (yᵢ)</th><th>List D (zᵢ)</th></tr>
<tr><td>0</td><td class="m">*a*b*</td><td class="m">*a*b*b*b</td></tr>
<tr><td>1</td><td class="m">a*b*</td><td class="m">*a*b*b*b</td></tr>
<tr><td>2</td><td class="m">b*b*a*b*</td><td class="m">*a</td></tr>
<tr><td>3</td><td class="m">b*a*a*</td><td class="m">*a*a</td></tr>
<tr><td>4</td><td class="m">b*</td><td class="m">*b*b*b</td></tr>
<tr><td>5</td><td class="m">$</td><td class="m">*$</td></tr>
</table></div>
<p>Its solution is 0, 2, 4, 3, 5, giving <span class="m">*a*b*b*b*a*b*b*b*a*a*$</span> on both sides.</p>
<p><b>Jul 2024 Q26(b) — MPCP reduces to PCP</b> is Step 1 of the proof above; write the construction, then prove both directions: (⇒) if i<sub>1</sub> = 1, i<sub>2</sub>, …, i<sub>m</sub> solves MPCP, then 0, i<sub>2</sub>, …, i<sub>m</sub>, k+1 solves the PCP instance, because the y string and the z string are the same word with a * between all symbols; (⇐) in the PCP instance only pair 0 has y and z starting with the same symbol (*), and only pair k+1 has them ending with the same symbol ($), so any solution starts with 0 and ends with k+1; deleting the *s and $ gives an MPCP solution starting with pair 1.</p>
<p><b>Jul 2024 Q26(a) — Rice's theorem:</b></p>` + A_RICE },

{ u:5, m:8, t:"P, NP, NP-complete and NP-hard", items:[
  {p:"m24", q:"25a", x:"Write short notes on NP hard and NP Complete. Express the relationship among them."},
  {p:"jl24", q:"25b", x:"Explain class P, class NP, NP-complete and NP-hard problem with examples in detail."},
  {p:"n24", q:"25a", x:"Explain in detail about P, NP, NP-Complete, and NP-Hard."}
], a: `<p>Complexity theory classifies <b>decidable</b> problems by the time a Turing machine needs. A problem is <b>tractable</b> if it has a polynomial-time algorithm.</p>` + A_PNP + `
<div class="tw"><table>
<tr><th>Point</th><th>P</th><th>NP</th><th>NP-complete</th><th>NP-hard</th></tr>
<tr><td>Solved in polynomial time</td><td>Yes (deterministic)</td><td>Non-deterministically</td><td>Not known</td><td>Not known</td></tr>
<tr><td>Verified in polynomial time</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Not necessarily</td></tr>
<tr><td>Must be in NP</td><td>Yes</td><td>—</td><td>Yes</td><td>No</td></tr>
<tr><td>Decision problem</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Any kind</td></tr>
<tr><td>Example</td><td>Shortest path</td><td>Subset sum</td><td>3-SAT</td><td>Halting problem</td></tr>
</table></div>
<p><b>Cook–Levin theorem:</b> SAT is NP-complete: the computation of any polynomial-time NTM on an input can be written as a Boolean formula that is satisfiable iff the machine accepts. Chain of reductions used in practice: SAT → 3-SAT → clique → vertex cover → Hamiltonian cycle → TSP.</p>` },

{ u:5, m:8, t:"Undecidability — recursive vs RE, Rice's theorem, halting problem, Ld, Le", items:[
  {p:"n23", q:"25b", x:"Define diagonalization language. Show that the language Ld is not a recursively enumerable language."},
  {p:"n24", q:"25b", x:"Describe in detail about Halting problem and Rice Theorem."},
  {p:"m25", q:"25b", x:"Compare and contrast Decidable and Undecidable Languages with examples?"},
  {p:"jl25a", q:"25a", x:"State and prove Rice's Theorem for recursively enumerable index sets."},
  {p:"jl25a", q:"25b", x:"Define Lₑ. Prove that Lₑ is not recursive."},
  {p:"jl25b", q:"25b", x:"Classify decidable and undecidable problems with an example."},
  {p:"d25", q:"25a", x:"Differentiate recursive and recursively enumerable languages. Describe briefly about undecidable problems with examples."},
  {p:"m26", q:"25a", x:"Discuss whether each of the sets of recursive and recursively enumerable languages are closed under complementation."}
], a: `
<p><b>Recursive vs recursively enumerable; decidable vs undecidable</b> (May 2025, Jul 2025 · II, Dec 2025):</p>` + A_DECID + `
<p><b>Closure under complementation (May 2026).</b> <b>Recursive languages are closed:</b> given an always-halting TM M for L, build M′ that accepts exactly when M halts without accepting; M′ always halts and accepts the complement. <b>RE languages are not closed:</b> L<sub>u</sub> is RE but its complement is not RE. If it were, L<sub>u</sub> and its complement would both be RE, which makes L<sub>u</sub> recursive (run both recognisers in parallel) — but L<sub>u</sub> is undecidable. Swapping accept and reject fails for RE languages because the machine may loop on non-members.</p>
<p><b>Diagonalization language L<sub>d</sub> (Nov 2023).</b> Code every TM as a binary string and let w<sub>i</sub> be the i-th binary string and M<sub>i</sub> the TM whose code is w<sub>i</sub>. <b>L<sub>d</sub> = {w<sub>i</sub> | w<sub>i</sub> ∉ L(M<sub>i</sub>)}</b>: the strings that are not accepted by the machine they encode. Picture an infinite table with rows M<sub>1</sub>, M<sub>2</sub>, … and columns w<sub>1</sub>, w<sub>2</sub>, …, entry 1 if M<sub>i</sub> accepts w<sub>j</sub>; L<sub>d</sub> is the complement of the diagonal.</p>
<p><b>Theorem: L<sub>d</sub> is not recursively enumerable.</b> Proof by contradiction: suppose L<sub>d</sub> = L(M) for some TM M. M has a code, so M = M<sub>i</sub> for some i. Is w<sub>i</sub> in L<sub>d</sub>?</p>
<ul>
<li>If w<sub>i</sub> ∈ L<sub>d</sub>, then M<sub>i</sub> accepts w<sub>i</sub> (as L(M<sub>i</sub>) = L<sub>d</sub>); but by definition of L<sub>d</sub>, w<sub>i</sub> ∈ L<sub>d</sub> means M<sub>i</sub> does <i>not</i> accept w<sub>i</sub>. Contradiction.</li>
<li>If w<sub>i</sub> ∉ L<sub>d</sub>, then M<sub>i</sub> does not accept w<sub>i</sub>; but then by definition w<sub>i</sub> ∈ L<sub>d</sub>. Contradiction.</li>
</ul>
<p>Both cases are impossible, so no such M exists: L<sub>d</sub> is not RE. ∎</p>
<p><b>Halting problem (Nov 2024).</b> HALT = {⟨M, w⟩ | M halts on input w}. <b>Theorem: HALT is undecidable</b> (but RE: simulate M on w and accept when it halts). Proof: suppose a TM H decides HALT. Build D that on input ⟨M⟩ runs H on ⟨M, ⟨M⟩⟩; if H says “halts”, D loops forever; if H says “does not halt”, D halts. Run D on its own code ⟨D⟩: if D halts on ⟨D⟩ then H said “halts”, so D loops; if D loops then H said “does not halt”, so D halts. Contradiction either way, so H cannot exist. ∎ (Equivalently: if HALT were decidable we could decide L<sub>u</sub> by first checking that M halts on w and then simulating it.)</p>
<p><b>L<sub>e</sub> is not recursive (Jul 2025 · I).</b> L<sub>e</sub> = {⟨M⟩ | L(M) = ∅}; L<sub>ne</sub> = {⟨M⟩ | L(M) ≠ ∅}; they are complements.</p>
<ol>
<li><b>L<sub>ne</sub> is RE:</b> a non-deterministic TM guesses a string w and simulates M on w; it accepts if M accepts.</li>
<li><b>L<sub>ne</sub> is not recursive:</b> reduce L<sub>u</sub> to it. Given (M, w), build M′ that ignores its own input x, writes w on its tape and simulates M on w, accepting if M accepts. If M accepts w, then L(M′) = Σ* ≠ ∅; otherwise L(M′) = ∅. So (M, w) ∈ L<sub>u</sub> ⇔ ⟨M′⟩ ∈ L<sub>ne</sub>. L<sub>u</sub> is undecidable, hence so is L<sub>ne</sub>.</li>
<li><b>L<sub>e</sub> is not recursive:</b> if it were, its complement L<sub>ne</sub> would be recursive (recursive languages are closed under complement), contradicting step 2. In fact L<sub>e</sub> is <b>not RE</b>: if both L<sub>e</sub> and L<sub>ne</sub> were RE, both would be recursive.</li>
</ol>
<p><b>Rice's theorem (Nov 2024, Jul 2025 · I):</b></p>` + A_RICE }
);

/* MCQ key: all nine papers are ticked in the PDF */
const MCQ = {
  1: "BACABCDABACDBDBDACBB",
  2: "CAADBBDBABBCBBAAABBB",
  3: "CDCADBBBCAACAACABABB",
  4: "CBBBABDABCCBBADBACCA",
  5: "CCBBABDCBBAACABCBCCA",
  6: "ACCBACBBBCBDBCBBBCCD",
  7: "CBADABBBCBBBABBCADCA",
  8: "CAACBBDAADDBCBDDADCB",
  9: "DADCDCBBAAABADABDBCC"
};
const MCQ_NOTES = [
  ["Nov 2023", 8, "None of the options states n ≥ 2, m ≥ 3 exactly; (A) gives the minimum values n = 2, m = 3 and is the intended answer."],
  ["Nov 2023", 14, "The language is missing from the printed question. The options match the GATE question on {aᵖ | p is prime}, whose answer is (D)."],
  ["Nov 2023", 17, "“Decidable” is the standard answer; (D) “decidable and solvable” says the same thing."],
  ["May 2024", 13, "The usual answer is a pushdown automaton, which is not offered. Of the listed machines a Turing machine (and an LBA) can accept even palindromes; a finite automaton cannot."],
  ["May 2024", 20, "Subset sum is NP-complete, so it is in NP and also NP-hard; (B) NP is ticked as the class the paper is testing."],
  ["Jul 2024", 5, "Options (C) and (D) say the same thing: both statements are correct."],
  ["Nov 2024", 6, "CFLs are not closed under intersection or under difference (minus); intersection is the standard answer."],
  ["Nov 2024", 11, "A PDA accepts by final state or by empty stack; the paper's key treats “both” as the answer."],
  ["May 2025", 8, "Both “E is not nullable” and “C is not nullable” are true for this grammar; (C) is the published answer."],
  ["May 2025", 11, "The exact answer is recursively enumerable, which is not listed; “Recursive” is the intended option."],
  ["Jul 2025 · I", 2, "The transition graph is not printed in the paper. The standard version of this question has q1 –ε→ q2, giving {q1, q2}."],
  ["Jul 2025 · II", 3, "(a+b)* and (a*b*)* describe the same language; (A) is the direct answer."],
  ["May 2026", 13, "δ is defined on a state and a tape symbol; the tape alphabet includes the input symbols, so (A) is ticked."]
];

// The paper fixes the unit of every 8-mark question by its number: Q21 = Unit 1, Q22 = Unit 2 … Q25 = Unit 5
// (the CO column on the paper says the same). A question whose topic card sits in another unit is moved to a
// copy of that card filed under the unit the paper gives it.
(function () {
  const extra = [];
  for (const t of TOPICS) {
    const moved = {};
    t.items = t.items.filter(i => {
      const n = parseInt(i.q, 10), u = n >= 21 && n <= 25 ? n - 20 : t.u;
      if (u === t.u) return true;
      (moved[u] = moved[u] || []).push(i); return false;
    });
    for (const u in moved) extra.push({ u: +u, m: t.m, t: t.t + " — set as a Unit " + u + " question (Q" + (20 + +u) + ")", items: moved[u], a: t.a });
  }
  for (let k = TOPICS.length - 1; k >= 0; k--) if (!TOPICS[k].items.length) TOPICS.splice(k, 1);
  TOPICS.push(...extra);
})();
const FAMILIES = [
  [1, "NFA / ε-NFA to DFA (subset construction)", ["NFA to DFA", "second-last", "ε-NFA to DFA"]],
  [1, "Regular expression ↔ automaton", ["Regular expression to automaton", "Regular expression scenario", "DFA to regular expression"]],
  [1, "DFA design", ["Designing a DFA"]],
  [1, "Moore and Mealy machines", ["Moore and Mealy"]],
  [1, "Pumping lemma and closure of regular languages", ["Closure properties of regular", "Pumping lemma for regular"]],
  [1, "DFA minimisation", ["DFA minimisation"]],
  [1, "Proof by induction", ["induction"]],
  [2, "CFG simplification and CNF", ["Simplifying a CFG", "Chomsky Normal Form", "CNF (and GNF)"]],
  [2, "Greibach Normal Form", ["Greibach", "GNF conversion with"]],
  [2, "Derivations, parse trees, ambiguity, writing CFGs", ["Derivations"]],
  [2, "Pumping lemma for CFLs", ["Pumping lemma for CFLs"]],
  [3, "PDA design", ["Designing a PDA"]],
  [3, "CFG ↔ PDA conversion", ["Converting a CFG", "Converting a PDA", "PDA to CFG +"]],
  [3, "DPDA vs NPDA", ["Deterministic vs"]],
  [4, "Turing machine design", ["Designing a Turing machine", "Turing machine problems"]],
  [4, "TM variants and universal TM", ["Variants of Turing"]],
  [4, "Closure of recursive languages", ["Closure of recursive"]],
  [5, "Post's Correspondence Problem", ["Post's Correspondence", "PCP, MPCP"]],
  [5, "Undecidability (recursive/RE, Rice, halting, Ld, Le)", ["Undecidability"]],
  [2, "Regular-language questions set in the Unit 2 slot", ["Regular expression to automaton", "Closure properties of regular", "DFA minimisation"]],
  [3, "Pumping lemma for regular languages (set in the Unit 3 slot)", ["Pumping lemma for regular"]],
  [4, "Greibach Normal Form (set in the Unit 4 slot)", ["Greibach"]],
  [5, "P, NP, NP-complete, NP-hard", ["P, NP"]]
];
function familyOf(t) {
  for (const [u, name, keys] of FAMILIES) if (u === t.u && keys.some(k => t.t.includes(k))) return name;
  return null;
}
// Which blocks of a topic's answer belong to which question ("paper:question" -> block numbers of that topic's answer,
// in the order they should be shown). A question that is not listed gets the whole answer of its topic.
const SPLIT = {
  "n23:21a":"0-3,11", "jl24:21b":"0,4-7,11", "jl25a:21b":"0,4-7,11-14", "m26:21b":"0,8-11",
  "n23:21b":"13-21", "m24:21b":"0-3", "jl25b:21a":"13-21", "jl24:22a":"4-12,0-2",
  "m24:21a":"1-3", "m25:21a":"0,4,5", "d25:21a":"6-8",
  "n24:21b":"2-6", "m25:21b":"0,1,7-10", "m26:21a":"11-14",
  "d25:21b":"0,1,4,5", "jl25b:23b":"0-3",
  "jl24:22b":"0-3", "d25:22b":"0,1,4-6",
  "n23:22b":"0-3", "m24:22a":"0,1,4", "m25:22a":"0,1,5", "jl25b:22a":"0,1,6", "m26:22b":"0,1,7,8",
  "n23:22a":"1-4", "m24:22b":"0,5-7", "n24:22a":"0,8,9", "n24:22b":"10-12", "d25:22a":"13-15",
  "m25:22b":"0,7-9", "jl25a:22b":"0,10-14", "jl25b:22b":"0-3", "jl24:24a":"0,4-6",
  "n24:27":"0,15,16", "jl25a:27":"0-9", "jl25b:26":"0,10-14", "d25:26":"0,17-24",
  "n23:23a":"0,1,5-7", "n23:23b":"0,1,10,11", "m24:23a":"0,1,12,13", "m24:23b":"0,1,5,6,8,9", "jl24:23b":"0-4",
  "n24:23a":"0,1,16-18", "m25:23a":"0,1,19,20", "m25:23b":"21-23", "jl25a:23a":"0,1,24-29",
  "jl25a:23b":"0,1,14,15,30-33", "d25:23a":"0,1,24-26", "m26:23b":"0,1,14,15",
  "n24:23b":"0-4", "d25:23b":"0,5-9", "m26:23a":"0,10-13",
  "n23:24a":"0-4", "n23:24b":"0,1,9-11", "m24:24b":"0,1,12,13", "jl24:24b":"0,1,5-7", "n24:24a":"0,1,5-7",
  "n24:24b":"0,1,16-18", "m25:24a":"0,1,25", "jl25a:24a":"0,1,19-21,8,5-7", "jl25a:24b":"0,1,22-24",
  "jl25b:24a":"0,26-28", "jl25b:24b":"0,1,16-18", "d25:24b":"0,1,5-7", "m26:24b":"0,1,14,15",
  "d25:24a":"0-4", "m26:24a":"0-2",
  "m24:26":"0-8", "m24:27":"0,9-11", "jl24:27":"0,13-18", "m25:27":"0,19-23", "jl25b:27":"0,12,9-11", "d25:27":"0,19-23", "m26:27":"0,24-27",
  "n23:25a":"0-4", "m24:25b":"0-4", "jl24:25a":"0,14-19", "m25:25a":"0,1,5,2-4,10-13", "jl25b:25a":"0-4", "d25:25b":"0,1,6-8,14,19", "m26:25b":"0,1,9",
  "jl24:26":"14-20,13,0,2", "jl25a:26":"0-12",
  "n23:25b":"9-12", "n24:25b":"13,16-21", "m25:25b":"0-7", "jl25a:25a":"17-22", "jl25a:25b":"14,15", "jl25b:25b":"0-7", "d25:25a":"0-7", "m26:25a":"8,1-3"
};

const SITE = {
  key: "fla", title: "FLA PYQ Hub", code: "SRM · 21CSC301T · Semester 5", h1: "Formal Language &amp; Automata",
  lede: "Every 8 mark and 15 mark question from nine end-semester papers, November 2023 to May 2026. Pick a unit, tap a question, read its worked answer.",
  marksIntro: "Marks printed across all nine papers, counting both options of every either/or question. Q21 is always Unit 1, Q22 Unit 2, and so on to Q25 Unit 5; the two 15 mark questions in Part C can come from any unit.",
  partC: "Eighteen 15 mark questions were set. You answer one of two; a Turing machine design is one of the two options in most papers.",
  plan: '<li><b>Turing machine design</b> (Unit 4). Asked in every paper, usually as both an 8 mark and a 15 mark question. Learn the marking technique on 0ⁿ1ⁿ and aⁿbⁿcⁿ, then addition, proper subtraction, palindrome and multiplication.</li>' +
    '<li><b>PDA design and CFG ↔ PDA conversion</b> (Unit 3). Every paper has a PDA question: aⁿbⁿ, wcwᴿ, wwᴿ, equal a and b, and S → 0BB with the string 010⁴.</li>' +
    '<li><b>NFA to DFA and regular expression to DFA</b> (Unit 1). The subset construction is mechanical marks; the second-last-symbol NFA and a(a+b+c)*(a+b+c) were both repeated.</li>' +
    '<li><b>Simplification, CNF and GNF</b> (Unit 2). One of these is in every paper; CNF is the usual 15 mark version.</li>' +
    '<li><b>PCP</b> (Unit 5). The instance (1, 10111, 10) / (111, 10, 0) with answer 2, 1, 1, 3 has been asked several times. Then P/NP definitions, Rice, halting problem, recursive vs RE.</li>' +
    '<li><b>Pumping lemma proofs, Moore/Mealy machines and minimisation</b> to finish Unit 1.</li>',
  sources: "Nine papers are analysed: seven from your zip (May 2024 Paper 1 and Paper 2 in the zip are the same paper) and two more found on thehelpers.tech, listed there as Nov 2025 (its heading says December 2025) and May 2026. Every 8 mark question is filed under the unit its question number gives it (Q21 = Unit 1 … Q25 = Unit 5). Where a printed question has a misprint or an unreadable figure, the answer says how it was read.",
  mcqSub: 'All nine papers are ticked in red on the original question papers, with a one-line reason beside each question, in <span class="m">FLA_PYQ_MCQs_Ticked_Explained.pdf</span> in your project folder.',
  paperWord: "paper"
};
// The YouTube playlist used for study (65 videos) and which videos teach which topic card.
const PLAYLIST = { title: "Formal Language and Automata (FLA) | SRM University", list: "PLAaj_wcMtpVLshvrpWED3VAO3KBX1uW3k",
  videos: [[1, "FLA / TOC Basics", "-3QDNahCMUs"], [2, "DFA with Example", "dyOncDiu_94"], [3, "DFA Example 2 · Input Contains Substring", "yClJcRknLN0"], [4, "DFA Example 3 · Doesn't Contain Substring", "DS_hWinSVCk"], [5, "DFA Example 4 · Even Binary Number", "l8OgHzZt_mc"], [6, "DFA Example 5 · Divisible By 3", "1WJBTQIBM2Q"], [7, "DFA Example 6 · Even 0's And Even 1's", "e5bTToGsNr8"], [8, "NFA with Example", "Xzn-C40b2UU"], [9, "NFA Example 2 · Input Contains Substring", "S1Bm5ORewPk"], [10, "Extended Transition Function for DFA", "CJS-vHbGjpU"], [11, "Extended Transition Function for NFA", "mmVZC-ehXRg"], [12, "NFA To DFA · Subset Construction Method", "-CxbnrN-zzQ"], [13, "NFA To DFA Example 2 · Subset Construction Method", "TB9X6aRrDd4"], [14, "Epsilon Closure & E-NFA", "ZXMvBB7MLLc"], [15, "E-NFA To DFA Conversion", "geWpQacmUeI"], [16, "E-NFA To NFA Conversion", "wYu0jNaKpb0"], [17, "Regular Expression (RE)", "6MwS7ZnbNrk"], [18, "RE To E-NFA · Thompson's Construction Method", "vB76avLYK0I"], [19, "DFA To Regular Expression (RE) · Rijk Method 01", "78g48YwURM4"], [20, "DFA To RE Example 1 · Rijk Method 02", "qWWb_UNlATE"], [21, "DFA To RE Example 2 · Rijk Method 03", "Jvd4OR4TjaY"], [22, "DFA To RE · State Elimination Method 01", "HokBVK8S5do"], [23, "DFA To RE Example 1 · State Elimination Method 02", "1n4RXyWO09M"], [24, "DFA To RE Example 2 · State Elimination Method 03", "b2UhnYUdiHU"], [25, "DFA To RE Example 3 · State Elimination Method 04", "u9a2W93TZds"], [26, "Minimisation of DFA · Minimised DFA", "qk-sW7msH3g"], [27, "RE to DFA Conversion (Most Important)", "c-pEuBV1DnI"], [28, "Mealy and Moore Machine · Conversions", "NWZXcoYErVo"], [29, "Pumping Lemma with Example", "JyIyBBY3zqg"], [30, "Pumping Lemma Example 2", "q8hCOCtW0mU"], [31, "Context Free Grammar (CFG) Introduction · Derivations & Parse Trees", "m-7HzbPKGgo"], [32, "CFG Construction", "GD3-bKLEamQ"], [33, "Types of Grammar · Chomsky Hierarchy", "xtWHz7XexCU"], [34, "Derivations & Parse Tree", "_Z0XdzkDvPY"], [35, "Ambiguous Grammar & Ambiguity", "FmZ7251F3U0"], [36, "CFG To CNF Conversion · CNF Simplifications", "ol69kQTuKhw"], [37, "CFG To CNF Conversion · Example 1", "T2c6fhZvGmc"], [38, "CFG To CNF Conversion · Example 2", "MroymizHffY"], [39, "Elimination of Left Recursion", "KfFFdaANte8"], [40, "CFG To GNF Conversion · Greibach Normal Form", "Ob5MUiUglQw"], [41, "PDA Introduction & Example 1 (0^n 1^n)", "FlOtpGs42DY"], [42, "PDA Example 2 (a^n b^2n)", "mdcG0f9E2Pg"], [43, "PDA Example 3 (a^n b^m c^n)", "TM43-T1vT4g"], [44, "PDA Example 4 (a^n b^m c^m d^n)", "F9nsDTD0Oio"], [45, "NPDA Example (w w^r) · PDA Example 05", "43RzDy2OV0M"], [46, "DPDA Example (wcw^r) · PDA Example 06", "EwkJOvoT19E"], [47, "CFG To PDA Conversion · Context Free Grammar to PDA", "CpWRYfEYNCw"], [48, "PDA To CFG Conversion · Pushdown Automata to Context Free Grammar", "rQzBQrMXy6E"], [49, "Pumping Lemma for CFL · a^n b^n c^n", "w5jHHpkq9hE"], [50, "Pumping Lemma for CFL · a^k b^j c^k d^j", "kGEgR9C2Tz4"], [51, "Pumping Lemma for CFL · 0^(2^i)", "01x_EDquVu8"], [52, "Turing Machine for a^n b^n c^n · Introduction", "aFGJldpIrPA"], [53, "Turing Machine for Concatenation · Solved Problem", "fdKmM49_mLY"], [54, "Turing Machine for Palindrome · Odd & Even Length", "fgAEt2s4AS8"], [55, "Turing Machine Subtraction · Example 4", "AbVi5uKpmTg"], [56, "Turing Machine for Multiplication · Example 5", "08r5favS34o"], [57, "Turing Machine for Substring · Example 6", "EbSc9GiIzSE"], [58, "Code For Turing Machine · Implementation & Explanation", "tBiIqkirFz8"], [59, "Variations of Turing Machine · Multitrack, Multitape & Nondeterministic TM", "ZdRnB7BdvLk"], [60, "Undecidability · Recursive & RE Languages · Halting Turing Machine", "2f_CuoFvvjg"], [61, "Post Correspondence Problem (PCP)", "EI7hXFNGZmY"], [62, "Modified Post Correspondence Problem (MPCP)", "HIlcT1twg-I"], [63, "MPCP to PCP Conversion", "ckgh8A8fBnU"], [64, "Turing Machine to MPCP Conversion", "Nad6jLugJuI"], [65, "Storage in Finite Control", "obW_v3PUlsc"]],
  map: [["NFA to DFA — subset", [12, 13]], ["NFA for “second-last", [8, 9, 12]], ["Regular expression to automaton", [27, 18, 17, 26]], ["Designing a DFA", [2, 7, 4, 3]], ["ε-NFA to DFA", [14, 15, 28]], ["Moore and Mealy", [28]], ["Proof by mathematical induction", []], ["Closure properties of regular", [35]], ["Pumping lemma for regular", [29, 30]], ["DFA minimisation", [26]], ["Regular expression scenario", [17, 27, 18, 12]], ["DFA to regular expression by the Rijk", [19, 20, 21]], ["Simplifying a CFG", [36]], ["Derivations, parse trees", [31, 34, 35, 32]], ["Greibach Normal Form", [40, 39]], ["GNF conversion with", [40, 39, 36]], ["Chomsky Normal Form conversion", [36, 37, 38]], ["CNF (and GNF)", [36, 37, 38, 40]], ["Pumping lemma for CFLs", [49, 50, 51, 26]], ["Designing a PDA", [41, 43, 44, 45, 46, 42]], ["Deterministic vs", [46, 45]], ["Converting a CFG", [47]], ["Converting a PDA", [48]], ["PDA to CFG +", [48, 34]], ["Designing a Turing machine", [52, 55, 53, 54, 57]], ["Variants of Turing", [59, 65]], ["Closure of recursive", [60]], ["Turing machine problems", [56, 54, 55, 58]], ["Post's Correspondence", [61, 62, 63, 64]], ["PCP, MPCP", [61, 62, 63, 64]], ["P, NP", []], ["Undecidability", [60]]] };
if (typeof module !== "undefined") module.exports = { PAPERS, UNITS, TOPICS, MCQ, FAMILIES, familyOf };
