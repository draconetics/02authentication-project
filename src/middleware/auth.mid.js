const jwt = require('jsonwebtoken')
const { userRepository } = require("../user/dependency");
const LogHandler = require('../exception/LogHandler')
const logger = new LogHandler();

const auth = async(req, res, next) => {
    try 
    {
        //console.log("entering to authentication")
        if(!req.header('Authorization')){
            let error = new Error('auth - User NO Authenticated')
            error.code = 403
            throw error
        }
            

        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, 'secret')
        //console.log("this is data: ")
        //console.log(data)
    
        const user = await userRepository.findByIdAndToken(data._id, token)
        if (!user) {
            //console.log("no user founded")
            let error = new Error('auth - error user id or token')
            error.code = 403
            throw error
        }
        req.user = user
        req.token = token
        next()
    } catch (e) {
        e.stack = e.stack || 'auth.mid -> auth()'
        logger.logError(e, req)
        return res.status(logger.statusCode).json(logger.getClientError())
    }
}
module.exports = auth