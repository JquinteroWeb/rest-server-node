const jwt = require('jsonwebtoken');

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

module.exports = {
    generateJWT
}
