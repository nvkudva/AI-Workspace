# Repository triage — nvkudva

Audited 2026-09-07. 84 repos on the account; 42 are forks and are excluded.
This covers the **42 owned repos**.

Signals used: last push, disk usage, top-level tree shape, primary language,
README state (see the README audit), and structural overlap between repos.

**Verdict: keep 20 · archive 20 · 2 special cases.**

---

## Duplicate clusters

Five clusters where more than one repo does the same job. Tree shape is the
evidence — repos in a cluster have near-identical top-level layouts.

### 1. Clinical / virtual doctor — 4 repos, keep 1

| Repo | Pushed | Size | Tree | Verdict |
|---|---|---|---|---|
| **AI-Doctor** | 2026-09-07 | 2.9 MB | `apps/ docs/ supabase/ package.json` | **keep** |
| virtual-doctor | 2026-07-09 | 447 KB | `apps/ packages/ docs/ supabase/ package.json` | archive |
| virtual-doctor-local-llm | 2026-07-24 | 2.8 MB | `docs/ prototype/` | archive |
| ai-hospital | 2026-07-30 | 147 KB | `docs/ src/ package.json` | archive |

AI-Doctor and virtual-doctor are the same application — same `apps/` + `supabase/`
shape, same TypeScript stack. AI-Doctor is two months newer and 6× larger.
virtual-doctor-local-llm is a static HTML mockup whose README already admits the
stack is Gemini, not local. ai-hospital has no README and no distinguishing structure.

### 2. Finance agents — 2 repos, keep 1

| Repo | Pushed | Size | Tree | Verdict |
|---|---|---|---|---|
| **SmartFin** | 2026-08-27 | 10.5 MB | `data/ docs/ drizzle/ scripts/ src/ web/` | **keep** |
| FinFab | 2026-08-25 | 304 KB | `data/ learning/ runs/ scripts/ src/ web/` | archive |

Same four-agent event → sector → fund → portfolio chain, same `data/ scripts/ src/ web/`
skeleton. SmartFin is two days newer and 34× larger, and adds a real persistence layer.
FinFab's headings still carry `(requirement B)`, `(requirement C)` — it is the graded
assignment version.

### 3. Gym tracker — 3 repos, keep 1

| Repo | Pushed | Size | Tree | Verdict |
|---|---|---|---|---|
| **gym-budy-claude** | 2026-03-28 | 3.1 MB | `.claude/ package.json public/ scripts/ src/` | **keep** (rename) |
| gym-buddy | 2026-07-30 | 81 KB | `package.json public/ src/` | archive |
| GymBuddy | 2025-11-18 | 54 KB | — | archive |

gym-buddy is newer by date but is still the unedited `create-vite` template — 81 KB with
a README that never mentions a gym. GymBuddy is the 2025 AI Studio export. Only
gym-budy-claude has real content (six working screenshots, matching scripts).
The keeper's name is misspelled: rename to `gym-buddy-claude`.

### 4. News — 3 repos, keep 2

| Repo | Pushed | Size | Verdict |
|---|---|---|---|
| **Smart-News** | 2026-09-07 | 222 KB | **keep** — Workers deploy, scheduled ingest |
| **briefwire** | 2026-09-06 | 1.9 MB | **keep** — different job: one cited daily brief, has `eval/` and `migrations/` |
| ai-news-app | 2026-04-24 | 188 KB | archive — bare `package.json public/ src/` vite app, superseded |

Smart-News and briefwire are genuinely different products. ai-news-app is the
earlier attempt at what Smart-News now does.

### 5. Android keyboards — 2 repos, **your call**

| Repo | Pushed | Size | Tree |
|---|---|---|---|
| SuperVoiceBoard | 2026-09-03 | 299 MB | `app/ core/ voice/ llm/ art/ fastlane/` |
| VBoard | 2026-08-31 | 2.0 MB | `app/ core/ build/ docs/` |

Both are voice-input Android keyboards, pushed three days apart. But they are
**different codebases**, not copies: SuperVoiceBoard is a HeliBoard fork carrying
upstream's whole tree, VBoard is written from scratch with its own `docs/` and a
777-test suite. Overlapping in purpose, not in code. Not auto-archiving either —
tell me which one you are actually taking forward.

---

## Archive — 20 repos

### Dead, 2012–2021 (7)

| Repo | Last push | Why |
|---|---|---|
| nextjs-blog | 2021-07-16 | Next.js tutorial follow-along; README renders broken |
| metro | 2014-07-09 | Bootstrap admin dashboard theme; static HTML for tables, charts, forms |
| KonkniRecipes | 2014-03-30 | Android recipe app on MongoLab, a service that no longer exists |
| DBtest | 2014-03-30 | Scratch spike for KonkniRecipes' data layer |
| GmailStyle | 2014-01-03 | Stylebot userstyle for a Gmail UI twelve years gone |
| paperboy | 2013-08-27 | 2013 admin template; **license is NOASSERTION** — resolve before archiving |
| puzzle | 2012-10-20 | Multunus interview take-home; **make private**, not just archive |

### Empty or near-empty (6)

