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
const loginRouter = require("./showLoginForm");
const registerRouter = require("./showRegisterForm");
const forgotRouter = require("./forgotPassword");
const accountRouter = require("./accountSetting");

const router = express.Router();

router.use("/", dashboarhRouter);
router.use("/login", loginRouter);

router.use("/register", registerRouter);
router.use("/forgot-password", forgotRouter);
router.use("/accountSetting", accountRouter);

router.use("/posts", postsRouter);
router.use("/categories", categorieRouter);
router.use("/products", productRouter);
router.use("/topics", topicRouter);
router.use("/comments", commentRouter);
router.use("/users", userRouter);
router.use("/analytics", analyticRouter);
router.use("/setting", settingRouter);

module.exports = router;
