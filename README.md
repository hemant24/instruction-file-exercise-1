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

Watch carefully. Without a good `CLAUDE.md`, Claude is likely to make one or more of the mistakes listed in the Gotchas section below.

### Step 4 — Fix the CLAUDE.md

Update `CLAUDE.md` based on each mistake you observed. Add the missing rules, exact commands, and project constraints.

### Step 5 — Re-run the task

Ask Claude to redo the feature. Verify it now follows all the project conventions correctly.

### Step 6 — Compare

Check your final `CLAUDE.md` against the solution in `../solution/CLAUDE.md`.

---

## Gotchas

These are the intentional traps built into this project. Claude will likely fall into one or more of them without a correct `CLAUDE.md`. Expand each one after you have completed the exercise to see if you caught them all.

<details>
<summary>Gotcha 1 — Test command requires NODE_ENV=test</summary>

The correct test command is:

```bash
npm test
```

Which expands to `NODE_ENV=test jest --forceExit`. Claude may try to run `jest` directly or skip the environment variable. Without `NODE_ENV=test`, tests may behave differently depending on future environment-sensitive code.

For targeted tests:
```bash
npm run test:routes
npm run test:services
```

**Fix:** Put the exact npm scripts in your `CLAUDE.md` — not just "run tests".

</details>

<details>
<summary>Gotcha 2 — Validation belongs in middleware, not in route handlers</summary>

The project convention is that all input validation lives in `src/middleware/validate.js` and is applied as middleware on the route. Routes must stay thin.

Wrong (inline validation in route):
```js
router.post('/', (req, res) => {
  if (!req.body.priority) return res.status(400).json({ error: 'invalid' });
  ...
});
```

Right (validation in middleware, applied to route):
```js
// middleware/validate.js
const validateTask = (req, res, next) => {
  // validate title AND priority here
  next();
};

// routes/tasks.js
router.post('/', validateTask, (req, res) => { ... });
```

**Fix:** Explicitly state this convention in `CLAUDE.md`.

</details>

<details>
<summary>Gotcha 3 — All responses must use the helpers in helpers/response.js</summary>

The project has two shared helpers: `successResponse()` and `errorResponse()`. All routes use them — never raw `res.json()` or `res.status().send()`.

Wrong:
```js
res.status(400).json({ error: 'Invalid priority' });
```

Right:
```js
const { errorResponse } = require('../helpers/response');
errorResponse(res, 'Invalid priority', 400);
```

**Fix:** Document this helper and the rule in `CLAUDE.md`.

</details>

<details>
<summary>Gotcha 4 — Never mutate fixtures in tests</summary>

`tests/fixtures/tasks.js` exports a shared array. Jest reuses the same module instance across tests in a file. If a test mutates the fixture directly, it contaminates subsequent tests.

Wrong:
```js
tasks.push({ title: 'Extra', completed: false }); // mutates the shared export
resetTasks(tasks);
```

Right:
```js
resetTasks([...tasks]); // always clone first
```

**Fix:** Document the clone requirement in `CLAUDE.md` under Testing Conventions.

</details>

<details>
<summary>Gotcha 5 — Do not modify errorHandler.js</summary>

`src/middleware/errorHandler.js` is the central error formatter registered last in `app.js`. It handles all unhandled errors thrown from routes and services. It should never be modified to handle domain-specific cases — instead, throw errors with a `.status` property from the service layer.

Wrong:
```js
// Inside errorHandler.js
if (err.type === 'validation') { ... } // domain logic does not belong here
```

Right:
```js
// Inside a service or route
const err = new Error('Invalid priority');
err.status = 400;
throw err;
```

**Fix:** Add a "do not modify" rule for this file in `CLAUDE.md`.

</details>

---

## Solution

The reference `CLAUDE.md` is in `../solution/CLAUDE.md`. Only check it after you have made your own attempt.
