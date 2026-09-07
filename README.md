# AI-Workspace

A dashboard and runbook for supervising every Claude Code session on one account from a single page.

It replaces reading a session list by hand: an agent sweeps the fleet on a cron and writes what it finds to a page you can act from.

## Requirements

- Claude Code, signed in to the claude.ai account that owns the sessions
- The published Artifact that hosts the board — one fixed URL, listed under "How it works"
- A `Claude_Code_Remote` MCP connection, for `list_sessions`, `get_session`, `create_trigger`, `create_session` and `interrupt_session`. Without it the board renders but every cloud row is frozen
- Node and `playwright`, only if you want to screenshot the board before changing its style

## Run it

```bash
git clone git@github.com:nvkudva/AI-Workspace.git
cd AI-Workspace
claude
```

The session loads `CLAUDE.md` on start. Ask it to recreate the sweep cron from
`.supervisor/sweep-prompt.md` (`*/5 * * * *`, recurring), then open the board.
It works when a sweep updates the `Swept` timestamp in the masthead and the
session rows match `.supervisor/STATUS.md`.

To screenshot the page before a style change:

```bash
cp .supervisor/dashboard.html /tmp/board/ && cd /tmp/board
npm i playwright --no-audit --no-fund
node /path/to/.supervisor/tools/shot.mjs    # writes shot-super.png, shot-rows.png
node /path/to/.supervisor/tools/probe.mjs   # prints real box geometry
```

`probe.mjs` reads `preview.html`, which `shot.mjs` writes — run `shot.mjs` first.
Both scripts hardcode a Chromium path of `/opt/pw-browsers/chromium` and will not
resolve on a machine without it.

## How it works

Three parts, no build step and no server.

- `.supervisor/dashboard.html` is the whole front end — inline styles, static
  markup, one inline script. It gets a database handle from `claude.use("db")`
  and subscribes to `fleet/snapshot`, `commands`, `chat/thread` and `chat/<session id>`.
- The Artifact database is the only shared state and the only transport. The page
  never calls an API; it appends command documents and chat messages.
- A Claude session runs `.supervisor/sweep-prompt.md` every five minutes. It drains
  queued commands, relays chat into sessions with `create_trigger`, rebuilds
  `fleet/snapshot`, regenerates `.supervisor/STATUS.md`, and commits.

Tapping a button on the board writes a queued command; the next sweep executes it
and marks it done. Latency is up to five minutes by design.

The board lives at one permanent address:
`https://claude.ai/code/artifact/ec57876f-c431-492f-85ae-cbe3a71c77d4`.
Republish to it by passing that URL to the Artifact tool. Publishing without the
URL creates a second artifact and splits the board in two.

| Path | What it is |
|---|---|
| `.supervisor/dashboard.html` | The board's committed source |
| `.supervisor/sweep-prompt.md` | The cron prompt, verbatim |
| `.supervisor/STATUS.md` | Fleet state, regenerated every sweep |
| `.supervisor/snapshot.json` | Last fleet state, to seed a new thread |
| `.supervisor/tools/` | Playwright screenshot and geometry probe |
| `REVIEW.md` | Code review of this repo, 2026-09-07 |
| `REPO-TRIAGE.md` | Audit of other repos on the account; unrelated to this code |

## Status

The board renders, subscribes, and queues commands. Known issues as of 2026-09-07,
detailed in `REVIEW.md`:

- The supervisor is currently running locally with no `Claude_Code_Remote` MCP, so
  every cloud row in `STATUS.md` is frozen and read-only.
- The supervisor card's "copy link" button throws on every click — it looks for a
  `.super` container that does not exist.
- Session ids and artifact URLs from the snapshot are interpolated into markup
  unescaped and unvalidated.
- A hardcoded seed list of sessions renders as live data on load and whenever the
  database is unavailable; the masthead's timestamp and spend figure are literals.
- No tests, no CI, no manifest, no lockfile. The only verification is a manual
  screenshot.

Nothing here has been run on a machine other than the author's.

## License

No licence file yet - all rights reserved.
