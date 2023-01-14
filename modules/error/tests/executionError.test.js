const { testsuite } = require(`${process.cwd()}/modules/test`);

class executionError_testsuite extends testsuite {
	constructor(opts)
	{
		super(opts);

			
	}

	shouldFail_testcase(){
		this.assertEquals('Hello world','Hello world!');
	}


}

module.exports = executionError_testsuite;