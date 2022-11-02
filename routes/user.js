const { Router } = require('express');
const { userGet, userPost, userDelete, userPut, userPatch } = require('../controllers/user')
const router = Router();

router.get('/', userGet);

router.post('/', userPost)

router.put('/:id', userPut)

router.delete('/:id', userDelete)

router.patch('/:id',userPatch)

module.exports = router;