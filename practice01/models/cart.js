const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json",
);

module.exports = class Cart {
  static addProduct(id, price) {
    console.log("add product");
    //Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        console.log("read file");
        cart = JSON.parse(fileContent);
      }

      // Analyze the cart => Find existing product
      console.log("find product");
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id,
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        console.log("exist product");
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        console.log("not exist product");
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = cart.totalPrice + price;
      console.log("pricer");

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log("write file");
        console.error(err);
      });
    });
  }
};
