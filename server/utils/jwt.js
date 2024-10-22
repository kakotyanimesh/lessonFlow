const jwt = require('jsonwebtoken')


const generateAccessToken = (userId) => {
    return jwt.sign({userId : userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn : process.env.ACCESS_TOKEN_EXPIRY})
}

const generateRefreshToken = (userId) => {
    return jwt.sign({userId : userId}, process.env.REFRESH_TOKEN_SECRET, {expiresIn : process.env.REFRESH_TOKEN_EXPIRY})
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}