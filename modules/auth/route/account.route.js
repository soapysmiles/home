const Authenticate  = require( `${global.root_dir}/include/middleware/authenticate` );
const Route  = require( `${global.root_dir}/inc_shr/route.mod/route.js` );

const route = new Route(
	{
		prefix: global.api.baseRoutePrefix + '/account'
	}
);


route.get( '/authtest', Authenticate.use( 'jwt', { onFailureMessage: { status: 'Not authenticated', user_id: false } } ),
	( req, res, { user } ) =>
		{
			res.helper.outputJson( { status: 'authenticated!', user: user } );
		}
);





