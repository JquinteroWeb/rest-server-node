const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../models')

const collectionsAllows = [
    'users',
    'products',
    'categories',
    'roles'
]

const searchUsers = async (param = '', res = response) => {
    const isMongoId = ObjectId.isValid(param); // return true or false
    if (isMongoId) {
        const user = await User.findById(param);
        return res.json({
            results: (user) ? [
                user
            ] : []
        })
    }

    const regex = new RegExp(param, 'i');

    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
    });

    const countUsers = await User.countDocuments({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
    });

    return res.json({
        results: (users) ? [
            {
                'count': countUsers,
                users
            }
        ] : []
    })
}

const searchProducts = async (param = '', res = response) => {
    const isMongoId = ObjectId.isValid(param); // return true or false
    if (isMongoId) {
        const product = await Product.findById(param).populate('user','name').populate('category','name');
        return res.json({
            results: (product) ? [
                producst
            ] : []
        })
    }

    const regex = new RegExp(param, 'i');

    const products = await Product.find({
        $and: [{ name: regex }, { status: true }]
    }).populate('user','name').populate('category','name');

    const countProducts = await Product.countDocuments({
        $and: [{ name: regex }, { status: true }]
    });

    return res.json({
        results: (products) ? [
            {
                'count': countProducts,
                products
            }
        ] : []
    })
}

const searchCategories = async (param = '', res = response) => {
    const isMongoId = ObjectId.isValid(param); // return true or false
    if (isMongoId) {
        const category = await Category.findById(param);
        return res.json({
            results: (category) ? [
                category
            ] : []
        })
    }

    const regex = new RegExp(param, 'i');

    const categories = await Category.find({
        $and: [{ name: regex }, { status: true }]
    });

    const countCategories = await Category.countDocuments({
        $and: [{ name: regex }, { status: true }]
    });

    return res.json({
        results: (categories) ? [
            {
                'count': countCategories,
                categories
            }
        ] : []
    })
}

const search = (req, res = response) => {

    const { collection, param } = req.params;
    if (!collectionsAllows.includes(collection)) {
        return res.status(400).json({
            message: `Collections allowed for search are: ${collectionsAllows} `
        })
    }
    switch (collection) {
        case 'users':
            searchUsers(param, res);
            break;
        case 'products':
            searchProducts(param, res);
            break;
        case 'categories':
            searchCategories(param, res);
            break;
        case 'roles':
            res.json({
                message: `Coming soon`
            });
            break;
        default:
            res.status(500).json({
                message: ' I dont know how did you arrive here xd'
            })
    }

}

module.exports = {
    search
}