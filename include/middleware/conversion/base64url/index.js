module.exports = {
	//https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
	decode ( str )
	{
		// Replace non-url compatible chars with base64 standard chars
		str = str
			.replace( /-/g, '+' )
			.replace( /_/g, '/' );

		str = decodeURIComponent(Buffer.from(str, 'base64').toString().split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

		return str;
	},
	encode( data )
	{
		return Buffer.from( data )
			.toString( 'base64' )
			.replace( /\+/g, '-' )
			.replace( /\//g, '_' );
	}

}