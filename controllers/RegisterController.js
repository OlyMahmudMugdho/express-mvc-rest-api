const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');

const usersDB = require('../models/Users');

const handleRegister = async (req, res) => {
    const { username, password } = await req.body;

if (!username || !password) {
    return res.status(400).json(
        {
            "message": "fields are empty"
        }
    );
}

const duplicate = await usersDB.findOne({ username: username }).exec()

if (duplicate) {
    return res.status(400).json({
        "message": "in confliction"
    });
}
else {
    try {
        let newUser = await usersDB.create({
            username: username,
            password: await bcrypt.hash(password, 10)
        });

        /* let newUser = await new usersDB({
            username: username,
            password: await bcrypt.hash(password, 10),
        });

        const result = await newUser.save();
        console.log(result); */

        console.log(await newUser);


        return res.status(201).json(
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