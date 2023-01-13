/**
 * Create a user
 * @author Soapy
 * @param  {Connection} con
 * @param  {String} phone_number
 * @param  {String} password
 */
exports.createOne = async (con, phone_number, password) => {
	if( !global.auth.allow_registration )
		throw new GeneralError(503, 'Configuration', '531x24', 'Registrations not permitted');

	const user = await this.userExists(con, phone_number);
	if(user)
		throw new error.GeneralError(400, 'Unique check', '531x12', 'User exists');

	const hashed_password = await pass.hash(password);

	const uid = random.alphanumeric(config.auth.length.user_uid);

	if( config.package.is_development )
		console.log( '[DEVELOP] User created with UID: ', uid );

	await con.beginTransaction();
	try{
		let stmt = 'INSERT INTO ' + config.database.AUTH_DB_NAME + '.user'
			+ ' (phone_number, password, uid)'
			+ ' VALUES (?, ?, ?)';

		let rslt = await con.exec(stmt, [
			phone_number,
			hashed_password,
			uid,
		]);

		stmt = 'INSERT INTO ' + config.database.AUTH_DB_NAME + '.user_details ( user_id )'
			+ ' VALUES( ? );';
		rslt = await con.exec(stmt, [
			uid,
		]);

		await role.associateOne(con, 'user', uid);

		con.commit();
	}catch(e){
		await con.rollback();
		throw e;
	}

	return true;
};


exports.createOne = async ( db, password, user_data = {} ) =>
{
	if( !config.auth.allow_registration )
		throw new GeneralError(503, 'Registrations not permitted');
}

class user {

	constructor(id){

	}

	create(db, ) {

	}
}