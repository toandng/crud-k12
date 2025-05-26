const postModel = require("@/models/post.model");

class PostsService {
  async getAll() {
    const posts = await postModel.findAllPosts();
    return posts;
  }

  async getById(id) {
    const post = await postModel.findById(id);
    return post;
  }
  async create(data) {
    const post = await postModel.create(data);
    return post;
  }
  async update(id, data) {
    const post = await postModel.update(id, data);
    return post;
  }

  async remove(id) {
    const post = await postModel.delete(id);
    return post;
  }
}
module.exports = new PostsService();
