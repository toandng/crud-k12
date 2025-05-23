// src/routes/posts.route.js

const express = require("express");
const postsController = require("@/controllers/api/post.controller");
const postValidators = require("@/validators/posts.validator");
const router = express.Router();

router.get("/", postsController.index);
router.get("/:id/comments", postsController.getCommentsByPostId);
router.get("/:page", postsController.getList);

router.get("/:id", postsController.show);
router.post("/", postValidators.createPost, postsController.store);
router.post("/:id/comments", postsController.createCommentByPostId);
router.put("/:id", postValidators.updatePost, postsController.update);
router.patch("/:id", postValidators.updatePost, postsController.update);
router.delete("/:id", postsController.destroy);

module.exports = router;
