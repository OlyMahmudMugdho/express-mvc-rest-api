const jwt = require("jsonwebtoken");
const usersDB = {
    users: require('../models/users.json'),
    setUsers: function (data) {
        this.users = data;
    }
}

require('dotenv').config();

const refreshTokenHandler = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;
    const foundUser = usersDB.users.find(
        (person) => {
            return person.refreshToken === refreshToken
        }
    )
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
                    "username": decoded.username
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '30s'
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