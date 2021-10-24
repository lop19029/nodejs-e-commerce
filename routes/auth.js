const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.get('/reset', authController.getReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/login',
[
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .normalizeEmail(),
    body("password", "Password must be at least 8 characters long, at least one uppercase, at least one lower case, at least one digit, and one special character")
        .trim()
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "i")
]
,authController.postLogin);

router.post('/logout', isAuth, authController.postLogout);

router.post(
    '/signup', 
    [
        check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, {req}) => {
        // if (value === 'test@test.com') {
        //     throw new Error('This email address is forbbiden');
        // }
        // return true;
            return User.findOne({email: value}) //check repeated users
            .then(userDoc => {
                if(userDoc) {
                   return Promise.reject(
                       'A user with that e-mail already exists.'
                   );
                }
            });
        })
        .normalizeEmail(),
        body("password", "Password must be at least 8 characters long, at least one uppercase, at least one lower case, at least one digit, and one special character")
        .trim()
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "i"),
        body('confirmPassword').trim().custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error ('Passwords have to match');
            }
            return true;
        })
    ], 
    authController.postSignup);

router.post('/reset', authController.postReset);

router.post('/new-password', authController.postNewPassword);


module.exports = router;