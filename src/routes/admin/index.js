const express = require("express");
const dashboarhRouter = require("./dashboard");
const postsRouter = require("./posts");
const categorieRouter = require("./categories");
const productRouter = require("./products");
const topicRouter = require("./topics");
const commentRouter = require("./comments");
const userRouter = require("./users");
const analyticRouter = require("./analytics");
const settingRouter = require("./setting");
const forgotRouter = require("./forgotPassword");
const accountRouter = require("./accountSetting");
const authRouter = require("./auth");

const router = express.Router();

router.use("/", dashboarhRouter);

// router.use("/forgot-password", forgotRouter);
// router.use("/accountSetting", accountRouter);

// auth
router.use("/", authRouter);

router.use("/posts", postsRouter);
router.use("/categories", categorieRouter);
router.use("/products", productRouter);
router.use("/topics", topicRouter);
router.use("/comments", commentRouter);
router.use("/users", userRouter);
router.use("/analytics", analyticRouter);
router.use("/setting", settingRouter);

module.exports = router;
