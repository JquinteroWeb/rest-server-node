const { Router } = require('express');
const { check } = require('express-validator');
const { loguin, googleSingIn } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/loguin', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], loguin);

router.post('/google', [
    check('id_token', 'Token is required').not().isEmpty(),
    validateFields
], googleSingIn);

module.exports = router;
