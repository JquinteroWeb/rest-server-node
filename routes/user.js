const { Router } = require('express');
const { userGet, userPost, userDelete, userPut, userPatch } = require('../controllers/user')
const router = Router();

router.get('/', userGet);

router.post('/', userPost)

router.put('/', userPut)

router.delete('/', userDelete)

router.patch('/',userPatch)

module.exports = router;