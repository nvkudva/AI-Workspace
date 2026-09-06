# Look at the page before publishing a style change

    npm i playwright --no-audit --no-fund      # once, in your scratchpad
    node shot.mjs                              # writes shot-super.png, shot-rows.png
    node probe.mjs                             # prints real box geometry

Both expect `dashboard.html` in the working directory (copy it there first).

Two things they handle that are easy to get wrong:
- Chromium lives at `/opt/pw-browsers/chromium`. Never run `playwright install`.
- `window.claude` does not exist outside claude.ai, so the scripts stub it.
  Without the stub the script throws and half the page never renders.

`probe.mjs` is the one that finds layout bugs a screenshot only hints at —
it prints each control's real box, height and align-self.
