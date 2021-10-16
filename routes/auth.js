const express = require('express');

const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/logout', isAuth, authController.postLogout);

router.post('/signup', authController.postSignup);

module.exports = router;