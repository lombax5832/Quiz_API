// server.js
const sls = require('serverless-http');
import { app } from './index';

module.exports.run = sls(app);
