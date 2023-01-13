class executionError extends Error
{
	_reason = false;

	constructor(reason){
		super();
		
		this._reason = reason ?? false;
	}
}

module.exports = executionError;