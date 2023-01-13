'use strict';

//Load config
// new ( require( `${process.cwd()}/modules/config` ) )();

// const Database = require( `${process.cwd()}/modules/db`);


// require( `${process.cwd()}/modules/authenticate` )
// 	.setTypeOpt( 'jwt', { secret_arr: global.jwt.secret_arr } );

const Route        = require( `${process.cwd()}/modules/route` );

const route = new Route();

const Server      = require( `${process.cwd()}/modules/server` );

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

// Server.start();
