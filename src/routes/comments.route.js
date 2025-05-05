const express = require("express");
const commentsController = require("../controllers/comment.controller");

const router = express.Router();

router.get("/", commentsController.index);
router.get("/:postId", commentsController.show);
router.post("/", commentsController.store);
router.put("/:id", commentsController.update);
router.delete("/:id", commentsController.destroy);

module.exports = router;
