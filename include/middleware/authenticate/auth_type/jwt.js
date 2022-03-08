const JWT = require( process.cwd() + '/include/middleware/jwt' );

module.exports =
{
	name: 'jwt',
	handleRequest: ( req, res, param_arr, opts ) => {

		if( !opts.secret )
			throw new Error( 'Must supply secret' );

		const headers = req.headers;

		if( !headers )
			throw new Error( `Request did not supply headers` );

		if( !headers.authorization )
			throw new Error( `Header 'Authorization' was not given` );

		const auth_header = headers.authorization;

		if( typeof auth_header !== 'string' )
			throw new Error( `Header 'Authorization' is not a string. Original header: '${headers.authorization}'` );

		if( auth_header.substring( 0, 7 ) !== 'Bearer ' )
			throw new Error( `Header 'Authorization' did not start with 'Bearer'. Original header: '${headers.authorization}'` );

		const user = JWT.decodeToken( auth_header.substring( 7, auth_header.length ), opts.secret );

		if( !user )
			throw new Error( `Could not authorise request` );

		return {
			param_arr: { user }
		};
	}
}