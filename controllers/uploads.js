const { response } = require("express");
const path = require("path");

const uploadFile = (req, res = response) => {
    //Validate if the frontend sent a file
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).send({ message: 'No files were uploaded.' });
    }

    const { file } = req.files;
    const uploadPath = path.join(__dirname, '../uploads/', file.name);

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