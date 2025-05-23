const express = require("express");
const settingController = require("@/controllers/admin/setting.controller");
const router = express.Router();

router.get("/", settingController.index);
router.get("/:id", settingController.show);

module.exports = router;
