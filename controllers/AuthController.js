const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const usersDB = require('../models/Users');

const handleAuth = async (req, res) => {
    const { username, password } = await req.body;
    if (!username || !password) {
        return res.status(401).json(
            {
                "message": "Empty Fields"
            }
        );
    }
    else {
        const foundUser = await usersDB.findOne({ username: username }).exec();

        

        if (!foundUser) {
            return res.status(401).json(
                {
                    "message": "user not found"
                }
            );
        }
        else {
            
            const match = await bcrypt.compare(password, foundUser.password);
            if (match) {
                const roles = foundUser.roles;
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "username": foundUser.username,
                            "roles": roles
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: '3000s'
                    }
                );

                const refreshToken = jwt.sign(
                    {
                        "username": foundUser.username
                    },
                    process.env.REFRESH_TOKEN_SECRET,
                    {
                        expiresIn: '1d'
                    }
                );

                foundUser.refreshToken = refreshToken;
                const result = await foundUser.save();

                console.log(result);

                return res.cookie(
                    'jwt',
                    refreshToken,
                    {
                        httpOnly: true,
                        sameSite: 'None',
                        /* secure: true, */
                        maxAge: 24 * 60 * 60 * 1000
                    }
                ).json(
                    {
                        accessToken
                    }
                )

            }

            else {
                return res.status(400).json(
                    {
                        "message": "password didn't matched"
                    }
                )
            }
        }
    }
}

module.exports = {
    handleAuth
}