const { response } = require('express')

const isAdmin = (req, res = response, next) => {

    if (!req.userAuth) {
        return res.status(500).json({
            error: "wanst to validate user user before login"
        });
    }
    const { role, name } = req.userAuth;

    if (role !== 'admin') {
        return res.status(400).json({
            error: `User: ${name} is not a admin`
        });
    }
    next();
}
const hasRole = (...roles) =>{
    return (req,res = response, next) => {
        if (!req.userAuth) {
            return res.status(500).json({
                error: "wanst to validate user user before login"
            });
        }
        const { role, name } = req.userAuth;
        if(!roles.includes(role)){           
                return res.status(400).json({
                    error: `User: ${name} is not a ${roles.toString()} role`
                });
            
        }
        next();
    }

}
module.exports = {
    isAdmin,
    hasRole
}