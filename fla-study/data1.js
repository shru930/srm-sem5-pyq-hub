/* 21CSC301T Formal Language and Automata — every Part B (8m) and Part C (15m) question from 9 papers. */
const PAPERS = [
  { k: "n23",  name: "Nov 2023",      n: 1, note: "from the zip" },
  { k: "m24",  name: "May 2024",      n: 2, note: "from the zip (Paper 1 and Paper 2 in the zip are the same paper)" },
  { k: "jl24", name: "Jul 2024",      n: 3, note: "from the zip" },
  { k: "n24",  name: "Nov 2024",      n: 4, note: "from the zip" },
  { k: "m25",  name: "May 2025",      n: 5, note: "from the zip" },
  { k: "jl25a", name: "Jul 2025 · I", n: 6, note: "from the zip (Paper 1)" },
  { k: "jl25b", name: "Jul 2025 · II", n: 7, note: "from the zip (Paper 2)" },
  { k: "d25",  name: "Dec 2025",      n: 8, note: "downloaded from thehelpers.tech, listed there as Nov 2025; not in the zip" },
  { k: "m26",  name: "May 2026",      n: 9, note: "downloaded from thehelpers.tech; not in the zip" }
];

const UNITS = {
  1: "Finite automata & regular languages — DFA, NFA, ε-NFA, regular expressions, minimisation, pumping lemma, Moore/Mealy",
  2: "Context-free grammars — derivations, ambiguity, simplification, CNF, GNF",
  3: "Pushdown automata — PDA design, DPDA, CFG ↔ PDA",
  4: "Turing machines — TM design, variants, computation",
  5: "Undecidability & complexity — recursive/RE languages, PCP, Rice, halting problem, P and NP"
};

const A_SUBSET = `<p><b>Subset construction:</b> the DFA start state is {q<sub>0</sub>}. For a DFA state S and input a, δ′(S, a) = union of δ(q, a) for all q in S. Add each new subset as a state and repeat until no new subset appears. A subset is final if it contains at least one NFA final state. The empty set ∅ is the dead state.</p>`;

const A_GNF_METHOD = `<p><b>Greibach Normal Form:</b> every production is A → aα, one terminal followed by zero or more variables. <b>Method:</b> (1) remove ε, unit and useless productions and put the grammar in CNF; (2) order the variables A<sub>1</sub>…A<sub>n</sub>; (3) make every A<sub>i</sub> → A<sub>j</sub>γ have j &gt; i by substitution; (4) remove immediate left recursion A → Aα | β with a new variable Z: A → β | βZ, Z → α | αZ; (5) back-substitute so every body starts with a terminal.</p>`;

const A_CNF_METHOD = `<p><b>Chomsky Normal Form:</b> every production is A → BC or A → a (S → ε only if ε is in the language). <b>Steps:</b> (1) remove ε-productions (find nullable variables, add every version of each body with nullable variables left out); (2) remove unit productions A → B; (3) remove useless symbols (non-generating, then unreachable); (4) replace each terminal inside a long body by a new variable X<sub>a</sub> → a; (5) break bodies longer than two with new variables.</p>`;

