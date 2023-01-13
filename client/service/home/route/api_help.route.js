const Authenticate  = require( `${process.cwd()}/modules/authenticate` );
const Route  = require( `${process.cwd()}/modules/route` );

const route = new Route();

route.get( '/', Authenticate.getUserWithoutVerification( 'jwt' ), ( req, res, params ) =>
	{
		// res.HTML(( html );
	},	
);







