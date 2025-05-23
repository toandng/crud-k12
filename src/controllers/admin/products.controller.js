const postsService = require("@/services/posts.service");
const throwError = require("@/utils/throwError");

exports.index = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const { items } = await postsService.getAllPosts(page, limit);
  console.log(items);
  res.render("admin/products/index", {
    title: "Posts list",
    posts: items,
  });
};
exports.show = async (req, res) => {
  const id = req.params.id;
  const post = await postsService.getPostById(id);

  if (!post) throwError(404);

  res.render("admin/products/show", {
    title: post.title,
    post,
  });
};
