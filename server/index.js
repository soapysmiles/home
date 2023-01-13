'use strict';

global.root_dir = __dirname;

// Load config
const config = new ( require( `${process.cwd()}/modules/config` ) )( `${process.cwd()}/config` );


const Database = require( `${process.cwd()}/modules/db`);


// require( `${process.cwd()}/modules/authenticate` )
// 	.setTypeOpt( 'jwt', { secret_arr: config.jwt.secret_arr } );


// Routes
const route = new ( require( `${process.cwd()}/modules/route` ))();

route.loadRoutes(process.cwd());
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

// Finally, start the server
const Server = require( `${process.cwd()}/modules/server` );

Server.start( config.server.port );
