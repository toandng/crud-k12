const usersService = require("@/services/users.service");
const md5 = require("md5");

// regiserForm

exports.showRegisterForm = async (req, res) => {
  const users = await usersService.getAll();

  res.render("admin/auth/register", { layout: "admin/layouts/auth" });
};

exports.register = async (req, res) => {
  await usersService.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: md5(req.body.password),
  });
  console.log(req.body);

  res.redirect("/admin/login");
};

// showLoginForm

exports.showLoginForm = async (req, res) => {
  const users = await usersService.getAll();

  res.render("admin/auth/login", { layout: "admin/layouts/auth" });
};

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = md5(req.body.password);

  const user = await usersService.getByEmailandPassword(email, password);
  console.log(req.body);
  if (user) {
    await req.session.set("userId", user.id);
    return res.redirect("/admin");
  }
};
