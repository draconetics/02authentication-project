const winston = require('../config/winston.config.js');

class LogHandler {
    
    logError(errorObj, req) {
        //DEFAULT VALUES
        this.statusCode = errorObj.code || 500;//MAX 8 STATUS CODES
        this.status = this.statusCode>=500?'SERVER_ERROR':'CLIENT_ERROR'//SERVER_ERROR or CLIENT_ERROR
        this.message = errorObj.message || 'something went wrong!! - check the log files';
        this.stack = errorObj.stack || '';
        this.level = this.statusCode==500?'error':'warning';

        //request variables
        this.url = req.originalUrl || '';
        this.method = req.method || '';
        this.ip = req.ip || '';
        this.transationId = 'one';
        this.correlationId = 'one';
        this.request = JSON.stringify(req.query)
            
        winston.log({level:this.level, message:JSON.stringify(this)})
    }

    getClientError(){

        return { 
                statusCode:this.statusCode, 
                status: this.status,
                error: this.message
        };
    }
  }


  module.exports = LogHandler