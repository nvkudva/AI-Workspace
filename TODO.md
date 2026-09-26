# TODO

- [ ] Revoke the live Google Gemini API key committed at `.claude/settings.local.json` in the public repo `nvkudva/gym-budy-claude` — it is in pushed git history, so deleting the file is not enough, and archiving the repo does not hide it either
- [ ] Vijay reviews `README-TEMPLATE.md` before any further README work
- [ ] `ticktick-mcp` README: restore the Available Tools tables, priority/status value tables and example prompts; keep the new Status section
- [ ] `ModelCost` README: restore the "every money figure is per $10" rule to the top, plus the Method and Provenance sections; keep the new "no deployed instance" line
- [ ] `kelu` README: pull the BOM table and wiring diagram back inline under Requirements
- [ ] `chitrakathe` README: restore the Kannada ಚಿತ್ರಕಥೆ to the H1
- [ ] `bhagavad-geeta` README: restore `(गीता · ಗೀತೆ · గీత)` to the H1
- [ ] `SmartFin`: recover the deleted agent math from git history into `docs/ARCHITECTURE.md` — it is not in the working tree
- [ ] `GymBuddy` is the live gym app and was never reviewed — run the code review and the README rewrite on it
- [ ] Archive `gym-budy-claude` and `gym-buddy`; `GymBuddy` is the kept gym project
- [ ] Decide `aeon`: de-fork it properly or drop it; it is an unedited copy of upstream `aeonfun/aeon`
- [ ] Decide the keyboard overlap: `SuperVoiceBoard` and `VBoard` both ship voice keyboards
- [ ] Archive the 20 repos listed in `REPO-TRIAGE.md`, once reviewed; `puzzle` should be made private, `paperboy` has an unresolved NOASSERTION licence
- [ ] Work through the 57 P0 items in the per-repo `REVIEW.md` files — the recurring one is unauthenticated APIs on `Sahay`, `voice-interview-coach`, `AgentOS` and `AI-Doctor`

## General codebase hygiene suggestions

- [ ] Add PLAN.md acceptance criteria and a verify step to Smart-News and Smart-Voice-Control (86 and 75 correction turns); give subagents Explore/cavecrew types with a budget (88 of 121 were general-purpose)

## Claude Code efficiency and reliability (session audit 2026-09-26)

- [x] Cap tool results over 40k chars in a PostToolUse/RTK hook; require head/jq/rg first (1,351 oversized results)
- [x] Hand off and restart sessions at ~300 tool calls to cut compactions (94) and 700–1,234-call sessions
- [x] Push long work into subagents sooner to reduce cache-read spend (14.4B cache-read vs 45M output tokens)
- [x] Merge overlapping style injections (caveman, Concise style, obedient-ai rules, lean-build and implementation-path hooks) into one source
- [x] Remove duplicate MCPs: pick one browser stack and one Context7 (plugin vs claude.ai)
- [x] Uninstall duplicate skills: linkedin-post (delete the claude.ai account copy; caveman-learn done)
- [x] Fix or disable claude-design MCP; it fails auth (403) every session — run /design-login
- [x] Pre-load core browser tools per project or batch them into one ToolSearch select (some sessions ran 8–16)
- [x] Add a hook that blocks foreground `sleep` and points to run_in_background + Monitor (1,403 calls)
- [x] Add a rule to use absolute paths and `git -C` instead of `cd` prefixes (7,599 calls)
- [x] Export the scratchpad path once as an env var instead of a repeated `S=` preamble (154 calls)
- [x] Save recurring python3 scripts under a per-repo `tools/` directory (2,163 ad-hoc calls with repeated tracebacks)
- [x] Replace sqlite3 one-offs with duckdb or saved query files (548 calls)
- [x] Guard `_omz_nvm_setup_completion` in `.zshrc_claude.sh`; it breaks `node` in non-interactive shells (obsolete: moved to fnm)
- [x] List the verbs block-dangerous-git.sh blocks in the rules so the model stops trying them (~300 blocks)
- [x] Allow `git switch -f` / `checkout -f` when `git status` is clean — top false positive (68)
- [x] Add a rule to ask once up front before deploy or prod steps (~100 classifier denials)
- [x] Run /fewer-permission-prompts on the 54 user-rejected tool calls to move them to the allowlist or deny list
- [x] Standardise on one browser automation stack (~350 errors across Claude_Browser, claude-in-chrome, agent-browser)
- [x] Keep browser JS evals short to avoid CDP Runtime.evaluate timeouts (17)
- [x] Allowlist localhost ports in the browser extension (27 navigation denials)
- [x] Give each project a fixed dev-server port in its CLAUDE.md (36 preview_start port collisions)
- [x] Add a browser rule: screenshot before any coordinate click (6 failures)
- [x] Warn on the third full read of one file, and run formatters once at the end (demo.html read 50×; 12 modified-since-read errors)

## Done 2026-09-07/08

- [x] Audit the README of all 42 non-fork repos
- [x] Triage every repo into keep/archive — `REPO-TRIAGE.md`
- [x] Write the house README template — `README-TEMPLATE.md`
- [x] Architecture and code-quality review of the 20 keep repos; `REVIEW.md` committed and pushed to each
- [x] Rewrite the README in all 20 keep repos — `README-COMMITS.md`
- [x] Read all 20 README diffs and review the rewrite quality — `README-QUALITY-REVIEW.md`