const TOPICS = [
/* ================= UNIT 1 ================= */
{ u:1, m:8, t:"NFA to DFA — subset construction problems", items:[
  {p:"n23", q:"21a", x:"Construct a DFA equivalent to the NFA M = ({a,b,c,d}, {0,1}, δ, a, {b,d}) where δ is: a: 0→{b,d}, 1→{b}; b: 0→c, 1→{b,c}; c: 0→d, 1→a; d: 0→–, 1→a."},
  {p:"jl24", q:"21b", x:"Construct DFA equivalent to NFA ({P,Q,R,S}, {0,1}, δ, P, {S}) where δ is: p: 0→{p,q}, 1→{p}; q: 0→{r}, 1→{r}; r: 0→{s}, 1→–; s: 0→{s}, 1→{s}."},
  {p:"jl25a", q:"21b", x:"(i) Convert the given NFA to DFA: p: 0→{p,q}, 1→{p}; q: 0→{r}, 1→{r}; r: 0→{s}, 1→∅; *s: 0→{s}, 1→{s}. (ii) For the following Moore machine the input alphabet is {a,b} and the output alphabet is {0,1}. Run the following input sequences and find the respective outputs: 1. aabab 2. ababb. (Machine: q0/0 loops on b, a→q1; q1/0 loops on a, b→q2; q2/1: a→q1, b→q0.)"},
  {p:"m26", q:"21b", x:"Construct a DFA equivalent to the NFA M = ({P,Q,R,S}, {0,1}, δ, P, {Q,S}) where δ is: P: 0→{Q,S}, 1→{Q}; Q: 0→{R}, 1→{Q,R}; R: 0→{S}, 1→{P}; S: 0→∅, 1→{P}."}
], a: A_SUBSET + `
<p><b>Nov 2023 Q21(a)</b> — start a, finals b and d:</p>` + G.nfa_n23 + `
<p><b>Jul 2024 Q21(b) and Jul 2025 · I Q21(b)(i)</b> — start p, final s:</p>` + G.nfa_pqrs + `
<p>The language is “strings that contain 0, then any symbol, then 0” (a 0 followed two places later by a 0): once s is reached the machine stays accepting.</p>
<p><b>May 2026 Q21(b)</b> — start P, finals Q and S:</p>` + G.nfa_m26 + `
<p><b>In the exam</b> also draw the transition diagram of the DFA from the table.</p>
<p><b>Jul 2025 · I Q21(b)(ii) — Moore machine runs.</b> A Moore machine prints the output of every state it enters, starting with the start state, so n inputs give n + 1 outputs.</p>
<div class="tw"><table>
<tr><th>Input</th><th>State sequence</th><th>Output</th></tr>
<tr><td class="m">aabab</td><td class="m">q0 → q1 → q1 → q2 → q1 → q2</td><td class="m">0 0 0 1 0 1</td></tr>
<tr><td class="m">ababb</td><td class="m">q0 → q1 → q2 → q1 → q2 → q0</td><td class="m">0 0 1 0 1 0</td></tr>
</table></div>
<p>The machine prints 1 each time the substring “ab” has just been read.</p>` },

{ u:1, m:8, t:"NFA for “second-last symbol is 1”, conversion to DFA, string check", items:[
  {p:"n24", q:"21a", x:"Design a Non-Deterministic Finite Automata for the language that accepts the string where the last before symbol is always ‘1’. Convert the constructed NFA to DFA. Also, find the strings i. 100010 ii. 100000 which are accepted/rejected by both NFA and DFA."},
  {p:"jl25b", q:"21b", x:"Design a Non-Deterministic Finite Automata for the language that accepts the string where the last before symbol is always ‘1’. Convert the constructed NFA to DFA. Also, find the strings i. 100010 ii. 100000 which are accepted/rejected by both NFA and DFA."}
], a: `
<p><b>Language:</b> (0+1)*1(0+1) — the second symbol from the end is 1.</p>
<p><b>NFA</b> N = ({q0,q1,q2}, {0,1}, δ, q0, {q2}): q0 loops on 0 and 1 and <i>guesses</i> the second-last symbol.</p>
<div class="tw"><table>
<tr><th>State</th><th>0</th><th>1</th></tr>
<tr><td class="m">→ q0</td><td class="m">{q0}</td><td class="m">{q0, q1}</td></tr>
<tr><td class="m">q1</td><td class="m">{q2}</td><td class="m">{q2}</td></tr>
<tr><td class="m">* q2</td><td class="m">∅</td><td class="m">∅</td></tr>
</table></div>
<p><b>DFA by subset construction:</b></p>` + G.nfa_2last + `
<p><b>String check on the DFA:</b></p>
<ul>
<li><span class="m">100010</span>: ` + G.run_100010 + `. On the NFA: q0 –1,0,0,0→ q0 –1→ q1 –0→ q2. <b>Accepted by both</b> (second-last symbol is 1).</li>
<li><span class="m">100000</span>: ` + G.run_100000 + `. On the NFA no path ends in q2 because the second-last symbol is 0. <b>Rejected by both.</b></li>
</ul>
<p>Draw both diagrams: NFA with three states in a row; DFA with four states A = {q0}, B = {q0,q1}, C = {q0,q2}, D = {q0,q1,q2}, finals C and D.</p>` },

{ u:1, m:8, t:"Regular expression to automaton — ε-NFA, DFA, minimised DFA", items:[
  {p:"n23", q:"21b", x:"Design a minimized DFA by converting the following regular expression for the RE = a(a+b+c)* (a+b+c)."},
  {p:"m24", q:"21b", x:"Convert the Regular expression into Epsilon-NFA for the string 10 + (0 + 11)0*1."},
  {p:"jl24", q:"22a", x:"1) Construct a minimized DFA for the RE 10 + (0 + 11) 0*1. 2) Let r be a regular Expression. Then prove that there exists an NFA with ε-transitions that accept L(r)."},
  {p:"jl25b", q:"21a", x:"Design a minimized DFA by converting the following regular expression for the RE = a(a+b+c)* (a+b+c)."}
], a: `
<p><b>Thompson's construction (the theorem for Jul 2024 22a(2)).</b> For every regular expression r there is an ε-NFA with one start state, one final state, no arrows into the start and none out of the final state, that accepts L(r). Proof by induction on the number of operators:</p>
<ul>
<li><b>Basis:</b> for ∅: two states, no arrow. For ε: start –ε→ final. For a symbol a: start –a→ final.</li>
<li><b>Union r + s:</b> new start with ε-arrows to the starts of M<sub>r</sub> and M<sub>s</sub>; ε-arrows from both finals to a new final.</li>
<li><b>Concatenation rs:</b> ε-arrow from the final of M<sub>r</sub> to the start of M<sub>s</sub>.</li>
<li><b>Closure r*:</b> new start and new final; ε from new start to start of M<sub>r</sub> and to new final; ε from final of M<sub>r</sub> back to its start and to the new final.</li>
</ul>
<p>Each construction accepts exactly the union, concatenation or star of the languages of its parts, so by induction the claim holds for every r.</p>
<p><b>RE = 10 + (0 + 11)0*1 — ε-NFA (May 2024 21b).</b> Build the pieces: 1·0 for the left branch; (0 + 11) as a union; 0* as a loop with ε-arrows; then ·1; finally join the two branches with a new start and a new final using ε-arrows. Draw it in that order and label every ε.</p>
<p><b>Minimised DFA for 10 + (0 + 11)0*1 (Jul 2024 22a).</b> NFA without ε: s –1→ x, s –1→ y, s –0→ z, x –0→ f, y –1→ z, z –0→ z, z –1→ f, final f. Subset construction:</p>` + G.re_10_sub + `<p>Minimisation (partition refinement):</p>` + G.re_10_min + `
<p>Meaning of the states: start; “read 1” ({x,y}); “inside (0+11)0*” ({z}); accept; dead. Five states including the dead state, four without it.</p>
<p><b>RE = a(a+b+c)*(a+b+c) (Nov 2023 21b, Jul 2025 · II 21a).</b> The language is “starts with a and has length ≥ 2”. NFA: s –a→ m, m loops on a,b,c, m –a,b,c→ f. Subset construction:</p>` + G.re_abc_sub + `<p>Minimisation:</p>` + G.re_abc_min + `
<p><b>Minimised DFA:</b> q0 –a→ q1; q1 –a,b,c→ q2; q2 loops on a,b,c (final); q0 –b,c→ dead. Four states with the dead state, three without.</p>` },

{ u:1, m:8, t:"Designing a DFA for a given language", items:[
  {p:"m24", q:"21a", x:"Construct a DFA that accepts odd number of 1's and even number of 0's."},
  {p:"m25", q:"21a", x:"1. Illustrate the formal description of DFA and NFA with a suitable examples. 2. Construct a deterministic finite automata which accepts all set of strings which never contains a substring \"xxy\" for all set of strings formed using Σ={x,y}."},
  {p:"d25", q:"21a", x:"Construct a minimal Deterministic Finite Automata (DFA) for the given language. L = {aⁿbᵐ : n>=2, m>=1} over the alphabet Σ = {a,b}."}
], a: `
<p><b>Formal definitions.</b> A <b>DFA</b> is M = (Q, Σ, δ, q<sub>0</sub>, F): Q finite set of states, Σ input alphabet, δ: Q × Σ → Q (exactly one next state), q<sub>0</sub> start state, F ⊆ Q final states. An <b>NFA</b> has the same five parts but δ: Q × Σ → 2<sup>Q</sup> (a set of next states, possibly empty); a string is accepted if <i>some</i> path ends in a final state. Example DFA: strings ending in 01 with states q0, q1, q2. Example NFA: strings whose second-last symbol is 1 (q0 loops on 0,1; q0 –1→ q1 –0,1→ q2). Every NFA has an equivalent DFA (subset construction), so both accept exactly the regular languages.</p>
<p><b>Odd number of 1s and even number of 0s (May 2024).</b> Remember two parities: state (parity of 0s, parity of 1s).</p>
<div class="tw"><table>
<tr><th>State</th><th>Meaning</th><th>0</th><th>1</th></tr>
<tr><td class="m">→ q0</td><td>even 0s, even 1s</td><td class="m">q2</td><td class="m">q1</td></tr>
<tr><td class="m">* q1</td><td>even 0s, odd 1s</td><td class="m">q3</td><td class="m">q0</td></tr>
<tr><td class="m">q2</td><td>odd 0s, even 1s</td><td class="m">q0</td><td class="m">q3</td></tr>
<tr><td class="m">q3</td><td>odd 0s, odd 1s</td><td class="m">q1</td><td class="m">q2</td></tr>
</table></div>
<p>Check: 100 → q0, q1, q3, q1 accepted (one 1, two 0s).</p>
<p><b>No substring “xxy” (May 2025).</b> Track how much of xxy has been matched.</p>
<div class="tw"><table>
<tr><th>State</th><th>Meaning</th><th>x</th><th>y</th></tr>
<tr><td class="m">→ * q0</td><td>no progress</td><td class="m">q1</td><td class="m">q0</td></tr>
<tr><td class="m">* q1</td><td>last symbol x</td><td class="m">q2</td><td class="m">q0</td></tr>
<tr><td class="m">* q2</td><td>last two symbols xx</td><td class="m">q2</td><td class="m">q3</td></tr>
<tr><td class="m">q3</td><td>dead: xxy seen</td><td class="m">q3</td><td class="m">q3</td></tr>
</table></div>
<p><b>L = {aⁿbᵐ : n ≥ 2, m ≥ 1} (Dec 2025).</b> RE: aaa*bb*.</p>
<div class="tw"><table>
<tr><th>State</th><th>Meaning</th><th>a</th><th>b</th></tr>
<tr><td class="m">→ q0</td><td>nothing read</td><td class="m">q1</td><td class="m">qd</td></tr>
<tr><td class="m">q1</td><td>one a</td><td class="m">q2</td><td class="m">qd</td></tr>
<tr><td class="m">q2</td><td>two or more a's</td><td class="m">q2</td><td class="m">q3</td></tr>
<tr><td class="m">* q3</td><td>b's after the a's</td><td class="m">qd</td><td class="m">q3</td></tr>
<tr><td class="m">qd</td><td>dead</td><td class="m">qd</td><td class="m">qd</td></tr>
</table></div>
<p>It is minimal: the five states are pairwise distinguishable (q3 is the only final state; b separates q2 from q0, q1; ab separates q1 from q0; qd never accepts).</p>` },

{ u:1, m:8, t:"ε-NFA to DFA with ε-closures (and Mealy machine for 2's complement)", items:[
  {p:"jl25a", q:"21a", x:"i. Consider the following ε-NFA: →p: ε→{q,r}, a→∅, b→{q}, c→{r}; q: ε→∅, a→{p}, b→{r}, c→{p,q}; *r: ε→∅, a→∅, b→∅, c→∅. 1. Complete the ε-closures of each state 2. Convert the automaton to DFA. ii. Construct a Mealy machine that gives 2's complement of any binary input. (Assume that the last carry bit is neglected.)"}
], a: `
<p><b>ε-closure(q)</b> = q plus every state reachable from q using only ε-moves.</p>
<ul>
<li>ε-closure(p) = <b>{p, q, r}</b></li>
<li>ε-closure(q) = <b>{q}</b></li>
<li>ε-closure(r) = <b>{r}</b></li>
</ul>
<p><b>DFA:</b> start state = ε-closure(p). δ′(S, x) = ε-closure of the union of δ(s, x) for s in S.</p>` + G.enfa + `
<p>Example row: from {p,q,r} on a: δ(q,a) = {p}, closure = {p,q,r}. On b: δ(p,b) ∪ δ(q,b) = {q,r}. On c: {r} ∪ {p,q} → closure {p,q,r}.</p>
<p><b>(ii) Mealy machine for 2's complement.</b> Read the number from the <b>least significant bit</b>. Rule: copy bits up to and including the first 1, then flip every later bit.</p>
<div class="tw"><table>
<tr><th>State</th><th>Input 0</th><th>Input 1</th></tr>
<tr><td class="m">→ q0 (no 1 seen yet)</td><td class="m">q0, output 0</td><td class="m">q1, output 1</td></tr>
<tr><td class="m">q1 (first 1 passed)</td><td class="m">q1, output 1</td><td class="m">q1, output 0</td></tr>
</table></div>
<p>Example: 10100 (read right to left: 0,0,1,0,1) → outputs 0,0,1,1,0 → 01100. Check: 2's complement of 10100 is 01011 + 1 = 01100 ✓.</p>` },

{ u:1, m:8, t:"Moore and Mealy machines — design and conversion", items:[
  {p:"n24", q:"21b", x:"Design a Moore machine for the given language over the input symbol (0,1). If the substring is 10, it should print ‘a’, for 11, it should print ‘b’, otherwise, it should print ‘c’. Convert the constructed Moore machine to a Mealy machine."},
  {p:"m25", q:"21b", x:"1. Compare and contrast between Mealy and Moore machine? Also construct a Moore Machine that computes divisibility of binary number by 3. 2. Can we design a regular expression for a palindrome? Justify your answer."},
  {p:"m26", q:"21a", x:"Convert the following Mealy Machine to Moore Machine. (Figure drawn as a table, each entry is next state / output.) →q1: a→q1 / 1, b→q2 / 0; q2: a→q4 / 1, b→q4 / 1; q4: a→q3 / 0, b→q1 / 1; q3: a→q2 / 1, b→q3 / 1."}
], a: `
<div class="tw"><table>
<tr><th>Point</th><th>Moore machine</th><th>Mealy machine</th></tr>
<tr><td>Output depends on</td><td>Present state only: λ: Q → Δ</td><td>Present state and input: λ: Q × Σ → Δ</td></tr>
<tr><td>Output written on</td><td>States (q/0)</td><td>Transitions (a/0)</td></tr>
<tr><td>Output length for n inputs</td><td>n + 1 (start state prints too)</td><td>n</td></tr>
<tr><td>States</td><td>Usually more</td><td>Usually fewer</td></tr>
<tr><td>Reaction</td><td>One step later</td><td>Immediately with the input</td></tr>
</table></div>
<p>Both are 6-tuples (Q, Σ, Δ, δ, λ, q<sub>0</sub>) with no final states, and they are equivalent in power.</p>
<p><b>Nov 2024 — Moore machine for 10 → a, 11 → b, otherwise c.</b></p>
<div class="tw"><table>
<tr><th>State / output</th><th>Meaning</th><th>0</th><th>1</th></tr>
<tr><td class="m">→ S / c</td><td>start, or last symbol 0 not after 1</td><td class="m">S</td><td class="m">A</td></tr>
<tr><td class="m">A / c</td><td>last symbol 1 (after 0 or at start)</td><td class="m">B</td><td class="m">C</td></tr>
<tr><td class="m">B / a</td><td>just read 10</td><td class="m">S</td><td class="m">A</td></tr>
<tr><td class="m">C / b</td><td>just read 11</td><td class="m">B</td><td class="m">C</td></tr>
</table></div>
<p><b>To Mealy:</b> put the output of the destination state on each arrow.</p>
<div class="tw"><table>
<tr><th>State</th><th>0</th><th>1</th></tr>
<tr><td class="m">→ S</td><td class="m">S / c</td><td class="m">A / c</td></tr>
<tr><td class="m">A</td><td class="m">B / a</td><td class="m">C / b</td></tr>
<tr><td class="m">B</td><td class="m">S / c</td><td class="m">A / c</td></tr>
<tr><td class="m">C</td><td class="m">B / a</td><td class="m">C / b</td></tr>
</table></div>
<p>Rows S and B are identical, and rows A and C are identical, so the Mealy machine reduces to two states: “last symbol was not 1” and “last symbol was 1”.</p>
<p><b>May 2025 — Moore machine for divisibility by 3.</b> State = remainder of the number read so far; reading bit b changes the value v to 2v + b.</p>
<div class="tw"><table>
<tr><th>State / output</th><th>0</th><th>1</th></tr>
<tr><td class="m">→ r0 / 1 (divisible)</td><td class="m">r0</td><td class="m">r1</td></tr>
<tr><td class="m">r1 / 0</td><td class="m">r2</td><td class="m">r0</td></tr>
<tr><td class="m">r2 / 0</td><td class="m">r1</td><td class="m">r2</td></tr>
</table></div>
<p>Example 110 (six): r0 → r1 → r0 → r0, last output 1 = divisible.</p>
<p><b>Regular expression for palindromes?</b> No. L = {w : w = w<sup>R</sup>} over an alphabet of two or more symbols is not regular: take w = 0ⁿ10ⁿ; by the pumping lemma y lies inside the first 0ⁿ, and pumping gives 0ⁿ⁺ᵏ10ⁿ, which is not a palindrome. A finite automaton cannot remember an unbounded first half. Regular expressions describe exactly the regular languages, so none exists. (Palindromes are context-free: S → 0S0 | 1S1 | 0 | 1 | ε.)</p>
<p><b>May 2026 — Mealy to Moore.</b> <b>Rule:</b> for each state list the outputs on its incoming arrows. If they are all the same, the state keeps that output. If it receives different outputs, split it into one copy per output; each copy has the same outgoing arrows as the original. The figure gives q1: a/1 → q1, b/0 → q2; q2: a/1, b/1 → q4; q4: a/0 → q3, b/1 → q1; q3: b/1 → q3, a/1 → q2:</p>
<div class="tw"><table>
<tr><th>State</th><th>Incoming outputs</th><th>Moore state(s)</th></tr>
<tr><td class="m">q1</td><td>1, 1</td><td class="m">q1 / 1</td></tr>
<tr><td class="m">q2</td><td>0 (from q1), 1 (from q3)</td><td class="m">q2₀ / 0, q2₁ / 1</td></tr>
<tr><td class="m">q4</td><td>1, 1</td><td class="m">q4 / 1</td></tr>
<tr><td class="m">q3</td><td>0 (from q4), 1 (own loop)</td><td class="m">q3₀ / 0, q3₁ / 1</td></tr>
</table></div>
<div class="tw"><table>
<tr><th>Moore state / output</th><th>a</th><th>b</th></tr>
<tr><td class="m">→ q1 / 1</td><td class="m">q1</td><td class="m">q2₀</td></tr>
<tr><td class="m">q2₀ / 0</td><td class="m">q4</td><td class="m">q4</td></tr>
<tr><td class="m">q2₁ / 1</td><td class="m">q4</td><td class="m">q4</td></tr>
<tr><td class="m">q4 / 1</td><td class="m">q3₀</td><td class="m">q1</td></tr>
<tr><td class="m">q3₀ / 0</td><td class="m">q2₁</td><td class="m">q3₁</td></tr>
<tr><td class="m">q3₁ / 1</td><td class="m">q2₁</td><td class="m">q3₁</td></tr>
</table></div>
<p>The Moore machine prints one extra symbol (the output of the start state) before the first input.</p>` },

{ u:1, m:8, t:"Proof by mathematical induction", items:[
  {p:"jl24", q:"21a", x:"Prove that 1² + 2² + 3² + ...... + n² = n(n+1)(2n+1)/6 for all positive integers n."}
], a: `
<p><b>Statement P(n):</b> 1² + 2² + … + n² = n(n+1)(2n+1)/6.</p>
<p><b>Basis (n = 1):</b> LHS = 1² = 1. RHS = 1·2·3/6 = 1. P(1) is true.</p>
<p><b>Induction hypothesis:</b> assume P(k) is true for some k ≥ 1: 1² + 2² + … + k² = k(k+1)(2k+1)/6.</p>
<p><b>Induction step:</b> prove P(k+1).</p>
<pre>1² + 2² + … + k² + (k+1)²
  = k(k+1)(2k+1)/6 + (k+1)²              (by the hypothesis)
  = (k+1) [ k(2k+1) + 6(k+1) ] / 6
  = (k+1) (2k² + 7k + 6) / 6
  = (k+1)(k+2)(2k+3) / 6
  = (k+1)((k+1)+1)(2(k+1)+1) / 6</pre>
<p>This is exactly the formula with n = k + 1, so P(k+1) is true.</p>
<p><b>Conclusion:</b> P(1) is true and P(k) ⇒ P(k+1), so by the principle of mathematical induction P(n) holds for every positive integer n.</p>
<p><b>Why it is in this course:</b> induction (on string length, number of steps, or number of operators) is the standard proof method for automata, e.g. proving that a DFA accepts exactly a language or that every regular expression has an ε-NFA.</p>` },

{ u:1, m:8, t:"Closure properties of regular languages (and one ambiguity proof)", items:[
  {p:"jl24", q:"22b", x:"Show that the regular language are closed under: i) Union ii) Intersection iii) Kleene closure iv) Difference."},
  {p:"d25", q:"22b", x:"i) Show that regular languages are closed under concatenation and Kleene Closure. (4 marks) ii) Show that the given grammar is ambiguous: S → aSb | bSa | SS | ε. (4 marks)"}
], a: `
<p>Let L and M be regular, with regular expressions r and s and DFAs A = (Q<sub>A</sub>, Σ, δ<sub>A</sub>, q<sub>A</sub>, F<sub>A</sub>) and B = (Q<sub>B</sub>, Σ, δ<sub>B</sub>, q<sub>B</sub>, F<sub>B</sub>).</p>
<ul>
<li><b>Union:</b> r + s is a regular expression and L(r + s) = L ∪ M, so L ∪ M is regular. (Automaton: new start state with ε-arrows to both machines.)</li>
<li><b>Concatenation:</b> rs is a regular expression for LM. (Automaton: ε-arrows from the finals of A to the start of B; only B's finals stay final.)</li>
<li><b>Kleene closure:</b> r* is a regular expression for L*. (Automaton: new start/final state, ε from every final state back to the old start.)</li>
<li><b>Complement:</b> swap final and non-final states of the DFA: F′ = Q − F. It accepts exactly Σ* − L.</li>
<li><b>Intersection:</b> <b>product automaton</b> with states Q<sub>A</sub> × Q<sub>B</sub>, start (q<sub>A</sub>, q<sub>B</sub>), δ((p,q), a) = (δ<sub>A</sub>(p,a), δ<sub>B</sub>(q,a)), finals F<sub>A</sub> × F<sub>B</sub>. It accepts w iff both accept w. (Or by De Morgan: L ∩ M = complement of (L′ ∪ M′).)</li>
<li><b>Difference:</b> L − M = L ∩ M′. Complement and intersection keep regularity, so L − M is regular. (Product automaton with finals F<sub>A</sub> × (Q<sub>B</sub> − F<sub>B</sub>).)</li>
</ul>
<p>Other closure properties: reversal, homomorphism, inverse homomorphism.</p>
<p><b>Example:</b> L = strings with an even number of 0s, M = strings ending in 1. Both regular, so L ∩ M (even 0s and ending in 1) is regular; its product DFA has 2 × 2 = 4 states.</p>
<p><b>Dec 2025 (ii) — S → aSb | bSa | SS | ε is ambiguous.</b> The string <span class="m">ab</span> has two different leftmost derivations:</p>
<pre>1.  S ⇒ aSb ⇒ ab
2.  S ⇒ SS ⇒ aSbS ⇒ abS ⇒ ab</pre>
<p>They give two different parse trees (one with root aSb, one with root SS whose second S derives ε). One string with two parse trees is enough, so the grammar is ambiguous. (The string abab also works: (ab)(ab) by SS, split in different ways when three S's are used.)</p>` },

{ u:1, m:8, t:"Pumping lemma for regular languages — proving a language is not regular", items:[
  {p:"jl25b", q:"23b", x:"Prove that the language L={aⁿbⁿ | n≥0} is not regular using the Pumping Lemma."},
  {p:"d25", q:"21b", x:"Prove that the given language is not regular: L = {0ⁿ10ⁿ : n>=1} over the alphabet Σ = {0,1}."}
], a: `
<p><b>Pumping lemma.</b> If L is regular, there is a constant n such that every w in L with |w| ≥ n can be written w = xyz with (1) y ≠ ε, (2) |xy| ≤ n, (3) xyᵏz ∈ L for all k ≥ 0. (n is the number of states of a DFA for L: a long string must repeat a state, and the loop y can be repeated.)</p>
<p>To prove L is <b>not</b> regular: assume it is, choose a suitable w, show that <i>every</i> allowed split fails for some k.</p>
<p><b>L = {aⁿbⁿ | n ≥ 0}</b></p>
<ol>
<li>Assume L is regular with pumping constant n.</li>
<li>Choose w = aⁿbⁿ. It is in L and |w| = 2n ≥ n.</li>
<li>Write w = xyz with |xy| ≤ n and y ≠ ε. Since the first n symbols are all a, y = aʲ with j ≥ 1.</li>
<li>Pump with k = 2: xy²z = aⁿ⁺ʲbⁿ. It has more a's than b's, so it is not in L. (k = 0 gives aⁿ⁻ʲbⁿ, also not in L.)</li>
<li>This contradicts condition (3), so L is not regular.</li>
</ol>
<p><b>L = {0ⁿ10ⁿ : n ≥ 1}</b></p>
<ol>
<li>Assume L is regular with pumping constant n.</li>
<li>Choose w = 0ⁿ10ⁿ ∈ L, |w| = 2n + 1 ≥ n.</li>
<li>With |xy| ≤ n, y lies inside the first block: y = 0ʲ, j ≥ 1.</li>
<li>k = 2 gives 0ⁿ⁺ʲ10ⁿ: the number of 0s before the 1 differs from the number after it, so it is not in L.</li>
<li>Contradiction; L is not regular.</li>
</ol>` },

{ u:1, m:8, t:"DFA minimisation by the table-filling algorithm", items:[
  {p:"jl25a", q:"22a", x:"Use the table filling algorithm to minimize the following DFA. (Figure: 8 states q0–q7 over {0,1}, final state q2.)"}
], a: `
<p><b>Table-filling (Myhill–Nerode) algorithm:</b></p>
<ol>
<li>Remove states not reachable from the start state.</li>
<li>Draw a triangular table with one cell for every pair of states.</li>
<li><b>Basis:</b> mark every pair (p, q) where exactly one of p, q is final.</li>
<li><b>Induction:</b> for an unmarked pair (p, q) and each input a, if the pair (δ(p,a), δ(q,a)) is already marked, mark (p, q). Repeat until a full pass marks nothing.</li>
<li>Unmarked pairs are equivalent; merge them.</li>
</ol>
<p><b>The DFA in the figure</b> (the standard 8-state example): q0: 0→q1, 1→q5; q1: 0→q6, 1→q2; *q2: 0→q0, 1→q2; q3: 0→q2, 1→q6; q4: 0→q7, 1→q5; q5: 0→q2, 1→q6; q6: 0→q6, 1→q4; q7: 0→q6, 1→q2.</p>` + G.min_hop + `
<p><b>How the marks arise:</b> first every pair with q2 is marked. Then q0 and q1 are marked because on 1 they go to q5 and q2 (a marked pair); likewise q5 is separated from q0, q1 because on 0 it goes to the final state. In the next pass q6 is separated from q0 and q4. The pairs that stay unmarked are (q0,q4), (q1,q7) and (q3,q5); q3 is unreachable, so the reachable machine merges q0 with q4 and q1 with q7.</p>
<p>Show the triangular table with × in every marked cell in your answer.</p>` },

{ u:1, m:15, t:"Regular expression scenario — RE, DFA, ε-NFA, NFA to DFA (15 marks)", items:[
  {p:"n23", q:"26", x:"A bus stops in each stop in a pattern that it covers the stops around the shop area repeatedly and then it stops the other areas once. The stops around the shopping zone are grocery shop ('a'), Meat shop ('b'), dress shop('c') and the others are another grocery stop ('a'), another dress shop ('c'). i. Write a Regular Expression for the above scenario (1 mark) ii. Draw a DFA for the Regular Expression (3 marks) iii. What are the input strings accepted by the R.E (3 marks) iv. Design a ε-NFA using Thompson's construction (3 marks) v. Design a NFA for the Regular Expression and convert it to the DFA (5 marks)"}
], a: `
<p><b>(i) Regular expression.</b> The shopping-zone stops a, b, c are covered repeatedly, then the other stops a and c once: <b class="m">(abc)*ac</b>.</p>
<p><b>(ii) DFA.</b></p>
<div class="tw"><table>
<tr><th>State</th><th>Meaning</th><th>a</th><th>b</th><th>c</th></tr>
<tr><td class="m">→ q0</td><td>at the start of a round</td><td class="m">q1</td><td class="m">qd</td><td class="m">qd</td></tr>
<tr><td class="m">q1</td><td>read a</td><td class="m">qd</td><td class="m">q2</td><td class="m">q3</td></tr>
<tr><td class="m">q2</td><td>read ab</td><td class="m">qd</td><td class="m">qd</td><td class="m">q0</td></tr>
<tr><td class="m">* q3</td><td>finished with ac</td><td class="m">qd</td><td class="m">qd</td><td class="m">qd</td></tr>
<tr><td class="m">qd</td><td>dead</td><td class="m">qd</td><td class="m">qd</td><td class="m">qd</td></tr>
</table></div>
<p><b>(iii) Strings accepted:</b> ac, abcac, abcabcac, abcabcabcac, … = {(abc)ⁿac | n ≥ 0}. Not accepted: ε, abc, aac, abca.</p>
<p><b>(iv) ε-NFA by Thompson's construction.</b> Build a –b–c as three symbol machines joined by ε; wrap them in the star construction (new start and final, ε to skip, ε to loop back); then join with ε to the machines for a and c. Number the states in order; every joint is an ε-arrow.</p>
<p><b>(v) NFA and conversion.</b> NFA: p0 –a→ p1 –b→ p2 –c→ p0 (the loop) and p0 –a→ p3 –c→ p4 (final). It is non-deterministic at p0 on a.</p>
<div class="tw"><table>
<tr><th>DFA state</th><th>a</th><th>b</th><th>c</th></tr>
<tr><td class="m">→ {p0}</td><td class="m">{p1,p3}</td><td class="m">∅</td><td class="m">∅</td></tr>
<tr><td class="m">{p1,p3}</td><td class="m">∅</td><td class="m">{p2}</td><td class="m">{p4}</td></tr>
<tr><td class="m">{p2}</td><td class="m">∅</td><td class="m">∅</td><td class="m">{p0}</td></tr>
<tr><td class="m">* {p4}</td><td class="m">∅</td><td class="m">∅</td><td class="m">∅</td></tr>
</table></div>
<p>This is the same machine as in (ii) with {p0} = q0, {p1,p3} = q1, {p2} = q2, {p4} = q3 and ∅ = dead.</p>
<p>If you read the scenario as “any shopping-zone stop, in any order, repeatedly”, the expression is (a+b+c)*ac; state your reading in the first line of the answer.</p>` },

{ u:1, m:15, t:"DFA to regular expression by the Rijk method (15 marks)", items:[
  {p:"n24", q:"26", x:"In an organization, employee ID is generated over the input symbol {a, b} any combination of input symbols could be formed as an employee ID but atleast one ‘a’ should be a part of it. Do the following for the above scenario. a. Identify the strings of the language b. Construct DFA c. Convert the DFA to Regular Expression using Rijk method."}
], a: `
<p><b>(a) Language.</b> L = {w ∈ {a,b}* : w contains at least one a} = {a, aa, ab, ba, aab, aba, baa, bab, bba, …}. Not in L: ε, b, bb, bbb. Regular expression expected: (a+b)*a(a+b)*.</p>
<p><b>(b) DFA.</b> M = ({1, 2}, {a,b}, δ, 1, {2}).</p>
<div class="tw"><table>
<tr><th>State</th><th>a</th><th>b</th></tr>
<tr><td class="m">→ 1 (no a yet)</td><td class="m">2</td><td class="m">1</td></tr>
<tr><td class="m">* 2 (a seen)</td><td class="m">2</td><td class="m">2</td></tr>
</table></div>
<p><b>(c) R<sub>ij</sub><sup>(k)</sup> method.</b> R<sub>ij</sub><sup>(k)</sup> = strings taking state i to state j using intermediate states numbered ≤ k.</p>
<p class="f">R(k)ij = R(k−1)ij + R(k−1)ik ( R(k−1)kk )* R(k−1)kj</p>
<p><b>k = 0</b> (direct arrows; add ε when i = j):</p>
<div class="tw"><table>
<tr><th></th><th>k = 0</th><th>k = 1</th></tr>
<tr><td class="m">R11</td><td class="m">ε + b</td><td class="m">(ε+b) + (ε+b)(ε+b)*(ε+b) = b*</td></tr>
<tr><td class="m">R12</td><td class="m">a</td><td class="m">a + (ε+b)(ε+b)*a = b*a</td></tr>
<tr><td class="m">R21</td><td class="m">∅</td><td class="m">∅ + ∅(ε+b)*(ε+b) = ∅</td></tr>
<tr><td class="m">R22</td><td class="m">ε + a + b</td><td class="m">(ε+a+b) + ∅(ε+b)*a = ε + a + b</td></tr>
</table></div>
<p><b>k = 2:</b> the answer is R<sub>12</sub><sup>(2)</sup> (start state 1, final state 2).</p>
<pre>R12(2) = R12(1) + R12(1) ( R22(1) )* R22(1)
       = b*a + b*a (ε+a+b)* (ε+a+b)
       = b*a + b*a (a+b)*
       = b*a (a+b)*</pre>
<p><b>Regular expression: b*a(a+b)*</b> — any number of b's, the first a, then anything. It is equivalent to (a+b)*a(a+b)*.</p>
<p>Simplification rules used: (ε + r)* = r*, (ε + r)r* = r*, r + rs* = rs*, ∅r = ∅.</p>` },

/* ================= UNIT 2 ================= */
{ u:2, m:8, t:"Simplifying a CFG — removing ε, unit and useless productions", items:[
  {p:"n23", q:"22b", x:"i. Simplify the following context-free grammar G = {N,T,P,S}, P = {S → AB, A → a, B → b, B → C, E → C | ε} (4) ii. Check whether the following is in Chomsky Normal Form or not: S → bA | aB, A → bAA | aS | a, B → bBB | bS | b (4)"},
  {p:"m24", q:"22a", x:"Simplify the given grammar G: S → aA | a | C, A → aB | ε, B → aA, C → cCD."},
  {p:"m25", q:"22a", x:"Remove all unit-productions, all useless productions, and all null-productions from the grammar G: S → aA | aBB, A → aaA | ε, B → bB | bbC, C → B. What language does this grammar generate?"},
  {p:"jl25b", q:"22a", x:"Simplify the production from the following CFG by preserving the meaning of it. S → XYX, X → 0X | ε, Y → 1Y | ε."},
  {p:"m26", q:"22b", x:"Remove the null production from the given grammars: i) S → aS | AB, A → ε, B → ε, D → b. ii) S → ABC, A → BC | a, B → bAC | ε."}
], a: `
<p><b>Order of simplification:</b> (1) ε-productions, (2) unit productions, (3) useless symbols — first non-generating, then unreachable.</p>
<ul>
<li><b>Nullable</b> variable: derives ε. For each body, add every variant with nullable variables left out, then delete the ε-productions.</li>
<li><b>Unit</b> production A → B: replace it with all non-unit bodies of B.</li>
<li><b>Generating</b> symbol: derives some terminal string. <b>Reachable:</b> appears in a derivation from S.</li>
</ul>
<p><b>Nov 2023 (i).</b> C has no production, so C is non-generating: delete B → C and E → C. E is unreachable from S: delete E → ε. <b>Result: S → AB, A → a, B → b</b> (L = {ab}).</p>
<p><b>Nov 2023 (ii).</b> CNF allows only A → BC or A → a. S → bA, A → bAA, A → aS, B → bBB, B → bS mix a terminal with variables (and some have three symbols), so the grammar is <b>not in CNF</b>; it is in Greibach normal form. CNF version: C<sub>a</sub> → a, C<sub>b</sub> → b; S → C<sub>b</sub>A | C<sub>a</sub>B; A → C<sub>b</sub>D | C<sub>a</sub>S | a; D → AA; B → C<sub>b</sub>E | C<sub>b</sub>S | b; E → BB.</p>
<p><b>May 2024.</b> D has no production, so C → cCD can never finish: C is non-generating; delete S → C and C → cCD. Nullable: A. Remove ε: S → aA | a; B → aA | a; A → aB. No unit productions; all symbols useful. <b>Result: S → aA | a, A → aB, B → aA | a.</b> Language: a, aaa, aaaaa, … = a(aa)*.</p>
<p><b>May 2025.</b> B → bB | bbC and C → B never produce a terminal string: B and C are non-generating; delete S → aBB and all B, C productions (this also removes the unit production C → B). Left: S → aA, A → aaA | ε. Nullable: A. <b>Result: S → aA | a, A → aaA | aa.</b> <b>Language: an odd number of a's, L = {a²ⁿ⁺¹ | n ≥ 0} = a(aa)*.</b></p>
<p><b>Jul 2025 · II.</b> Nullable: X, Y, S. Remove ε: S → XYX | XY | YX | XX | X | Y; X → 0X | 0; Y → 1Y | 1. Remove units S → X, S → Y: <b>S → XYX | XY | YX | XX | 0X | 0 | 1Y | 1; X → 0X | 0; Y → 1Y | 1.</b> The language is 0*1*0* without ε; if ε must be kept, add a new start S₀ → S | ε.</p>
<p><b>May 2026 (i).</b> Nullable: A, B, then S (S → AB). S → aS | a | AB | A | B. A and B derive only ε, so after deleting A → ε and B → ε they have no productions and every body containing them is removed. D is unreachable. <b>Result: S → aS | a</b> (plus S₀ → S | ε to keep ε).</p>
<p><b>May 2026 (ii).</b> As printed, C has no production; with the usual rule C → cAB | ε (the standard form of this problem) the nullable set is {A, B, C, S} and the result is: <b>S → ABC | AB | AC | BC | A | B | C; A → BC | B | C | a; B → bAC | bA | bC | b; C → cAB | cA | cB | c.</b> (If C really has no production, C is non-generating, S → ABC can never finish, and the grammar generates nothing.)</p>` },

{ u:2, m:8, t:"Derivations, parse trees, ambiguity and writing a CFG", items:[
  {p:"n23", q:"22a", x:"i. If S → aSb | aAb, A → bAa, A → ba. Find out the CFL. (4) ii. Generate a context-free grammar for the positive and negative integers. (4)"},
  {p:"m24", q:"22b", x:"Find leftmost, rightmost derivations and parse tree for w=+*-xyxy for the production rule given below E → +EE | *EE | -EE | x | y."},
  {p:"n24", q:"22a", x:"i) Find whether the following grammar is ambiguous. S → AS | A, A → aAb | c. ii) Discuss about any four properties of a regular set with an example."},
  {p:"n24", q:"22b", x:"Design a CFG for the HTML code where it has to accept the correct form of the HTML language. The CFG should be written for the following tags without generating any ambiguity in the language flow. The tags are <body>, <h1>, <p>, <a>, <div> and characters inside the tags for displaying the text."},
  {p:"d25", q:"22a", x:"For each of the following two languages, find the respective context free grammar that generates it. i) L₁ = {aⁿb²ⁿ : n>=1} over the alphabet Σ = {a,b} (4 marks) ii) L₂ = {aⁿbᵐcᵐdⁿ : n>=1} over the alphabet Σ = {a,b,c,d} (4 marks)"}
], a: `
<p><b>Definitions.</b> A CFG is G = (V, T, P, S). <b>Leftmost derivation:</b> always replace the leftmost variable; <b>rightmost:</b> the rightmost. A <b>parse tree</b> has the start symbol at the root, variables inside and terminals (or ε) at the leaves; its yield is the derived string. A grammar is <b>ambiguous</b> if some string has two parse trees (two leftmost derivations).</p>
<p><b>Nov 2023 (i).</b> A → bAa | ba gives bᵐaᵐ (m ≥ 1). S → aSb | aAb wraps it in aⁿ … bⁿ (n ≥ 1). <b>L = {aⁿbᵐaᵐbⁿ | n ≥ 1, m ≥ 1}.</b></p>
<p><b>Nov 2023 (ii) — integers.</b></p>
<pre>S → +N | −N | N
N → D N | D
D → 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9</pre>
<p>Example: S ⇒ −N ⇒ −DN ⇒ −4N ⇒ −4D ⇒ −42.</p>
<p><b>May 2024 — w = +*−xyxy.</b></p>
<pre>Leftmost:  E ⇒ +EE ⇒ +*EEE ⇒ +*−EEEE ⇒ +*−xEEE ⇒ +*−xyEE ⇒ +*−xyxE ⇒ +*−xyxy
Rightmost: E ⇒ +EE ⇒ +Ey ⇒ +*EEy ⇒ +*Exy ⇒ +*−EExy ⇒ +*−Eyxy ⇒ +*−xyxy</pre>
<p><b>Parse tree:</b> root E with children +, E, E. The first E has children *, E, E; its first E has children −, E(x), E(y) and its second is x. The root's last child is y. (The expression is ((x − y) * x) + y in prefix form; the grammar is unambiguous.)</p>
<p><b>Nov 2024 22a(i).</b> A generates aⁿcbⁿ (n ≥ 0) in exactly one way, and S → AS | A generates one or more such blocks, split in exactly one way because each block has a single c in its middle. Every string therefore has <b>one</b> leftmost derivation: the grammar is <b>not ambiguous</b>. Example: cacb has only S ⇒ AS ⇒ cS ⇒ cA ⇒ caAb ⇒ cacb.</p>
<p><b>Nov 2024 22a(ii) — four properties of regular sets.</b> (1) Union of two regular sets is regular: (ab)* ∪ a*. (2) Concatenation is regular: a*·b*. (3) Kleene closure is regular: (ab)*. (4) The complement and intersection of regular sets are regular: complement of “strings with 00” is “strings without 00”. Also reversal, difference and homomorphism.</p>
<p><b>Nov 2024 22b — HTML grammar (unambiguous).</b></p>
<pre>Doc      → &lt;body&gt; Elements &lt;/body&gt;
Elements → Element Elements | ε
Element  → &lt;h1&gt; Text &lt;/h1&gt;
         | &lt;p&gt; Text &lt;/p&gt;
         | &lt;a&gt; Text &lt;/a&gt;
         | &lt;div&gt; Elements &lt;/div&gt;
Text     → Char Text | Char
Char     → a | b | … | z | A | … | Z | 0 | … | 9 | space</pre>
<p>Each element starts with a different opening tag and lists are built to the right only, so every document has exactly one parse tree. Example: &lt;body&gt;&lt;h1&gt;Hi&lt;/h1&gt;&lt;div&gt;&lt;p&gt;ok&lt;/p&gt;&lt;/div&gt;&lt;/body&gt;.</p>
<p><b>Dec 2025.</b></p>
<pre>(i)  L1 = { aⁿb²ⁿ | n ≥ 1 }:      S → aSbb | abb
(ii) L2 = { aⁿbᵐcᵐdⁿ | n,m ≥ 1 }:  S → aSd | aAd
                                   A → bAc | bc</pre>
<p>Check (i): S ⇒ aSbb ⇒ aabbbb. Check (ii): S ⇒ aSd ⇒ aaAdd ⇒ aabcdd.</p>` },

{ u:2, m:8, t:"Greibach Normal Form (GNF) conversions — 8 mark versions", items:[
  {p:"jl24", q:"24a", x:"Convert the following grammar G into Greibach Normal Form (GNF): S → XA | BB, B → b | SB, X → b, A → a."},
  {p:"m25", q:"22b", x:"Convert the given context free grammar into its equivalent Greibach normal form (GNF): S → AA | a, A → SS | b."},
  {p:"jl25a", q:"22b", x:"i. Convert the following CFG to GNF: S → AB, S → BSB | BB | b, S → aAb | a. ii. Test whether the following grammars are ambiguous. 1. S → 0S1S | 1S0S | ε 2. S → AA, A → aAb | bAa | ε."},
  {p:"jl25b", q:"22b", x:"Convert the given grammar from CFG to GNF: S → XB | AA, A → a | SA, B → b, X → a."}
], a: A_GNF_METHOD + `
<p><b>Jul 2025 · II — S → XB | AA, A → a | SA, B → b, X → a.</b></p>
<ol>
<li>Substitute X: S → aB | AA.</li>
<li>A → a | SA = a | aBA | AAA (left recursive).</li>
<li>Remove left recursion with Z: A → a | aBA | aZ | aBAZ; Z → AA | AAZ.</li>
<li>Back-substitute A at the front of S and Z.</li>
</ol>
<pre>S → aB | aA | aBAA | aZA | aBAZA
A → a | aBA | aZ | aBAZ
Z → aA | aBAA | aZA | aBAZA | aAZ | aBAAZ | aZAZ | aBAZAZ
B → b
X → a</pre>
<p><b>Jul 2024 — S → XA | BB, B → b | SB, X → b, A → a.</b></p>
<ol>
<li>S → bA | BB.</li>
<li>B → b | SB = b | bAB | BBB.</li>
<li>Remove left recursion: B → b | bAB | bZ | bABZ; Z → BB | BBZ.</li>
<li>Back-substitute B.</li>
</ol>
<pre>S → bA | bB | bABB | bZB | bABZB
B → b | bAB | bZ | bABZ
Z → bB | bABB | bZB | bABZB | bBZ | bABBZ | bZBZ | bABZBZ
A → a
X → b</pre>
<p><b>May 2025 — S → AA | a, A → SS | b.</b> Order S &lt; A.</p>
<ol>
<li>A → SS | b = AAS | aS | b (left recursive).</li>
<li>A → aS | b | aSZ | bZ; Z → AS | ASZ.</li>
<li>S → AA | a: substitute the first A.</li>
<li>Z: substitute the first A.</li>
</ol>
<pre>A → aS | b | aSZ | bZ
S → aSA | bA | aSZA | bZA | a
Z → aSS | bS | aSZS | bZS | aSSZ | bSZ | aSZSZ | bZSZ</pre>
<p><b>Jul 2025 · I (i).</b> All three lines are printed with S on the left, which cannot be intended; reading them as S → AB, B → BSB | BB | b, A → aAb | a:</p>
<ol>
<li>A → aAb | a: introduce C → b: A → aAC | a.</li>
<li>B → BSB | BB | b is left recursive: B → b | bZ; Z → SB | B | SBZ | BZ.</li>
<li>S → AB = aACB | aB.</li>
<li>Substitute the leading S and B in Z.</li>
</ol>
<pre>S → aACB | aB
A → aAC | a
C → b
B → b | bZ
Z → aACBB | aBB | b | bZ | aACBBZ | aBBZ | bZZ</pre>
<p><b>Jul 2025 · I (ii) — ambiguity.</b></p>
<ul>
<li><b>S → 0S1S | 1S0S | ε is ambiguous.</b> The string 0101 has two leftmost derivations: (a) S ⇒ 0S1S ⇒ 01S ⇒ 010S1S ⇒ 0101S ⇒ 0101 (inner S = ε, outer S = 01); (b) S ⇒ 0S1S ⇒ 01S0S1S ⇒ 010S1S ⇒ 0101S ⇒ 0101 (inner S = 10, outer S = ε).</li>
<li><b>S → AA, A → aAb | bAa | ε is ambiguous.</b> The string ab comes from S ⇒ AA with the first A ⇒ aAb ⇒ ab and the second A ⇒ ε, or with the first A ⇒ ε and the second A ⇒ ab: two leftmost derivations.</li>
</ul>` },

{ u:2, m:15, t:"GNF conversion with ε-productions (15 marks)", items:[
  {p:"m26", q:"26", x:"Convert the following grammar into GNF: S → aA | bB, B → bB | ε, A → aA | ε."}
], a: A_GNF_METHOD + `
<p><b>Step 1 — remove ε-productions.</b> Nullable variables: A (A → ε) and B (B → ε). S is not nullable because both its bodies start with a terminal. Add versions with the nullable variable omitted:</p>
<pre>S → aA | a | bB | b
A → aA | a
B → bB | b</pre>
<p><b>Step 2 — unit productions:</b> none. <b>Step 3 — useless symbols:</b> S, A, B are all generating and reachable.</p>
<p><b>Step 4 — check the GNF form A → aα (α ∈ V*).</b></p>
<div class="tw"><table>
<tr><th>Production</th><th>Leading terminal</th><th>Variables after it</th><th>GNF?</th></tr>
<tr><td class="m">S → aA</td><td>a</td><td>A</td><td>yes</td></tr>
<tr><td class="m">S → a</td><td>a</td><td>—</td><td>yes</td></tr>
<tr><td class="m">S → bB</td><td>b</td><td>B</td><td>yes</td></tr>
<tr><td class="m">S → b</td><td>b</td><td>—</td><td>yes</td></tr>
<tr><td class="m">A → aA | a</td><td>a</td><td>A / —</td><td>yes</td></tr>
<tr><td class="m">B → bB | b</td><td>b</td><td>B / —</td><td>yes</td></tr>
</table></div>
<p>No left recursion and no leading variable, so no substitution is needed. <b>The grammar in GNF is:</b></p>
<pre>S → aA | a | bB | b
A → aA | a
B → bB | b</pre>
<p><b>Language:</b> A gives a⁺ and B gives b⁺ after their leading symbol, so L(G) = {aⁿ | n ≥ 1} ∪ {bⁿ | n ≥ 1} = aa* + bb*. The original grammar generates the same set (aA with A ⇒ ε gives a), so ε was never in L and nothing is lost.</p>
<p><b>Check:</b> aaa: S ⇒ aA ⇒ aaA ⇒ aaa. bb: S ⇒ bB ⇒ bb. In GNF each step produces exactly one terminal, so a string of length n needs exactly n steps.</p>
<p><b>For the full 15 marks</b> write the definition of GNF, the general five-step method above (ordering variables, making A<sub>i</sub> → A<sub>j</sub>γ have j &gt; i, removing left recursion with a new variable, back-substitution) and note that this grammar needs only the ε-removal step. Mention the use of GNF: a PDA built from a GNF grammar reads one input symbol per move.</p>` },

{ u:2, m:8, t:"Chomsky Normal Form conversion (8 marks)", items:[
  {p:"m26", q:"22a", x:"Convert the following grammar to CNF: S → aAa | bBb | ε, A → C | a, B → C | b, C → CDE | ε, D → A | B | ab."}
], a: A_CNF_METHOD + `
<p><b>Step 1 — useless symbol first.</b> E has no production, so E is non-generating and C → CDE can never be used. Only C → ε remains for C.</p>
<p><b>Step 2 — ε-productions.</b> Nullable: C, then A and B (A → C, B → C), D (D → A), and S. Removing ε:</p>
<pre>S → aAa | aa | bBb | bb
A → C | a
B → C | b
D → A | B | ab</pre>
<p>C now has no production, so A → C and B → C disappear.</p>
<p><b>Step 3 — unit productions.</b> D → A | B becomes D → a | b | ab.</p>
<p><b>Step 4 — unreachable symbols.</b> D cannot be reached from S: delete it.</p>
<pre>S → aAa | aa | bBb | bb
A → a
B → b</pre>
<p><b>Step 5 — CNF form.</b> X → a, Y → b for terminals in long bodies; P → AX, Q → BY to shorten.</p>
<pre>S → XP | XX | YQ | YY
P → AX
Q → BY
A → a      B → b
X → a      Y → b</pre>
<p>The original language is {ε, aa, aaa, bb, bbb}. Since ε ∈ L, add a new start symbol <span class="m">S₀ → XP | XX | YQ | YY | ε</span>.</p>` },

{ u:2, m:15, t:"CNF (and GNF) conversion problems — 15 mark versions", items:[
  {p:"n24", q:"27", x:"Consider the following grammar: S → NP VP; N → cat | dog; NP → the N | NP that VP; VI → barks | bites; VT → bites | catches; VP → VI | VT NP. a) Remove the null production b) Remove the unit production c) Convert to CNF d) Convert to GNF e) Derive parse tree for “the dog catches the cat”."},
  {p:"jl25a", q:"27", x:"i. Construct a grammar in Chomsky Normal Form for the following CFG. Show the intermediate steps in construction. ({S, A, B, C}, {a, b, c, ε}, P, S): S → ABC, A → BC | a, B → bAC | ε, C → cAB | ε. ii. Find the Regular Expression corresponding to the given automata. (State A with a loop on 1, arrow on 0 to final state B, which loops on 0, 1.)"},
  {p:"jl25b", q:"26", x:"i) Define Chomsky's Normal Form? Simplify the Grammar and convert the following grammar G into CNF where G = ({A, B, C, D}, {a}, P, S), P: A → AaB | Ca | Ba, B → aB | ε, C → CaC, D → Aa. (12 Marks) ii) Remove the unit productions from the following grammar and write the final production rule: S → AB, A → a, B → C | b, C → D, D → E, E → a. (3 Marks)"},
  {p:"d25", q:"26", x:"A smart home automation system takes voice commands in the format defined by the following context free grammar. S → VP | Aux VP; VP → V NP | V; NP → Det N | N; Det → the | a | ε; N → cooler | fan | door; V → on | off | open | close; Aux → please. i) Using the original given grammar, generate the string “please open the door” using leftmost derivation. Show intermediary string derivation steps. (3 marks) ii) Convert the given grammar to Chomsky Normal Form (CNF) and then to Greibach Normal Form (GNF). (12 marks)"}
], a: A_CNF_METHOD + `
<p><b>Jul 2025 · I Q27(i) — S → ABC, A → BC | a, B → bAC | ε, C → cAB | ε.</b></p>
<p><b>ε-removal.</b> Nullable: B, C, A (A → BC), S (S → ABC).</p>
<pre>S → ABC | AB | AC | BC | A | B | C
A → BC | B | C | a
B → bAC | bA | bC | b
C → cAB | cA | cB | c</pre>
<p><b>Unit removal</b> (S → A | B | C, A → B | C):</p>
<pre>S → ABC | AB | AC | BC | a | bAC | bA | bC | b | cAB | cA | cB | c
A → BC | a | bAC | bA | bC | b | cAB | cA | cB | c
B → bAC | bA | bC | b
C → cAB | cA | cB | c</pre>
<p><b>CNF</b> with X<sub>b</sub> → b, X<sub>c</sub> → c, D → AC, E → AB, F → BC:</p>
<pre>S → AF | AB | AC | BC | a | Xb D | Xb A | Xb C | b | Xc E | Xc A | Xc B | c
A → BC | a | Xb D | Xb A | Xb C | b | Xc E | Xc A | Xc B | c
B → Xb D | Xb A | Xb C | b
C → Xc E | Xc A | Xc B | c
D → AC     E → AB     F → BC     Xb → b     Xc → c</pre>
<p>ε is in the original language; add S₀ → (all bodies of S) | ε if it must be kept.</p>
<p><b>Q27(ii) — regular expression.</b> A loops on 1, then 0 takes it to the final state B, which loops on 0 and 1: <b class="m">1*0(0+1)*</b> (all strings containing at least one 0). By Arden's theorem: A = ε + A1 ⇒ A = 1*; B = A0 + B(0+1) ⇒ B = 1*0(0+1)*.</p>
<p><b>Jul 2025 · II Q26(i)</b> (start symbol A). <b>CNF definition:</b> every production is A → BC or A → a.</p>
<ol>
<li><b>Useless:</b> C → CaC never ends, so C is non-generating: delete C and A → Ca. D is unreachable: delete D → Aa. Left: A → AaB | Ba, B → aB | ε.</li>
<li><b>ε:</b> B is nullable: A → AaB | Aa | Ba | a; B → aB | a.</li>
<li><b>Unit:</b> none.</li>
<li><b>CNF:</b> X → a, Y → XB.</li>
</ol>
<pre>A → AY | AX | BX | a
Y → XB
B → XB | a
X → a</pre>
<p>Language: a⁺.</p>
<p><b>Q26(ii) — unit productions.</b> B → C → D → E → a, so B ⇒* a. Replace: B → a | b. C, D and E become unreachable. <b>Final: S → AB, A → a, B → a | b.</b></p>
<p><b>Nov 2024 Q27.</b></p>
<ul>
<li><b>(a) Null productions:</b> there are none; the grammar is unchanged.</li>
<li><b>(b) Unit production</b> VP → VI: replace by VP → barks | bites. VI becomes unreachable.
<pre>S → NP VP        N → cat | dog        NP → the N | NP that VP
VT → bites | catches        VP → barks | bites | VT NP</pre></li>
<li><b>(c) CNF:</b> T → the, H → that, X → H VP.
<pre>S → NP VP        NP → T N | NP X        X → H VP
VP → barks | bites | VT NP        VT → bites | catches
N → cat | dog    T → the    H → that</pre></li>
<li><b>(d) GNF:</b> NP is left recursive. NP → the N | the N Z; Z → that VP | that VP Z. Substitute leading variables:
<pre>S  → the N VP | the N Z VP
NP → the N | the N Z
Z  → that VP | that VP Z
VP → barks | bites | bites NP | catches NP
N  → cat | dog</pre></li>
<li><b>(e) Parse tree for “the dog catches the cat”:</b> S → NP VP. Left NP → the N, N → dog. VP → VT NP, VT → catches, NP → the N, N → cat. Leftmost derivation: S ⇒ NP VP ⇒ the N VP ⇒ the dog VP ⇒ the dog VT NP ⇒ the dog catches NP ⇒ the dog catches the N ⇒ the dog catches the cat.</li>
</ul>
<p><b>Dec 2025 Q26.</b></p>
<p><b>(i) Leftmost derivation:</b> S ⇒ Aux VP ⇒ please VP ⇒ please V NP ⇒ please open NP ⇒ please open Det N ⇒ please open the N ⇒ please open the door.</p>
<p><b>(ii) CNF.</b> Nullable: Det. NP → Det N | N already covers the omitted case; delete Det → ε. Unit productions S → VP, VP → V, NP → N are replaced by the bodies they lead to:</p>
<pre>S   → V NP | on | off | open | close | Aux VP
VP  → V NP | on | off | open | close
NP  → Det N | cooler | fan | door
Det → the | a
N   → cooler | fan | door
V   → on | off | open | close
Aux → please</pre>
<p>Every body is two variables or one terminal: this is CNF.</p>
<p><b>GNF:</b> no left recursion, so substitute the leading variable of each two-variable body.</p>
<pre>S   → on NP | off NP | open NP | close NP | on | off | open | close | please VP
VP  → on NP | off NP | open NP | close NP | on | off | open | close
NP  → the N | a N | cooler | fan | door
N   → cooler | fan | door
Det → the | a        V → on | off | open | close        Aux → please</pre>
<p>Check in GNF: S ⇒ please VP ⇒ please open NP ⇒ please open the N ⇒ please open the door.</p>` },

{ u:2, m:15, t:"Pumping lemma for CFLs + minimising a finite automaton (15 marks)", items:[
  {p:"m25", q:"26", x:"1. State and Prove the pumping lemma for context free languages. Using the pumping lemma find out whether the language L={aⁿbⁿcⁿ : n>=1} is context free or not. 2. Minimize the given FA: →q0: a→q1, b→q2; *q1: a→q3, b→q4; *q2: a→q4, b→q3; q3: a→q5, b→q5; q4: a→q5, b→q5; *q5: a→q5, b→q5."}
], a: `
<p><b>Pumping lemma for CFLs — statement.</b> For every context-free language L there is a constant n such that every z ∈ L with |z| ≥ n can be written z = uvwxy with (1) |vwx| ≤ n, (2) vx ≠ ε, (3) uvⁱwxⁱy ∈ L for all i ≥ 0.</p>
<p><b>Proof.</b> Take a CNF grammar for L − {ε} with m variables and let n = 2ᵐ. A parse tree in CNF is binary, so a tree whose longest path has k variables has a yield of length at most 2ᵏ⁻¹. If |z| ≥ 2ᵐ, the tree for z has a path with at least m + 1 variables. By the pigeonhole principle some variable A repeats among the last m + 1 variables of that path: A ⇒* vAx and A ⇒* w, with S ⇒* uAy. The lower A gives w, the upper A gives vwx. Because the upper A is within m + 1 levels of the leaves, |vwx| ≤ 2ᵐ = n. In CNF the upper A has two children, one of which does not contain the lower A, so v and x are not both ε. Repeating the piece A ⇒* vAx i times gives S ⇒* uvⁱwxⁱy for every i ≥ 0 (i = 0 replaces the upper subtree by the lower one). ∎</p>
<p><b>L = {aⁿbⁿcⁿ | n ≥ 1} is not context-free.</b></p>
<ol>
<li>Assume L is a CFL with constant n. Choose z = aⁿbⁿcⁿ, |z| = 3n ≥ n.</li>
<li>z = uvwxy with |vwx| ≤ n and vx ≠ ε.</li>
<li>Since |vwx| ≤ n, vwx cannot contain both an a and a c (they are separated by n b's). So vwx lies inside aⁿbⁿ or inside bⁿcⁿ.</li>
<li><b>Case 1:</b> vwx has no c. Then uv²wx²y has more a's or b's than before but still n c's, so the three counts are not equal (or the letters are out of order): not in L.</li>
<li><b>Case 2:</b> vwx has no a. Then uv²wx²y has n a's but more b's or c's: not in L.</li>
<li>Every split fails, contradicting the lemma. <b>L is not context-free.</b></li>
</ol>
<p><b>2. Minimising the FA.</b> Partition into final and non-final states, then split groups whose members go to different groups on some input.</p>` + G.min_m25 + `
<p>q1 and q2 are equivalent (both are final and both go to the {q3,q4} group on a and b); q3 and q4 are equivalent (both non-final, both go to q5). q5 is final but goes to a final state, unlike q1 and q2, so it stays separate. The minimised machine accepts strings of length 1 and strings of length ≥ 3.</p>` }
];
