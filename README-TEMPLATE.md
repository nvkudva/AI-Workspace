# README template

The house README shape for every repo on this account. Rebuilt 2026-09-08.

**Completeness is the goal, not brevity.** A reader should finish this file knowing what
the project does, how to stand it up, how it is built, what will bite them, and how far
along it is — without opening the source or another document. Readability comes from
structure, not from cutting content: tables, short paragraphs, real headings.

**Consistency is the other goal.** Every repo carries every core section, in the same
order, so a reader who knows one repo knows where to look in all of them. If a section
does not apply, do not delete it — write one honest line saying so:

> ## Configuration
> Nothing is read from the environment. All thresholds live in `configs/default.yaml`.

That is consistent *and* informative. An empty heading is neither.

---

## Core sections — every repo, this order

### 1. Title and description

```markdown
# <repo-name>

<One sentence: what this is and who it is for. Under 120 characters.>

<Second line or short paragraph: why it exists — the problem it solves, or what it
replaces. Most READMEs skip this. Do not.>

[Live demo](https://…) · [Docs](docs/) · [Changelog](CHANGELOG.md)
```

H1 matches the repo name. If the product name differs, write `# Atrium` then a line
reading `Repo: AgentOS`. **Keep native-script titles** — `ಚಿತ್ರಕಥೆ`, `गीता · ಗೀತೆ · గీత`.
For a project whose product is non-Latin text, the script is the statement.

Up to four badges, on their own line, and only ones reporting live state — CI, coverage,
version, licence. No vanity badges.

### 2. Screenshot or demo

One image showing the main screen doing its main job. Alt text describes what is visible,
not the design intent. Label seeded or mock data as such, in the caption. For a CLI, a
short terminal capture. For a library, skip it.

### 3. Features

What it actually does, as a scannable list. Concrete and specific — the thing a reader
compares against alternatives.

```markdown
## Features

- **Four-agent impact chain.** Event → sectors → funds → customers, each hop a real join
  over real data, with a rupee figure and a confidence score per customer.
- **Deterministic maths.** The model judges cause and effect; unit-tested code does every
  multiplication. A keyword classifier cross-checks the model and lowers confidence on
  disagreement.
- **Full audit trail.** Every stage persists its input, output, model id, confidence and
  duration as a row you can read back with `bun run cli trace`.
```

Not "Fast & Responsive". Not "Seamlessly adapts". Each bullet names a capability and the
mechanism behind it.

### 4. Requirements

Everything needed to reach a working state, before any command appears.

```markdown
## Requirements

- Node 22 or newer
- PostgreSQL 16 with the `pgvector` extension
- A 24 GB NVIDIA GPU on Linux — for local generation only
- An OpenAI-compatible endpoint, or one API key
```

Runtime and version. Services. Hardware. Accounts and keys. Platform, when it matters —
"macOS only" on a launchd script saves a Linux reader an hour.

### 5. Setup

Numbered, copy-pasteable, from a clean clone to a running system. No step assumed.

````markdown
## Setup

```bash
git clone https://github.com/nvkudva/<repo-name>.git
cd <repo-name>
createdb <dbname>          # if it needs a database
<install command>
cp .env.example .env       # fill in the variables under Configuration
<migrate command>
```
````

### 6. Usage

The common commands, each with what you should see. Two or three real scenarios.

````markdown
## Usage

```bash
bun run cli analyse EVT-S1
```

Four stages stream past, then a ranked list of affected customers with a rupee figure and
a confidence score.

```bash
bun run cli trace          # replay what each agent saw on the last run
bun run tui                # terminal UI
bun run build && bun run start   # web app on http://localhost:8790
```
````

Show expected output. A command block a reader cannot verify is half a document.

### 7. Configuration

A table. Every variable, whether it is required, and what it does. Mark the ones that are
unsafe when unset — that detail belongs here, not buried in Gotchas.

```markdown
## Configuration

| Variable | Required | What it is |
|---|---|---|
| `DEEPSEEK_API_KEY` | Yes, unless another backend is selected | Key for the default backend |
| `SMARTFIN_API_TOKEN` | On any deployed instance | Shared secret for mutating `/api` requests. **Unset means writes are open to anyone** |
| `PORT` | No | HTTP port. Defaults to `8790` |
```

### 8. Architecture

How the system is actually put together. Name real directories, real files, real symbols.
Three to eight sentences, or a short list, plus a diagram where the shape is hard to say
in prose.

```markdown
## Architecture

`src/core/pipeline.ts` runs four stages in order and wraps each in `src/core/audit.ts`,
which persists the stage's input, output, model id and duration.

State lives entirely in the database — no session store, no queue. `src/db/client.ts` is
a proxy over a swappable driver: `src/db/local.ts` installs `bun:sqlite`,
`src/worker/index.ts` installs D1. One Hono app (`src/server/app.ts`) therefore serves
four surfaces unchanged — CLI, TUI, web and Worker.

| Directory | What lives there |
|---|---|
| `src/agents/` | The four pipeline stages |
| `src/core/` | Pipeline, audit, learn — no I/O |
| `web/` | React + Vite client |
```

This is the section that tells a newcomer where to start reading. Do not outsource it to
`docs/` — link deeper material from here, but the map belongs on this page.

### 9. Gotchas

The traps. Things that will cost someone an afternoon, stated before they hit them.

