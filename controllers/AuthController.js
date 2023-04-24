const fs = require('fs');
const bcrypt = require('bcrypt');

const usersDB = {
    users: require('../models/users.json'),
    setUsers: function (data) {
        this.users = data;
    }
}

const handleAuth = async (req, res) => {
    const { username, password } = await req.body;
    if (!username || !password) {
        return res.status(401).json(
            {
                "message": "empty fields"
            }
        )
    }
    else {
        const foundUser = usersDB.users.find(
            person => person.username === username
        )
        if (foundUser) {
            const match = await bcrypt.compare(password, foundUser.password);
            if (match) {
                return res.status(200).json(
                    {
                        "message": `${username} logged in successfully`
                    }
                )
            }
            else {
                return res.status(401).json(
                    {
                        "message": "password didn't matched"
                    }
                )
            }
        }
        else {
            return res.status(400).json(
                {
                    "message": "user not found"
                }
            )
        }

    }
}

module.exports = {
    handleAuth
}