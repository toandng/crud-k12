const postsService = require("@/services/posts.service");

exports.index = async (req, res) => {
  const { items } = await postsService.getAllPosts(1, 20);
  console.log(items);

  res.render("admin/dashboard/index", {
    title: "Posts list",
    posts: items,
  });
};
