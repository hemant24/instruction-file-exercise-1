let tasks = [];
let nextId = 1;

const getAllTasks = (filters = {}) => {
  let result = [...tasks];
  if (filters.completed !== undefined) {
    result = result.filter(t => t.completed === filters.completed);
  }
  return result;
};

const getTaskById = (id) => tasks.find(t => t.id === id);

const createTask = ({ title, description = '' }) => {
  const task = {
    id: nextId++,
    title: title.trim(),
    description,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
};

const updateTask = (id, updates) => {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return null;
  tasks[index] = { ...tasks[index], ...updates };
  return tasks[index];
};

const deleteTask = (id) => {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
};

// Used only in tests to seed and reset in-memory state.
// Never call this from production code.
const resetTasks = (seed = []) => {
  tasks = seed.map((t, i) => ({ ...t, id: i + 1 }));
  nextId = tasks.length + 1;
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask, resetTasks };
