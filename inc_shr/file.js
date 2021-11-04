const fs = require('fs');

class File {

	constructor()
	{


	}

	retrieveFileArray( directory )
	{
		return fs.readdirSync( directory );
	}


}

module.exports = File;