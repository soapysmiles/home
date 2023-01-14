const { TestSuite } = require(`${process.cwd()}/modules/test`);

class executionError_TestSuite extends TestSuite {
	constructor(opts)
	{
		super(opts);

			
	}

	shouldFail_testcase(){
	}




}

module.exports = executionError_TestSuite;