module.exports = {
	name:'user',
	columns:[
		{
			name: 'id',
			type: 'INT',
			attributes: [
				'NOT NULL',
				'PRIMARY KEY',
				'AUTO_INCREMENT'
			],
		},
		{
			name: 'password',
			type: 'VARCHAR(255)',
			attributes: [
				'NOT NULL',
			],
		},
		{
			name: 'phone_number',
			type: 'VARCHAR(255)',
			attributes: [
				'NOT NULL',
				'UNIQUE',
			],
		},
		{
			name: 'email',
			type: 'VARCHAR(255)',
			attributes: [
				'UNIQUE',
			],
		},
		{
			name: 'dt_created',
			type: 'DATETIME',
			default: 'CURRENT_TIMESTAMP',
			attributes: [
				'NOT NULL',
			],
		},
		{
			name: 'dt_updated',
			type: 'DATETIME',
			attributes: [],
		},
		{
			name: 'dt_deleted',
			type: 'DATETIME',
			attributes: [],
		},
	],
	foreign_keys:[
	],
	custom: [
	]
}