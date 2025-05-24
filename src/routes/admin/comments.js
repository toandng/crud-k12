const express = require("express");
const commentController = require("@/controllers/admin/comments.controller");
const router = express.Router();

router.get("/", commentController.index);
router.get("/:id", commentController.show);
router.get("/:id/edit", commentController.edit);
// router.put("/", commentController.update);

module.exports = router;
