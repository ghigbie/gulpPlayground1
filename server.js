//this is a "static-server file"

const StaticServer = require('static-server');

const server = new StaticServer({
    rootPath: './public',
    port: 3000
});

server.start(() => {
    console.log(`The server is listening on port ${server.portT}`);
});