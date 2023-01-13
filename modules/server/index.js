global.cmd = require( `${process.cwd()}/modules/cmd` );
const Route = require( `${process.cwd()}/modules/route` );
const route = new Route();

let status = 'pending';
let server = null;

function start( port )
{
	if( status !== 'pending' )
		throw new Error( 'Cannot start server; already started' );

	status = 'opening';
	_openServer( port );
}

function _setExitHandler()
{
	process.stdin.resume();//so the program will not close instantly

	//do something when app is closing
	process.on('exit', _exitHandler.bind(null,{cleanup:true}));

	//catches ctrl+c event
	process.on('SIGINT', _exitHandler.bind(null, {exit:true}));

	// catches "kill pid" (for example: nodemon restart)
	process.on('SIGUSR1', _exitHandler.bind(null, {exit:true}));
	process.on('SIGUSR2', _exitHandler.bind(null, {exit:true}));

	//catches uncaught exceptions
	process.on('uncaughtException', _exitHandler.bind(null, {exit:true}));
}

function _exitHandler()
{
	server.close();
}

function getStatus()
{
	return status;
}

function handleRequest( req, res )
{
	route.determineRoute( req, res );
}

function loadModule()
{

}

function _openServer( port )
{
	const http = require('http');

	server = http.createServer( handleRequest );

	server.listen( port );

	console.log(
		global.cmd.yellow( '[NOTICE]' ),
		global.cmd.white( `Started server on port: ${ global.cmd.blue( port ) }` )
	);
	status = 'started';

	_setExitHandler();
}

module.exports = {
	start,
	handleRequest,
	loadModule,
	getStatus
};