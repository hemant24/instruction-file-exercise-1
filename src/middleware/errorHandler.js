const { errorResponse } = require('../helpers/response');

// Central error handler — registered last in app.js via app.use(errorHandler)
// Do not modify this file to handle domain-specific errors. Throw errors with
// a `.status` property from routes or services and this handler formats them.
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  errorResponse(res, err.message || 'Internal server error', err.status || 500);
};

module.exports = errorHandler;
