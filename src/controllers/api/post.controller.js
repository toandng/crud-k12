const postService = require("@/services/posts.service");
const commentsSrvice = require("@/services/comments.service");
const postModel = require("@/models/post.model");
const { success } = require("@/utils/response");
const throwError = require("@/utils/throwError");

const index = async (req, res) => {
  const posts = await postModel.findAllPosts();
  return success(res, 200, posts);
};

const getList = async (req, res) => {
  const page = req.query.page ?? 1;
  const posts = await postService.getAllPosts(page);
  return success(res, 200, posts);
};

const getCommentsByPostId = async (req, res) => {
  const comments = await commentsSrvice.getAllComments();

  const commentsByPost = comments.filter(
    (comment) => +comment.postId === +req.params.id
  );

  return success(res, 200, commentsByPost);
};

const show = async (req, res) => {
  const post = await postService.getPostById(req.params.id);
  if (!post) throwError(404);
  return success(res, 200, post);
};

const store = async (req, res) => {
  const post = await postService.createPost(req.body);

  return success(res, 201, post);
};

const createCommentByPostId = async (req, res) => {
  const newComment = await commentsSrvice.createCommentByPostId(
    req.params.id,
    req.body
  );

  return success(res, 201, newComment);
};

const update = async (req, res) => {
  const post = await postService.updatePost(req.params.id, req.body);
  if (!post) throwError(404);
  return success(res, 200, post);
};

const destroy = async (req, res) => {
  const success = await postService.deletePost(req.params.id);
  if (!success) throwError(404);
  res.status(204).send();
};

module.exports = {
  index,
  getList,
  getCommentsByPostId,
  show,
  store,
  createCommentByPostId,
  update,
  destroy,
};
