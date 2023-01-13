module.exports = {
	name:'user_group',
	columns:[
		{
			name: 'user_id',
			type: 'INT',
			attributes: [
				'NOT NULL'
			]
		},
		{
			name: 'group_id',
			type: 'INT',
			attributes: [
				'NOT NULL'
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
		'PRIMARY KEY( `user_id`, `group_id` )'
	]
}