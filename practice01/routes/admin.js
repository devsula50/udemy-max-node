const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);
router.get("/edit-product", adminController.getAddProduct);

// /admin/products => GET
router.get("/products", adminController.getProducts);
router.post("/delete-product", adminController.postDeleteProduct);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);
router.post("/edit-product", adminController.postEditProduct);

module.exports = router;
