const { response, request } = require('express');
const { Category } = require('../models');

const categoriesGet = async (req = request, res = response) => {

    const { limit = 5, since = 0 } = req.query;
    const query = {
        status: true
    }

    const [countCategories, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .limit(Number(limit))
            .skip(Number(since))
            .populate('user', 'name')
    ])

    res.json({
        countCategories,
        categories
    })
}

const categoryGetId = async (req = request, res = response) => {

    const id = req.params.id;
    const category = await Category.findById(id).populate('user', 'name');
    res.json(category);
}

const categoryPost = async (req = request, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({
        name
    });

    if (categoryDB) {
        return res.status(400).json({
            message: `Category ${categoryDB.name} already exists`
        });
    }


    //Search for user in db and prepare de data fo category
    const data = {
        name,
        user: req.userAuth.id
    }

    const category = new Category(data);
    await category.save();

    res.status(201).json(category)
}



const categoryPut = async (req = request, res = response) => {
    try {
        //Validate category exists
        const { id } = req.params;
        const { status, user, ...data } = req.body;

        data.name = req.body.name.toUpperCase();
        data.user = req.userAuth.id;

        const category = await Category.findByIdAndUpdate(id, data, { new: true })

        res.json({
            category
        })

    } catch (error) {
        res.status(500).json({
            message: 'Error updating category'
        })
    }

}

const categoryDelete = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(id, { status: false }, {new : true});

        res.json(category);
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting category' + error.message
        })
    }

}

module.exports = {
    categoryDelete,
    categoriesGet,
    categoryPut,
    categoryPost,
    categoryGetId
}

