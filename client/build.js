const Bundler = require('parcel-bundler');

const { client } = require('../server/config');

const bundler = new Bundler('index.html', client);

bundler.bundle();
