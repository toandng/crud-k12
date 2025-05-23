const express = require("express");
const showLoginForm = require("@/controllers/admin/showLoginForm.controller");
const router = express.Router();

router.get("/", showLoginForm.index);

module.exports = router;
