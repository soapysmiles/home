
const responseHelper = require( './responseFunction.js' );

let route_arr = {
	GET:     {},
	DELETE:  {},
	PUT:     {},
	POST:    {}
};

let route_prefix = '';

async function determineRoute( req, res )
{
	let url = req.url;
	if( url.substring( url.length - 1, url.length ) === '/' )
		url = url.substring( 0, url.length - 1 );
console.log( url, route_arr)
	let route     = ( !route_arr[ req.method ] || !route_arr[ req.method ][ url ] ) ? false : route_arr[ req.method ][ url ];
	let param_arr = {};

	if( !route )
	{
		//We could not identify the route simply, let's check if any of the URL's path sections are params

		const url_part_arr = url.split( '/' );

		//Search each route in the method's route array
		for( const route_path in route_arr[ req.method ] )
		{
			const temp_route = route_arr[ req.method ][ route_path ];

			//We know this route expects no parameters, let's save the expensive operations for routes which do
			if( !temp_route.expects_param )
				continue;

			//We must clear down param_arr as it could have been set by an incorrect route
			param_arr = {};

			let route_path_part_arr = route_path.split( '/' );

			//Check through each of the route's params and attempt to replace the given URL's position with the route's URL position where we expect a param
			for( const param_index in temp_route.param_arr )
			{
				route_path_part_arr[ param_index ] = url_part_arr[ param_index ];
				param_arr[ temp_route.param_arr[param_index].name ] = url_part_arr[ param_index ];
			}

			//If the replaced-route now matches the URL, we've found our route!, otherwise continue
			if( url !== route_path_part_arr.join( '/' ) )
				continue;

			route = temp_route;
			break;
		}
	}

	res.helper = responseHelper( req, res, param_arr );

	//Well... we just don't know what you're looking for here
	if( !route )
	{
		_pageNotFound( req, res );
		return;
	}

	//Ensure to run
	if( route.middleware_cb )
	{
		let resp = false;

		try
		{
			resp = await route.middleware_cb( req, res, param_arr );
		}
		catch( e )
		{
			console.error( e );
		}

		//Do not run the response_cb & only return as middleware should handle everything else in the case of a failure
		if( !resp )
		{
			if( res.finished )
				return;

			console.error( '[500|ERROR] Middleware did not handle request' );

			res.helper.outputJson(
				{
					message: 'Could not handle request'
				}, 500
			);

			return;
		}

		if( resp.param_arr )
			param_arr = { ...resp.param_arr, param_arr };
	}

	route.response_cb( req, res, param_arr );
}

function setPrefix( prefix )
{
	route_prefix = prefix;
}

function setPageNotFound( callback )
{
	_pageNotFound = callback;
}

function _pageNotFound( req, res )
{
	res.writeHead( 404,
		{
			'Content-Type': 'application/html'
		}
	);

	res.end( '404 Not found' );
}

function get( path, middleware_cb = false, response_cb = false, opts = {} )
{
	_addRoute( 'GET', path, middleware_cb, response_cb, opts );
}

function del( path, middleware_cb = false, response_cb = false, opts = {} )
{
	_addRoute( 'DELETE', path, middleware_cb, response_cb, opts );
}

function post( path, middleware_cb = false, response_cb = false, opts = {}  )
{
	_addRoute( 'POST', path, middleware_cb, response_cb, opts );
}

function put( path, middleware_cb = false, response_cb = false, opts = {} )
{
	_addRoute( 'PUT', path, middleware_cb, response_cb, opts );
}

function _addRoute( method, path, callback_one = false, callback_two = false, opts = {} )
{
	if( !callback_one && !callback_two )
		throw new Error( 'Must supply a callback' );

	let response_cb, middleware_cb = undefined;

	/**
	 * If only one callback given, use first as the response, else use the second
	 * This is simply so a route can be added as the last callback for readability. An example:
	 *
	 * route.put( '/', ( req, res ) => {//Response} );
	 *
	 * OR
	 *
	 * route.put( '/', Middleware.handleRequest, ( req, res ) => {//Response} );
	 *
	 */
	if( !callback_two )
		response_cb = callback_one;
	else
	{
		middleware_cb = callback_one;
		response_cb   = callback_two;
	}

	while( path.substring( path.length - 1 ) === '/' )
		path = path.substring( 0, path.length - 1 );

	let param_arr = {};

	const path_part_arr = path.split( '/' );
	let param_name_arr = {};

	//Identify any parameters
	for( let [ index, path_part ] of path_part_arr.entries() )
	{

		if( path_part.substring( 0, 1 ) === ':' )
		{
			path_part_arr[ index ] = '{#PARAM#}';

			const param_name = path_part.substring( 1, path_part.length );

			if( !param_name )
				throw new Error( `Param missing name for method (${method}) & route (${path})` );

			if( param_name_arr[ param_name ] )
				throw new Error( `Param: '${param_name}' is already assigned for method (${method}) & route (${path})` );


			param_name_arr[ param_name ] = 1;
			param_arr[ index ] = {
				'name': param_name
			};
		}
	}

	path = path_part_arr.join( '/' );
	if( opts.override_route_prefix !== undefined )
		path = opts.override_route_prefix ?? '' + path;
	else
		path = route_prefix + path;

	if( route_arr[method][path] )
		throw new Error( 'Path is already taken' );

	//Pre calculate for performance
	let expects_param = Object.keys( param_arr ).length > 0;

	route_arr[method][path] = {
		middleware_cb,
		response_cb,
		param_arr,
		expects_param
	};
}

module.exports = {
	determineRoute,
	setPageNotFound,
	get,
	del,
	post,
	put,
	setPrefix
}



