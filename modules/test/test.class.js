const {codingError} = require(`${process.cwd()}/modules/error`);

class Test
{

	root_dirs = false;
	tests_dirs = {};

	results = [];

	constructor( ...root_dirs )
	{

		if(Test.instance)
			return Test.instance;

		Test.instance = this;

		if( !root_dirs )
			throw new codingError('Must supply a test directory');

		this.root_dirs = root_dirs;

		this.loadTests();
		
	}

	loadTests()
	{

		const File = require( `${process.cwd()}/modules/file` );
		const file = new File();

		for( const root_dir of this.root_dirs ){
			const test_dirs = file.retrieveDirPathArr( root_dir, 'tests' );
			for( const test_dir of test_dirs )
			{
				const test_files = file.retrieveFileArray(test_dir);

				this.tests_dirs[test_dir] = [];
				for( const test_file of test_files )
				{
					if( test_file.substring( test_file.length - 7, test_file.length ) !== 'test.js' )
						continue;

					this.tests_dirs[test_dir].push(test_file);
				}
			}
		}
	}

	runTests( displayResults = true )
	{
		for( const test_dir in this.tests_dirs )
		{
			for( const test of this.tests_dirs[ test_dir ] )
			{
				const test_class = require(`${test_dir}/${test}`);
				
				const test_suite_class_instance = new test_class({
					path: `${test_dir}/${test}`,
				});

				const tests = Object.getOwnPropertyNames(test_class.prototype);
				for( const test_method of tests )
				{
					if( test_method.substring( test_method.length - 8, test_method.length ) !== 'testcase' )
						continue;					

					test_suite_class_instance[test_method]();
				}

				if( displayResults )
					test_suite_class_instance.displayResults();
				
				this.results.push(test_suite_class_instance);
			}
		}
	}

	displayResults()
	{

	}

	registerResult( test )
	{
		
	}

	_determineType( test ) {
		return test.success ? 'ok' : 'fail';
	}


}



module.exports = Test;