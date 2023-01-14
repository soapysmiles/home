const { TestSuite } = require(`${__dirname}/../`);

const Test = require(`${__dirname}/../test.class.js`);

class TestSuite_TestSuite extends TestSuite {
	constructor(opts)
	{
		super(opts);

			
	}

	constructor_testcase()
	{
		let test_suite = new TestSuite();

		this.assertEmpty(TestSuite.path)

		test_suite = new TestSuite( { path: 'path/to/hell' } );

		this.assertBothEquals( test_suite.path, 'path/to/hell' )
	}

	getAssertions_testcase()
	{
		let test_suite = new TestSuite();

		test_suite.assertEmpty( TestSuite.path );

		this.assertBothEquals( test_suite.getAssertions(), 1 );

		test_suite.assertEmpty( 1 );
		test_suite.assertEmpty( 0 );
		test_suite.assertEmpty( '' );
		
		this.assertBothEquals( test_suite.getAssertions(), 4 );		
	}

	assertEmpty_testcase()
	{

		let test_suite;

		const empty_values = [ '', 0, false, null, undefined ];

		for( const value of empty_values )
		{
			test_suite = new TestSuite();

			test_suite.assertEmpty( value );

			this.assertBothEquals( test_suite.success, true );
		}

		const non_empty_values = [ 'Capatalism failed us all', 1, true ];

		for( const value of non_empty_values )
		{
			test_suite = new TestSuite()

			test_suite.assertEmpty( value );

			this.assertBothEquals( test_suite.success, false );
		}

	}

	assertAllEquals_testcase()
	{
		let test_suite;

		// All equals
		let values = [11, 11];
		test_suite = new TestSuite();
		test_suite.assertAllEquals( ...values );
		this.assertBothEquals( test_suite.success, true );

		values = ['a', 'a', 'a'];
		test_suite = new TestSuite();
		test_suite.assertAllEquals( ...values );
		this.assertBothEquals( test_suite.success, true );

		//Not all equals
		values = ['a', 'b', 'c'];
		test_suite = new TestSuite();
		test_suite.assertAllEquals( ...values );
		this.assertBothEquals( test_suite.success, false );

		values = ['a', 'b', 'a'];
		test_suite = new TestSuite();
		test_suite.assertAllEquals( ...values );
		this.assertBothEquals( test_suite.success, false );

		values = ['a', 'c'];
		test_suite = new TestSuite();
		test_suite.assertAllEquals( ...values );
		this.assertBothEquals( test_suite.success, false );

		values = [1, '1'];
		test_suite = new TestSuite();
		test_suite.assertAllEquals( ...values );
		this.assertBothEquals( test_suite.success, false );
	}

	assertBothEquals_testcase()
	{
		let test_suite;

		// Equals
		test_suite = new TestSuite();
		test_suite.assertBothEquals( 11, 11 );
		this.assertBothEquals( test_suite.success, true );

		test_suite = new TestSuite();
		test_suite.assertBothEquals( 'a', 'a' );
		this.assertBothEquals( test_suite.success, true );

		test_suite = new TestSuite();
		test_suite.assertBothEquals( true, true );
		this.assertBothEquals( test_suite.success, true );

		// Not equals
		test_suite = new TestSuite();
		test_suite.assertBothEquals( 11, '11' );
		this.assertBothEquals( test_suite.success, false );

		test_suite = new TestSuite();
		test_suite.assertBothEquals( 'a', 'b' );
		this.assertBothEquals( test_suite.success, false );

		test_suite = new TestSuite();
		test_suite.assertBothEquals( true, false );
		this.assertBothEquals( test_suite.success, false );

	}
}

module.exports = TestSuite_TestSuite;