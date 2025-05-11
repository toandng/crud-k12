const { readDb, writeDb } = require("@/utils/file.utils");
const RESOURCE = " posts";

const getAllPosts = async () => {
  const posts = await readDb(RESOURCE);
  return posts;
};

const getPostById = async (id) => {
  const posts = await readDb(RESOURCE);
  return posts.find((post) => post.id === +id);
};

const createPost = async (data) => {
  const posts = await readDb(RESOURCE);
  const nextId = (posts.at(-1)?.id ?? 0) + 1;
  const post = {
    ...data,
    id: nextId,
  };
  posts.push(post);

  await writeDb(RESOURCE, posts);

  return posts;
};

const updatePost = async (id, data) => {
  const posts = await readDb(RESOURCE);
  const index = posts.findIndex((post) => post.id === +id);
  if (index === -1) return;

  posts[index] = { ...posts[index], ...data };

  await writeDb(RESOURCE, posts);
  return posts[index];
};

const deletePost = async (id) => {
  const posts = await readDb(RESOURCE);
  const postIndex = posts.findIndex((post) => post.id === +id);
  if (postIndex === -1) return false;
  posts.splice(postIndex, 1);
  await writeDb(RESOURCE, posts);
  return true;
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
