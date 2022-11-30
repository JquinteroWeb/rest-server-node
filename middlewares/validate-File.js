const { request, response } = require('express');

const validateFileToUpload = (req, res = response, next) => {
    //Validate if the frontend sent a file
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).send({ message: 'No files to upload.' });
    }
    next();
}

module.exports = {
    validateFileToUpload
}