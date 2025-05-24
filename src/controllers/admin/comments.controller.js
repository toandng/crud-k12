const commentService = require("@/services/comments.service");
const throwError = require("@/utils/throwError");

exports.index = async (req, res) => {
  res.render("admin/comments/index", {
    title: "Posts list",
  });
};
exports.show = async (req, res) => {
  const id = req.params.id;
  const post = await commentService.getCommentByPostId(id);

  if (!post) throwError(404);

  res.render("admin/comments/commentsDetail", {
    title: post.title,
    post,
  });
};

exports.edit = async (req, res) => {
  const id = req.params.id;
  const post = await commentService.getCommentByPostId(id);

  if (!post) throwError(404);

  res.render("admin/comments/editComment", {
    title: post.title,
    post,
  });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const post = await commentService.updateComment(id);

  if (!post) throwError(404);

  res.render("admin/comments/editComment", {
    title: post.title,
    post,
  });
};
