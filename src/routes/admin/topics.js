const express = require("express");
const topicsController = require("@/controllers/admin/topics.controller");
const router = express.Router();

router.get("/", topicsController.index);
router.get("/:id", topicsController.show);

module.exports = router;
