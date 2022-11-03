const { Role } = require('../models/role');
const { User } = require('../models/user');

const isValidRole = async(role = '') => {
    const roleExist = await Role.findOne({
        role
    });
    if(!roleExist){
        throw new Error('Error: role ' + role + ' does not exist');
    }
}

const existEmail = async(email = '') => {
    
    //verify if email exist in database.
    const emailExists = await User.findOne({
        email
    })

    if (emailExists) {
        throw new Error('Error: email ' + email + ' already exists in database');
    }
}
const existUserById = async(id = '') => {
    const existUser = await User.findById(id);
    if(!existUser ){
        throw new Error('Error: user with id ' + id + ' does not exist');
    }
}
module.exports = {
    isValidRole,
    existEmail,
    existUserById
}
