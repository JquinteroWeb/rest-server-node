const { Router } = require('express');
const { check } = require('express-validator');
const {isValidRole, existEmail , existUserById} = require('../helpers/db-validates');

const {
    validateFields,
    validateJWT,
    isAdmin,
    hasRole,
} = require('../middlewares');

const {
    userGet, userPost,
    userDelete, userPut,
    userPatch } = require('../controllers/users');



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
    validateJWT,
    //isAdmin,
    hasRole('ventas', 'admin','user'),    
    check('id','Invalid id').isMongoId(),
    check('id').custom(existUserById),
    validateFields,
], userDelete);

router.patch('/:id', userPatch);

module.exports = router;