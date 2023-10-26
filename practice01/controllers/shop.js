const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([products, _]) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.error(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([[product, _], __]) => {
      console.log(product);
      // res.render("shop/product-detail", {
      //   product: product,
      //   pageTitle: product.title,
      //   path: "/products",
      // });
      res.send(`<h1>${product.title}</h1>
    <hr>
    <div>
        <img src="${product.imageUrl}" alt="${product.title}">
    </div>
    <h2>${product.price}</h2>
    <p>${product.description}</p>`);
    })
    .catch((err) => console.error(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([products, _]) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.error(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      products.forEach((product) => {
        const cartProduct = cart.products.find((cp) => cp.id === product.id);
        if (cartProduct)
          cartProducts.push({ productData: product, qty: cartProduct.qty });
      });
      res.render("shop/cart", {
        products: cartProducts,
        path: "/cart",
        pageTitle: "Your Cart",
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, Number(product.price));
    res.redirect("/cart");
  });
};

exports.postDeleteCartItem = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
