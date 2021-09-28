const fs = require('fs');
const path = require('path');

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
    constructor(title, price, description){
        this.title = title;
        this.price = price;
        this.description = description;
    }

    save(){
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(productsPath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(callBack) {
        getProductsFromFile(callBack);
    }

    static deleteProduct(title){
        getProductsFromFile(products => {
            const index = products.findIndex(x => x.title === title);
            products.splice(index, 1);
            fs.writeFile(productsPath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }
}
