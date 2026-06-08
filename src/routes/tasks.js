const express = require('express');
const router = express.Router();
const taskService = require('../services/taskService');
const { validateTask } = require('../middleware/validate');
const { successResponse, errorResponse } = require('../helpers/response');

router.get('/', (req, res) => {
  const filters = {};
  if (req.query.completed !== undefined) {
    filters.completed = req.query.completed === 'true';
  }
  successResponse(res, taskService.getAllTasks(filters));
});

router.get('/:id', (req, res) => {
  const task = taskService.getTaskById(Number(req.params.id));
  if (!task) return errorResponse(res, 'Task not found', 404);
  successResponse(res, task);
});

router.post('/', validateTask, (req, res) => {
  const { title, description } = req.body;
  const task = taskService.createTask({ title, description });
  successResponse(res, task, 201);
});

router.put('/:id', validateTask, (req, res) => {
  const { title, description, completed } = req.body;
  const task = taskService.updateTask(Number(req.params.id), { title, description, completed });
  if (!task) return errorResponse(res, 'Task not found', 404);
  successResponse(res, task);
});

router.delete('/:id', (req, res) => {
  const deleted = taskService.deleteTask(Number(req.params.id));
  if (!deleted) return errorResponse(res, 'Task not found', 404);
  successResponse(res, { deleted: true });
});

module.exports = router;
