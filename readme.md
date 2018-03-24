# Jira workload

This is a replacement for Time plugin for Jira which seems to be too costy to buy and 
it's much easier for developer to write something custom

Currently the app works with basic auth in Jira and credentials, along with other Jira parameters should be provided by ENV variables.

The app consists of [server](#server) part and [client](#client) part.

## <a name="config">**Configuration**</a>

Please take a look into [config](config/index.js) to see all possible env parameters.
Is some parameters are missing - the app will fail.

.env file is supported and is under .gitignore

The configuration is shared between the client and the server.

## Run

To run app

1. Generate SSL certificates
2. Provide all necessary variables via [config ENV variables](#config)
3. [Build the client](#run-client)
4. [Run the server](#run-server)
5. Go to root page of a host:port configured by ENV variables

NOTE. Currently [server](#server) doesn't support client side routing and in case of refreshing a page not in a root will cause 404 errors.

## <a name="server">**Server**</a>

Server is built upon Koa framework and requires async/await functionality - please make sure your NodeJS supports it
Server doesn't use databases and stores sessions only in memory.

Note that currently the server uses basic auth to communicate to Jira, since OAuth need to be configured by administrators 
and this flow is a bit more complicated. This to be fixed in future versions.

Server had it's own package.json with a task to run client's bundler. Also it has it's own jest configuration

### <a name="run-server">**Run the server**</a>

1. ```npm i```
2. ```npm start```

## <a name="client">**Client**</a>

Note that building system is controlled by **NODE_ENV** variable and changes how the bundler is working.
Under development mode it will start watcher and avoid minification
Under production mode it will just built with all required optimizations and skip source maps
Also remember to set this env for a react framework to use production version. 

### <a name="run-client">**Run the client**</a>

1. ```cd client```
1. ```npm i```
2. ```npm start```

## Development

For the development purposes some processes are setup:
1. Static analysis via [ESLint](https://eslint.org/)
2. Pre-commit hooks via [husky](https://github.com/typicode/husky)
3. Tests via [jest](https://facebook.github.io/jest)
