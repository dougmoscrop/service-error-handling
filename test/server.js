var express = require('express'),
	errorHandling = require('../');

var server = express();

server.get('/error', function(req, res, next) {
	var error = new Error(req.query.message || 'Error!');
	
	if (req.query.code) {
		error.code = Number(req.query.code);
	}
	
	if (req.query.name) {
		error.name = req.query.name;
	}
	
	next(error);
});
	
server.use(errorHandling({
	development: process.env.NODE_ENV !== 'production'
}));

if (require.main === module) {
	server.listen(8080);
}

module.exports = server;
