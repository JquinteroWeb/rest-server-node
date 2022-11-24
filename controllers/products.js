const { request, response } = require('express');
const { Product } = require('../models');

const productsGet = async (req = request, res = response) => {
    try {
        const { limit = 5, since = 0 } = req.query;
        const query = {
            status: true
        }

        const [countProducts, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .limit(Number(limit))
                .skip(Number(since))
                .populate('user', 'name')
                .populate('category', 'name'),

        ])

        res.json({
            countProducts,
            products
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error getting products' + error.message
        })
    }
};

const productGetId = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id)
            .populate('user', 'name')
            .populate('category', 'name');
        res.json(product);

    } catch (error) {
        res.status(500).json({
            message: 'Error getting product by id' + error.message
        })
    }
};

const productPost = async (req = request, res = response) => {

    const { status, user, ...body } = req.body;

    const productDB = await Product.findOne({
        name: body.name
    });

    if (productDB) {
        return res.status(400).json({
            message: `Product ${productDB.name} already exists`
        });
    }


    //Search for user in db and prepare de data fo category
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.userAuth.id
    }

    const product = new Product(data);
    await product.save();

    res.status(201).json(product)
};

const productPut = async (req = request, res = response) => {
    try {
        //Validate category exists
        const { id } = req.params;
        const { status, user, ...body } = req.body;

        if (body.name) {
            body.name = body.name.toUpperCase();
        }
        body.user = req.userAuth.id;

        const product = await Product.findByIdAndUpdate(id, body, { new: true })

        res.json({
            product
        })

    } catch (error) {
        res.status(500).json({
            message: 'Error updating category'
        })
    }
};

const productDelete = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

        res.json(product);
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting product' + error.message
        })
    }
};

module.exports = {
    productDelete,
    productGetId,
    productPost,
    productPut,
    productsGet
}