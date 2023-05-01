const jwt = require("jsonwebtoken");
const usersDB = require('../models/Users');

require('dotenv').config();

const refreshTokenHandler = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;
    const foundUser = await usersDB.findOne({refreshToken : refreshToken}).exec();
    const roles = foundUser.roles;
    console.log(roles,' from refresh token controller')
    if (!foundUser) {
        return res.sendStatus(403)
    }
    
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, decoded) => {
            if (error) {
                return res.sendStatus(403)
            }
            
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '3000s'
                }
            );
            return res.json(
                {
                    accessToken
                }
            )
        }
    )
}

module.exports = {
    refreshTokenHandler
}