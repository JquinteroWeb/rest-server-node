const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const {isValidRole, existEmail , existUserById} = require('../helpers/db-validates');

const {
    userGet, userPost,
    userDelete, userPut,
    userPatch } = require('../controllers/user');

const router = Router();

router.get('/', userGet);

router.post('/', [
    check('email', 'invalid email').isEmail(),
    check('email', 'invalid email').custom(existEmail),
    check('name', 'name required').not().isEmpty(),
    check('password', 'password must be more than 6 letters').isLength({ min: 6, max: 300 }),
    check('phone', 'invalid phone').isNumeric(),
    //check('role', 'invalid role').isIn(['user', 'admin']),
    check('role').custom(isValidRole),
    validateFields
], userPost);

router.put('/:id', [
    check('id','Invalid id').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isValidRole),
    check('phone', 'invalid phone').isNumeric(),
    validateFields
],userPut);

router.delete('/:id',[
    check('id','Invalid id').isMongoId(),
    check('id').custom(existUserById),
    validateFields
], userDelete);

router.patch('/:id', userPatch);

module.exports = router;