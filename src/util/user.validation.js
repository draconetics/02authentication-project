const { ErrorHandler } = require('../exception/ErrorHandler')

const validateUser = function(bodyUser){
    
    const { name } = bodyUser

    let errorName = checkName(name)
    if( !isEmpty(errorName))
        return errorName

    let errorEmailOrPassword = validateLogin( bodyUser )
    if( !isEmpty(errorEmailOrPassword))
        return errorEmailOrPassword

    return {}
}

const validateLogin = function( bodyUser ){
    const { email, password } = bodyUser
    
    let errorEmail = checkEmail(email)
    if( !isEmpty(errorEmail))
      return errorEmail

    let errorPassword = checkPassword(password)
    if ( !isEmpty(errorPassword))
      return errorPassword

    return {}
}

const checkName = function(name) {

    if(name == undefined){
        let msg = "Name required"
        return new ErrorHandler(422,"CLIENT_ERROR", msg); 
    }

    if( !name || isNotString(name))
    {
        let msg = "Incorrect name format"
        return new ErrorHandler(422,"CLIENT_ERROR", msg); 
    }
    return {}
}

const checkEmail = function( email ) {

    if(email == undefined){
        let msg = "Email is required"
        return new ErrorHandler(422,"CLIENT_ERROR", msg); 
    }

    if( !email || isNotString(email))
    {
        let msg = "Incorrect email format"
        return new ErrorHandler(422,"CLIENT_ERROR", msg); 
    }
    return {}
}

const checkPassword = function( password ) {

    if(password == undefined){
        let msg = "Password is required"
        return new ErrorHandler(422,"CLIENT_ERROR", msg); 
    }
    
    let isOutOfRange = password.length < 3 && password.length > 10
    if( !password || isNotString(password) ||  isOutOfRange)
    {
        let msg = "Incorrect password format"
        return new ErrorHandler(422,"CLIENT_ERROR", msg); 
    }
    return {}
}

const isEmpty = function(obj) {
    return Object.keys(obj).length === 0;
}

const isNotString = function(data) {
    return typeof data !== "string"
}

module.exports = { validateUser, isEmpty, validateLogin };