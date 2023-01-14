const cmd = require(`${process.cwd()}/modules/cmd`);

const Test = new (require (`${__dirname}/test.class.js`))();

class testcase
{
	name = this.constructor.name;

	success = true;
	results = {};

	function_call = false;

	assertions = 0;

	constructor( opts )
	{	
		if( !opts.function_call )
			throw new Error('Must supply function call')

		this.function_call = opts.function_call;		

		if( opts.name )
			this.name = opts.name;
	}

	addResult(line_num, result)
	{
		this.results[line_num] = result;
	}

	failed()
	{
		this.success = false;
	}

	toString(){
	

		const type = this.success ? cmd.green('[OK]  ') : cmd.red('[FAIL]');
		const result = this.success ? '' : `\n\tErrors:\n${JSON.stringify(this.results, false, 2)}`;
		return `${type} ${this.function_call} [Assertions: ${this.assertions}]${result}`;
	}
};

module.exports = testcase;