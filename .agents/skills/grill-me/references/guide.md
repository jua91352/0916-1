# Grill Me Guide

*Source: [mattpocock/skills (grill-me)](https://github.com/mattpocock/skills/blob/main/docs/productivity/grill-me.md)*

## What it does

`grill-me` takes a **loose idea** and interviews you until you can commit to it. You do not need a worked-out plan to start: producing one is what the session is for. It asks in **rounds**: each round is the whole **frontier** (every question whose prerequisites you have already settled), so you are never asked something that hinges on an answer it hasn't heard yet.

It is **stateless**. It writes no files and leaves no workspace behind. The only thing it leaves is a sharper version of the idea, in your own head.

## When to reach for it

You invoke this by typing `/grill-me` or asking the agent to grill you; the agent won't reach for it unprompted. Start it in a **fresh conversation**, not on top of a plan you already had an agent write.

Reach for it as soon as you have an idea worth taking seriously (a feature, a product direction, a business call, a piece of writing), and long before you have worked out what it involves. Vagueness is not a reason to wait; it is the thing the session eats. If you can already specify the thing precisely, you don't need to grill it.

Leave plan mode off during the initial grilling. Plan mode primes the agent to rush toward producing a plan, which is the opposite of staying in inquiry.

## It's a conversation, not an interview

The skill asks the questions, but **you** own the scope. That is the part people miss, and it separates a session that turns an idea into decisions from one that produces confident nonsense.

The failure mode is **passivity**: answering "agreed, agreed, agreed" for forty questions and coming out with a plan the agent wrote and you nodded at. It feels productive because it was long. Nothing was actually decided, and the result carries a certainty it hasn't earned.

Being active means steering. Push back on a question pitched beneath the fidelity you need. Say when the scope is drifting. Answer "I don't know" and mean it. This skill is built to aid an engineer, not to replace one: what comes out tracks the quality of your answers, not the number of questions asked.

## Grillable and ungrillable

Some questions can be answered by talking. Others can't, and no amount of grilling will get you there.

"One long form or three pages?" and "how should this interaction feel?" are **ungrillable**: they need something to react to. When you hit one, stop grilling. Build a throwaway version with a quick prototype, look at it, then come back and answer in one line.

Talking your way through an ungrillable question is where sessions balloon. The agent keeps rephrasing, you keep guessing, and the scope grows to fill the uncertainty.

## It's working if

- You disagree with something. A session with no pushback from you is a session you didn't need.
- Questions arrive in a few rounds rather than one long drip, and later rounds clearly build on what you said earlier.
- You end up somewhere you didn't expect, because a question surfaced a decision you had been making implicitly.
- At the end you could defend each choice to someone who wasn't there.

## Common questions

- **How many questions should I expect, and how do I know when it ends?**
  Count rounds, not questions. An ordinary session may cover multiple questions across 3–4 rounds. It ends when the frontier is empty: every branch visited, nothing left silently assumed.
- **What if I genuinely don't know the answer?**
  Say so. "I don't know" is a real answer, and a question you can't answer is usually a sign to prototype rather than to guess.
