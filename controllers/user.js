const { response,request } = require('express')

const userGet = (req = request, res = response) => {
    //get de query params
    //Se recomienda usar dessestructuracion para agregar parametros por defecto o estraer solo los que quiero.
    const query = req.query;
    res.json({
        message: 'get API controller',
        params:params
    })
}

const userPost = (req, res = response) => {
    //data from body req
    const { name, lastName, age, phone } = req.body;
    //we must to clean the body data
    res.json({ name, lastName, age, phone })
}

const userPut = (req, res = response) => {
    //get params from url
    const id = req.params.id;
    res.json({
        "id": id
    })
}

const userDelete = (req, res = response) => {
    const id = req.params.id;
    res.json({
        message: 'delete API controller'
    })
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