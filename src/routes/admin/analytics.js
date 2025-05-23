const express = require("express");
const analyticsController = require("@/controllers/admin/analytics.controller");
const router = express.Router();

router.get("/", analyticsController.index);
router.get("/:id", analyticsController.show);

module.exports = router;
