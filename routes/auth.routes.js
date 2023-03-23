const {Router} = require('express');
const { check } = require('express-validator');

const {login, googleSignIn} = require('../controllers/auth.controllers');
const { fieldsValidator} = require('../middlewares/fields-validator');


const router = Router();

router.post("/login", [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    fieldsValidator
],login);

router.post("/google", [
    check('id_token', 'Google token is mandatory').not().isEmpty(),
    fieldsValidator
],googleSignIn);

module.exports = router;