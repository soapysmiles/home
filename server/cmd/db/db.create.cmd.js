#!/usr/local/bin/node

/**
 *
 * This script is taken & modified from another project (written by me)
 * The reason for this note is that the other project is a lot older and this script needs a big-time clean up. Do not expect the same level of quality here as elsewhere
 *
 * Funilly I called what was in the rest of the project 'quality' haha!
 *
 */


'use strict';

const fs = require( 'fs' );

global.root_dir = process.cwd();

//Load config
new ( require( `${process.cwd()}/config/config.class.js` ) )();
const Database = require( `${process.cwd()}/modules/db` );
const cmd = require( `${process.cwd()}/modules/cmd` );

/**
 * Converts object-type tables into SQL syntax
 * @param {array} tables array of tables in format: tables: {
	{
		name:"tableName",
		columns:[
			{
				name: "columnName",
				type: "type",
				attributes: [
					"not null",
					"etc",
				],
			}
		],
		foreign_keys:[
			{
				foreign_table: "",
				foreign_column: "",
				local_column: "",
			},
		],
	}
 * @param {promise-mysql obj} db database connection
 */
const createTables = async (database, tables, con) => {
	try{
		let tables_imp = [];
		tables.forEach((table)=>{

			if(table.split('')[0] === '.')//if the file is hidden
				return;

			let imp_tbl = require(`${__dirname}/database/${database.replace('demo_', '')}/${table}`);
			tables_imp.push( imp_tbl );
		});

		let sorted = false;
		while(!sorted){
			sorted = true;
			tables_imp.forEach((table, i)=>{
				table.foreign_keys.forEach((fkey)=>
				{
					for(let j = i; j < tables_imp.length; j++){
						if( tables_imp[j].name === fkey.foreign_table){
							const temp = tables_imp[i];
							tables_imp[i] = tables_imp[j];
							tables_imp[j] = temp;
							sorted = false;
						}
					}
				});
			});
		}
		for(let i = 0; i < tables_imp.length; i++){
			const table = tables_imp[i];
			await createTable(database, table, con).catch(e => console.log(e));
		}

	}catch(e){
		throw e;
	}
};

const createTable = async (database, table, con) => {
	const name = table.name;
	const columns = columnText(table.columns);

	let foreign_keys = '';
	if(table.foreign_keys && table.foreign_keys.length > 0){
		foreign_keys = ', ' + foreignKeyText(database, table.foreign_keys);
	}else{
		foreign_keys = '';
	}

	let custom = '';
	if(table.custom && table.custom.length > 0){
		if(foreign_keys.length > 0){
			foreign_keys += ', ';
		}
		custom = table.custom.join(', ');
	}else{
		custom = '';
	}

	const query = `CREATE TABLE IF NOT EXISTS \`${database}\`.\`${name}\` (${columns} ${ foreign_keys || custom ? ',' : '' } ${foreign_keys} ${custom}) ENGINE=InnoDB;`;

	if(can_apply){
		await con.exec(query);
		console.log(cmd.green('[OK]'),`Table: ${database}.${name}`);
	}else{
		console.log(cmd.magenta('[SAFEMODE]'),'Would have run\n\t', query);
	}

	if(table.data)
		await initData(con, database, table);
};


const initData = async (con, database, table) => {
	for(let i = 0; i < table.data.length; i++){
		let data = table.data[i];
		let columns = [...table.columns];
		columns = columns.filter((column, i) => {
			if(!data[i])
				return false;
			return true;
		});
		data = data.filter((data, i) => {
			if(!data)
				return false;
			return true;
		});

		const flat_columns = columns.map((column) => column.name);
		const stmt = `INSERT INTO \`${database}\`.\`${table.name}\` (\`${flat_columns.join('\`,\`')}\`) VALUES (${data.map(()=>'?')});`;
		if(can_apply)
		{
			await con.exec(stmt, data);
			console.log(cmd.green('[OK]'),'Inserted: \n\t ', stmt);
		}
		else
		{
			console.log(cmd.magenta('[SAFEMODE]'),'Would have run\n\t', stmt);
		}
	}
};

/**
 * Converts object-type columns into SQL syntax
 * Takes array of columns in format:
 * columns:[
			{
				name: "columnName",
				type: "type",
				attributes: [
					"NOT NULL",
				],
			}
		], and converts them into SQL format
 * @param {columnArr [array]} array of columns
 * Returning {string} String of aggregated columns in SQL format
 */
const columnText = (column_arr) => {
	let columns = '';
	column_arr.forEach((column, index, arr) => {
		const default_value = (column.default) ? 'DEFAULT ' + column.default : '';
		columns += '\`' + column.name + '\`' + ' ' + column.type + ' ' + default_value + ' ' + column.attributes.join(' ');//add attributes
		(index < arr.length-1) ? columns += ', ': null;//add comma if not last one
	});
	return columns;
};

