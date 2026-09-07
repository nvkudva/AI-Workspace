# Code review — AI-Workspace

A single-file browser dashboard (`.supervisor/dashboard.html`, 753 lines) that reads and writes an Artifact key-value store, plus the prose runbook that a Claude Code "supervisor" session follows every five minutes to keep that store fresh.

I read every tracked file: `dashboard.html` in full, both `.mjs` tools, `CLAUDE.md`, `.supervisor/SUPERVISOR.md`, `sweep-prompt.md`, `STATUS.md`, and the head of `snapshot.json`. I skimmed only `REPO-TRIAGE.md`, which is an audit of unrelated GitHub repos and shares no code with the rest.

## Architecture

There is no build, no manifest, and no server. The whole system is three parts:

1. **The page.** `.supervisor/dashboard.html` — inline `<style>` (lines 3-247), static markup (249-336), one inline `<script>` (337-753). It obtains a Firestore-like handle via `claude.use("db")` and subscribes to `fleet/snapshot`, `commands`, `chat/thread`, and `chat/<session id>`.
2. **The store.** The Artifact database is the only shared state and the only transport. The page writes commands and chat messages; it never calls an API.
3. **The agent.** `.supervisor/sweep-prompt.md` is a cron prompt executed by a Claude session every five minutes. It drains `commands`, relays `chat/*` into sessions via `create_trigger`, rewrites `fleet/snapshot`, regenerates `.supervisor/STATUS.md`, and pushes a git commit.

Data flow is one loop: user taps a button → `queue()` (dashboard.html:484) adds a doc to `commands` → the sweep reads it, acts, sets `status: done` → `onSnapshot` (line 607) repaints the queue table. Latency is up to five minutes by design, and the UI says so.

**What the structure gets right.** Committing the page source and treating the published artifact as a deployment target is the correct call for a zero-build app — `CLAUDE.md` even documents the `url` parameter needed to avoid forking the board. The CSS token layer (lines 4-41) defines light, `prefers-color-scheme` dark, and `[data-theme]` dark separately, which is the correct three-state pattern. Render is cleanly split into `renderBoard`, `renderGroups`, `rowHTML`, `renderQueue` (401-482), all pure string builders driven off one `fleet` array.

**Where it will hurt.**

- **Fleet state has four copies.** The hardcoded `SEED` array (dashboard.html:338-383), `.supervisor/snapshot.json`, `.supervisor/STATUS.md`, and `fleet/snapshot` in the db. Only the last is authoritative. `SEED` is already stale — it lists `session_01HTQrffyxN7ctNKYk3YEuWh` ("Clinician-supervised mental health assistant", `hot:true`, `$45.20`) with data that contradicts both `STATUS.md` and `snapshot.json`, and it renders as if live for the first second of every page load, plus permanently in any view where `db` is unavailable. The masthead has a fifth copy: literal `10:45 UTC` and `$274.19` at lines 258-259.
- **The read-modify-write on `chat/*` is not safe.** Both message senders (line 563 and line 673) do `set()` with a locally-concatenated array. The supervisor appends to the same doc on its sweep. Any overlap silently discards one side's messages, and `.slice(-40)` truncates on top of that.
- **A snapshot repaints the entire session list.** Line 586 calls `renderGroups()`, which replaces `#groups.innerHTML` wholesale. Every open reply drawer, every half-typed message, and every revealed URL box is destroyed on each five-minute sweep. Lines 587-590 partially patch this by force-reopening drawers whose ids are in `rowThreads`, but the typed text is gone and drawers the user closed come back open. This is the structural cost of string-rebuild rendering against a live subscription, and it gets worse with every control added to a row.
- **`claude.use("db")` is called twice** (line 579 and line 678) for two independent handles and two disjoint state machines — the second one never assigns the module-level `db`, so `#talkForm` gates on `threadReady` while `.rtalk` forms gate on `db`. Two connection paths, two failure modes, two offline messages.
- **The agent contract lives only in prose.** `sweep-prompt.md` and `CLAUDE.md` describe the document shapes (`{r, t, ts}`, `{id, t, g, ask, spend, ctx}`) in English. Nothing validates that what the agent writes matches what the page reads; a field rename breaks the board with no error.

## Code quality

