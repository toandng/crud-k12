const express = require("express");
const authController = require("@/controllers/admin/auth.controller");
const authValidator = require("@/validators/admin/auth.validator");
const router = express.Router();

// register
router.get("/register", authController.showRegisterForm);
router.post("/register", authController.register);

// login
router.get("/login", authController.showLoginForm);
router.post("/login", authController.login);

// forgot_password
router.get("/forgot-password", authController.forgotPassword);
router.post("/forgot-password", authController.password);

// resetPassword
router.get("/reset-password/:id", authController.showResetPassword);
router.post("/reset-password/:id", authController.resetPassword);

// verify-email
router.get("/verify-email", authController.verifyEmail);

// changePassword
router.post("/change-password", authController.changePassword);

// logout
router.delete("/logout", authController.logout);

module.exports = router;
