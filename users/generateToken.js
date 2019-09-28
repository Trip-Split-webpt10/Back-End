const jwt = require('jsonwebtoken')

//Generates the JWT to give the user access to certain routes.
function generateToken(user) {

    const payload = {
        sub: user.id,
        username: user.username,
    };

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = generateToken