- **Escaping is incomplete and inconsistently applied.** `esc()` (line 396) covers `& < > "` but not `'`. More importantly, `s.id` is interpolated raw into markup twice in `rowHTML`: `data-id="${s.id}"` (line 433) and `href="https://claude.ai/code/${s.id}"` (line 435). `a.url` is passed through `esc()` at line 439, which blocks attribute breakout but not a `javascript:` scheme.
- **Broken selector: the supervisor's "copy link" button throws on every click.** Line 510 is `c.closest(".row")||c.closest(".super")`, but the element is `<section class="supercard">` (line 265) — there is no `.super` class in the document; `grep` finds only `.btn.super`. `host` is `null`, and line 511 dereferences it unconditionally before the clipboard branch. `CLAUDE.md`'s own note about `.btn.super` inside `.super` confirms the container was renamed and this selector was not updated.
- **Silent failure handlers.** The `fleet/snapshot` error callback is `()=>{}` (line 606) — the primary data feed can die with no offline banner and no console trace. `clearDone` swallows every delete error (line 573) and then reports `Cleared ${finished.length}` regardless of how many actually went (lines 573-574).
- **Unbounded subscriptions.** `watchRow` (543-552) registers an `onSnapshot` per session id in `rowSubs` and never unsubscribes. The error path sets `rowSubs[id]=null`, which makes the next open re-subscribe rather than recover. On a page left open for a day the handle count only grows.
- **No idempotency on writes.** Every tap of an action button appends a new `commands` doc (line 487); "Finalise all" (line 495) fires one unawaited `queue()` per auto session with no confirmation. Deduplication is delegated to the agent — `sweep-prompt.md` step 2 says "Deduplicate repeat taps" — which is the wrong layer for it.
- **Stuck UI state.** `#refreshBtn` sets `refreshAsked` (line 650) and is only cleared when a *new* `sweptAt` arrives (line 595). If the supervisor session is dead — which `STATUS.md` currently reports, "Supervisor is LOCAL. Cloud rows are frozen" — the button counts up forever with no timeout and no way to retry.
- **Dead and duplicated code.** `actionsFor` lines 412-413 are two branches returning the same `[]`. `.rtitle` is declared twice (lines 95 and 113) with conflicting `display`. Two identical `@media (max-width:760px)` blocks sit at lines 189 and 193. `CLAUDE.md` and `.supervisor/SUPERVISOR.md` are byte-identical except for a four-line header — 85 duplicated lines of operating instructions with no single source.
- **The tooling does not match the host.** `shot.mjs:8` and `probe.mjs:2` hardcode `executablePath:'/opt/pw-browsers/chromium'`, a Linux cloud path, but `STATUS.md` says the supervisor now runs locally on macOS. `sweep-prompt.md` step 4 hardcodes `/home/user/AI-Workspace/.supervisor/STATUS.md` for the same reason. Neither will resolve on the current machine. `tools/README.md` also states both scripts expect `dashboard.html` in the cwd; `probe.mjs` actually loads `preview.html`, which only exists after `shot.mjs:7` writes it — an undocumented ordering dependency.
- **Dependency hygiene.** No `package.json`, no lockfile. `tools/README.md` tells the operator to `npm i playwright` unpinned into a scratchpad.
- **Tests and CI: none.** For a 753-line application implementing an untyped wire protocol against a live database, `shot.mjs` is the only verification step and it is manual and visual.
- **Secrets: clean.** No keys, tokens, or credentials anywhere in the tree.
- **`.DS_Store` is tracked** (`git ls-files`), and there is no `.gitignore`.

## Risks

- **Injection through session metadata.** `fleet/snapshot` is written by an agent from session titles and `external_metadata.artifacts`, i.e. from content that other Claude sessions produce. A session id containing `"` breaks out of `data-id="${s.id}"` (line 433) into arbitrary attributes; an artifact `url` of `javascript:...` (line 439) becomes a clickable script link. The page is the operator's control surface for the whole fleet, so script execution there is the highest-value target in the system.
- **Selector injection.** Lines 549 and 588 build `` `.row[data-id="${id}"]` `` from the same unsanitised id. A quote raises `SyntaxError` inside the snapshot callback and kills the live update path.
- **Message loss.** Concurrent `set()` on `chat/thread` and `chat/<id>` (lines 563, 673) against the supervisor's own append is last-write-wins. There is no transaction, no version check, and no user-visible signal that a message was overwritten. For a channel whose stated purpose is relaying decisions into running sessions, a dropped message is a real failure.
- **Unbounded queue growth.** `commands` is append-only from the page. The UI reads `limit(60)` (line 607) and "Clear finished" only deletes what that page loaded, so anything older than the newest 60 is invisible but still present and still matches the supervisor's `status == queued` query — an old tap can be executed long after the operator forgot it.
- **Commit-per-sweep.** `CLAUDE.md` step 4 and `sweep-prompt.md` step 4 commit and push a regenerated `STATUS.md` every five minutes to the default branch — roughly 288 commits a day. The branch history becomes unusable for reviewing actual code changes to `dashboard.html`, and every sweep is a push to a remote that could fail silently.
- **The published artifact URL is committed.** Anyone with `https://claude.ai/code/artifact/ec57876f-...` and access to the account reaches the board and its command queue. Fine for a private repo; a problem the moment this one is made public, along with the two dozen real session ids in `dashboard.html:338-383`.

