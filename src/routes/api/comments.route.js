const express = require("express");
const commentsController = require("@/controllers/api/comment.controller");
const commentValidator = require("@/validators/comments.validator");
const router = express.Router();

router.get("/", commentsController.index);
router.get("/:id", commentsController.show);
router.post("/", commentValidator.createComment, commentsController.store);
router.put("/:id", commentValidator.updateComment, commentsController.update);
router.patch("/:id", commentValidator.updateComment, commentsController.update);

router.delete("/:id", commentsController.destroy);

module.exports = router;
