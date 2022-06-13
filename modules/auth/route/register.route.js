const Authenticate  = require( `${global.root_dir}/include/middleware/authenticate.mod` );
const Route  = require( `${global.root_dir}/inc_shr/route.mod` );

const route = new Route(
	{
		prefix: `${global.api.baseRoutePrefix}/account/register`
	}
);

route.get( '/username/:username', ( req, res ) =>
	{
		res.write('Login');
      res.end();
	}
);

route.post( '/', ( req, res ) =>
	{
		res.write('Login');
      res.end();
	}
);




