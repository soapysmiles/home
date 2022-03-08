class Config
{

	main_config = __filename.slice( __dirname.length + 1 );

	constructor()
	{
		if( Config._instance )
			return Config._instance;

		Config._instance = this;

		this.loadConfig();
	}

	loadConfig()
	{
		const File = require( `${global.root_dir}/inc_shr/file.js` );
		const file = new File();

		const config_dir = `${global.root_dir}/config`;

		const config_arr = file.retrieveFileArray( config_dir );

		for( const config of config_arr )
		{
			if( config === this.main_config )
				continue;

			if( config.substring( 0, 7 ) !== 'config.' )
				continue;

			let conf_file = config.replace( 'config.', '' ).replace( '.js', '' );

			const section = conf_file.split( '.' )[ 0 ];

			global[ section ] = require( `${config_dir}/${config}` );
		}
	}
}

module.exports = Config;