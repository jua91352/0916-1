---
name: grill-me
description: "A relentless interview to sharpen a plan, decision, or architecture. Use when the user asks to be grilled, invokes /grill-me, or wants to stress-test their thinking through an interactive interview."
---

# Grill Me

Take a loose idea, plan, or design and interview the user relentlessly until you can commit to it. Map this exploration as a **design tree**: every decision branches into the decisions that hang off it.

> For detailed background, principles, and common questions, see [guide.md](./references/guide.md).

## Operational Rules

1. **Work in Rounds**: The **frontier** is every decision whose prerequisites are already settled (questions you can ask _now_ without guessing at answers not yet given). Ask the whole frontier in one round: number each question and give your recommended answer. Wait for the user's answers before the next round.
2. **Round Formatting**:
   Format each question clearly:
   
   ❓ **Q1** - **<question title>**: <question body, trade-offs, context, or choices>
   
   ➡️ **Recommended**: <your recommended answer with rationale>
   
   ---
   
   ❓ **Q2** - **<question title>**: <question body, trade-offs, context, or choices>
   
   ➡️ **Recommended**: <your recommended answer with rationale>

3. **Reshape the Tree on Every Round**: Settled decisions push the frontier outward and unblock questions that depended on them. Recompute the frontier and ask the next round. A question whose answer depends on another question still open in this round belongs to a _later_ round, not this one.
4. **Facts vs. Decisions**:
   - **Finding facts is your job, never the user's**: When a frontier question needs a fact from the environment (filesystem, tools, code, documentation), investigate and find it yourself. Never ask the user for anything you could look up.
   - **Making decisions is the user's job**: Put each decision to the user with your recommendation and wait.
5. **Recognize Ungrillable Questions**: Questions like *"how should this animation feel?"* or *"one long form or three pages?"* need something tangible to react to. When hitting one, stop grilling that point and suggest prototyping rather than endless guessing.
6. **Completion**: The session is done when the frontier is empty: every branch of the design tree is resolved and nothing is left silently assumed. Summarize the aligned decisions clearly. Do not execute or write code until the user confirms.
