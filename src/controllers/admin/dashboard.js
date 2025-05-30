const postsService = require("@/services/posts.service");

exports.index = async (req, res) => {
  const response = await postsService.getAll(1, 20);

  const items = Array.isArray(response.items)
    ? response.items
    : response.items?.data || [];

  res.render("admin/dashboard/index", {
    title: "Posts list",
    posts: items,
  });
};
