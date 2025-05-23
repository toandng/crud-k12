const express = require("express");
const productController = require("@/controllers/admin/products.controller");
const router = express.Router();

router.get("/", productController.index);
router.get("/:id", productController.show);

module.exports = router;
