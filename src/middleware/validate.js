const { errorResponse } = require('../helpers/response');

const validateTask = (req, res, next) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return errorResponse(res, 'title is required and must be a non-empty string', 400);
  }
  next();
};

module.exports = { validateTask };
