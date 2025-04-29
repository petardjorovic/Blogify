const jwt = require('jsonwebtoken');

const activationToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: 'HS256',
        expiresIn: process.env.JWT_ACTIVATION_TOKEN_EXPIRES_IN,
    });
};

module.exports = activationToken;
