const express = require("express");
const postsController = require("@/controllers/admin/posts.controller");
const postValidator = require("@/validators/admin/posts.validator");
const router = express.Router();

router.get("/", postsController.index);
router.post("/", postValidator.createPost, postsController.index);

router.get("/create", postsController.create);
router.get("/:id", postsController.show);
router.get("/:id/edit", postsController.edit);

module.exports = router;
