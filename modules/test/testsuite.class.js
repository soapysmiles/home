const cmd = require(`${process.cwd()}/modules/cmd`);

const testcase = require(`${__dirname}/testcase.class.js`);
const Test = new (require (`${__dirname}/test.class.js`))();

class testsuite
{
	path = false;
	name = this.constructor.name;

	success = true;
	results = {};

	constructor( opts = {} )
	{
		if( opts.path )
			this.path = opts.path;
	}

	displayResults()
	{
		for( const result in this.results ){
			console.log( `${this.results[result].toString()}` );
		}
	}

	getAssertions()
	{
		let assertions = 0;
		for( const test_case in this.results )
			assertions += this.results[test_case].assertions;

		return assertions;
	}

	_assert(callback, ...values )
	{
		const e = new Error();
	    const frame = e.stack.split("\n")[3];
	    const function_call = frame.split(" ")[5];
	    const line_num = frame.split(":").reverse()[1];

	    
		if( !this.results[function_call] )
			this.results[function_call] = new testcase({
				function_call: function_call,
			});

		const test_case = this.results[function_call];

		try
		{
			callback(...values);
		}
		catch(e)
		{
			const error_msg = `${cmd.red(e.toString())}\n ${e.stack}`;

		    test_case.addResult(line_num, error_msg);
		    test_case.failed();
		}


		test_case.assertions++;

		this.success = this.success === false ? false : test_case.success;
	}

	assertAllEquals(...values)
	{

		this._assert((...vals) => {

			if( !Array.isArray( vals ) || vals.length === 0 )
				throw new Error(`No given values to compare`);

			let val = vals[0];
			for( const cur_val of vals ){
				if( cur_val !== val )
					throw new Error(`Value ${cur_val} is not equal to ${val}`)

				val = cur_val;
			}
		}, ...values)
	}

	assertBothEquals(val_a, val_b)
	{
		this._assert((val_a, val_b) => {

			if( val_a !== val_b)
				throw new Error(`Value ${val_a} is not equal to ${val_b}`)

		}, val_a, val_b)
	}

	assertEmpty(...values)
	{
		this._assert((...vals) => {
			if( !Array.isArray( vals ) || vals.length === 0 )
				throw new Error(`No given values to compare`);
			for( const cur_val of vals ){
				if( cur_val )
					throw new Error(`Value "${cur_val}" is not empty`)
			}
		}, ...values)
	}

	toString( full = false ){
	

		const type = this.success ? cmd.green('[OK]') : cmd.red('[FAIL]');

		return `${type} ${this.name}`;
	}
};

module.exports = testsuite;