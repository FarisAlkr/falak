# HOW TO START FALAK WITH CLAUDE CODE

> **This file has three sections:**
> 1. **Setup steps** — what to do BEFORE opening Claude Code
> 2. **THE PROMPT** — copy/paste this as your first message
> 3. **What happens next** — how to run subsequent sessions

---

## 1 · Setup (do this first)

### Step 1.1 · Create the project folder

```bash
mkdir ~/projects/falak
cd ~/projects/falak
```

(Or wherever you keep projects. The path doesn't matter as long as you remember it.)

### Step 1.2 · Copy all the files from the zip

Unzip `falak_project.zip` INTO `~/projects/falak`. The final structure should look like this:

```
~/projects/falak/
├── START_HERE.md
├── CLAUDE.md
├── AGENTS.md
├── README.md
├── SPEC.md
├── docs/
│   ├── 01_curriculum_and_units.md
│   ├── 02_design_system.md
│   ├── 03_architecture.md
│   ├── 04_tech_stack.md
│   ├── 05_unit_template.md
│   ├── 06_interactive_patterns.md
│   ├── 07_content_guidelines.md
│   └── 08_build_roadmap.md
└── .claude/
    ├── skills/
    │   ├── physics-accuracy/SKILL.md
    │   ├── bilingual-content/SKILL.md
    │   ├── slide-authoring/SKILL.md
    │   └── simulation-builder/SKILL.md
    └── commands/
        ├── new-unit.md
        └── review-unit.md
```

**Important:** Make sure `.claude/` is there (it's a hidden folder). On Mac/Linux, show hidden files with `Cmd+Shift+.` in Finder or `ls -la` in terminal.

### Step 1.3 · Initialize git (strongly recommended)

```bash
cd ~/projects/falak
git init
git add -A
git commit -m "chore: initial project briefing package"
```

This gives you an undo button for every Claude session. If Claude breaks something, `git reset --hard` brings it back.

### Step 1.4 · Install Claude Code (if you haven't)

```bash
# One-time install
npm install -g @anthropic-ai/claude-code

# Or if you already have it, update to latest
npm update -g @anthropic-ai/claude-code
```

Make sure you're on the latest version — older versions don't support skills.

### Step 1.5 · Open Claude Code

```bash
cd ~/projects/falak
claude
```

Claude Code starts up. It will automatically detect and read `CLAUDE.md`. You should see a confirmation.

### Step 1.6 · Verify skills are loaded

In the Claude Code session, type:
```
/skills
```

You should see 4 custom skills listed: `physics-accuracy`, `bilingual-content`, `slide-authoring`, `simulation-builder`. If they don't show, your `.claude/skills/` folder isn't in the right place — recheck step 1.2.

---

## 2 · THE PROMPT (copy everything between the lines)

Paste this ENTIRE block as your very first message to Claude Code:

---

```
Hi Claude. We're starting the Falak project today — session zero.

## Who I am
I'm a high-school physics teacher in Israel. I teach Arab students preparing for the 5-unit Bagrut exam. I am NOT a professional developer — I'm a physicist who can read code, not a software engineer who writes it daily. I'll need you to explain things when you make technical decisions, especially around tooling, git workflows, and framework choices. Be patient. Use plain language when you can. When you must use technical terms, define them once.

Arabic and Hebrew are native to this project. You do not speak either well enough to write final content — but the docs already have terminology tables and rules. Follow them strictly. When you're uncertain, flag it; don't guess.

## What Falak is
A bilingual physics teaching platform for the Israeli 5-unit Bagrut. 14 units. Each unit has four modes: theory slides (teacher projects them), interactive simulation (student practices), Bagrut-style exam, and summary takeaway. Arabic for instruction, Hebrew for terminology (because the exam is in Hebrew), English for technical labels.

## YOUR MISSION FOR THIS SESSION

You will NOT write a single line of source code today. Your entire job in this session is:

1. Load the full project context (read the docs in the order specified below)
2. Confirm you understand by summarizing key facts back to me
3. Interview me on OPEN QUESTIONS the docs don't answer (use the AskUserQuestion tool — one question at a time)
4. Produce `docs/IMPLEMENTATION_PLAN.md` — a phase-0 and phase-1 detailed plan based on the roadmap

That's it. No npm install. No source files. No scaffolding. Just context loading + interview + plan document.

## READING PROTOCOL — follow this exact order

Do this step by step. Do NOT skim. After each file, briefly acknowledge what you learned.

1. Read `START_HERE.md` — orientation
2. Read `CLAUDE.md` — persistent project memory (you probably auto-loaded this, re-read to confirm)
3. Read `SPEC.md` — the full product specification
4. Read `docs/01_curriculum_and_units.md` — all 14 units and the Bagrut exam structure
5. Read `docs/05_unit_template.md` — the canonical shape of every unit
6. Read `docs/08_build_roadmap.md` — the phased plan
7. Read `docs/02_design_system.md` — visual language
8. Read `docs/03_architecture.md` — technical structure
9. Read `docs/04_tech_stack.md` — library choices
10. Read `docs/06_interactive_patterns.md` — simulation patterns
11. Read `docs/07_content_guidelines.md` — bilingual writing rules
12. Scan the four skills in `.claude/skills/` — just read the YAML frontmatter and first paragraph of each

Do NOT proceed to the next step until you have read all 12.

## AFTER READING — verify you loaded context correctly

Answer these four questions in a single short response. This is my sanity check before we proceed:

1. Name all 14 units in order.
2. What are the four modes inside a unit?
3. What are the five fonts used in the design system and which language each one is for?
4. Why do we build Unit 3 (Newton's Laws) first instead of Unit 1?

If you get any of these wrong, stop and re-read. The whole project depends on you having the right context.

## THEN — interview me using AskUserQuestion

After I confirm your answers are correct, use the AskUserQuestion tool to ask me about things the docs don't answer. Ask one question at a time. Don't batch. Don't ask obvious questions (things clearly stated in docs).

Some topics where the docs are deliberately vague and need my input:

- My development environment (macOS / Linux / Windows? Node version? package manager?)
- How familiar am I with Next.js specifically (so you know how much to explain)
- Whether I have a GitHub account and want to use it (for remote backup)
- Who my reviewer-pool is for Arabic content (myself only? a colleague too?)
- Whether I've already collected past Bagrut exams (we'll need them for exam questions)
- Anything else you need clarified before writing the implementation plan

Dig into the hard parts I might not have thought about. Don't ask questions with obvious answers.

## THEN — produce `docs/IMPLEMENTATION_PLAN.md`

After the interview, create this file. Structure:

```
# Implementation Plan

## Phase 0 · Setup (1 week)

### Session 0.1 (today, already done) — context loaded, interview complete, plan produced

### Session 0.2 — environment setup
- [ ] Install Node 20+, pnpm, etc.
- [ ] Initialize Next.js app in `src/`
- [ ] Configure Tailwind with design tokens
- [ ] Add the 5 fonts via next/font
- [ ] Set up lint/prettier/typecheck/husky
- [ ] First commit of working skeleton
- [ ] Verify Vercel preview deploy works

### Session 0.3 — route skeleton
- [ ] Build empty routes for home, /units, /units/[unitId], modes
- [ ] Build unitRegistry.ts with all 14 units (metadata placeholders OK)
- [ ] Home page renders grid of all 14 unit cards
- [ ] Unit home renders 4 mode tiles (non-functional)
- [ ] Git commit, deploy preview working

### Session 0.4 — shared infrastructure
- [ ] Build all slide templates (TitleSlide, ConceptSlide, etc.)
- [ ] Build all interactive primitives (SimulationCanvas, ControlPanel, etc.)
- [ ] Build Math component (KaTeX wrapper)
- [ ] Build bilingual components (ArabicTitle, HebrewLabel, TermBlock)
- [ ] Build Dexie schema and useProgress hook
- [ ] Tests for primitives

### Session 0.5 — phase 0 gate check
- [ ] Lighthouse score baseline
- [ ] All routes navigable
- [ ] All primitives have Storybook-like example page (for manual review)
- [ ] Ready to start Phase 1

## Phase 1 · Unit 3 Reference Implementation (2 weeks)

### Session 1.1 — research & outline
### Session 1.2 — meta.ts + slides.mdx draft
### Session 1.3 — slides.mdx polish + Arabic review round 1
### Session 1.4 — physics helpers (dynamics.ts) with tests
### Session 1.5 — FBD Builder interactive part 1 (problem scenarios + rendering)
### Session 1.6 — FBD Builder interactive part 2 (drag forces + physics verification)
### Session 1.7 — FBD Builder interactive part 3 (result, hints, difficulty ramp)
### Session 1.8 — exam.ts with 3–5 Bagrut questions
### Session 1.9 — summary.mdx + integration + /review-unit pass
### Session 1.10 — final review, staff engineer pass (fresh session), merge

Each session is 2–4 hours of focused work.

## Risks & mitigations
[fill in]

## Decisions log
[fill in with every major choice made and why]
```

## HARD RULES FOR THIS SESSION

- ❌ Do NOT run `/init` (it would overwrite our careful CLAUDE.md)
- ❌ Do NOT run any pnpm/npm install command
- ❌ Do NOT create any file in `src/` or any code files anywhere
- ❌ Do NOT modify any file in `docs/` (you can CREATE docs/IMPLEMENTATION_PLAN.md but not modify existing docs)
- ❌ Do NOT run any command that changes the repository state, except `git status` if you need it
- ✅ DO read files, ask questions, produce the plan document

## HOW WE WORK TOGETHER (across the whole project, not just today)

1. **I approve major decisions.** Before you make a framework choice, add a dependency, or change an architectural pattern, ask me first.

2. **Plan before code.** For anything larger than a small component, produce a written plan and wait for my approval.

3. **Small commits, clear messages.** Commit after every logical chunk. Message format: `type(scope): what`. Types: feat, fix, docs, chore, test.

4. **Tests first for physics.** Before writing a physics helper in `src/lib/physics/`, write the tests. I can verify tests; verifying physics code directly is harder for me.

5. **Flag uncertainty, don't guess.** For Arabic, Hebrew, pedagogy, or anything you're not sure about — add a `REVIEW_*` comment and flag it in the session summary. Never silently ship something you're unsure of.

6. **Patient teacher mode.** When you introduce a new tool (git command, Next.js feature, etc.) the first time, briefly explain what it does and why we use it. After the first mention, assume I remember.

7. **End every session with a summary.** Before we wrap, summarize: what we did, what's ready to commit, what's pending, what I should know before next session. Append this to `docs/SESSION_LOG.md` (create the file on first session).

8. **Use skills proactively.** The physics-accuracy, bilingual-content, slide-authoring, and simulation-builder skills exist for a reason. Invoke them when relevant.

9. **Respect the roadmap.** We build in the order specified in `docs/08_build_roadmap.md`. No jumping ahead. No skipping phases.

10. **When I say "stop"** — stop. When I say "commit" — commit. When I say "explain" — explain. Clear commands, clean execution.

## Now begin.

Start with step 1 of the reading protocol. Work through all 12 files. Then verify understanding with the 4 questions. Then interview me. Then produce the plan. Don't skip steps.
```

---

## 3 · What happens next

### 3.1 · During this first session

Claude will:
1. Read all the docs (takes 5–10 minutes as it works through each file)
2. Answer the 4 sanity-check questions — **verify them carefully**
3. Interview you with maybe 5–10 questions — answer honestly
4. Produce `docs/IMPLEMENTATION_PLAN.md`

**At the end, say:** *"Commit the implementation plan and summarize this session into `docs/SESSION_LOG.md`. Then we're done for today."*

### 3.2 · Review the implementation plan

Before starting session 2, read `docs/IMPLEMENTATION_PLAN.md` carefully. Edit anything you disagree with. This is your blueprint — don't accept something you don't understand.

If Claude's plan feels wrong, you can say (in a new session): *"Review the implementation plan in `docs/IMPLEMENTATION_PLAN.md` and tell me what's weak, what's missing, or what might break."* That's a cheap way to get a second opinion from a fresh context.

### 3.3 · Starting subsequent sessions

**Golden rule: start every session with a specific, scoped goal.**

#### Good opening prompts for later sessions:

- *"We're starting Session 0.2 from the implementation plan — environment setup. Read `CLAUDE.md` and `docs/IMPLEMENTATION_PLAN.md`, then walk me through what we're doing today before you start."*

- *"Session 0.4 today — shared infrastructure. Build the slide template components. Start with `TitleSlide.tsx` and pause for my review before continuing to the next."*

- *"Session 1.4 — physics helpers for Unit 3 (Newton's Laws). Write `src/lib/physics/dynamics.ts` along with tests in `__tests__/dynamics.test.ts`. Use TDD: tests first, then implementation."*

- *"Review mode today. No code changes. Invoke `/review-unit newtons-laws` and walk me through the findings."*

#### Bad opening prompts (avoid these):

- ❌ *"Continue where we left off"* — Claude doesn't have memory between sessions. Always state the session number and goal.
- ❌ *"Build all of Unit 3 today"* — too big. One sub-session at a time.
- ❌ *"Make it prettier"* — vague. Specify exactly what to change.
- ❌ *"Fix the bugs"* — which bugs? Be specific or ask Claude to list them first.

### 3.4 · When things go wrong

**If Claude breaks something:**
```bash
git status            # see what changed
git diff              # see the actual changes
git reset --hard HEAD # throw away all changes since last commit
```

Then start a fresh session and tell Claude what happened. Don't try to debug in the same session where things went sideways — fresh context works better.

**If Claude loses the plot:**
Start a new session. Point Claude at `CLAUDE.md`, the session log, and the specific file you're working on. Don't try to recover a confused session.

**If you want a second opinion:**
Start a fresh session and ask: *"Review this code/plan/decision as a senior engineer who wasn't involved. Don't be nice. Tell me what's wrong."* The fresh context acts as a staff engineer review.

### 3.5 · Maintenance rhythm

Once a week:
- Review `docs/SESSION_LOG.md` to track progress
- Edit `CLAUDE.md` if project norms have drifted (keep it under 200 lines)
- Tag a release if you've shipped a unit: `git tag v0.1-unit-03 && git push --tags`

Every time you complete a unit:
- Run `/review-unit {unit-id}` in a fresh session
- Fix any issues the review surfaces
- Merge the unit branch
- Celebrate (seriously — each unit is a real milestone)

---

## 4 · Final advice

- **You are the product owner.** Claude is your skilled contractor. If Claude suggests something you disagree with, push back.
- **Don't optimize for speed.** This project is worth doing right. Rushing produces a Unit 3 with a broken FBD Builder that tanks the whole trajectory.
- **Test with real students early.** The moment Unit 3 works, put it in front of five students and watch them use it. Iterate.
- **Keep a notebook.** Every time you encounter a new dev tool or concept, jot what it does. In 3 months you'll thank yourself.
- **When in doubt, ask Claude to explain.** "Explain what this code does, line by line, like I'm a physicist" is a totally valid prompt.

Good luck. فَلَك starts today.
