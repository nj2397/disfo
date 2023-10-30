const router = require('express').Router();
const {
    postSignup,
    postLogin
} = require("../controllers/auth.controller.js")

const { validateSchema } = require("../middlewares/validate.middleware");
const { loginValidationSchema } = require("../validations/auth.validator.js");

const validateLogin = validateSchema( loginValidationSchema );

router.post('/signup', postSignup);
router.post('/login', validateLogin, postLogin)

module.exports = router;