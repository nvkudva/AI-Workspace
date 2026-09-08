# README template v2

Rebuilt 2026-09-08 from published guidance rather than from my own taste. Sources at the
bottom; every rule below names the evidence behind it.

v1 is in git history. It failed in three repos because it forced one fixed seven-section
shape onto every project, leaving no home for an API reference, a methodology, or a
hardware parts list — so those got deleted instead of relocated. v2 fixes that with a
small required core plus optional modules you add when the project calls for one.

---

## What the evidence actually says

**The three questions.** GitHub's own guidance says a README should answer what the
project does, why it is useful, how to get started, where to get help, and who maintains
it. Prana et al. hand-annotated 4,226 sections across 393 repositories and found *What*
and *How* are nearly always present — while **purpose (*Why*) and status (*When*) are the
two categories most often missing**. That is the single most useful finding for us: the
sections everyone skips are the ones that tell a reader whether the project is alive and
whether it is for them.

**Copy-pasteable beats descriptive.** standard-readme requires Install and Usage to be
code blocks, not prose. Make a README adds: show the expected output.

**Scannability.** The popularity study over 1,950 READMEs found well-organised files —
lists, images, external links — dominate among popular projects, and that contribution
guidelines and references correlate with popularity. Engineers scan for the section they
need; they do not read top to bottom.

**Licence is not optional.** standard-readme makes it the required final section, with an
SPDX identifier.

**Where the sources disagree — decide per repo, do not follow blindly:**

| Question | Make a README | standard-readme | What we do |
|---|---|---|---|
| Length | "Too long is better than too short" | Concise; ToC once over 100 lines | No hard cap. Cut *padding*, never *content*. Move reference material to `docs/` only if it genuinely lands there |
| Table of contents | Optional | Required over 100 lines | Skip it. GitHub auto-generates an Outline from headings now |
| Badges | Recommended | Optional, no section title | Cap at **four**, and only ones that report live state (CI, coverage, version). No vanity badges |

---

## The required core

Six sections. Every repo gets all six, in this order.

````markdown
# <repo-name>

<One sentence: what this is and who it is for. Under 120 characters. No marketing adjectives.>

<Second line: why it exists — the problem it solves, or what it replaces. This is the
"Why" that most READMEs skip. Do not omit it.>

[Live demo](https://…) · [Docs](docs/) · [Changelog](CHANGELOG.md)

![<what the image shows — describe the content, not the design intent>](docs/screenshot.png)

## Requirements

- <Runtime and version>
- <Services, e.g. PostgreSQL 16 with the pgvector extension>
- <Hardware, if it matters>
- <Accounts or keys needed to reach a working state>

## Install

```bash
git clone https://github.com/nvkudva/<repo-name>.git
cd <repo-name>
<install command>
cp .env.example .env
```

## Usage

```bash
<the single most common command>
```

<One line naming what you should see when it works. Show real expected output where short.>

<Two or three more concrete scenarios, each with its command and its output.>

## Status

<What works today. What is not built. What is measured, with the date measured.
Label unmeasured figures as targets. If the project is dormant or seeking maintainers,
say so here.>

## Support

<Where to ask: the issue tracker, a discussion board, an email. One line is enough.>

## License

<SPDX identifier> — see [LICENSE](LICENSE).
````

**Why Status is in the core and Contributing is not.** Status is the most commonly missing
category in the research and the one that saves a reader the most time. Contributing
matters for projects that actually want contributors — it is a module below, not a
default, because a boilerplate Contributing section on a solo repo is noise.

---

## Optional modules

Add one only when the project has that thing. Place them between **Usage** and **Status**
unless noted.

| Module | Add it when | Contains |
|---|---|---|
| **Configuration** | Any env var or config file exists | A table: variable, required, what it is. Mark which ones are unsafe if unset |
| **Reference** | The project's surface *is* an API, a CLI, or a set of tools | Scannable tables — name, arguments, returns. This is the module `ticktick-mcp` needed and did not have |
| **How it works** | A newcomer cannot find the entry point | 3–6 sentences naming real directories and real files |
| **Method** | Numbers in the README depend on a calculation the reader must trust | The normalisation rule, the formula, the provenance of the data. `ModelCost` needed this |
| **Hardware** | Physical build | BOM table and pin map, inline. `kelu` needed this |
| **Background** | The design is unobvious or contested | Motivation and prior art. Keep it short and put the argument in `docs/` |
| **Contributing** | You want outside contributions | Where to ask, PR policy, how to run the tests |
| **Security** | Handles credentials, health data, money, or user content | Reporting process and known gaps. Otherwise fold into Status |
| **Privacy** | Handles personal data | What leaves the device, and what does not |
| **Credits** | Forked, or built on someone's work | Attribution. Required for a fork, alongside the licence |

---

## Rules

**Name.** The H1 matches the repo name. If the product name differs, write `# Atrium`
then a line reading `Repo: AgentOS`. **Keep native-script titles** — `ಚಿತ್ರಕಥೆ`,
`गीता · ಗೀತೆ · గీత`. For a project whose product is non-Latin text, the script is the
statement, not decoration. v1 stripped both; that was wrong.

**First three lines.** A stranger learns what it is, why it exists, and whether it is for
them, before scrolling.

**Never assume the ecosystem.** "Run `make install`" without naming the runtime, the
version and the platform is the second-most-cited README failure. Requirements comes
before Install, always.

**Show output, not just commands.** A command block a reader cannot verify is half a
document.

**Do not send the reader away for the basics.** The "see the docs" README is a named
anti-pattern. Link `docs/` for depth; keep what a first-time user needs on this page.

**Length: cut padding, not content.** No line limit. Delete praise, restated feature
lists, changelogs, business models, pasted build output and exact test counts. Keep every
table a user would look something up in. When you move content to `docs/`, verify it
arrived — v1's SmartFin rewrite deleted the agent math on the promise it lived in
`docs/ARCHITECTURE.md`, and it did not.

**Stale is worse than absent.** An outdated screenshot or a dead demo link actively
misleads. No per-deploy preview hashes; a stable alias or nothing.

**Licence, always.** Add the LICENSE file, then name the SPDX identifier. If there is
none, write "No licence file yet — all rights reserved." Never claim a licence the repo
does not carry.

**Forbidden.** Emoji in headers. More than four badges, or any badge that does not report
live state. Praise words — premium, stunning, seamlessly, blazing. Unreplaced
placeholders. A manual table of contents.

---

## Sources

- [GitHub — About READMEs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) — the five questions a README answers
- [standard-readme specification](https://github.com/RichardLitt/standard-readme/blob/main/spec.md) — required sections, ordering, SPDX, 120-char description
- [Make a README](https://www.makeareadme.com/) — section order, "show the expected output", length position
- [Prana et al., *Categorizing the Content of GitHub README Files*, EMSE 2018](https://arxiv.org/abs/1802.06997) — eight categories over 4,226 sections; *Why* and *When* most often missing
- [*Correlation between Readme Content and Project Popularity*, arXiv 2206.10772](https://arxiv.org/abs/2206.10772) — 1,950 READMEs; structure, contribution guidelines and references correlate with popularity
- [freeCodeCamp — How to Write a Good README](https://www.freecodecamp.org/news/how-to-write-a-good-readme-file/) — practical section order
- [Write a Good README — 5 mistakes to avoid](https://www.kunalganglani.com/blog/write-good-readme-guide) — the empty / obvious-to-me / novel / outdated / see-the-docs anti-patterns
- [daily.dev — README badges best practices](https://daily.dev/blog/readme-badges-github-best-practices/) — cap badges at 2–4
