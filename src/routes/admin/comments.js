const express = require("express");
const commentController = require("@/controllers/admin/comments.controller");
const router = express.Router();

router.get("/", commentController.index);
router.get("/:id", commentController.show);

module.exports = router;
