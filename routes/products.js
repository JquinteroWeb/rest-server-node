const { Router } = require('express');
const { check } = require('express-validator');
const { isAdmin, validateFields, validateJWT } = require('../middlewares');

const {
    productDelete,
    productGetId,
    productPost,
    productPut,
    productsGet } = require('../controllers/products');
const { existProductById, existCategoryById } = require('../helpers/db-validates');

router = Router();


router.get('/', productsGet);


router.get('/:id', [
    check('id', 'Id is required').not().isEmpty(),
    check('id', 'Invalid mongo id').isMongoId(),
    check('id').custom(existProductById),
    validateFields
], productGetId);


router.post('/',[
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),   
    check('category','Invalid mongo Id').isMongoId(),
    check('category').custom(existCategoryById),
    validateFields 
] ,productPost);


router.put('/:id', [
    validateJWT,
    check('id', 'Invalid id').isMongoId(),
    check('id','Does not exist product').custom(existProductById),
    validateFields 
],productPut);


router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'Invalid id').isMongoId(),
    check('id', 'Id is required').not().isEmpty(),
    check('').custom(existProductById),
    validateFields
], productDelete);


module.exports = router;
