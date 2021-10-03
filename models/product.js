const fs = require('fs');
const path = require('path');

const Cart = require('./cart')

const productsPath = path.join(
    path.dirname(require.main.filename), 
    'data', 
    'products.json'
);

const getProductsFromFile = callBack => {
    fs.readFile(productsPath, (err, fileContent) => {
        if(err){
            callBack([]);
        } else {
            callBack(JSON.parse(fileContent));
        }
    })
}

module.exports = class Product {
    constructor(id, title, price, description, imageUrl){
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save(){
        getProductsFromFile(products => {
            if(this.id){
                const existingProductIndex = products.findIndex(
                    prod => prod.id === this.id
                    );
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(productsPath, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(productsPath, JSON.stringify(products), err => {
                    console.log(err);
                });
            }
        });
    }

    static fetchAll(callBack) {
        getProductsFromFile(callBack);
    }

    static deleteProduct(id){
        getProductsFromFile(products => {
            const product =  products.find(prod => prod.id === id);
            const index = products.findIndex(x => x.id === id);
            products.splice(index, 1);
            fs.writeFile(productsPath, JSON.stringify(products), err => {
                if(!err){
                    Cart.deleteProduct(id, product.price);
                }
                console.log(err);
            });
        });
    }

    static findById(id, callBack) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            callBack(product);
        });
    }
}
