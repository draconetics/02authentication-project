const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    console.log("generate toke method")
    const user = this
    console.log(user)
    //const token = jwt.sign({user}, process.env.JWT_KEY)
    const token = jwt.sign({_id:user._id}, 'secret')
    console.log(token)
    user.tokens = user.tokens.concat({token})
    await user.save()
        .then((user) =>{
            console.log(user)
            return token
        })
        .catch((error) => {
            throw new Error({ error: 'We could not save.' })    
        })
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    console.log("user founded: ")
    console.log(user);
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    console.log("password founded: ")
    console.log(isPasswordMatch);
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User