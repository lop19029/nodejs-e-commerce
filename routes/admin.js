const express = require('express');
const path = require('path');

const adminController = require('../controllers/admin');

const router = express.Router();


//GET
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);

//POST
router.post('/add-product', adminController.postAddProduct);

router.post('/edit-product',adminController.postEditProduct);

router.post('/delete-product', adminController.deleteProduct);

module.exports = router;