```markdown
## Gotchas

- `bun run seed` **deletes every row first**, including runs published by `figurine
  publish`. It does not ask. Point it at a scratch database.
- `npm run dev` proxies `/api` to port 8788 while the server listens on 8787.
- `npm test` runs live integration tests against a real TickTick account and creates and
  deletes real projects. Do not run it against an account you care about.
- Slicing cannot succeed on a fresh clone — `configs/printers/profiles/` holds only a
  README, not the three preset JSONs the code expects.
- `webui/` reads the SQLite file by relative path, so it cannot be moved away from the
  Python tree.
```

No published README spec has this section. Ours does, because the code reviews of these
repos found exactly these landmines and no other section had room for them.

### 10. Status

What works, what does not, and how far along it is. The two things most READMEs omit are
purpose and status — purpose is section 1, this is the other.

```markdown
## Status

**Working:** the four-stage pipeline, the audit trail, URL and RSS ingestion, and all
four surfaces. Tests and typecheck pass locally.

**Not built:** multi-tenancy, real market-data ingestion, a job queue.

**Not measured:** accuracy figures come from `evaluation.simulate()`, not market data.
Treat every accuracy number in the UI as a mechanism demo, not a result.

**Known gaps** (review 2026-09-07): with `SMARTFIN_API_TOKEN` unset every mutating route
is open; the session HMAC key falls back to that same token; no rate limiting; no CI.

**Next:** wire real market data, then close the auth gaps before any public deploy.
```

Label every unmeasured figure a target. Date anything measured. If the project is dormant
or seeking maintainers, say it here.

### 11. Support

One line: the issue tracker, a discussion board, an email. For a fork, say which tracker
takes which kind of issue.

### 12. License

```markdown
## License

MIT — see [LICENSE](LICENSE).
```

Add the LICENSE file, then name the SPDX identifier. If there is none: "No licence file
yet — all rights reserved." Never claim a licence the repo does not carry. For a fork,
list the inherited licences alongside.

---

## Optional sections

Add when the project has the thing. Place between Architecture and Gotchas unless noted.

| Section | Add it when | Contains |
|---|---|---|
| **Reference** | The project's surface *is* an API, CLI or tool set | Scannable tables: name, arguments, returns, example. An MCP server or a library lives or dies on this |
| **Method** | Numbers in the README depend on a calculation the reader must trust | The normalisation rule, the formula, the provenance and date of the data |
| **Hardware** | Physical build | BOM table with prices, pin map, wiring diagram — inline, not linked away |
| **Testing** | Tests exist | How to run them, what they cover, what they do not |
| **Deployment** | It is deployed anywhere | Target, command, and what breaks in production but not locally |
| **Privacy** | Handles personal data | What leaves the device and what does not |
| **Security** | Handles credentials, health data, money or user content | Reporting process. Known gaps stay in Status |
| **Contributing** | You want outside contributions | Where to ask, PR policy, how to run the tests |
| **Credits** | Forked or built on someone's work | Attribution. Required for a fork |
| **Roadmap** | Direction is decided beyond "Next" in Status | Planned releases. Delete it the moment it goes stale |

---

## Rules

**Requirements before Setup, always.** "Run `make install`" without naming the runtime,
the version and the platform is the most-cited README failure.

**Do not send the reader away for the basics.** The "see the docs" README is a named
anti-pattern. Link `docs/` for depth; keep what a first-time user needs on this page.

**Length follows content.** There is no line limit and no target. A 300-line README that
is all substance is correct. Delete only true padding: praise words, restated feature
lists, changelogs, business models, pasted build output, exact test counts that go stale.

**Move content only where it lands.** If you cut a section to `docs/`, open that file and
confirm it arrived. A previous rewrite deleted SmartFin's agent maths on the promise it
lived in `docs/ARCHITECTURE.md`. It did not.

**Stale is worse than absent.** Outdated screenshots and dead demo links actively
mislead. No per-deploy preview hashes — a stable alias or nothing.

**No manual table of contents.** GitHub generates an Outline from your headings.

**Forbidden.** Emoji in headers. More than four badges, or any badge not reporting live
state. Praise words — premium, stunning, seamlessly, blazing. Unreplaced placeholders.

---

## Sources

Sections 1, 4, 5, 6, 11 and 12 follow published guidance. Features, Architecture, Gotchas
and the shape of Status are ours, and the reasoning is above.

- [GitHub — About READMEs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) — what / why / how to start / where to get help / who maintains
- [standard-readme](https://github.com/RichardLitt/standard-readme/blob/main/spec.md) — section ordering, 120-character description, SPDX, licence last
- [Make a README](https://www.makeareadme.com/) — Features subsection, show expected output, "too long is better than too short"
- [Prana et al., *Categorizing the Content of GitHub README Files*, EMSE 2018](https://arxiv.org/abs/1802.06997) — 4,226 sections annotated; purpose and status are the categories most often missing
- [*Readme Content and Project Popularity*, arXiv 2206.10772](https://arxiv.org/abs/2206.10772) — 1,950 READMEs; lists, images and references correlate with popularity
- [freeCodeCamp — How to Write a Good README](https://www.freecodecamp.org/news/how-to-write-a-good-readme-file/)
- [5 README mistakes to avoid](https://www.kunalganglani.com/blog/write-good-readme-guide) — empty / obvious-to-me / novel / outdated / see-the-docs
- [daily.dev — README badges](https://daily.dev/blog/readme-badges-github-best-practices/) — cap at four
