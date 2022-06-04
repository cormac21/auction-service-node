const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodedToken;
        next();
    } catch( err ) {
        return res.status(401).json({
            message: "Get outta here, you're not authorized!",
            error: err
        })
    }
}

module.exports = {
    checkAuth: checkAuth
}