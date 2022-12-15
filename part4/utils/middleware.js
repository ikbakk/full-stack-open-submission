const jwt = require('jsonwebtoken')

const tokenExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    } else {
        request.token = null
    }
    try {
        const decodedToken = await jwt.verify(request.token, process.env.SECRET)
        request.decodedToken = decodedToken
    } catch (error) {
        request.decodedToken = null
    }
    next()
}

module.exports = tokenExtractor