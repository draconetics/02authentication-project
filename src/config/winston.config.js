var appRoot = require('app-root-path');
// var winston = require('winston');


var options = {
  file: {
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  }
};

let errorFile = {
    filename: `${appRoot}/logs/error.log`,
    level: 'error',
    ...options.file
};

let warningFile = {
    filename: `${appRoot}/logs/warning.log`,
    level: 'warning',
    ...options.file
};

let infoFile = {
    filename: `${appRoot}/logs/info.log`,
    level: 'info',
    ...options.file
};



const { createLogger, format, transports } = require('winston');
const { combine, timestamp , prettyPrint } = format;
const logger = createLogger({
  
  format: combine(
        timestamp(),
        prettyPrint(),
      ),
  levels: {
    'error': 0,
    'warning': 1,
    'info': 2
  },
  transports: [
    new transports.File(errorFile),
    new transports.File(warningFile),
    new transports.File(infoFile),
    new transports.Console(),
  ],
  exitOnError: false,
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

//winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
module.exports = logger;