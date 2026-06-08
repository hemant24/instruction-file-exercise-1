const { getAllTasks, getTaskById, createTask, updateTask, deleteTask, resetTasks } = require('../../src/services/taskService');
const { tasks } = require('../fixtures/tasks');

beforeEach(() => {
  resetTasks([...tasks]);
});

describe('getAllTasks', () => {
  it('returns all tasks when no filter applied', () => {
    expect(getAllTasks()).toHaveLength(2);
  });

  it('filters by completed', () => {
    const done = getAllTasks({ completed: true });
    expect(done.every(t => t.completed)).toBe(true);
  });
});

describe('getTaskById', () => {
  it('returns the correct task', () => {
    const task = getTaskById(1);
    expect(task.title).toBe('Buy groceries');
  });

  it('returns undefined for unknown id', () => {
    expect(getTaskById(999)).toBeUndefined();
  });
});

describe('createTask', () => {
  it('trims whitespace from title', () => {
    const task = createTask({ title: '  Clean house  ' });
    expect(task.title).toBe('Clean house');
  });

  it('defaults completed to false', () => {
    const task = createTask({ title: 'Default check' });
    expect(task.completed).toBe(false);
  });

  it('assigns incrementing ids', () => {
    const a = createTask({ title: 'First' });
    const b = createTask({ title: 'Second' });
    expect(b.id).toBe(a.id + 1);
  });
});

describe('updateTask', () => {
  it('merges updates into existing task', () => {
    const task = updateTask(1, { completed: true });
    expect(task.completed).toBe(true);
    expect(task.title).toBe('Buy groceries');
  });

  it('returns null for unknown id', () => {
    expect(updateTask(999, { title: 'ghost' })).toBeNull();
  });
});

describe('deleteTask', () => {
  it('removes the task and returns true', () => {
    expect(deleteTask(1)).toBe(true);
    expect(getAllTasks()).toHaveLength(1);
  });

  it('returns false for unknown id', () => {
    expect(deleteTask(999)).toBe(false);
  });
});
