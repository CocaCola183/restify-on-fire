'use strict';

let config = require('../config.json');
module.exports = require('color-journal')(config.log.app_log);
