const request = require('supertest');
const app = require('../../app');
const { resetTasks } = require('../../src/services/taskService');
const { tasks } = require('../fixtures/tasks');

beforeEach(() => {
  resetTasks([...tasks]);
});

describe('GET /tasks', () => {
  it('returns all tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(2);
  });

  it('filters by completed=true', async () => {
    const res = await request(app).get('/tasks?completed=true');
    expect(res.status).toBe(200);
    expect(res.body.data.every(t => t.completed)).toBe(true);
  });

  it('filters by completed=false', async () => {
    const res = await request(app).get('/tasks?completed=false');
    expect(res.status).toBe(200);
    expect(res.body.data.every(t => !t.completed)).toBe(true);
  });
});

describe('GET /tasks/:id', () => {
  it('returns a task by id', async () => {
    const res = await request(app).get('/tasks/1');
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(1);
  });

  it('returns 404 for unknown id', async () => {
    const res = await request(app).get('/tasks/999');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

describe('POST /tasks', () => {
  it('creates a task with valid title', async () => {
    const res = await request(app).post('/tasks').send({ title: 'New task' });
    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe('New task');
    expect(res.body.data.completed).toBe(false);
  });

  it('trims whitespace from title', async () => {
    const res = await request(app).post('/tasks').send({ title: '  Trimmed  ' });
    expect(res.body.data.title).toBe('Trimmed');
  });

  it('rejects missing title', async () => {
    const res = await request(app).post('/tasks').send({ description: 'no title here' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('rejects empty title', async () => {
    const res = await request(app).post('/tasks').send({ title: '   ' });
    expect(res.status).toBe(400);
  });
});

describe('PUT /tasks/:id', () => {
  it('updates an existing task', async () => {
    const res = await request(app).put('/tasks/1').send({ title: 'Updated title', completed: true });
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('Updated title');
    expect(res.body.data.completed).toBe(true);
  });

  it('returns 404 for unknown id', async () => {
    const res = await request(app).put('/tasks/999').send({ title: 'Ghost' });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /tasks/:id', () => {
  it('deletes an existing task', async () => {
    const res = await request(app).delete('/tasks/1');
    expect(res.status).toBe(200);
    expect(res.body.data.deleted).toBe(true);
  });

  it('returns 404 for unknown id', async () => {
    const res = await request(app).delete('/tasks/999');
    expect(res.status).toBe(404);
  });
});
