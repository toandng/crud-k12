const { readDb, writeDb } = require("@/utils/file.utils");
const postModel = require("@/models/post.model");

// const RESOURCE = " posts";

const getAllPosts = async (page = 1, limit) => {
  const currentPage = Math.max(1, parseInt(page) || 1);
  const count = await postModel.count();

  const rows = await postModel.findAllPosts(page);
  const lastPage = Math.ceil(count / 10);

  console.log(count);

  const result = {
    items: rows,
    pagigation: {
      current_page: currentPage,
      per_page: limit,
      total: count,
      last_page: lastPage,
    },
  };

  return result;
};

const getPostById = async (id) => {
  const post = await postModel.findById(id);
  return post;
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
