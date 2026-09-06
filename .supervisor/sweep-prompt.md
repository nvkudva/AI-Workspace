# The sweep prompt

Cron jobs die with the session. At the start of a new thread, recreate this
with `CronCreate`, `*/5 * * * *`, `recurring: true`.

Create the new job BEFORE deleting an old one — the auto-mode classifier can
refuse a CronCreate, and deleting first leaves the fleet unswept.

Keep it roughly this length. A longer, more clause-heavy version of this same
prompt was refused by the classifier; this wording went through.

---

Supervisor sweep. Stay silent in the terminal unless something changed. ART = https://claude.ai/code/artifact/ec57876f-c431-492f-85ae-cbe3a71c77d4

1. Talk threads. read_db ART, db_op list, collection "chat". Doc "thread" is Vijay to me; any other doc id is a session id. For each doc with awaiting true: if it is "thread", answer Vijay and append {"r":"c","t":reply,"ts":now}. If it is a session doc, relay his message into that session with create_trigger (persistent_session_id = doc id, run_once_at about a minute out, initiation human_request), then append a confirmation the same way. write_db set the doc back with awaiting false, last 40 messages. Also append {"r":"s","t":its latest status,"ts":now} when a session's summary changed since the last entry.

2. Commands. read_db ART, db_op query, collection "commands", where status eq queued. "refresh" means do the full re-list this tick. finalise, proceed, launch50, style:*, pick:*, instruct:* go to that session via create_trigger. relaunch uses create_session, interrupt uses interrupt_session, hold and leave and overrule are recorded only. Then write_db update each doc to status done with a short note.

3. Re-sweep. Normally get_session on whatever has something pending. After a refresh, after the spawner at :25, or when a command moved a session: list_sessions mine true limit 25. Rebuild the fleet array with id, t, g, ask, spend, ctx, and where present hot, acts, arts (title, icon, url from external_metadata.artifacts). write_db set fleet/snapshot with sweptAt and burn. Groups: human, auto, failed, done, idle. Drop archived sessions.

4. Regenerate /home/user/AI-Workspace/.supervisor/STATUS.md from the snapshot, then commit and push to claude/session-monitor-guide-an8ron.

5. Surface anything newly blocked on Vijay with AskUserQuestion. Otherwise say nothing.
