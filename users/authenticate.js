const jwt = require('jsonwebtoken');

//Authentication middleware to determine if the user has the correct username and password
module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log('failed verification', err);
                res.status(401).json({
                    message: 'not authorized'
                })
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(400).json({
            message: 'Please login'
        })
    }
}