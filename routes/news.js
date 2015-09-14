'use strict';

let server = require('../server');

server.get('/news', (req, res, next) => {
	consol.log('error');
	res.send('news list');
});