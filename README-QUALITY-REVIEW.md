# README rewrite — quality review

I read all 20 diffs. Judged on substance only — whether a reader learns more, and whether
anything true and useful was destroyed. Template structure ignored, as asked.

**Verdict: the new version is better in 17 of 20.** Three are regressions worth acting on:
`ticktick-mcp`, `ModelCost` and, more mildly, `kelu`.

The systemic fault is real. One 7-section shape was forced onto 20 unlike projects. It has no
home for a tool reference, for methodology, or for a hardware BOM — so in those repos the
agent dropped that content rather than bending the template. It also stripped non-Latin titles
from two repos whose whole point is non-Latin text.

---

## 1. Repos where the new README is SMALLER

Ordered by how much was cut. Byte counts, with line counts alongside.

1. **[SmartFin](https://github.com/nvkudva/SmartFin/blob/HEAD/README.md)** — 43,560 → 5,539 bytes (**-38,021**), 653 → 73 lines  
   Better: new, with a caveat. Old was a 653-line architecture textbook with the install block written twice. New is a real README. **But** the §4 agent math and the four-hop worked example lived only in that file — they are not in `docs/ARCHITECTURE.md`, so they are now only in git history.  
   [View diff](https://github.com/nvkudva/SmartFin/compare/f843d581f7ccbab344133b855a4fe692d7b863c5...6667bcd7ecfcf0218d9ed3f730469a65b43c072a)

2. **[AgentOS](https://github.com/nvkudva/AgentOS/blob/HEAD/README.md)** — 16,305 → 5,308 bytes (**-10,997**), 318 → 79 lines  
   Better: new. Old opened with ~60 lines arguing whether the product's own thesis holds. New names real files (`toolbelt.ts`, `provision.ts`), states the CORS/auth hole plainly, and flags that `npm run dev` proxies to the wrong port.  
   [View diff](https://github.com/nvkudva/AgentOS/compare/1ab34397602eedc0ca8eec8c50c72ae09de5555f...dbfe476ca433c394f2cf21651056de0612eecc7b)

3. **[SuperVoiceBoard](https://github.com/nvkudva/SuperVoiceBoard/blob/HEAD/README.md)** — 11,917 → 4,987 bytes (**-6,930**), 166 → 99 lines  
   Better: new. Old was 12 good lines followed by ~130 lines of upstream HeliBoard README sending bug reports to the wrong tracker. New scopes itself to the fork and corrects the false 'HeliBoard requests no permissions' claim. Upstream Credits/Funding sections were dropped; licence attributions were kept.  
   [View diff](https://github.com/nvkudva/SuperVoiceBoard/compare/df9b37c84088ea67176dfb996e515cb6a7d23414...7cc0de3be7fdb6ece2e30e5905c8260d21379c8b)

4. **[ask-my-brain](https://github.com/nvkudva/ask-my-brain/blob/HEAD/README.md)** — 9,783 → 5,489 bytes (**-4,294**), 163 → 74 lines  
   Better: new. Old published an all-em-dash Results table for a project whose whole point is retrieval quality. New says outright no corpus has ever been ingested.  
   [View diff](https://github.com/nvkudva/ask-my-brain/compare/b1554bfdb83c8f28ec6906178d2f8cef6509d6f0...cf23ad04e910f8a99c7c143e7bb9953fa146c7b4)

5. **[figurine-factory](https://github.com/nvkudva/figurine-factory/blob/HEAD/README.md)** — 8,879 → 4,686 bytes (**-4,193**), 217 → 73 lines  
   Better: new. Old buried the 24 GB GPU requirement ~150 lines down in the Privacy section. New puts it in Requirements and warns that `bun run seed` deletes every published run without asking.  
   [View diff](https://github.com/nvkudva/figurine-factory/compare/5888cb3997d758064f87258e2a84bd841f87c8b9...6b666da53eedc2edef6345a381df1f96ab5fcadf)

6. **[chitrakathe](https://github.com/nvkudva/chitrakathe/blob/HEAD/README.md)** — 10,547 → 6,492 bytes (**-4,055**), 243 → 89 lines  
   Better: new, with a caveat. Cutting the 55-line gross-margin P&L was right. **But** the H1 lost the Kannada ಚಿತ್ರಕಥೆ — for a repo whose product is Kannada-language video, that was identity, not decoration.  
   [View diff](https://github.com/nvkudva/chitrakathe/compare/95c6fbba4d856102f9787ecca1087b09a818ea29...830c4031cbde87d187c5dfc9f3575c411a0cef8f)

7. **[kelu](https://github.com/nvkudva/kelu/blob/HEAD/README.md)** — 7,278 → 4,876 bytes (**-2,402**), 173 → 82 lines  
   Better: mixed. New is right to relabel unmeasured latency as targets. **But** the old had the BOM table and the wiring diagram inline; new compresses both to one line pointing at `docs/hardware.md`. The file exists, so nothing is lost — but a hardware project's parts list belongs above the fold.  
   [View diff](https://github.com/nvkudva/kelu/compare/38b61208ee8314f6768bf0b5216bd7002ead928a...a3bd6cea081344502b634e4ca7af092381000505)

8. **[Sahay](https://github.com/nvkudva/Sahay/blob/HEAD/README.md)** — 7,688 → 5,566 bytes (**-2,122**), 177 → 71 lines  
   Better: new. Old put `bun install` at line 110, behind six screenshots. New leads with it and states that `bun test` does not pass on HEAD.  
   [View diff](https://github.com/nvkudva/Sahay/compare/57d28426f90b646f9db53954fe5396a7b0edd4a4...dacef0bb0adf81ef8e54ce3bf75c650ce135cfb9)

9. **[gym-budy-claude](https://github.com/nvkudva/gym-budy-claude/blob/HEAD/README.md)** — 5,761 → 3,969 bytes (**-1,792**), 202 → 67 lines  
   Better: new. Old was 202 lines of emoji headers, five invented badges and an unbacked MIT claim. No contest.  
   [View diff](https://github.com/nvkudva/gym-budy-claude/compare/ed0cb75c4e4e78c055219cf6b6a4a2325455305d...18bb3da58dff5a567ef7a9e21f856838e66d2f42)

10. **[voice-interview-coach](https://github.com/nvkudva/voice-interview-coach/blob/HEAD/README.md)** — 6,432 → 4,694 bytes (**-1,738**), 163 → 93 lines  
   Better: new. Old led with a latency table where every cell was an em-dash. New deletes it and labels the $0.65/session figure as modelled.  
   [View diff](https://github.com/nvkudva/voice-interview-coach/compare/ea0b05b92b4489fe47b50ebef84fb3d9d8a7154d...a83e7082184621400aacc7f06579259c18643c9d)

11. **[Smart-News](https://github.com/nvkudva/Smart-News/blob/HEAD/README.md)** — 7,129 → 5,827 bytes (**-1,302**), 156 → 72 lines  
   Better: new. Old contradicted itself on the default LLM provider in two adjacent sections, and neither matched `src/lib/llm.ts`.  
   [View diff](https://github.com/nvkudva/Smart-News/compare/bc7b69e253de242128f1b6e49a07041c00799e3e...a44f38ea1c1ed7c638d0d9ca6d36e8908dfa2708)

12. **[ModelCost](https://github.com/nvkudva/ModelCost/blob/HEAD/README.md)** — 4,653 → 4,584 bytes (**-69**), 109 → 89 lines  
   Better: **old**. Near-identical size, but the content was swapped out. The old README led with 'every money figure is per $10' — the one fact you need to read the table at all, and the thing the original audit singled out as good. New drops it, along with Method, Normalisation and Provenance.  
   [View diff](https://github.com/nvkudva/ModelCost/compare/ecb7caf3c557ca14bbae9c22776f218e462c08db...2e2efe9d87edb20e775f6aa3b148bddf4d2f3b78)

13. **[ticktick-mcp](https://github.com/nvkudva/ticktick-mcp/blob/HEAD/README.md)** — 3,900 → 3,878 bytes (**-22**), 149 → 67 lines  
   Better: **old**. The single clearest regression. Old had scannable Available Tools tables with arguments, priority/status value tables, example prompts and an API reference — for an MCP server that reference *is* the documentation. New compresses all of it into one prose paragraph you cannot scan. New is far more honest (undocumented endpoints, missing `zod` dep, destructive `npm test`), so the fix is to merge, not revert.  
   [View diff](https://github.com/nvkudva/ticktick-mcp/compare/8412506ffc311d55573469df790725ad13f23e0c...57b2eeb5dbd09d2502e4964f5a16f5060c7dbfe0)

## 2. Repos where the new README is the same size or larger

| Repo | Bytes | Better | Why |
|---|---|---|---|
| [briefwire](https://github.com/nvkudva/briefwire/blob/HEAD/README.md) | +4,110 | new | Grew, and earned it: adds a config table and states that the MORE/LESS/DROP feedback loop writes to a table nothing reads. |
| [AI-Workspace](https://github.com/nvkudva/AI-Workspace/blob/HEAD/README.md) | new file | new | There was no README at all. |
| [bhagavad-geeta](https://github.com/nvkudva/bhagavad-geeta/blob/HEAD/README.md) | +2,604 | new, with a caveat | Killed the false Tailwind and MIT claims. **But** the H1 went from `Geeta (गीता · ಗೀತೆ · గీత)` to `Geeta` — for a three-script reader, those scripts were the product statement. |
| [magalang](https://github.com/nvkudva/magalang/blob/HEAD/README.md) | +2,245 | new | Old invited you to try a language whose interpreter runs everything through `eval`, prints errors as values, and supports neither floats nor the comment syntax the old README documented. |
| [obedient-ai](https://github.com/nvkudva/obedient-ai/blob/HEAD/README.md) | +1,473 | new | Old hardcoded a machine-specific clone path. New adds a Status section saying the SessionStart hook fails silently. |
| [AI-Doctor](https://github.com/nvkudva/AI-Doctor/blob/HEAD/README.md) | +1,229 | new | Old advertised a voice-first demo; no client code opens the Gemini Live socket. New says the consult is text only. |
| [VBoard](https://github.com/nvkudva/VBoard/blob/HEAD/README.md) | +463 | new | Corrected first-run storage from 'about 1.2 GB' to the real 610 MB download plus ~1.5 GB extraction headroom. |

## 3. What I would actually change

**Revert-and-merge, not plain revert.** In all three regressions the new README carries facts
the old one did not — a plain `git revert` would put false or missing information back.

1. **`ticktick-mcp`** — restore the Available Tools tables, the priority/status value tables and
   the example prompts from the old file; keep the new Status section verbatim.
2. **`ModelCost`** — restore the 'every money figure is per $10' rule to the top, and the Method
   and Provenance sections; keep the new 'no deployed instance' statement.
3. **`kelu`** — pull the BOM table and the wiring diagram back inline under Requirements.
4. **`chitrakathe` and `bhagavad-geeta`** — one-line fix: put the native-script titles back in the H1.
5. **`SmartFin`** — the deleted math is not in `docs/`. If you want it, move it from git history into
   `docs/ARCHITECTURE.md` rather than back into the README.

Say which of these you want and I will do them. Nothing has been changed since the rewrite.

