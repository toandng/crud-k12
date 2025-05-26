const express = require("express");
const userController = require("@/controllers/admin/users.controller");
const userValidator = require("@/validators/admin/user.validator");
const router = express.Router();

router.get("/", userController.index);
router.post("/", userValidator.createUser, userController.store);

router.put("/:id", userValidator.updateUser, userController.update);
router.get("/create", userController.create);

router.get("/:id", userController.show);

router.get("/:id/edit", userController.edit);

router.delete("/:id", userController.destroy);

module.exports = router;
