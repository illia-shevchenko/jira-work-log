'use strict';

const path = require('path');

require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'development';

const isProd = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test';
const isDev = NODE_ENV === 'development';

module.exports = {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    ssl: {
      certificate: process.env.CRT || path.resolve(__dirname, './certificates/server.crt'),
      key: process.env.KEY || path.resolve(__dirname, './certificates/server.key'),
    },
  },

  env: {
    isDev,
    isProd,
    isTest,
  },

  bodyParser: {
    enableTypes: ['json'],
  },

  secret: process.env.SECRET || 'secret',

  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    options: {
      expiresIn: '7d',
    },
  },
};
