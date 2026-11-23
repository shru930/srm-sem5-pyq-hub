# SRM Semester 5 PYQ Hub

Study sites built from previous end-semester question papers.

| Subject | Open this file | What is inside |
|---|---|---|
| Computer Networks (21CSC302J) | `cn-study/index.html` | 120 long questions from 10 papers, grouped into 54 topics |
| Formal Language and Automata (21CSC301T) | `fla-study/index.html` | 108 long questions from 9 papers, grouped into 35 topics, linked to a 65-video YouTube playlist |
| Discrete Mathematics (21MAB302T) | `maths-study/index.html` | 104 long questions from 9 papers, grouped into 22 topics by the CO unit printed on the paper, linked to Dr. E. Sujatha's playlists |

Each site is a single HTML file: open it in a browser, no install needed.

- **Study**: topics sorted by how many papers repeated them. Open a topic, then tap a question to see its own answer.
- **Hot topics**: frequency heatmap per unit.
- **Game plan**: ranking of topics and where the marks come from.
- **Paper by paper**: every paper's Q21 to Q27 in order.
- **MCQ key**: Part A answers for every paper. (The ticked question-paper PDFs the page mentions are not included in this repository.)

## Rebuilding

The pages are generated from the data files:

```
cd cn-study && node build.js
cd fla-study && node build.js && node check.js
cd maths-study && node build.js && node check.js
```

`cn-study/page.src.html` is the page shared by all three sites.