| Repo | Size | Why |
|---|---|---|
| AI-Supervisor | 0 | No code, no README, no description |
| wizkids-redesign | 0 | No code, no README, no description |
| claude-playground | 0 | No code, no README, no description |
| nas-dl | 0 | **Not empty** — a Chrome extension adding a right-click download over a `nasdl://` deep link. Small, but real. Reconsider before archiving |
| cyberpunk-coffee | 2 KB | Single-page landing page that references a `styles.css` not in the repo |
| laguna-test | 146 KB | Bundles three unrelated experiments — AITrader, ai-news-app, sci-fi-coffee. Split or archive |

### Superseded by a sibling (7)

virtual-doctor · virtual-doctor-local-llm · ai-hospital · FinFab · gym-buddy ·
GymBuddy · ai-news-app — see the clusters above.

---

## Special cases — 2

**aeon** (2026-09-07, 8.9 MB) — GitHub says this is not a fork, but the contents are
upstream `aeonfun/aeon` shipped unedited: the badges count someone else's stars, the
install instructions send readers to the upstream repo. Nothing here is yours yet.
Either de-fork it properly (rewrite the top of the README, repoint every link, state
what you changed) or drop it. **Excluded from the review workflow until you decide.**

**antigravity-sync-data** (0 bytes, private) — a data bucket for a browser extension,
not a codebase. Nothing to review. Leave it, but add the three lines the README audit
asked for so it is legible.

---

## Keep — 20 repos

These go into the architecture + code-quality review.

| Repo | Pushed | Size | Language | Cloned locally |
|---|---|---|---|---|
| Smart-News | 2026-09-07 | 222 KB | TypeScript | yes |
| AgentOS | 2026-09-07 | 7.7 MB | TypeScript | yes |
| AI-Doctor | 2026-09-07 | 2.9 MB | TypeScript | no |
| AI-Workspace | 2026-09-07 | 64 KB | HTML | yes |
| voice-interview-coach | 2026-09-06 | 183 KB | Python | no |
| briefwire | 2026-09-06 | 1.9 MB | TypeScript | no |
| kelu | 2026-09-06 | 72 KB | C | yes |
| Sahay | 2026-09-06 | 5.1 MB | TypeScript | yes |
| figurine-factory | 2026-09-06 | 667 KB | Python | no |
| ask-my-brain | 2026-09-06 | 2.5 MB | TypeScript | yes |
| chitrakathe | 2026-09-06 | 7.0 MB | TypeScript | no |
| obedient-ai | 2026-09-06 | 29 KB | — | yes |
| bhagavad-geeta | 2026-09-06 | 5.3 MB | TypeScript | yes |
| ModelCost | 2026-09-05 | 314 KB | JavaScript | yes |
| SuperVoiceBoard | 2026-09-03 | 299 MB | Kotlin | yes |
| VBoard | 2026-08-31 | 2.0 MB | Kotlin | no |
| SmartFin | 2026-08-27 | 10.5 MB | TypeScript | no |
| gym-budy-claude | 2026-03-28 | 3.1 MB | TypeScript | no |
| magalang | 2026-03-27 | 5.0 MB | JavaScript | yes (`maga-lang`) |
| ticktick-mcp | 2026-07-30 | 30 KB | JavaScript | yes |

**8 of 20 are not cloned locally** and must be fetched before any review can read them:
AI-Doctor, voice-interview-coach, briefwire, figurine-factory, chitrakathe, VBoard,
SmartFin, gym-budy-claude.

---

## Cross-cutting findings

Three problems recur across the keep list and are cheaper to fix in one sweep than
per-repo:

1. **No LICENSE file.** Not one of the 20 keep repos has one. Several READMEs claim
   MIT anyway — an unbacked licence claim is worse than none.
2. **Name drift.** `AgentOS` is titled Atrium, `Smart-News` is spelled three ways,
   `gym-budy-claude` is misspelled, `virtual-doctor-local-llm` uses no local LLM.
   Four repos where the name and the contents disagree.
3. **Six repos publish a hosted or paid product** (AI-Doctor, chitrakathe, Sahay,
   Smart-News, ModelCost, magalang) **with no licence and no stated data policy.**
   Sahay and AI-Doctor are health-adjacent; chitrakathe renders paid customer
   deliverables.

---

## What has not been done yet

This report is triage only — it reads metadata, tree shape and READMEs. It has **not**
read the source of any repo. The architecture and code-quality review of the 20 keep
repos is the next step, and no repo has been archived, renamed, or pushed to.

---

## Corrections, 2026-09-08

Setting the GitHub description field on all 42 repos meant reading each one properly.
That surfaced four errors in the triage above, now fixed in place:

- **`nas-dl` is not empty.** It is a working Chrome extension. GitHub reported 0 KB disk
  usage, which I took as "no code". It should not be archived without a second look.
- **`laguna-test` is not one throwaway test.** It holds three unrelated experiments.
- **`metro` is a Bootstrap admin theme**, not a Windows-8 UI kit — I inferred that from the
  name and the CSS label rather than from the contents.
- **`cyberpunk-coffee`** references a stylesheet that is not committed, so it does not
  render as-is.

The lesson holds for the rest of the archive list: disk usage and repo name are weak
evidence. Everything in the "empty or near-empty" table deserves a look at the file tree
before it is archived.
