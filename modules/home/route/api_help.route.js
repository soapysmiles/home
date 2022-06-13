const Authenticate  = require( `${global.root_dir}/include/middleware/authenticate.mod` );
const Route  = require( `${global.root_dir}/inc_shr/route.mod` );

const route = new Route();

route.get( '/', Authenticate.getUserWithoutVerification( 'jwt' ), ( req, res, param_arr ) =>
	{
		res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');

		let html = '<h1>Hello, User!</h1> <h3> Welcome Home</h3>';

		html += param_arr.user ? 'Logged in' : 'Not logged in';

		res.end( html );
	},
	{
		override_route_prefix: ''
	}
);







