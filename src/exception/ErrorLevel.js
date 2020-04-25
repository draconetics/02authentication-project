class ErrorLevel{
	constructor(){
		this.level = 'error'//3 types of error : error, warning, info
		this.statusCode = 500
		this.error = 'something went wrong, check log files' //message by developer
		this.message = ''; // message by machine
		this.stack = '' // file name from the error came
	}

	build(level, code, error, message, stack){
		this.level = level||'error'//3 types of error : error, warning, info
		this.statusCode = code||500
		this.error = error||'something went wrong, check log files' //message by developer
		this.message = message||''; // message by machine
		this.stack = stack||'' // file name from the error came
		return this
	}

	update(errObj, stack){
		//Unexpected error with Error type
		if(errObj instanceof Error){
			this.message = errObj.message || '';
			this.stack = errObj.stack || stack || '';
		}
		//ErrorLevel only need a stack
		this.stack = stack || ''
		return this
	}

	getLevel(){
		return this.level;
	}

	setLevel(level){
		this.level = level
	}
}

module.exports = ErrorLevel;