//const { ErrorHandler } = require('../exception/ErrorHandler')

const validateUser = function(bodyUser){
    
    const { name } = bodyUser

    try{
        checkName(name);
        validateLogin(bodyUser);
    }catch(e){
        throw e
    }
}

const validateLogin = function( bodyUser ){
    const { email, password } = bodyUser
    console.log("verify login data")
    console.log(bodyUser)
    try{
        checkEmail(email);
        checkPassword(password);
    }catch(e){
        throw e
    }
}

const checkName = function(name) {

    if(name == undefined){
        let error = new Error("Name is required")
        error.code = 422
        throw error
    }

    if( !name || isNotString(name))
    {
        let error = new Error("Incorrect name format")
        error.code = 422
        throw error
    }
    
}

const checkEmail = function( email ) {
    
    if(email == undefined){
        
        let error = new Error("Email is required")
        error.code = 422
        throw error
    }

    if( !email || isNotString(email))
    {
        let error = new Error("Incorrect email format")
        error.code = 422
        throw error
    }
    
}

const checkPassword = function( password ) {

    if(password == undefined){
        let error = new Error("Password is required")
        error.code = 422
        throw error
    }
    
    let isOutOfRange = password.length < 3 && password.length > 10
    if( !password || isNotString(password) ||  isOutOfRange)
    {
        let error = new Error("Incorrect password format")
        error.code = 422
        throw error
    }
    
}


const isNotString = function(data) {
    return typeof data !== "string"
}

module.exports = { validateUser, validateLogin };