class executionError extends Error
{
	_reason = false;

	/**
	 * 
	 * @param  {Error} error  [description]
	 * @param  {[type]} reason [description]
	 * @return {[type]}        [description]
	 */
	constructor(...args){
		super();

		for( const arg of args )
		{
		
		}
		
		this._reason = reason ?? false;
	}
}

module.exports = executionError;