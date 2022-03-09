const jwt = require('jsonwebtoken')


// JWT Token Validation
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECERET, {
        expiresIn:'300d'

    })
}

module.exports = generateToken;