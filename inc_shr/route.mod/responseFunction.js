module.exports = ( req, res, param_arr ) =>
{
	const response_function = {

		_determineContentType( content_type_shorthand )
		{
			content_type_shorthand = content_type_shorthand.toLowerCase();
			switch( content_type_shorthand )
			{
				case 'json':
				case 'application/json':
					return 'application/json';
				default:
					throw new Error( `Cannot determine content type from shorthand ('${content_type_shorthand}')` );
			}
		},
		_setContentType( content_type )
		{
			res.setHeader( 'Content-Type',  content_type );

		},
		_setStatus( status )
		{
			res.statusCode = status;
		},
		writeHead( status, opts )
		{
			let headers = {};

			if( opts.contentType )
				response_function._setContentType( response_function._determineContentType( opts.contentType ) );

			if( opts.statusMessage )
				res.statusMessage = opts.statusMessage;

			response_function._setStatus( status );
		},
		writeBody( message )
		{
			res.write( message );
		},
		writeJson ( json = {}, status = 200 )
		{
			response_function.writeHead( status, { contentType: 'json' } )
			response_function.writeBody( JSON.stringify( json ) );
		},
		outputJson ( json = {}, status = 200 )
		{
			response_function.writeJson( json, status );
			res.end();
		}
	}

	return response_function;
};


