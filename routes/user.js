'use strict';

let server = require('../server');

server.get('/users', (req, res, next) => {
	res.send('user list');
});