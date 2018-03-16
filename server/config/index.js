const path = require('path');

const dotEnvPath = process.cwd().endsWith('client') ? '../' : './';

require('dotenv').config({ path: path.resolve(dotEnvPath, '.env') });

const { NODE_ENV } = process.env;

const isProd = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test';
const isDev = !isProd && !isTest;

module.exports = {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    ssl: {
      cert: process.env.CRT || path.resolve(__dirname, './certificates/server.crt'),
      key: process.env.KEY || path.resolve(__dirname, './certificates/server.key'),
    },
  },

  client: {
    path: path.resolve(__dirname, '../../client/dist'),
    outDir: 'dist',
    outFile: 'index.html',
    publicUrl: './',
    watch: isDev,
    minify: isProd,
    sourceMaps: isDev,
    detailedReport: isDev,
    logLevel: isDev ? 3 : 2,
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

  jira: {},
};
