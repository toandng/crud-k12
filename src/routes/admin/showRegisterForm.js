const express = require("express");
const registerLoginForm = require("@/controllers/admin/showRegisterForm.controller");
const router = express.Router();

router.get("/", registerLoginForm.index);

module.exports = router;
