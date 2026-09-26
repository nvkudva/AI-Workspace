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
