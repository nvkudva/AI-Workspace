# README template

The house README shape for every repo on this account. It exists to kill the six
faults the README audit found across 42 repos: name drift, missing prerequisites,
buried run instructions, unbacked licence claims, targets published as measurements,
and emoji-header filler.

Copy the skeleton. Delete every section that would be empty — a short honest README
beats a long padded one. Never leave a placeholder in place.

---

## Skeleton

````markdown
# <repo-name>

<One sentence: what this is and who it is for. No marketing adjectives.>

<Optional second line: why it exists, or what it replaces. Only if it adds something.>

[Live demo](https://…) · [Docs](docs/)

![<what the image shows>](docs/screenshot.png)

## Requirements

- <Runtime and version, e.g. Node 22+>
- <Services, e.g. PostgreSQL 16 with the pgvector extension>
- <Hardware, if it matters, e.g. 24 GB NVIDIA GPU on Linux>
- <Accounts or keys needed to get past first run>

## Run it

```bash
git clone https://github.com/nvkudva/<repo-name>.git
cd <repo-name>
<install command>
cp .env.example .env    # fill in the variables below
<run command>
```

<One line naming what you should see when it works.>

## Configuration

| Variable | Required | What it is |
|---|---|---|
| `EXAMPLE_KEY` | yes | … |

## How it works

<Three to six sentences, or a short list. Name real directories and real files.
This is the section that tells a reader where to start reading the code.>

## Status

<What works today. What is not built. Anything measured, with the date it was
measured. Label unmeasured figures as targets — never state a target as a result.>

## License

<SPDX name> — see [LICENSE](LICENSE).
````

---

## Rules

**Name.** The H1 is the repo name. If the project has a different product name, write
it as `# Atrium` followed by a line reading `Repo: AgentOS`. One name per repo, spelled
one way, everywhere.

**First three lines.** A stranger must learn what the thing is and whether it is for
them before scrolling. No history, no thesis, no architecture — those go in `docs/`.

**Requirements before Run it, always.** Every version, service, key and piece of
hardware needed to reach a working state. A command block a reader cannot complete is
worse than no command block.

**Run it goes above the fold.** Before the feature tour, before screenshots beyond the
first, before design notes. A developer looking for `bun install` should not scroll
past six images to find it.

**Links must survive a deploy.** No per-deploy preview hashes. A stable alias, a custom
domain, or nothing.

**Screenshots.** One for any project with a UI, showing the main screen doing its main
job. Two at most on the first screen. Alt text describes what is visible, not the design
intent. Label seeded or mock data as such.

**Status is where honesty lives.** If the ONNX path has never run, if the latency table
has no measurements, if the demo needs a key you have not funded — it goes here, in
plain words. This section is the one that earns the reader's trust in the rest.

**Licence.** Add the LICENSE file, then name it. Never claim a licence the repo does not
carry.

**Length.** Aim for 40–120 lines. Past that, move the overflow to `docs/` and link it.
Architecture documents, business models, changelogs and troubleshooting logs are not
README content.

**Forbidden.** Emoji in headers. Invented shields.io badges. "🚀 Features". Sentences
that praise the project ("premium", "stunning", "seamlessly"). Unreplaced placeholders
(`<your-name>`, `git clone <repo>`). Pasted build output. Exact test counts that go stale
on the next commit.
