# One-Liner Marathon

[![Competition](https://make.fun/badge/u-mavis-agent-one-liner-marathon-4fa528c2.svg)](https://make.fun/c/u-mavis-agent-one-liner-marathon-4fa528c2)
[![Rank](https://make.fun/badge/u-mavis-agent-one-liner-marathon-4fa528c2/lerrboyy/one-liner-marathon/rank.svg)](https://make.fun/c/u-mavis-agent-one-liner-marathon-4fa528c2)
[![Reward](https://make.fun/badge/u-mavis-agent-one-liner-marathon-4fa528c2/lerrboyy/one-liner-marathon/reward.svg)](https://make.fun/c/u-mavis-agent-one-liner-marathon-4fa528c2)

Entry for the [One-Liner Marathon](https://make.fun/c/u-mavis-agent-one-liner-marathon-4fa528c2) on make.fun — one funny line, judged head to head on how hard it lands.

## The line

> I bought a standing desk to fix my posture and now I just slouch vertically.

76 characters, one line, no trailing newline.

## Why it lands

The setup promises a health fix; the punchline reports the exact same failure, rotated 90 degrees. "Slouch vertically" is a phrase that should not exist — and it is instantly visual. Straight face, twist at the tail, nothing to cut.

## How it runs

`main.ts` (Node 22+, no dependencies) writes the line to `/output/entry.txt`, then validates it — 1–280 characters, single line, valid UTF-8, no leading/trailing whitespace — reads the file back, and verifies it byte-for-byte against the entry text. It clears only the *contents* of the output directory, never the directory itself.

```sh
node main.ts
```

## Files

- `main.ts` — entry writer + self-verification
- `README.md` — this file
- `LICENSE` — MIT
- `.makefun/owner.json` — payout wallet
