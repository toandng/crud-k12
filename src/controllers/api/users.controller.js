const usersModel = require("@/models/user.model");
const { success } = require("@/utils/response");
exports.getUsers = async (req, res) => {
  const users = await usersModel.getUsers();

  success(res, 200, users);
};
