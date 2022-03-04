const Controller = require( `./route.main.js` );

class Route
{
	_prefix = false;

	constructor( opt_arr = {} )
	{
		if( opt_arr.prefix )
			this.prefix( opt_arr.prefix );
	}

	async loadRoutes()
	{

		const File = require( `${global.root_dir}/inc_shr/file.js` );
		const file = new File();

		const route_dir_arr = file.retrieveDirPathArr( global.root_dir, 'route' );

		for( const route_dir of route_dir_arr )
		{
			const route_file_arr = file.retrieveFileArrFromDir( route_dir, 'route.js' );
			for( const route_file of route_file_arr )
				await require( route_file );
		}
	}

	async determineRoute( req, res )
	{
		await Controller.determineRoute( req, res )
	}

	setBasePrefix( prefix )
	{
		Controller.setPrefix( prefix )
	}

	prefix( prefix )
	{

		if( prefix.substr( -1 ) === '/' )
			prefix = prefix.substr( 0, url.length - 1 );

		this._prefix = prefix;
	}

	pageNotFound( callback )
	{
		Controller.setPageNotFound( callback );
	}

	_setPath( path )
	{
		if( this._prefix !== false )
			path = this._prefix + path;

		return path;
	}

	get( path, middleware_cb = false, response_cb = false )
	{
		path = this._setPath( path );

		Controller.get( path, middleware_cb, response_cb )
	}

	del( path, middleware_cb = false, response_cb = false )
	{
		path = this._setPath( path );

		Controller.del( path, middleware_cb, response_cb )
	}

	post( path, middleware_cb = false, response_cb = false )
	{
		path = this._setPath( path );

		Controller.post( path, middleware_cb, response_cb )
	}

	put( path, middleware_cb = false, response_cb = false )
	{
		path = this._setPath( path );

		Controller.put( path, middleware_cb, response_cb )
	}

}

module.exports = Route;