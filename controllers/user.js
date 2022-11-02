const { response } = require('express')

const userGet = (req, res = response) => {
    res.json({
        message: 'get API controller'
    })
}

const userPost = (req, res = response) => {
    res.json({
        message: 'post API controller'
    })
}

const userPut = (req, res = response) => {
    res.json({
        message: 'put API controller'
    })
}

const userDelete = (req, res = response) => {
    res.json({
        message: 'delete API controller'
    })
}

const userPatch = (req, res = response) => {
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