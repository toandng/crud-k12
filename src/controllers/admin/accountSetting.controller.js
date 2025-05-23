const postsService = require("@/services/posts.service");
const throwError = require("@/utils/throwError");

exports.index = async (req, res) => {
  res.render("admin/account/accountSetting", {
    title: "Posts list",
  });
};