## Action items

| Priority | Item | File | Why |
|---|---|---|---|
| P0 | Escape `s.id` and validate `a.url` against an `https:`/`http:` allowlist before interpolating | `.supervisor/dashboard.html:433,435,439` | Agent-written snapshot data reaches `href` and raw attribute position; this is script execution on the fleet control surface |
| P0 | Fix `c.closest(".super")` to `.supercard`, and null-guard `host` before `host.querySelector` | `.supervisor/dashboard.html:510-511` | The supervisor "copy link" button throws a TypeError on every click today |
| P1 | Replace `set()` on `chat/*` with an append that cannot clobber a concurrent supervisor write | `.supervisor/dashboard.html:563,673` | Read-modify-write on a doc both sides edit silently loses messages |
| P1 | Stop calling `renderGroups()` on every snapshot; diff rows and preserve open drawers and input values | `.supervisor/dashboard.html:586-590` | A five-minute sweep erases whatever the user is typing into a reply |
| P1 | Surface the `fleet/snapshot` error instead of `()=>{}` | `.supervisor/dashboard.html:606` | The main data feed can fail with the board still showing stale rows and no banner |
| P1 | Give `#refreshBtn` a timeout that resets `refreshAsked` and re-enables the button | `.supervisor/dashboard.html:641-656,595-601` | With the supervisor down, the button counts up forever and the user cannot retry |
| P1 | Delete the `SEED` array and render an explicit empty/loading state until `fleet/snapshot` arrives | `.supervisor/dashboard.html:338-383` | 20 stale sessions with wrong costs render as if live; three of them no longer exist per `STATUS.md` |
| P1 | Replace the hardcoded `10:45 UTC` and `$274.19` in the masthead with placeholders | `.supervisor/dashboard.html:258-259` | Same problem, and these are the two figures a reader trusts first |
| P1 | Make Chromium's path an env var with a macOS fallback | `.supervisor/tools/shot.mjs:8`, `.supervisor/tools/probe.mjs:2` | `/opt/pw-browsers/chromium` does not exist on the local host the supervisor now runs on |
| P1 | Replace the absolute `/home/user/AI-Workspace/...` path in the sweep prompt with a repo-relative one | `.supervisor/sweep-prompt.md` (step 4) | The cron job cannot write `STATUS.md` from a macOS checkout |
| P1 | Give commands a client-side idempotency key and confirm "Finalise all" before firing N writes | `.supervisor/dashboard.html:484-489,495` | Deduplication is currently the agent's job per `sweep-prompt.md` step 2; the UI should not create the duplicates |
| P2 | Unsubscribe row listeners when a drawer closes; track handles rather than nulling on error | `.supervisor/dashboard.html:543-552` | Subscription count grows monotonically on a long-lived page |
| P2 | Report the actual delete count in `clearDone` and stop swallowing errors | `.supervisor/dashboard.html:569-575` | "Cleared 12" is printed even when all twelve deletes failed |
| P2 | Add a `.gitignore` and untrack `.DS_Store` | repo root | Currently tracked with no ignore file to prevent recurrence |
| P2 | Make `.supervisor/SUPERVISOR.md` a pointer to `CLAUDE.md` instead of a copy | `.supervisor/SUPERVISOR.md` | 85 of 89 lines are byte-identical; the two will diverge |
| P2 | Write the sweep's `STATUS.md` commits to a separate branch or stop committing them | `CLAUDE.md` (step 4), `.supervisor/sweep-prompt.md` (step 4) | ~288 commits a day on the default branch buries every real change to `dashboard.html` |
| P2 | Remove the dead `actionsFor` branch, the duplicate `.rtitle` rule, and the duplicate media query | `.supervisor/dashboard.html:412-413,95,113,189,193` | Conflicting CSS declarations are how the `.btn.super` bug happened |
| P2 | Correct `tools/README.md` to say `probe.mjs` needs `preview.html` and must run after `shot.mjs` | `.supervisor/tools/README.md` | The documented precondition is wrong; `probe.mjs` fails on a clean directory |
| P2 | Add a `package.json` pinning `playwright` for the tools directory | `.supervisor/tools/` | Unpinned `npm i` into a scratchpad is not reproducible |
| P2 | Move `REPO-TRIAGE.md` out of this repo or into a dated subdirectory | `REPO-TRIAGE.md` | A 183-line audit of 42 unrelated GitHub repos sits at the root of a supervisor tool |
