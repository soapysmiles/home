const fs = require('fs');

class File {

	constructor()
	{


	}

	retrieveFileArray( directory, opts = {} )
	{
		return fs.readdirSync( directory, opts );
	}

	/**
	 * Returns a flat array of all directories paths - searches recursively
	 * @param path - Initial path to search from
	 * @param target - If given, will only add directories matching the 'target'
	 * @returns [] - Flat array containing directory paths
	 */
	retrieveDirPathArr( path, target = false )
	{
		const file_arr = this.retrieveFileArray( path, { withFileTypes: true } );

		let dir_arr = [];
		for( const file of file_arr )
		{
			const file_name = file.name;

			//Hidden files
			if( file_name.substring( 0, 1 ) === '.' )
				continue;

			const is_dir = file.isDirectory()
			if( is_dir )
			{
				const dir_path =  path + '/' + file_name;

				if( !target || file_name === target )
					dir_arr.push( dir_path );

				dir_arr = [...dir_arr, ...this.retrieveDirPathArr( dir_path, target )]
			}

		}

		return dir_arr;
	}

	/**
	 * 
	 * @type {Object}
	 */
	retrieveFileArrFromDir( path, opts = {} )
	{
		const file_arr = this.retrieveFileArray( path, { withFileTypes: true } );

		let result_file_arr = [];
		for( const file of file_arr )
		{
			const file_name = file.name;

			//Ignore directories
			if( file.isDirectory() )
			{
				if( opts.recursive !== true )
					continue;
				
				//Todo recursive

			}

			//Ignore hidden files
			if( file_name.substring( 0, 1 ) === '.' )
				continue;

			//Suffix cannot fit or is larger than the file name
			if( opts.file_suffix && file_name.length <= opts.file_suffix.length )
				continue;

			if( !opts.file_suffix || file_name.substring( file_name.length - opts.file_suffix.length, file_name.length ) === opts.file_suffix )
				result_file_arr.push( path + '/' + file_name );
		}

		return result_file_arr;
	}

	retrieveDirPathArr( path, target = false )
	{
		const file_arr = this.retrieveFileArray( path, { withFileTypes: true } );

		let dir_arr = [];
		for( const file of file_arr )
		{
			const file_name = file.name;

			//Hidden files
			if( file_name.substring( 0, 1 ) === '.' )
				continue;

			const is_dir = file.isDirectory()
			if( is_dir )
			{
				const dir_path =  path + '/' + file_name;

				if( !target || file_name === target )
					dir_arr.push( dir_path );

				dir_arr = [...dir_arr, ...this.retrieveDirPathArr( dir_path, target )]
			}

		}

		return dir_arr;
	}


}

module.exports = File;