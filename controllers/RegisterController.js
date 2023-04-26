const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');

const usersDB = {
    users: require('../models/users.json'),
    setUsers: function (data) {
        this.users = data
    }
}

const handleRegister = async (req, res) => {
    const { username, password } = await req.body;
    if (!username || !password) {
        return res.status(400).json(
            {
                "message": "fields are empty"
            }
        );
    }

    const duplicate = usersDB.users.find(
        person => person.username === username
    )

    if (duplicate) {
        return res.status(400).json({
            "message": "in confliction"
        });
    }
    else {
        try {
            let newUser = {
                username: username,
                password: await bcrypt.hash(password, 10)
            };
            usersDB.setUsers([...usersDB.users, newUser]);
            fs.writeFile(path.join(__dirname, "..", "models", "users.json"), JSON.stringify(usersDB.users),
                (err) => {
                    console.log(err);
                }
            );
            return res.json(
                {
                    "message": "successfully added to database"
                }
            )
        }
        catch (err) {
            return res.status(500).json(
                {
                    "message": "server error"
                }
            )
        }
    }
}

module.exports = {
    handleRegister
}