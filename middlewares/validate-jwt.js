const jwt = require('jsonwebtoken');
const { response, request } = require('express');
const { User } = require('../models/user');
const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    try {
        const { uidUser } = jwt.verify(token, process.env.JWT_SECRET);
        const userAuth = await User.findById(uidUser);
        if (!userAuth) {
            return res.status(401).json({
                message: 'User not found'
            });
        }
        if (!userAuth.status) {
            return res.status(401).json({
                message: 'User not active'
            });
        } 
        req.userAuth = userAuth;     

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: 'Unauthorized'
        })
    }

}
module.exports = {
    validateJWT
}
