const postsService = require("@/services/posts.service");
const throwError = require("@/utils/throwError");

exports.index = async (req, res) => {
  res.render("admin/auth/login", {
    layout: false,
    title: "Posts list",
  });
};
