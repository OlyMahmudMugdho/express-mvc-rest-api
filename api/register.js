const bcrypt = require("bcrypt");

const userDB = require('../models/users.json');


const search = (name) => {
    const res = userDB.find(
        person => person.name === name
    )
    console.log(res);
}

search("Mugdho");