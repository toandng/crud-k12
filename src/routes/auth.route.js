const express = require("express");

const router = express.Router();

router.get("/me", (req, res) => {
    res.send("me");
});

router.post("/register", (req, res) => {
    res.send("register");
});

router.post("/login", (req, res) => {
    res.send("login");
});

router.post("/refresh-token", (req, res) => {
    res.send("refresh-token");
});

module.exports = router;

// Bài tập:
// - Tạo posts router:
// [GET] /posts
// [GET] /posts/:id
// [POST] /posts
// [PUT] /posts/:id
// [DELETE] /posts/:id
