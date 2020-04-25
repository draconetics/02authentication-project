const winston = require('../config/winston.config.js');
const ErrorLevel = require('./ErrorLevel')

class ErrorHandler {
    constructor() {
        //DEFAULT VALUES
        this.statusCode = 500;//MAX 8 STATUS CODES
        this.status = 'SERVER_ERROR'//SERVER_ERROR or CLIENT_ERROR
        this.error = 'UPS';
        this.message = '';
        this.stack = '';
        this.level = '';

        //request variables
        this.url = ''
        this.method = '';
        this.ip = '';
        this.transationId = 'one';
        this.correlationId = 'one';
        this.request = {};
    }

    logError(errorObj, req) {
        if(errorObj instanceof Error){
            let errorLevel = new ErrorLevel();
            errorObj = errorLevel.update(errorObj)
        }
            
        this.buildErrorLevelLog(errorObj, req)
            
        winston.log({level:this.level, message:JSON.stringify(this)})
    }

    buildErrorLevelLog(errorLevel, req){
        this.statusCode = errorLevel.statusCode;//MAX 8 STATUS CODES
        this.status = (this.statusCode>=500)?'SERVER_ERROR':'CLIENT_ERROR';//SERVER_ERROR or CLIENT_ERROR
        this.error = errorLevel.error;
        this.message = errorLevel.message;
        this.stack = errorLevel.stack;
        this.level = errorLevel.level;

        //request variables
        this.url = req.originalUrl;
        this.method = req.method;
        this.ip = req.ip;
        this.request = JSON.stringify(req.query)
    }

    getClientError(){

        return { 
                statusCode:this.statusCode, 
                status: this.status,
                error: this.error
        };
    }
  }


  module.exports = ErrorHandler