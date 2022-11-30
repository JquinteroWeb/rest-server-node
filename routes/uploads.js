const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile, updateImage, showImage } = require('../controllers/uploads');
const { collectionAllowed } = require('../helpers');

const { validateFields, validateFileToUpload } = require('../middlewares');

const router = Router();

router.post('/', [validateFileToUpload, validateFields],
    uploadFile);

router.put('/:collection/:id', [
    check('id', 'Id have to be mongo id').isMongoId(),
    check('collection', 'Invalid collection').custom(c => collectionAllowed(c, ['users', 'products'])),
    validateFileToUpload,
    validateFields
], updateImage);

router.get('/:collection/:id', [
    check('id', 'Id have to be mongo id').isMongoId(),
    check('collection', 'Invalid collection').custom(c => collectionAllowed(c, ['users', 'products'])),
    validateFields
], showImage);

module.exports = router;
