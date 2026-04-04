---
name: Instantiation Check
description: Verified task for confirming the 3-layer architecture setup.
---

# Instantiation Check

## Goal
Verify the 3-layer architecture is correctly initialized in the workspace.

## Inputs
- Workspace root directory content.
- `.gitignore` status.

## Steps
1. [x] Create `./directives/` directory.
2. [x] Create `./execution/` directory.
3. [x] Create `./.tmp/` directory.
4. [x] Update `.gitignore` to include `.env`, `.tmp/`, `credentials.json`, `token.json`.
5. [x] Create documentation (README.md) in each folder.

## Output
A fully functional environment for the AI agent to follow deterministic execution scripts through high-level markdown directives.
