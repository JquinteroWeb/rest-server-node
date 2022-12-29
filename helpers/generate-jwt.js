const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateJWT = (uidUser = '') => {

    return new Promise((resolve, reject) => {
        const payload = {
            uidUser
        };
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject(err);
            } else {
                resolve(token);
            }
        });

    });

}

const checkJWT = async(token) => {
    try {
        if (token.legth < 10) {
            return null;
        }
        const {  uidUser } = jwt.verify(token, process.env.JWT_SECRET);       
        const user = await User.findById(uidUser);

        if(user){
            if(!user.status){
                return null;
            }
            return user
        }else{
            return null;
        }

    } catch (error) {
        return null;
    }
}

module.exports = {
    generateJWT,
    checkJWT
}
