const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFiles = (files, validExts = ['jpg', 'png', 'gif', 'jpeg'], folder = '') => {

    return new Promise((resolve, reject) => {

        const { file } = files;
        //Get extension
        const nameCut = file.name.split('.');
        const extension = nameCut[nameCut.length - 1];

        //Validate with extension allowed

        if (!validExts.includes(extension)) {
            return reject(`Invalid file extension: ${extension}. Only allowed ${validExts}`);
        }

        //Rename file
        const nameTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, nameTemp);

        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(`Error uploading file ${err}`);
            }
            resolve(nameTemp);
        });

    });

}

module.exports = {
    uploadFiles
}