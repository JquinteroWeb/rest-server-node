const { response } = require("express");
const { uploadFiles } = require("../helpers");

const uploadFile = async(req, res = response) => {
    //Validate if the frontend sent a file
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).send({ message: 'No files were uploaded.' });
    }

    //Default images
    try {
        const fileName = await uploadFiles(req.files,undefined,'imgs');
        res.json({
            fileName
        });
    } catch (msg) {
        console.log(msg);
        res.status(400).json({
            msg
        });
    }
   
}

module.exports = {
    uploadFile
}