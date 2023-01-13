const proj_root_dir = process.cwd();

class Authenticate {

	auth_type_arr = [];
	opts = {
		onFailureMessage: { message: 'Not Authenticated' },
		onFailureMessage_ContentType: 'json',
	};
	type_opts = {};

	constructor()
	{
		if( Authenticate._instance )
			return Authenticate._instance;

		Authenticate._instance = this;

		this.loadAuthType();
	}

	loadAuthType()
	{
		const File = require( `${proj_root_dir}/modules/file` );
		const file = new File();

		const type_dir = `${__dirname}/auth_type`;

		const type_arr = file.retrieveFileArray( type_dir );

		for( const type_file_path of type_arr )
		{
			const type_controller = require( `${type_dir}/${type_file_path}` );

			if( !type_controller.name )
				throw new Error( `Type controller from file ${type_file_path} missing required attribute 'name'` );

			if( !type_controller.handleRequest )
				throw new Error( `Type controller from file ${type_file_path} missing required function 'handleRequest'` );

			this.auth_type_arr[ type_controller.name ] = type_controller;
		}
	}

	setTypeOpt( type, opts )
	{
		if( !this.type_opts[ type ] )
			this.type_opts[ type ] = {};

		this.type_opts[ type ] = { ...this.type_opts[ type ], ...opts };
	}

	/**
	 * Called on failure of authentication
	 * @param res
	 */
	onFailure( res, opts = {} )
	{
		opts = { ...this.opts, ...opts };

		switch( opts.onFailureMessage_ContentType )
		{
			case 'json':
				res.helper.outputJson( {
					message:  opts.onFailureMessage
					}, 403
				);
				return;
		}
	}


	getCallback( type, opts )
	{
		if( !type )
			throw new Error( 'AUTH: Could not handle request: No `type` given' );

		return ( req, res, param_arr ) =>
		{
			let resp = false;
			try
			{
				resp = this.auth_type_arr[ type ].handleRequest( req, res, param_arr, this.type_opts[type] || {} );
			}
			catch( e )
			{
				console.error( `[ERROR|403] ${e.message}` );
			}

			if( resp )
				return resp;

			if( opts.getUserWithoutVerification )
			{
				try
				{
					resp = this.auth_type_arr[ type ].getUserWithoutVerification( req, res, param_arr, this.type_opts[type] || {} );
				}
				catch( e )
				{
					console.error( `[ERROR|403] ${e.message}` );
				}
			}

			if( resp )
				return resp;

			this.onFailure( res, opts );
			return false;
		}
	}
}

module.exports = Authenticate;