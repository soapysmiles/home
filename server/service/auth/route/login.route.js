const config = new ( require( `${process.cwd()}/modules/config` ) )( `${process.cwd()}/config` );

const Authenticate  = require( `${process.cwd()}/modules/authenticate` );
const Route  = require( `${process.cwd()}/modules/route` );

const route = new Route(
	{
		prefix: `${config.routes.baseRoutePrefix}/account/login`
	}
);


route.post( '/:email', ( req, res ) =>
	{
		res.write('Login');
      res.end();
	}
);

route.post( '/:id/action', ( req, res, { id, msg } ) =>
	{
		res.write(`Login /// ${id} /// sa` );
      res.end();
	}
);

route.post( '/authtest', Authenticate.use( 'jwt', { onFailureMessage: { status: 'Not authenticated', user_id: false } } ),
	( req, res, { user } ) =>
		{
			res.helper.outputJson( { status: 'authenticated!', user: user } );
		}
);





