const JWT = require( process.cwd() + '/include/middleware/jwt' );

function getUser( req, secret_arr, verify_user_credentials = true )
{
	let auth_header = req.headers.authorization;

	if( !secret_arr || secret_arr.length !== 10 )
		throw new Error( 'Must supply secret array of at least 10 length' );

	if( !auth_header && verify_user_credentials === false )
		return {};

	if( !auth_header )
		throw new Error( 'Auth header must be given' );

	auth_header = auth_header.substring( 7, auth_header.length );
	let auth_header_part_arr = auth_header.split( '.' );
	if( auth_header_part_arr.length !== 3 )
		throw new Error( `Header 'Authorization' did not match a JWT token. Original header: '${headers.authorization}'` );

	const secret = secret_arr[ auth_header_part_arr[1].length % 10 ];//10 secrets

	return JWT.decodeToken( auth_header, secret.toString(), verify_user_credentials );
}

function verifyRequestHeader ( header )
{
	if( !header )
		throw new Error( `Request did not supply headers` );

	if( !header.authorization )
		throw new Error( `Header 'Authorization' was not given` );

	let auth_header = header.authorization;

	if( typeof auth_header !== 'string' )
		throw new Error( `Header 'Authorization' is not a string. Original header: '${header.authorization}'` );

	if( auth_header.substring( 0, 7 ) !== 'Bearer ' )
		throw new Error( `Header 'Authorization' did not start with 'Bearer'. Original header: '${header.authorization}'` );
}

module.exports =
{
	name: 'jwt',
	handleRequest: ( req, res, param_arr, opts ) => {

		verifyRequestHeader( req.headers )

		const user = getUser( req, opts.secret_arr, opts.secret_arr )

		if( !user )
			throw new Error( `Could not authorise request` );

		return {
			param_arr: { user }
		};
	},
	getUserWithoutVerification: ( req, res, param_arr, opts ) => {
		return getUser( req, opts.secret_arr, false );
	},

}