/**
 * Converts object-type foreign keys into SQL syntax
 * @param  {array} foreignKeys array of foreignKeys in format:
 * foreignKeys:[
			{
				foreign_table: "",
				foreign_column: "",
				local_column: "",
			},
		],
 * Returning {string} String of aggregated foreign keys in SQL format
 */
const foreignKeyText = (database, foreign_keys) => {
	let foreign_key_sql = '';
	foreign_keys.forEach((foreign_key, index) => {
		//Retrieve information
		const local_column = foreign_key.local_column;
		const foreign_table = foreign_key.foreign_table;
		const foreign_column = foreign_key.foreign_column;

		foreign_key_sql += `FOREIGN KEY (\`${local_column}\`) REFERENCES \`${database}\`.\`${foreign_table}\` ( \`${foreign_column}\` )`;
		(index < foreign_keys.length-1) ? foreign_key_sql += ', ' : null;//add comma if not last one
	});
	return foreign_key_sql;
};

/**
 * Called to create the database, will create it if not exists
 */
const createDatabase = async (database) => {
	try{

		const con = new Database( global.db.config );
		await con.connect();

		if(can_drop) await dropDatabase(con, database.name);

		//Create database if it doesn't exits
		const query = 'CREATE DATABASE IF NOT EXISTS `' + database.name + '` CHARACTER SET utf8 COLLATE utf8_general_ci;';
		if(can_apply){
			await con.exec(query);
			console.log(cmd.green('[OK]'),`Database: ${database.name}`);
		}else{
			console.log(cmd.magenta('[SAFEMODE]'),'Would have run\n\t', query);
		}

		await createTables(database.name, database.tables, con);

		await con.end(con);
	}catch(e){
		throw e;
	}
};

const getDatabases = (path) => {
	let databases = [];

	const db_files = fs.readdirSync(path).filter(function (file) {
		return fs.statSync(path+'/'+file).isDirectory();
	});

	db_files.forEach((db)=>{
		databases.push({
			name: db.replace('.db', ''),
			tables: getTables(path+'/'+db),
		});
	});

	return databases;
};


const getTables = (path) => {
	let tables = [];

	const read_tables = fs.readdirSync(path);

	read_tables.forEach((table) => {
		tables.push(table.replace('.tbl', ''));

	});
	return tables;
};

/**
 * Called to create the database, will create it if not exists
 */
const init = async () => {
	try{
		const argv_arr = process.argv.join( '-', '' ).split( '' );

		if(argv_arr.includes('a')){
			console.log(cmd.yellow('[NOTICE]'),'This command is not in safe mode');
			can_apply = true;
		}else{
			console.log(cmd.yellow('[NOTICE]'),'This command is in safe mode');
		}

		if(argv_arr.includes('d'))
			can_drop = true;

		if(argv_arr.includes('i'))
			can_insert = true;

		if(can_apply && !argv_arr.includes('y'))
			if((await cmd.ask('Are you sure you want to continue? (y/n): ')).toLowerCase() !== 'y')
				throw 'DID NOT RUN';

		// getDatabases(__dirname+'/db').forEach(async (database, i, arr)=>{
		//
		// 	await createDatabase(database)
		// 		.catch( (e) => {
		// 			console.log(e);
		// 		});
		//
		// 	if(i === arr.length-1)
		// 		console.log(cmd.green('[DONE]'));
		// });

		await getDatabases(__dirname+'/database').forEach( async (database, i, arr)=>{
			database.name = 'demo_' + database.name;
			await createDatabase( database )
				.catch( (e) => {
					console.log(e);
				});

			if(i === arr.length-1)
				console.log(cmd.green('[DONE]'));
		});

		return;
	}catch(e){
		console.log(e);
	}
};




const dropDatabase = async (con, database) => {
	const query = `DROP DATABASE IF EXISTS \`${database}\``;
	if(can_apply){
		await con.exec(query);
		console.log(cmd.green('[OK]'),`Database dropped: ${database}`);
	}else{
		console.log(cmd.magenta('[SAFEMODE]'),'Would have run\n\t', query);
	}

	return;
};

// may be useful in future, needs further refactoring
// exports.emptyDatabase = async (test) => {
// 	const db = await db.createConnection();


// 	let query = 'SET foreign_key_checks = 0;';
// 	await db.query(query);

// 	const tables = [...databaseConfig.tableConfig.tables];
// 	for(let i = 0; i < tables.length; i++){
// 		const table = tables[i];

// 		let query = `DELETE FROM ${table.name};`;
// 		await db.query(query);

// 	}


// 	let query = 'SET foreign_key_checks = 1;';
// 	await db.query(query);

// 	let query = 'RESET QUERY CACHE';
// 	await db.query(query);


// 	await db.end();

// 	return;
// };

let can_apply = false;
let can_drop = false;
let can_insert = false;
try{

	init().catch(e => console.log(e));

}catch(e){
	throw e;
}
