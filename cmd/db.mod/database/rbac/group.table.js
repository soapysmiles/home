module.exports = {
	name:'group',
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
			name: 'name',
			type: 'VARCHAR(255)',
			attributes: [
				'NOT NULL',
				'UNIQUE'
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