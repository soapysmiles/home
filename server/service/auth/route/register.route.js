const config = new ( require( `${process.cwd()}/modules/config` ) )( `${process.cwd()}/config` );
const Database = require( `${process.cwd()}/modules/db`);

const Authenticate  = require( `${process.cwd()}/modules/authenticate` );
const Route  = require( `${process.cwd()}/modules/route` );

const route = new Route(
	{
		prefix: `${config.routes.baseRoutePrefix}/account/register`
	}
);

route.get( '/username/:username', ( req, res ) =>
	{
		res.write('Login');
      res.end();
	}
);

route.post( '/', Authenticate.getUserWithoutVerification, async ( req, res ) =>
	{
		const db = new Database();
		await db.connect();




		res.write('');
      res.end();
	}
);




