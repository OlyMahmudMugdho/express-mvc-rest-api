const jwt = require("jsonwebtoken");


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.sendStatus(401);
    }
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (error, decoded) => {
            if (error) {
                return res.sendStatus(403);
            }
            else {
                req.username = decoded.UserInfo.username;
                req.roles = decoded.UserInfo.roles
                next();
            }
        }
    )
}

module.exports = verifyJWT;