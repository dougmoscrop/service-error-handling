var errorHandler = require('errorhandler');

errorHandler.title = process.env.npm_package_name || 'Error';

module.exports = function() {
  if (process.env.NODE_ENV === 'production') {
    return function(err, req, res, next) {
      var status = err.status || err.statusCode,
      expose = err.expose || status < 500;

      var error = {};

      if (expose && status) {
        if (err.message) {
          error.message = err.message;
        }

        if (err.errors) {
          error.errors = err.errors;
        }
      } else {
        status = 500;
        error.message = 'Internal Server Error';
      }

      res.status(status);
      res.json(error);
    };
  } else {
    return errorHandler({
      log: false
    });
  }
};
