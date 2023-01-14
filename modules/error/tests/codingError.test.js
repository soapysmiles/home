const { testsuite } = require(`${process.cwd()}/modules/test`);

class codingError_testsuite extends testsuite {
	constructor(opts)
	{
		super(opts);

			
	}

	shouldFail_testcase(){
		this.assertEquals(1,1);
	}


}

module.exports = codingError_testsuite;