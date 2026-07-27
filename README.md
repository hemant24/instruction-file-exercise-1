# Exercise 1 — Bootstrap and Fix a CLAUDE.md

## What you will learn

- How `claude /init` generates a starter `CLAUDE.md`
- Why generated output needs human review
- How to identify gaps by observing AI mistakes
- How to fix an instruction file so Claude gets it right the second time

---

## The Application

This is a simple Express.js Task Manager REST API with in-memory storage.

**Stack:** Node.js, Express, Jest, ESLint, Supertest

**Endpoints:**

| Method | Path | Description |
|---|---|---|
| GET | `/tasks` | List all tasks (supports `?completed=true/false`) |
| GET | `/tasks/:id` | Get a single task |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

**Project structure:**

```text
src/
  routes/tasks.js        — thin route handlers only
  services/taskService.js — all business logic lives here
  middleware/validate.js  — input validation (never inline in routes)
  middleware/errorHandler.js — central error formatter (do not modify)
  helpers/response.js    — successResponse() and errorResponse() helpers
tests/
  routes/tasks.test.js   — integration tests via supertest
  services/taskService.test.js — unit tests for service layer
  fixtures/tasks.js      — shared seed data (read-only)
app.js                   — Express app setup
index.js                 — server entry point
```

---

## Setup

```bash
npm install
npm test
```

All tests should pass before you begin.

---

## The Exercise

### Step 1 — Generate a CLAUDE.md

From inside this directory, run:

```bash
claude /init
```

Review what Claude generates. Notice what it inferred correctly and what it missed or got wrong.

### Step 2 — Give Claude a task

Ask Claude to implement the following feature:

> Add a `priority` field to tasks. Accepted values: `low`, `medium`, `high`. Default to `medium` when not provided.
> - Validate that `priority` is one of the three accepted values
> - Store and return `priority` in all task responses
> - Support filtering: `GET /tasks?priority=high`
> - Add tests covering valid priorities, invalid priority rejection, and filtering

### Step 3 — Observe the mistakes

Watch carefully. Without a good `CLAUDE.md`, Claude is likely to make one or more of the mistakes.

### Step 4 — Fix the CLAUDE.md

Update `CLAUDE.md` based on each mistake you observed. Add the missing rules, exact commands, and project constraints.

### Step 5 — Re-run the task

Ask Claude to redo the feature. Verify it now follows all the project conventions correctly.

### Step 6 — Compare

Check your final `CLAUDE.md` against the one generated initially CLAUDE.md`.

