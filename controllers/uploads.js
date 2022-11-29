const { response } = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (req, res = response) => {
    //Validate if the frontend sent a file
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).send({ message: 'No files were uploaded.' });
    }

    const { file } = req.files;

    //Get extension
    const nameCut = file.name.split('.');
    const extension = nameCut[nameCut.length - 1];

    //Validate with extension allowed
    const allExtAllowed = ['jpg', 'png', 'gif', 'jpeg'];
    if (!allExtAllowed.includes(extension)) {
        return res.status(400).json({ message: `Invalid file extension: ${extension}. Only allowed ${allExtAllowed}`});
    }

    //Rename file
    const nameTemp = uuidv4()+'.'+extension;
    const uploadPath = path.join(__dirname, '../uploads/', nameTemp);

    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, (err) => {
        if (err){
                console.log(err);
                return res.status(500).json({
                    message: 'Error uploading file'
                });
        }
        res.json({message: 'File uploaded to ' + uploadPath});
    });
}

module.exports = {
    uploadFile
}