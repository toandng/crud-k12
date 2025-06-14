const usersService = require("@/services/users.service");
const { createToken, verifyToken } = require("@/utils/jwt");
const md5 = require("md5");
const bcrypt = require("bcrypt");
const queue = require("@/utils/queue");
// regiserForm

exports.showRegisterForm = async (req, res) => {
  const users = await usersService.getAll();

  res.render("admin/auth/register", { layout: "admin/layouts/auth" });
};

exports.register = async (req, res, next) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    const existingUser = await usersService.getByEmail(email);

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

    console.log(user);

    // tạo token
    if (user) {
      queue.dispatch("sendVerifyEmailJob", { userId: user.id });

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
exports.verifyEmail = async (req, res) => {
  const token = req.query.token;

  const verify = verifyToken(token);

  if (verify.success) {
    const userId = verify.data.userId;

    const user = await usersService.getById(userId);

    if (user?.verify_at) {
      res.setFlash({
        type: "info",
        message: "Liên kết xác minh đã hết hạn hoặc không hợp lệ",
      });
      return res.redirect("/admin/login");
    }
    await usersService.update(userId, {
      verify_at: new Date(),
    });
    res.render("admin/auth/resetPassword", {
      id: user.id,
    });
    return;
  }
  res.send("Verify Fail");
};
// show forgotPassword
exports.forgotPassword = async (req, res) => {
  res.render("admin/auth/forgot-password", { layout: "admin/layouts/auth" });
};

exports.password = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await usersService.getByEmail(email);

    if (!user) {
      res.setFlash("error", "Email không hợp lệ. Vui lòng nhập email khác.");
      return res.redirect("/admin/forgot-password");
    }
    console.log(user);

    await usersService.update(user.id, {
      verify_at: null,
    });

    queue.dispatch("sendVerifyEmailJob", { userId: user.id });

    res.setFlash(
      "success",
      `Chúng tôi đã gửi email xác thực tới ${user.email}. Hãy xác thực để tiếp tục.`
    );
    res.redirect("/admin/forgot-password");
  } catch (error) {
    console.error("Lỗi trong forgot password:", error);
    res.setFlash("error", "Đã xảy ra lỗi. Vui lòng thử lại.");
    res.redirect("/admin/forgot-password");
  }
};

// resetPassword
exports.showResetPassword = async (req, res) => {
  const id = req.params.id;
  res.render("admin/auth/resetPassword", { layout: "admin/layouts/auth" });
};

exports.resetPassword = async (req, res) => {
  const { newPassword, id } = req.body;
  try {
    const user = await usersService.getById(id);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await usersService.update(user.id, {
      password: hashedPassword,
    });
    console.log(user);

    res.setFlash("success", `Reset mật khẩu thành công`);
    res.redirect("/admin/login");
  } catch (error) {
    console.error("Reset mật khẩu thất bại:", error);
    res.setFlash("error", `Reset mật khẩu không thành công`);
    res.redirect(`/admin/reset-password/${id}`);
  }
};

// changePassword

exports.changePassword = async (req, res) => {
  // Lấy userId từ session
  const id = req.session.userId;
  const { password, newPassword, confirmPassword } = req.body;
  console.log(id);

  try {
    const user = await usersService.getById(id);
    console.log(user);

    if (!user) {
      res.setFlash("danger", "Người dùng không tồn tại.");
      return res.redirect("/admin/account-settings");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.setFlash("error", "Mật khẩu hiện tại không chính xác.");
      return res.redirect("/admin/account-settings");
    }

    if (newPassword !== confirmPassword) {
      res.setFlash("error", "Mật khẩu xác nhận không khớp.");
      return res.redirect("/admin/account-settings");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await usersService.update(user.id, { password: hashedNewPassword });

    res.setFlash("success", "Đổi mật khẩu thành công.");
  } catch (error) {
    console.error("Lỗi đổi mật khẩu:", error);
    res.setFlash("error", "Đổi mật khẩu không thành công.");
  }

  res.redirect("/admin/account-settings");
};

// logout
exports.logout = async (req, res) => {
  delete req.session.userId;
  res.redirect("/admin/login");
};

//
