const Bundler = require('parcel-bundler');
const serve = require('browser-sync');
const proxy = require('http-proxy-middleware');
const compress = require('compression');

const { server } = require('../server/config');

const serverEndpoint = `https://${ server.host }:${ server.port }/api`;

const bundler = new Bundler('index.html');

serve({
  port: process.env.PORT + 1 || 3001,
  open: true,
  server: { baseDir: 'dist', https: true },
  middleware: [
    proxy(`${ server.host }/api`, { target: serverEndpoint }),
    compress(),
    bundler.middleware(),
  ],
});
