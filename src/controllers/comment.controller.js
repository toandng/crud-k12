const { success } = require("@/utils/response");
const { readDb, writeDb } = require("@/utils/file.utils");
const commentService = require("@/services/comments.service");
const throwError = require("@/utils/throwError");

const RESOURCE = "comments";

const index = async (req, res) => {
  const comments = await commentService.getAllComments();

  return success(res, 200, comments);
};

const show = async (req, res) => {
  const comment = await commentService.getCommentById(req.params.id);

  if (!comment) throwError(404);

  return success(res, 200, comment);
};

const store = async (req, res) => {
  // const { title, body } = req.body;
  // if (!title || !body) throwError(404);

  const newComment = await commentService.createComment(req.body);
  return success(res, 200, newComment);
};
const update = async (req, res) => {
  const id = parseInt(req.params.id);
  // const { content } = req.body;

  // if (!content) throwError(404, "thiếu trường");
  const updated = await commentService.updateComment(id, req.body);
  if (!updated) throwError(404);

  return success(res, 200, updated);
};

const destroy = async (req, res) => {
  const id = parseInt(req.params.id);
  const dele = await commentService.deleteComment(id);
  // if (filtered.length === comments.length) throwError(404);

  if (!dele) throwError(404, "not found");

  // await writeDb(RESOURCE, filtered);

  return success(res, 204);
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
