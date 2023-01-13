const Authenticate = require( './auth.class.js' );

//Initialise authenticate
const authenticate = new Authenticate();

module.exports =
	{
		use: ( type, opts ) =>
		{
			return authenticate.getCallback( type, opts )
		},
		getUserWithoutVerification: ( type, opts = {} ) =>
		{
			opts.getUserWithoutVerification = true;
			return authenticate.getCallback( type, opts )
		},
		setTypeOpt: (type, opts ) =>
		{
			authenticate.setTypeOpt( type, opts );
		}
	}