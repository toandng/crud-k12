const express = require("express");
const categoryController = require("@/controllers/api/categories.controller");

const categoryValidators = require("@/validators/categories.validator");

const router = express.Router();

router.get("/", categoryController.index);
router.get("/:id", categoryController.show);
router.post(
  "/",
  categoryValidators.createCategoryValidator,
  categoryController.store
);
router.put(
  "/:id",
  categoryValidators.updateCategoryValidator,
  categoryController.update
);
router.delete("/:id", categoryController.destroy);

module.exports = router;
