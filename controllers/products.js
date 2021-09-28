const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product'
    })
}

exports.postAddProduct = (req, res, next) => {
    const request = req.body;
    const product = new Product(request.title, request.price, request.description);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll((products) => {
        res.render('shop', {
            prods: products, 
            docTitle: 'Shop', 
            path:'/', 
            pageTitle:'Shop', 
            hasProducts: products.length > 0});
    });
}

exports.deleteProduct = (req, res, next) => {
    const productTitle = req.body.title;
    Product.deleteProduct(productTitle);
    res.redirect('/');
};

