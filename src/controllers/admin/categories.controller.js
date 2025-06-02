const postsService = require("@/services/posts.service");
const throwError = require("@/utils/throwError");

exports.index = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const { items } = await postsService.getAll(page, limit);
  res.render("admin/categories/index", {
    title: "Posts list",
    posts: items,
  });
};
exports.show = async (req, res) => {
  const id = req.params.id;
  const post = await postsService.getById(id);

  if (!post) throwError(404);

  res.render("admin/categories/show", {
    title: post.title,
    post,
  });
};
