const usersDB = require('../models/Users')

const handleLogOut = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }
    const refreshToken = cookies.jwt;
    const foundUser = await usersDB.findOne({ refreshToken : refreshToken }).exec();
    if (!foundUser) {
        return res.clearCookie('jwt',
            {
                httpOnly: true,
                sameSite: 'None',
                secure: true
            }).sendStatus(204);
    }
    else {
        
        foundUser.refreshToken = ' ';
        
        const result = await foundUser.save();
        
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