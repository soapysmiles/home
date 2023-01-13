module.exports =
{
	executionError: require( `${__dirname}/errors/executionError.class.js` ),
	validationError: require( `${__dirname}/errors/validation.class.js` ),
	codingError: (require( `${__dirname}/errors/codingError.class.js` ))
};