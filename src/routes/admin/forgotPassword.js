const express = require("express");
const forgotPasswordController = require("@/controllers/admin/forgotPassword.controller");
const router = express.Router();

router.get("/", forgotPasswordController.index);

module.exports = router;
