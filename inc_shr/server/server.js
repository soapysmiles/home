const cmd = require( `${global.root_dir}/inc_shr/cmd.js` );

class Server {

	status = 'pending';
	server = null;
	route  = null;

	constructor()
	{
		if( Server._instance )
			return Server._instance;

		const Route = require( `${ global.root_dir }/inc_shr/server/route.js` );

		this.route = new Route();

		Server._instance = this;
	}

	start()
	{
		if( this.status !== 'pending' )
			throw new Error( 'Cannot start server; already started' );

		this.openServer();
	}

	openServer()
	{
		const http = require('http');

		this.server = http.createServer( this.handleRequest );

		this.server.listen( global.server.port );

		console.log(
			cmd.yellow( '[NOTICE]' ),
			cmd.white( `Started server on port: ${ cmd.blue( global.server.port ) }` )
		);
	}

	handleRequest( req, res )
	{


		console.log( {req, res} );
		res.writeHead(200, { 'Content-Type': 'application/json' });
	  res.end(JSON.stringify({
	    data: 'Hello World!'
	  }));

	}

	loadModule()
	{

	}

}

module.exports = Server;