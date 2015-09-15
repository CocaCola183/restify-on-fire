'use strict';

let restify = require('restify');
let fs = require('fs');
let http_log = require('restify-http-log');
let logger = require('./lib/logger');
let req_param_collector = require('req-param-collector');

/*start http server*/
var server = restify.createServer({
	certificate: fs.readFileSync('./cert/certificate.pem'),
	key: fs.readFileSync('./cert/privatekey.pem'),
	name: 'restify_node4.0',
	version: '0.0.0'
});

/*exports server for routing*/
module.exports = server;

/*accept header parsing*/
server.use(restify.acceptParser(server.acceptable));

/*CORS*/
server.use(restify.CORS());
server.use(restify.fullResponse());

/*query parser*/
server.use(restify.queryParser());

/*body parser*/
server.use(restify.bodyParser({
  maxBodySize: 1024 * 1024 * 1024,
  mapParams: true,
  mapFiles: false,
  overrideParams: false,
  keepExtensions: true,
  uploadDir: process.cwd() + '/upload/tmp',
  multiples: true
}));

/*collect req params*/
server.use(req_param_collector(['params', 'body', 'query', 'context']));

/*for http log*/
server.pre(http_log());

/*router*/
require('./routes/index.js');

/*serve static*/
server.get(/\/assets?.*/, restify.serveStatic({
  directory: __dirname,
  default: 'index.html'
}));

server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});

server.on('uncaughtException', (req, res, route, error) => {
	logger.error('Got uncaught error at: ', route.spec);
	console.trace(error);
	res.send({status: 'error', message: 'Internal server error'});
});

server.on('NotFound', (req, res, error, cb) => {
	logger.warn('Got an illegal request:', error);
	res.send({status: 'error', message: '404 not found'});
});

server.on('MethodNotAllowed', (request, response, error, cb) => {
	logger.warn('Got an illegal request:', error);
	res.send({status: 'error', message: 'method not allowed'});
});

server.on('VersionNotAllowed', (request, response, error, cb) => {
	logger.warn('Got an illegal request:', error);
	res.send({status: 'error', message: 'server version is illegal'});
});
