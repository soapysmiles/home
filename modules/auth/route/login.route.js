const Authenticate  = require( `${global.root_dir}/include/middleware/authenticate.mod` );
const Route  = require( `${global.root_dir}/inc_shr/route.mod` );

const route = new Route(
	{
		prefix: `${global.api.baseRoutePrefix}/account/login`
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





