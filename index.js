var httpErrors = require('http-errors'),
	errorHandler = require('errorhandler');

module.exports = function(opts) {
	var handlers = [];

	opts = opts || {};

	if (typeof opts.mongo === 'undefined') {
		opts.mongo = true;
	}

	if (opts.mongo) {
		handlers.push(function(err, req, res, next) {
			 // Duplicate key error
			if (err.code === 11000 || err.code === 11001) {
				next(new httpErrors.Conflict(err.message));
				return;
			}

			if (err.name === 'CastError' || err.name === 'ValidationError') {
				next(new httpErrors.BadRequest(err.message));
				return;
			}

			next(err);
		});
	}

	if (opts.development) {
		if (typeof opts.title !== 'undefined') {
			errorHandler.title = opts.title;
		}

		handlers.push(errorHandler({log: opts.log}));
	} else {
		handlers.push(function(err, req, res, next) {
			var status = err.status || err.statusCode,
				expose = err.expose || status < 500;
			
			var error = {};
			
			if (expose && status) {
				if (err.message) {
					error.message = err.message;
				}
				
				if (err.errors) {
					error.errors = err.errors
				}
			} else {
				status = 500;
				error.message = 'Internal Server Error';
			}
			
			res.status(status);
			res.json(error);
		});
	}

	return handlers;
};
