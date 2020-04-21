const router = require('express-promise-router')();
const { ErrorHandler } = require('../exception/ErrorHandler');


//The 404 Route (ALWAYS Keep this as the last route)
// router.get('*', function(req, res){
//     const errorHandler = new ErrorHandler(404, 'CLIENT_ERROR', 'Page not found');
//     return res.status(404).send(errorHandler);
// });

//POST request
router.use(function(req,res,next){
    // if (req.method != "GET"){
    //     console.log("default route for : " + req.method)
    //     //return next()
    //     const errorHandler = new ErrorHandler(404, 'CLIENT_ERROR', 'Page not found');
    //     return res.status(404).send(errorHandler);
    // } 
    
    console.log("default route for : " + req.method)
    //return next()
    const errorHandler = new ErrorHandler(404, 'CLIENT_ERROR', 'Page not found');
    return res.status(404).send(errorHandler);    
     // Do something
});  //==> ROUTER LEVEL MIDDLE WARE

module.exports = router;