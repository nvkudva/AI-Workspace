# 🛰️ Supervisor — Fleet Status

| | |
|---|---|
| **Supervisor** | `ai-workspace-8d` · `session_01Krr1y5W84RzUWszj37KLvN` |
| **Cadence** | 5-min cron sweep · job `7057b37b` · expires in 7d |
| **Policy** | Intervene where safe · escalate taste/design/scale calls · track every blocker |
| **Last sweep** | 2026-09-06 10:30 UTC |
| **Fleet** | 20 sessions (`has_more: true`) |

---

## 📊 Scoreboard

| Status | Count | Meaning |
|---|---|---|
| 🔴 Blocked on Vijay | **4** | Needs a human decision |
| 🟡 Blocked, self-clearable | **7** | Draft done, optional rewrite offered |
| ⚫ Failed | **1** | Crashed, needs relaunch |
| 🟢 Done | **4** | Shipped |
| ⚪ Idle | **4** | No action needed |

---

## 🔴 Blocked — needs your call

| Session | ID | Ask | Spent |
|---|---|---|---|
| Agent company floor-plan UI | `019UMdbJ` | 3 design decisions in `prd.md §7` — runtime, gate, messaging | $12.30 |
| Clinician mental-health assistant | `01HTQrff` | Pick style: glass · paper · outline · elevated | $45.20 |
| Ask My Brain RAG | `017NBXpF` | Pick 1 of 3 voice-console designs for round two | $18.75 |
| TickTick → LinkedIn loop | `015VjH28` | Approve launching next batch of 50 sessions | $1.27 |

---

## 🟡 Blocked — I can clear these

All 7 drafts exist. Each session is only offering an optional rewrite.

| Session | ID | Question it's stuck on |
|---|---|---|
| India electric energy independence | `01M3gdD2` | Lead with the AI/data-center angle? |
| Short attention span | `01FqAukR` | Lead with the notification finding? |
| LLM wait time is the real pain | `01JqEVLs` | Tighter, or lean on the dopamine angle? |
| Too many terminals | `01Jr3Bxr` | Shorter, or a different hook? |
| Sarvam AI voice models | `01BJhAci` | Keep the guardrail hunch open? |
| The agent-readable web | `01QPEoLN` | Punchier at ~120 words? |
| Todos change with AI memory | `01WXCSKm` | Shorter cut of the 196 words? |

---

## ⚫ Failed

| Session | ID | Failure |
|---|---|---|
| SCORM corporate training | `01BMeNFw` | ARCHIVED · `ede_diagnostic` `stop_reason=null` · needs relaunch |

---

## 🟢 Done

| Session | ID | Outcome |
|---|---|---|
| briefwire — topic news briefing | `019vwsyf` | Pushed to GitHub · 4 commits · 62 files · 35 tests green |
| GAIA / Horizon Zero Dawn post | `01JRUQXC` | 224-word draft on multi-agent AI |
| Token speed post | `01DMzV8E` | Draft on token speed as AI's real bottleneck |
| AI storm resets eng leadership | `015Mc9RE` | 218-word draft |

---

## ⚪ Idle

| Session | ID | State |
|---|---|---|
| Obedient-ai Claude Code plugin | `01QkmWRy` | Review-ready |
| macbook-pro local bridge | `01UMQVoe` | Config reload applied |
| macbook-pro / ModelCost bridge | `013dk8vH` | `main` clean, 0 unpushed |

---

## 💰 Cost watch

| Session | Cost | Context used | Note |
|---|---|---|---|
| Clinician mental-health | **$45.20** | 506k / 1M | Highest burn in fleet |
| Ask My Brain RAG | **$18.75** | 327k / 1M | |
| Agent floor-plan UI | **$12.30** | 219k / 1M | |
| briefwire | $7.34 | 189k / 1M | Complete |

Rate limit: **allowed**, five-hour window, no overage.

---

## 🔌 Messaging notes

| Capability | Tool |
|---|---|
| Push a prompt into a cloud session | `create_trigger` + `persistent_session_id`, or `fire_trigger` |
| Stop a runaway turn | `interrupt_session` |
| Spawn a worker | `create_session` |
| Discover local peers | `ListAgents` |

`send_message` is **not** available on the Claude_Code_Remote server in this build.
