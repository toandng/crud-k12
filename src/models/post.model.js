const db = require("@/configs/db");

exports.findAllPosts = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const [rows] = await db.query("SELECT * FROM posts LIMIT ? OFFSET ?", [
    limit,
    offset,
  ]);

  return rows;
};

exports.findById = async (id) => {
  const [post] = await db.query(`select * from posts where id = ?`, [id]);
  return post.length ? post[0] : null;
};

exports.count = async () => {
  const [total] = await db.query("select count(*) as total from posts");
  return total[0].total;
};
