const jwt = require('jsonwebtoken')


const auth = (req, res, next) => {
    const accessToken = req.cookies.accessToken
    if(!accessToken) return res.status(403).json({msg : 'no access token provided'})

    try {
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decodedToken.userId
        next()
    } catch (error) {
        res.status(500).json({
            msg : `Unable to verify the token error : ${error.message}`
        })
    }

    
}


module.exports = {
    auth
}