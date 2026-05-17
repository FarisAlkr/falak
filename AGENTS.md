# Falak — Agent Instructions

This project follows the open [AGENTS.md](https://agents.md) standard. For the canonical content used by agents, see **[CLAUDE.md](./CLAUDE.md)** — both files are kept in sync.

Any agent working on this codebase (Claude Code, Cursor, Codex, Aider, etc.) should:

1. Read `START_HERE.md` first
2. Read `CLAUDE.md` for persistent context
3. Treat **`docs/content/`** as the canonical source of truth for all unit teaching content (concepts, equations, examples, misconceptions, bilingual terminology, past Bagrut questions). The schema is defined in `docs/content/_format_spec.md`; the unit map is `docs/content/00_baseline_index.md`; `docs/content/03_newtons_laws.md` is the reference unit.
4. Consult the rest of the `docs/` folder for project-level specifics (architecture, design system, unit template shape).
5. Never invent physics content. Compose slides, exams, and interactives from the baseline; flag any uncertain Arabic with `⚑` for native-speaker review.
6. Never skip the physics accuracy and bilingual content verification steps.

**Note:** `CLAUDE.md` is the source of truth. This file exists only for tool compatibility.
