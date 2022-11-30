const { response } = require("express");
const { uploadFiles } = require("../helpers");
const { User, Product } = require("../models");
const path = require("path");
const fs = require("fs");

const uploadFile = async (req, res = response) => {

    //Default images
    try {
        const fileName = await uploadFiles(req.files, undefined, 'imgs');
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

const updateImage = async (req, res = response) => {
    const { collection, id } = req.params;
    let model;
    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    message: 'User id not found ' + id,
                });
            }
            break
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    message: 'Product id not found ' + id,
                });
            }
            break;
        default:
            return res.status(500).json({
                message: 'I forgot to validate this xd'
            });
    }

    //! delete files to update 
    try {
        if (model.image) {
            const pathImage = path.join(__dirname, '../uploads/', collection, model.image);
            if (fs.existsSync(pathImage)) {
                fs.unlinkSync(pathImage);
            }
        }
    } catch (error) {

    }

    const fileName = await uploadFiles(req.files, undefined, collection);
    model.image = fileName;

    await model.save();

    res.json({
        model
    })
}

module.exports = {
    uploadFile,
    updateImage
}