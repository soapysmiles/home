'use strict';

global.root_dir = __dirname;

//Load config
new ( require( `${global.root_dir}/config/config.class.js` ) )();

const Database = require( `${global.root_dir}/inc_shr/db.mod`);
//test
// console.log( new Database( 'user', {host:{
// 			host: 'localhost',
// 			port: 3306,
// 			user: 'root',
// 			password: '',
// 			connectionLimit: 100,
// 		} } ))

require( `${global.root_dir}/include/middleware/authenticate.mod` )
	.setTypeOpt( 'jwt', { secret_arr: global.jwt.secret_arr } );

const Route        = require( `${global.root_dir}/inc_shr/route.mod` );

const route = new Route();

const Server      = require( `${global.root_dir}/inc_shr/server/server.js` );

route.loadRoutes();
route.pageNotFound( (req, res) =>
	{
		res.writeHead( 404,
			{
				'Content-Type': 'application/json'
			}
		);

		res.end( JSON.stringify(
			{
				'status': 404,
				'message': 'Not found'
			}
		));
	}
);

Server.start();
