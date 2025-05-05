const express = require("express");
const authRouter = require("./auth.route");
const postsRouter = require("./posts.route");
const commentRouter = require("./comments.route");
const categoryRouter = require("./categories.route");
const productRouter = require("./products.route");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/posts", postsRouter);
router.use("/comments", commentRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);

module.exports = router;
