const { Router } = require('express');
const { check } = require('express-validator');
const { loguin } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/loguin', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
] ,loguin);

module.exports = router;
