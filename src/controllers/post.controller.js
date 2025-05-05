const { readDb, writeDb } = require("../utils/file.utils");
const DB_PATH = "./db.json";
const RESOURCE = "posts";
const index = async (req, res) => {
  const posts = await readDb(RESOURCE);
  res.json({
    status: "success",
    data: posts,
  });
};

const show = async (req, res) => {
  const posts = await readDb(RESOURCE);
  const post = posts.find((post) => post.id === +req.params.id);

  if (!post) {
    res.status(404).json({
      status: "error",
      message: "Resource notfound.",
    });
    return;
  }

  res.json({
    status: "success",
    data: post,
  });
};

const store = async (req, res) => {
  const posts = await readDb(RESOURCE);
  const nextId = (posts.at(-1)?.id ?? 0) + 1;
  const post = {
    ...req.body,
    id: nextId,
  };

  posts.push(post);

  await writeDb(RESOURCE, posts);

  res.status(201).json({
    status: "success",
    data: post,
  });
};

const update = async (req, res) => {
  const posts = await readDb(RESOURCE);
  const post = posts.find((post) => post.id === +req.params.id);

  if (!post) {
    res.status(404).json({
      status: "error",
      message: "Resource notfound.",
    });
    return;
  }

  Object.assign(post, req.body);

  await writeDb(RESOURCE, posts);

  res.json({
    status: "success",
    data: post,
  });
};

const destroy = async (req, res) => {
  const posts = await readDb(RESOURCE);
  const postIndex = posts.findIndex((post) => post.id === +req.params.id);

  if (postIndex === -1) {
    res.status(404).json({
      status: "error",
      message: "Resource notfound.",
    });
    return;
  }

  posts.splice(postIndex, 1);

  await writeDb(RESOURCE, posts);

  res.status(204).send();
};

module.exports = {
  index,
  show,
  update,
  store,
  destroy,
};
