//Parts of this were educated from https://github.com/maxwellium/jwt-hs256/blob/main/src/index.ts

const crypto = require( 'crypto' );

const base64url = require( process.cwd() + '/include/middleware/conversion/base64url' );

const HEADER_HS256 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';//pre encoded for efficiency

function decodeToken( token, secret, verify = true )
{
	if( verify && !verifyToken( token, secret ) )
		return false;

	return toJSON( token.split( '.' )[ 1 ] );
}

function generateToken( data, secret )
{
	if( !data )
		throw new Error( 'Data was not supplied' );

	if( !secret )
		throw new Error( 'Secret was not supplied' );

	const payload_str = JSON.stringify( data );
	const base64url_payload_str = base64url.encode( payload_str )
			.replace( /(=)+$/, '' );//Remove any base64 padding ('=') from end of string as per JWT docs

	let token = HEADER_HS256
		+ '.'
		+ base64url_payload_str;

	token += '.' + sign( token, secret );

	return token;
}

function verifyToken( token, secret )
{
	if( !secret )
		throw new Error( 'Secret was not supplied' );

	const token_part_arr = token.split( '.' );

	if( token_part_arr.length !== 3 )
		return false;

	const header_str    = token_part_arr[ 0 ];
	const payload_str   = token_part_arr[ 1 ];
	const signature_str = token_part_arr[ 2 ];

	if( !header_str || !payload_str || !signature_str )
		return false;

	if( header_str !== HEADER_HS256 )
		return false;

	const new_sign = sign( header_str + '.' + payload_str, secret );

	return new_sign === signature_str;
}

function sign( token, secret )
{
	return base64url.encode(
			crypto.createHmac( 'sha256', secret, { encoding: 'utf-8' } )
				.update( Buffer.from( token, 'utf-8') )
				.digest()
		)
		.replace(/(=)+$/, '' );//Remove any base64 padding ('=') from end of string
}

function toJSON ( str )
{
	return JSON.parse( base64url.decode( str ) )
}

module.exports = {
	decodeToken,
	generateToken
}

