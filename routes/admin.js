const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product'
    })
});

router.post('/add-product', (req, res, next) => {
    products.push({book: req.body});
    console.log(products);
    res.redirect('/');
});

router.post('/delete-product', (req, res, next) => {
    const bookTitle = req.body.title;
    const bookIndex = products.findIndex(x => x.title === bookTitle);
    products.splice(bookIndex, 1);
    res.redirect('/');
});

exports.routes = router;
exports.products = products;