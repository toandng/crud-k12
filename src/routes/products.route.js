const express = require("express");
const productController = require("../controllers/products.controller");

const {
  createProductValidator,
  updateProductValidator,
} = require("../validators/products.validator");

const router = express.Router();

router.get("/", productController.index);
router.get("/:id", productController.show);
router.post("/", createProductValidator, productController.store);
router.put("/:id", updateProductValidator, productController.update);
router.delete("/:id", productController.destroy);

module.exports = router;
