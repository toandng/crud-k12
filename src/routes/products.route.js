const express = require("express");
const productController = require("../controllers/products.controller");

const productValidator = require("../validators/products.validator");

const router = express.Router();

router.get("/", productController.index);
router.get("/:id", productController.show);
router.post("/", productValidator.store, productController.store);
router.put("/:id", productValidator.update, productController.update);
router.delete("/:id", productController.destroy);

module.exports = router;
