const usersService = require("@/services/users.service");
const throwError = require("@/utils/throwError");

const md5 = require("md5");
const bcrypt = require("bcrypt");
// regiserForm

exports.showRegisterForm = async (req, res) => {
  const users = await usersService.getAll();

  res.render("admin/auth/register", { layout: "admin/layouts/auth" });
};

exports.register = async (req, res, next) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    const existingUser = await usersService.getByEmailandPassword(email);
    if (existingUser) {
      res.setFlash({
        type: "danger",
        message: "message: Email đã tồn tại",
      });
      return res.redirect("/admin/register");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await usersService.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    if (user) {
      res.setFlash({
        type: "succes",
        message: "Đăng kí thành công",
      });
      return res.redirect("/admin/login");
    } else {
      res.setFlash({
        type: "danger",
        message: "Không thể đăng kí được tài khoản",
      });
      return res.redirect("/admin/register");
    }
  } catch (error) {
    console.error("Đăng ký thất bại:", error);
    res.setFlash({
      type: "danger",
      message: "Có lỗi xảy ra. Vui lòng thử lại.",
    });
    return res.redirect("/admin/register");
  }

  res.redirect("/admin/login");
};

// showLoginForm

exports.showLoginForm = async (req, res) => {
  const users = await usersService.getAll();

  res.render("admin/auth/login", { layout: "admin/layouts/auth" });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usersService.getByEmail(email);

    if (!user) {
      res.setFlash(
        { type: "danger", message: "Email không tồn tại." },
        { type: "danger", message: "Password không tồn tại." }
      );
      return res.redirect("/admin/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.setFlash({
        type: "danger",
        message: "Mật khẩu không chính xác.",
      });
      return res.redirect("/admin/login");
    }

    req.session.userId = user.id;
    res.redirect("/admin");
  } catch (error) {
    console.error("Đăng nhập thất bại:", error);
    res.setFlash({
      type: "danger",
      message: "Đã xảy ra lỗi. Vui lòng thử lại.",
    });
    res.redirect("/admin/login");
  }
};

exports.logout = async (req, res) => {
  delete req.session.userId;
  res.redirect("/admin/login");
};
