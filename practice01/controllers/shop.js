const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = async (req, res, next) => {
  const products = await Product.findAll();
  res.render("shop/product-list", {
    prods: products,
    pageTitle: "All Products",
    path: "/products",
  });
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  const product = await Product.findByPk(prodId);

  res.render("shop/product-detail", {
    product: product,
    pageTitle: product.title,
    path: "/products",
  });
};

exports.getIndex = async (req, res, next) => {
  const products = await Product.findAll();

  res.render("shop/index", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(async (cart) => {
    const products = await Product.findAll();
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
};

exports.postCart = async (req, res, next) => {
  const productId = req.body.productId;
  const product = await Product.findByPk(productId);

  Cart.addProduct(productId, Number(product.price));
  res.redirect("/cart");
};

exports.postDeleteCartItem = async (req, res, next) => {
  const productId = req.body.productId;
  const product = await Product.findByPk(productId);

  Cart.deleteProduct(productId, product.price);
  res.redirect("/cart");
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
