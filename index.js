'use strict';

global.root_dir = __dirname;

const Server = require( global.root_dir + '/inc_shr/server/server.js' );
const server = new Server();

const Config = require( `${global.root_dir}/config/config.js` );
const config = new Config();

server.start();