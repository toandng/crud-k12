const postsService = require("@/services/posts.service");
const throwError = require("@/utils/throwError");

exports.index = async (req, res) => {
  res.render("admin/topics/index", {
    title: "Posts list",
  });
};
exports.show = async (req, res) => {
  res.render("admin/topics/show");
};
