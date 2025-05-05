const express = require("express");

const postsController = require("../controllers/post.controller");
const {
  createPostValidator,
  updatePosstValidator,
} = require("../validators/posts.validator");

// Write DB

const router = express.Router();

// 1. Xóa bỏ mảng "posts" (Fake DB)
// 2. Thay thế "posts" tại các method bằng readDb(RESOURCE)
// 3. Tại methods thêm/sửa/xóa dùng writeDb(RESOURCE)

router.get("/", postsController.index);

router.get("/:id", postsController.show);

router.post("/", createPostValidator, postsController.store);

router.put("/:id", updatePosstValidator, postsController.update);

router.delete("/:id", postsController.destroy);

module.exports = router;
