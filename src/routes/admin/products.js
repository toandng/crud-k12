const express = require("express");
const productController = require("@/controllers/admin/products.controller");
const router = express.Router();

router.get("/", productController.index);
router.get("/create", productController.create);
router.get("/:id", productController.show);
router.get("/:id/edit", productController.edit);

module.exports = router;
