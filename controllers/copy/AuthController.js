const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");
const bcrypt = require("bcrypt");

const usersDB = {
    users: require("../models/users.json"),
    setUsers: function (data) {
        this.users = data;
    }
}

require("dotenv").config();

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
        const foundUser = usersDB.users.find(
            person => person.username === username
        )

        const roles = Object.values(foundUser.roles);
        console.log(roles, ' from Auth Controller')
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
                console.log(roles, ' from auth controller again')
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
                const currentUser = {
                    ...foundUser,
                    refreshToken
                };
                const otherUsers = usersDB.users.filter(
                    person => person.username !== username
                );

                usersDB.setUsers([...otherUsers, currentUser]);

                fs.writeFile(path.join(__dirname, '..', 'models', 'users.json'), JSON.stringify(usersDB.users),
                    (err) => {
                        console.log(err);
                    }
                )

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