const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        editing: false
    })
};

exports.deleteProduct = (req, res, next) => {
    const productId = req.body.id;
    Product.deleteProduct(productId);
    res.redirect('products');
};

exports.postAddProduct = (req, res, next) => {
    const request = req.body;
    const product = new Product(null, request.title, request.price, request.description, request.imageUrl);
    product.save();
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Add Product', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        })

    })
    
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const request = req.body;
    const updatedProduct = new Product(prodId, request.title, request.price, request.description, request.imageUrl);
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products, 
            docTitle: 'Admin Products', 
            path:'/admin/products', 
            pageTitle:'/admin/products', 
            hasProducts: products.length > 0
        });
    });
};