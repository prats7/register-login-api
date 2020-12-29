const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    //token check
    if(!token) return res.status(401).json({ msg: 'No token, autherization denied'});

    try{
    //Verify token
    const decoded = jwt.verify(token,"secret");

    //Add user
    req.user = decoded;
    next();
    }catch(e) {
        res.status(400).json({msg: 'Token is not valid'});
    }
}

module.exports = auth;