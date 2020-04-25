const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//adding gzip library
const compression = require('compression')
// compress all responses
app.use(compression());

//midellware
const winston = require('./config/winston.config.js');
const morgan = require('morgan');
app.use(morgan('combined', { stream: winston.stream }));


//documentation
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));     

//database
const db = require('./database/db.js');

//disabling etag
app.set('etag', false); // turn off
//disabling powered by
app.disable('x-powered-by');


//limit the number of users.
const rateLimit = require("express-rate-limit");
const {maxRequest} = require('./config/maxRequest.config');
//  apply to all requests
app.use(rateLimit(maxRequest));

//middleware error
// const { middlewareErrorDevelopment,  middlewareErrorProduction } = require('./controllers/middleware/middlewareError');
// if (process.env.NODE_ENV === 'development') 
// {
//   app.use(middlewareErrorDevelopment);
// }else
// {
//   app.use(middlewareErrorProduction);
// }


//routes
// const emailsRoutes = require('./routes/emails');
// app.use('/emails', emailsRoutes);
app.get('/',function(req,res){
	
  let element = 'hello world';
  res.send(element);
});

//routes
const userRouter = require('./user/user.route')
app.use('/', userRouter);

//default route
const defaultRoute = require('./middleware/defaultRoute.mid');
app.use('/', defaultRoute);

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    console.log("global error handler")
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // add this line to include winston logging
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    // render the error page
    const errorObj = {code: err.status, detail:err.message, stack: err.stack}
    res.status(err.status || 500).json(errorObj);
    //res.render('error');
});


const portConfig = require('./config/port.config');
db.connect()
  .then(() => {
    console.log('database connected..')
    app.listen(portConfig.PORT, () => {
      console.log('Listening on port: ' + portConfig.PORT);
    });
  });

module.exports = app;