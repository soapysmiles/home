module.exports = {
	name:'function_group',
	columns:[
		{
			name: 'function_id',
			type: 'INT',
			attributes: [
				'NOT NULL'
			]
		},
		{
			name: 'group_id',
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