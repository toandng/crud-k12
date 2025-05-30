const postsService = require("@/services/posts.service");
const throwError = require("@/utils/throwError");

exports.index = async (req, res) => {
  res.render("admin/setting/index");
};
exports.show = async (req, res) => {
  res.render("admin/setting/show");
};
