const dbValidates = require('./db-validates');
const generateJwt = require('./generate-jwt');
const googleVerify = require('./google-verify');
const uploadFiles = require('./upload-file');


module.exports = {
    ...dbValidates,
    ...generateJwt,
    ...googleVerify,
    ...uploadFiles
}
