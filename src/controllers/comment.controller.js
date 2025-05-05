const { readDb, writeDb } = require("../utils/file.utils");
const RESOURCE = "comments";

const index = async (req, res) => {
  const comments = await readDb(RESOURCE);
  res.json({
    status: "success",
    data: comments,
  });
};

const show = async (req, res) => {
  const comments = await readDb(RESOURCE);
  const postId = parseInt(req.params.postId);
  const postComments = comments.filter((c) => c.post_id === postId);

  if (postComments.length === 0) {
    return res.status(404).json({
      status: "error",
      message: "No comments found for this post.",
    });
  }

  res.json({
    status: "success",
    data: postComments,
  });
};

const store = async (req, res) => {
  const comments = await readDb(RESOURCE);
  const { post_id, content } = req.body;

  if (!post_id || !content) {
    return res.status(400).json({
      status: "error",
      message: "post_id and content are required.",
    });
  }

  const newComment = {
    id: comments.length > 0 ? comments[comments.length - 1].id + 1 : 1,
    post_id,
    content,
  };

  comments.push(newComment);
  await writeDb(RESOURCE, comments);

  res.status(201).json({
    status: "success",
    data: newComment,
  });
};

const update = async (req, res) => {
  const comments = await readDb(RESOURCE);
  const id = parseInt(req.params.id);
  const { content } = req.body;

  const index = comments.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "Comment not found.",
    });
  }

  if (!content) {
    return res.status(400).json({
      status: "error",
      message: "Content is required.",
    });
  }

  comments[index].content = content;
  await writeDb(RESOURCE, comments);

  res.json({
    status: "success",
    data: comments[index],
  });
};

const destroy = async (req, res) => {
  const comments = await readDb(RESOURCE);
  const id = parseInt(req.params.id);
  const filtered = comments.filter((c) => c.id !== id);

  if (filtered.length === comments.length) {
    return res.status(404).json({
      status: "error",
      message: "Comment not found.",
    });
  }

  await writeDb(RESOURCE, filtered);

  res.json({
    status: "success",
    message: `Comment ${id} deleted.`,
  });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
