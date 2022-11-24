const { Router } = require('express');
const { check } = require('express-validator');
const { categoryDelete, categoriesGet, categoryPost, categoryPut, categoryGetId } = require('../controllers/categories');

const { existCategoryById } = require('../helpers/db-validates');

const {
    validateFields,
    validateJWT,
    isAdmin,
    hasRole,
} = require('../middlewares');

const router = Router();


router.get('/', categoriesGet)

router.get('/:id', [
    check('id', 'Invalid mongo id').isMongoId().not().isEmpty(),
    check ('id','No exist category').custom(existCategoryById),
    validateFields
], categoryGetId)

//Only people authenticated can use this route
router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], categoryPost)


//Only people authenticated can use this route
router.put('/:id', [
    validateJWT,
    check('id', 'invalid id').isMongoId().not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check ('id','No exist category').custom(existCategoryById),   
    validateFields
], categoryPut)

//Only people with admin rights can use this route
router.delete('/:id',[
    validateJWT,
    isAdmin,
    check('id', 'invalid id').isMongoId().not().isEmpty(),
    check('id', 'invalid id').custom(existCategoryById),   
    validateFields
], categoryDelete)


module.exports = router;
