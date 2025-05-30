const express = require("express");
const authController = require("@/controllers/admin/auth.controller");
const router = express.Router();

// register
router.get("/register", authController.showRegisterForm);
router.post("/register", authController.register);

router.get("/login", authController.showLoginForm);
router.post("/login", authController.login);
module.exports = router;
