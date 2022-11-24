const { response, request } = require('express');
const { User } = require('../models');
//To encrypt the password
const  bcryptjs  = require('bcryptjs');


const userGet = async (req = request, res = response) => {

    const { limit = 5, since = 0 } = req.query;
    const query = { status: true }
    //Execute some promise at the same time is faster than one and then one
    const [totalUsers, users] = await Promise.all(
        [
            User.countDocuments(query),
            User.find(query)
                .limit(Number(limit))
                .skip(Number(since))
        ]
    );
    res.json({
        totalUsers,
        users
    });
}

const userPost = async (req, res = response) => {

    //data from body req
    const { name, email, password, phone, role } = req.body;

    const usuario = new User({
        name,
        email,
        password,
        phone,
        role
    });

    //Use bcryptjs to encrypt the password if you want to encrypt the password more secure way send a big number in params
    const salt = bcryptjs.genSaltSync();

    //here we encrypt the password
    usuario.password = bcryptjs.hashSync(password, salt);

    //save the user data in the database
    await usuario.save();
    //we must to clean the body data
    res.status(201).json({
        msg: 'post API - user post',
        usuario
    });
}

const userPut = async (req, res = response) => {
    //get params from url
    const id = req.params.id;
    const { _id, password, google, email, ...rest } = req.body;

    //Validate in database
    if (password) {
        salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, rest);

    res.json(user)
}

const userDelete = async (req, res = response) => {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, {
        status: false
    });

    res.status(200).json({
        msg: 'User with id ' + id + ' deleted',
        user
    });
}

const userPatch = (req, res = response) => {
    const id = req.params.id;
    res.json({
        message: 'patch API controller'
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}