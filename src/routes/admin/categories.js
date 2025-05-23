const express = require("express");
const categoriesController = require("@/controllers/admin/categories.controller");
const router = express.Router();

router.get("/", categoriesController.index);
router.get("/:id", categoriesController.show);

module.exports = router;
