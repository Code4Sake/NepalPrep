# Directives (Layer 1)

This directory contains Standard Operating Procedures (SOPs) for the AI agent.

## Structure
- Each file should define a specific workflow or task.
- Use Markdown to describe goals, inputs, tools/scripts to use, outputs, and edge cases.

## Usage
When given a complex task, the agent will:
1. Search for a relevant directive here.
2. Follow the instructions to execute scripts from the `execution/` folder.
3. Update these directives with any learnings (API limits, bugs, etc.) to improve future performance.
