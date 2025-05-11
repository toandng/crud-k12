// src/routes/posts.route.js

const express = require("express");
const usersController = require("../controllers/users.controller");
// const postValidators = require("../validators/posts.validator");

const router = express.Router();

router.get("/", usersController.getUsers);

module.exports = router;
