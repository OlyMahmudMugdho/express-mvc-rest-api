const fs = require('fs');
const path = require('path');
const usersDB = {
    users: require('../models/users.json'),
    setUsers: function (data) {
        this.users = data;
    }
}

const handleLogOut = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }
    const refreshToken = cookies.jwt;
    const foundUser = usersDB.users.find(
        person => person.refreshToken === refreshToken
    );
    if (!foundUser) {
        return res.clearCookie('jwt',
            {
                httpOnly: true,
                sameSite: 'None',
                secure: true
            }).sendStatus(204);
    }
    else {
        const otherUsers = usersDB.users.filter(
            person => person.refreshToken !== foundUser.refreshToken
        )
        const currentUser = {
            ...foundUser, refreshToken: ' '
        };
        usersDB.setUsers([...otherUsers, currentUser]);
        fs.writeFile(path.join(__dirname, '..', 'models', 'users.json'), JSON.stringify(usersDB.users),
            (error) => {
                console.log(error);
            }
        );
        return res.clearCookie('jwt',
        {
            httpOnly : true,
            sameSite : 'None', 
            secure : true
        }).sendStatus(204);
    }
}

module.exports = {
    handleLogOut
}