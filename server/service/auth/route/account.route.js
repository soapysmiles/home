const config = new ( require( `${process.cwd()}/modules/config` ) )(
	`${process.cwd()}/config`,
	`${process.cwd()}/service/auth/config`
);

const Authenticate  = require( `${process.cwd()}/modules/authenticate` );
const Route  = require( `${process.cwd()}/modules/route` );

const route = new Route(
	{
		prefix: `${config.routes.baseRoutePrefix}/account`
	}
);

// const config = new (require( `${process.cwd()}/modules/config`))()

route.get( '/authtest', Authenticate.use( 'jwt' ),
	async ( req, res, { user } ) =>
		{
			res.helper.outputJson( { status: 'authenticated!', user: user } );
		}
);





