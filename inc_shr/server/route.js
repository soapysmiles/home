class Route {

	route_arr = [];

	constructor()
	{
		if( Route._instance )
			return Route._instance;

		Route._instance = this;
	}

	determineRoute( url )
	{

	}

	addRoute( path, callback )
	{

	}

	removeRoute( path )
	{

	}

	_loadRoute( path )
	{

	}

	_unloadRoute( path )
	{

	}

}

module.exports = Route;