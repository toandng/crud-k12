const usersService = require("@/services/users.service");
const throwError = require("@/utils/throwError");

exports.index = async (req, res) => {
  const users = await usersService.getAll();
  // console.log(req.sessions.get("hihi"));

  res.render("admin/users/index", {
    title: "Posts list",
    users,
  });
};
exports.show = async (req, res) => {
  const user = await usersService.getById(req.params.id);

  res.render("admin/users/show", {
    user,
  });
};

exports.create = async (req, res) => {
  res.render("admin/users/create", { old: {}, errors: {} });
};

exports.edit = async (req, res) => {
  const user = await usersService.getById(req.params.id);

  res.render("admin/users/edit", {
    user,
    old: {},
    errors: {},
  });
};

exports.update = async (req, res) => {
  const { comfirm_password, ...body } = req.body;
  await usersService.update(req.params.id, body);
  res.redirect(`/admin/users/${req.params.id}/edit`);
};

exports.store = async (req, res) => {
  const { comfirm_password, ...body } = req.body;

  const user = await usersService.create(body);

  res.redirect("/admin/users");
  // res.json(user);
};

exports.destroy = async (req, res) => {
  const { id } = req.params;
  await usersService.remove(id);

  res.redirect("/admin/users");
};
