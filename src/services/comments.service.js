const { index } = require("@/controllers/api/post.controller");
const { readDb, writeDb } = require("@/utils/file.utils");
const { body } = require("express-validator");
const RESOURCE = "comments";

const getAllComments = async () => {
  return await readDb(RESOURCE);
};

const getCommentById = async (id) => {
  const comments = await readDb(RESOURCE);

  const comment = comments.find((item) => item.id === +id);
  return comment;
};

const getCommentByPostId = async (postId) => {
  const comments = await readDb(RESOURCE);

  return comments.filter((comment) => +comment.postId === +postId);
};

const createComment = async ({ name, body }) => {
  const comments = await readDb(RESOURCE);
  console.log(comments);

  const newId = (comments.at(-1)?.id ?? 0) + 1;

  const newComment = { id: newId, name, body };
  comments.push(newComment);
  await writeDb(RESOURCE, comments);

  return newComment;
};

const createCommentByPostId = async (postId, data) => {
  const comments = await readDb(RESOURCE);
  const newId = (comments.at(-1)?.id ?? 0) + 1;

  const newComment = {
    id: newId,
    name: data.name,
    comment: data.comment,
    body: data.body,
    postId,
  };

  const newComments = [...comments, newComment];

  await writeDb(RESOURCE, newComments);

  return newComment;
};

const updateComment = async (id, content) => {
  const comments = await readDb(RESOURCE);

  const index = comments.findIndex((c) => c.id === +id);
  if (index === -1) return null;

  // Cập nhật nội dung mới vào comment cũ
  comments[index] = {
    ...comments[index],
    name: content.name ?? comments[index].name,
    comment: content.comment ?? comments[index].comment,
    postId: content.postId ?? comments[index].postId,
  };

  await writeDb(RESOURCE, comments);

  return comments[index];
};

const deleteComment = async (id) => {
  const comments = await readDb(RESOURCE);
  console.log(comments);

  const filtered = comments.filter((c) => c.id !== id);

  if (filtered.length === comments.length) return false;

  await writeDb(RESOURCE, filtered);
  return true;
};

module.exports = {
  getAllComments,
  getCommentById,
  getCommentByPostId,
  createComment,
  createCommentByPostId,
  updateComment,
  deleteComment,
};
