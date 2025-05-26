const db = require("@/configs/db");
const { buildInsertQuery, buildUpdateQuery } = require("@/utils/queryBuilder");

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

exports.create = async (data) => {
  const { colums, placeholders, values } = buildInsertQuery(data);
  const query = `INSERT INTO posts (${colums}) VALUES (${placeholders})`;

  const [{ insertId }] = await db.query(query, values);
  return {
    id: insertId,
    ...data,
  };
};

exports.update = async (data) => {
  const { setClause, values } = buildUpdateQuery(data);
  values.push(id);
  const query = `UPDATE posts SET ${setClause} WHERE id = ?`;

  await db.query(query, values);

  return {
    id,
    ...data,
  };
};

exports.delete = async (id) => {
  const [{ affectedRows }] = await db.query(`delete from posts where id =?`, [
    id,
  ]);

  return affectedRows > 0;
};
