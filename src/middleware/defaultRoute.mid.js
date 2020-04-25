const router = require('express-promise-router')();

const LogHandler = require('../exception/LogHandler')
const logger = new LogHandler()

router.use(function(req,res,next){

    console.log("default route for : " + req.method)
    
    const error = new Error('Page not found')
    error.code = 404
    logger.logError(error, req)
    return res.status(logger.statusCode).send(logger.getClientError());    
});  

module.exports = router;