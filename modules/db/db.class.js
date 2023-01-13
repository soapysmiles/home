const mysql = require('promise-mysql');

class Database
{
	config = {};
	db = false;

	constructor( config )
	{
		this.config = config;
	}

	async connect()
	{
		this.db = await mysql.createConnection( this.config );

		return true;
	}

	async exec( stmt, prepared_values = [] )
	{
		return await this.db.query( stmt, prepared_values );
	}

	async beginTransaction()
	{
		return await this.db.beginTransaction();
	}

	async commit()
	{
		return await this.db.commit();
	}

	async rollback()
	{
		return await this.db.rollback();
	}

	async end()
	{

	}
}

module.exports = Database