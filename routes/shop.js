const express = require('express');

const path = require('path');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    const products = adminData.products;
    res.render('shop', {prods: products, docTitle: 'Shop', path:'/', pageTitle:'Shop', hasProducts: products.length > 0});
});

module.exports = router;