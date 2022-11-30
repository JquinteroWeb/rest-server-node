
const {
    User,
    Role,
    Category,
    Product } = require('../models');

const isValidRole = async (role = '') => {
    const roleExist = await Role.findOne({
        role
    });
    if (!roleExist) {
        throw new Error('Error: role ' + role + ' does not exist');
    }
}
const collectionAllowed = async (collection = '',collectionAllowed = []) => {
    const included = collectionAllowed.includes(collection);
    if(!included){
        throw new Error('Error: collection ' + collection + ' is not allowed, ' + collectionAllowed);
    }
    return true;
}
const existEmail = async (email = '') => {

    //verify if email exist in database.
    const emailExists = await User.findOne({
        email
    })

    if (emailExists) {
        throw new Error('Error: email ' + email + ' already exists in database');
    }
}
const existUserById = async (id = '') => {
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error('Error: user with id ' + id + ' does not exist');
    }
}
const existCategoryById = async (id) => {
    const existCategory = await Category.findById(id)
    if (!existCategory) {
        throw new Error('Error: category does not exist');
    }
}

const existProductById = async (id) => {
    const existProduct = Product.findById(id);
    if (!existProduct) {
        throw new Error('Error: product does not exist');
    }
}
module.exports = {
    isValidRole,
    existEmail,
    existUserById,
    existCategoryById,
    existProductById,
    collectionAllowed
}
