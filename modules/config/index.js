const {codingError} = require(`${process.cwd()}/modules/error`);

class Config
{



	config_dirs = false;
	config = {};

	constructor( ...config_dirs )
	{
		if( !config_dirs )
			throw new codingError('Must supply a config directory');

		const config_key = config_dirs.sort().toString();

		if( Config._instances && Config._instances[config_key] )
			return Config._instances[config_key].config;

		if( !Config._instances )
			Config._instances = [];

		Config._instances[config_key] = this;

		this.config_dirs = config_dirs;

		this.loadConfig();

		return this.config;
	}

	loadConfig()
	{

		const File = require( `${process.cwd()}/modules/file` );
		const file = new File();

		for( const config_dir of this.config_dirs ){
			const config_arr = file.retrieveFileArray( config_dir );

			for( const config of config_arr )
			{
				if( config.substring( 0, 7 ) !== 'config.' )
					continue;

				let conf_file = config.replace( 'config.', '' ).replace( '.js', '' );

				const section = conf_file.split( '.' )[ 0 ];

				this.config[ section ] = require( `${config_dir}/${config}` );
			}
		}
	}
}

module.exports = Config;