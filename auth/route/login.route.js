const Route  = require( `${global.root_dir}/inc_shr/route.mod/route.js` );
const route = new Route(
	{
		prefix: global.api.baseRoutePrefix + '/account'
	}
);

route.get( '/', ( req, res ) =>
	{
		res.write('Hello World(s)!');
      res.end();
	}
);


route.post( '/login/:id', ( req, res ) =>
	{
		res.write('Login');
      res.end();
	}
);
route.post( '/login/:id/action', ( req, res, { id, msg } ) =>
	{
		res.write(`Login /// ${id} /// sa` );
      res.end();
	}
);

route.post( '/login/:id/:msg', ( req, res, { id, msg } ) =>
	{
		res.write(`Login /// ${id} /// ${msg}` );
      res.end();
	}
);





