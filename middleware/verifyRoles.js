const rolesList = require('../configs/roles')

const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) {
            return res.sendStatus(420);
        };
        const roles = [...allowedRoles];
        console.log(req.roles);
        console.log(roles);
        const matched = req.roles.map(
            role => roles.includes(role)
        ).find(val => val === true );
        if (!matched) {
            return res.sendStatus(401);
        }
        else {
            next()
        }
    }
}

module.exports = verifyRoles;