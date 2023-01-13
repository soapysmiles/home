module.exports = {
	name:'user_function',
	columns:[
		{
			name: 'user_id',
			type: 'INT',
			attributes: [
				'NOT NULL'
			]
		},
		{
			name: 'function_id',
			type: 'INT',
			attributes: [
				'NOT NULL',
			],
		},
		{
			name: 'active',
			type: 'TINYINT(1)',
			default: 0,
			attributes: [
				'NOT NULL',
			],
		}
	],
	foreign_keys:[
	],
	custom: [
	]
}