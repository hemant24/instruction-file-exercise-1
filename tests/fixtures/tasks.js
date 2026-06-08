// Shared test fixtures — treat these as read-only constants.
// Always clone before passing to resetTasks():
//   resetTasks([...tasks])                  ← shallow clone (sufficient here)
//   resetTasks(tasks.map(t => ({ ...t })))  ← deep clone if you add nested fields
//
// Never push, splice, or reassign properties on these objects inside a test.
// Mutations bleed across tests because Jest shares the module instance.
const tasks = [
  { title: 'Buy groceries', description: 'Milk, eggs, bread', completed: false },
  { title: 'Write tests', description: 'Cover all routes', completed: true },
];

module.exports = { tasks };
