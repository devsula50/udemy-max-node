const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const { title, imageUrl, price, description } = { ...req.body };
  const createdProduct = await Product.create({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  });
  res.redirect(`/products/${createdProduct.id}`);
};

exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;

  const savedProduct = await Product.findByPk(prodId);
  await savedProduct.destroy();

  res.redirect("/admin/products");
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect("/");

  const prodId = req.params.productId;
  const savedProduct = await Product.findByPk(prodId);

  if (!savedProduct) return res.redirect("/");

  res.render("admin/edit-product", {
    product: savedProduct,
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: editMode,
  });
};

exports.postEditProduct = async (req, res, next) => {
  const { productId, title, imageUrl, price, description } = { ...req.body };
  let savedProduct = await Product.findByPk(productId);

  await savedProduct.update({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  });
  res.redirect("/admin/products");
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.findAll();

  res.render("admin/products", {
    prods: products,
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
};
