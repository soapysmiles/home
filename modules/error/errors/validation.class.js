class validationError extends Error
{
	_reason = false;

	constructor(reason){
		super();
		
		this._reason = reason ?? false;
	}
}

module.exports = validationError;