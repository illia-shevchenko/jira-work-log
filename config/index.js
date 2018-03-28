const path = require('path');

const dotEnvPath = process.cwd().endsWith('client') ? '../' : './';

require('dotenv').config({ path: path.resolve(dotEnvPath, '.env') });

const { NODE_ENV } = process.env;

const isProd = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test';
const isDev = !isProd && !isTest;

const credentials = {
  username: process.env.APP_USERNAME,
  password: process.env.APP_PASSWORD,
};

if (!credentials.password || !credentials.username) {
  throw Error('Credentials should be provided to start the application');
}

const jiraCredentials = {
  username: process.env.JIRA_USERNAME,
  password: process.env.JIRA_PASSWORD,
};
const jiraHost = process.env.JIRA_HOST;

if (!jiraHost || !jiraCredentials.password || !jiraCredentials.username) {
  throw Error('Jira credentials should be provided to start the application');
}

module.exports = {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    ssl: {
      cert: process.env.CRT || path.resolve(__dirname, './certificates/server.crt'),
      key: process.env.KEY || path.resolve(__dirname, './certificates/server.key'),
    },
  },

  credentials,
  jira: {
    credentials: jiraCredentials,
    host: jiraHost,
  },

  client: {
    path: path.resolve(__dirname, '../client/dist'),
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

  secret: process.env.SECRET || 'jira_secret',

  session: {
    key: 'session',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    options: {
      expiresIn: '7d',
    },
  },
};
