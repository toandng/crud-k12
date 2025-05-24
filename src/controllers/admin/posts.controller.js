const postsService = require("@/services/posts.service");
const throwError = require("@/utils/throwError");

exports.index = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const { items } = await postsService.getAllPosts(page, limit);
  console.log(items);
  res.render("admin/posts/index", {
    title: "Posts list",
    posts: items,
  });
};
exports.show = async (req, res) => {
  res.render("admin/posts/show");
};

exports.edit = async (req, res) => {
  res.render("admin/posts/editPosts");
};

exports.create = async (req, res) => {
  res.render("admin/posts/createPost");
};
