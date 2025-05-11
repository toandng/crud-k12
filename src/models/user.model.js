const db = require("@/configs/db");

exports.getUsers = async () => {
  const [users] = await db.query("select * from users");
  return users;
};

exports.getUser = async (id) => {
  const [users] = await db.query(`select * from users where id = ${id}`);
  return users;
};
