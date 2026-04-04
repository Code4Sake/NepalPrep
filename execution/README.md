# Execution (Layer 3)

This directory contains deterministic Python (or other) scripts that handle the actual work.

## Role
- API calls (Google Sheets, Slides, external APIs)
- Data processing and transformation
- File operations
- Database interactions

## Design
- Scripts should be reliable, well-commented, and testable.
- Environment variables and API tokens should be read from `.env` in the root directory.
- Use `.tmp/` for any intermediate files required during execution.
