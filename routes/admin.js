const express = require('express');
const path = require('path');

const productsController = require('../controllers/products');

const router = express.Router();



router.get('/add-product', productsController.getAddProduct);

router.post('/add-product', productsController.postAddProduct);

router.post('/delete-product', productsController.deleteProduct);

module.exports = router;