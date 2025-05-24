const express = require("express");
const userController = require("@/controllers/admin/users.controller");
const router = express.Router();

router.get("/", userController.index);
router.get("/create", userController.create);

router.get("/:id", userController.show);

module.exports = router;
