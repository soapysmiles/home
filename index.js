'use strict';

global.root_dir = __dirname;

//Load config
new ( require( `${global.root_dir}/config/config.class.js` ) )();

require( `${global.root_dir}/include/middleware/authenticate` )
	.setTypeOpt( 'jwt', { secret: global.jwt.secret } );

const Server      = require( `${global.root_dir}/inc_shr/server/server.js` );
const Route        = require( `${global.root_dir}/inc_shr/route.mod/route.js` );

const route = new Route(
	{
		prefix: global.api.baseRoutePrefix
	}
);
const App    = require( `${global.root_dir}/inc_shr/server/app.js` );

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
