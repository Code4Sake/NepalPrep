# GSD: "Get Shit Done" Skill (Spec-Driven Development)

This directive defines the "Get Shit Done" (GSD) workflow within our 3-layer architecture. It is designed to prevent "context rot" by externalizing project state into the repository's durable memory layer (`.planning/`).

## Principles
1. **Durable Memory Over Chat History**: Always refer to `.planning/` files for project state.
2. **Atomic Planning**: Small, focused phases with verifiable requirements.
3. **Loop Cycle**: Discuss → Plan → Execute → Verify.

## Context Preservation
*   **PROJECT.md**: High-level vision and tech stack.
*   **REQUIREMENTS.md**: Individual, identifiable requirements.
*   **ROADMAP.md**: Milestones and phase progress statuses.
*   **STATE.md**: Current phase details, decisions, blockers, and session position.

## Integration: The 4-Step GSD Loop
### 1. Discuss
- Clarify intent with the user.
- Explore the scope of a new task.

### 2. Plan
- Update `.planning/REQUIREMENTS.md` with new stable IDs.
- Create or update `.planning/STATE.md` with the current phase's implementation details.
- Break the task into deterministic steps.

### 3. Execute
- Perform the work using Layer 3 scripts from `execution/` or standard model tools.
- Maintain a lean context while operating on individual files.

### 4. Verify
- Compare the output against the stable IDs in `REQUIREMENTS.md`.
- Update the milestone status in `ROADMAP.md`.
- Finalize the phase and summarize outcomes in `STATE.md`.

## Operation
* When the user gives a complex task, start by checking `.planning/`.
* If it's a new task, initialize/update requirements before coding.
* **Always** update `ROADMAP.md` and `STATE.md` after a significant turn.
