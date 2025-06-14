const express = require("express");
const accountSettingController = require("@/controllers/admin/accountSetting.controller");
const router = express.Router();

router.get("/account-settings", accountSettingController.index);

module.exports = router;
