const nodemailer = require("nodemailer");
const postsService = require("@/services/posts.service");

const throwError = require("@/utils/throwError");

exports.index = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const { items } = await postsService.getAll(page, limit);
  res.render("admin/posts/index", {
    title: "Posts list",
    posts: items,
  });
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.envMAIL_AUTH_PASS,
    },
  });

  const message = {
    from: process.env.MAIL_SENDER_FROM,
    to: "nguyenductoan2k4@gmail.com",
    subject: "Verify ",
    text: "Mã xác thực",
    html: "<p><style=' color: red'></style=>Mã xác thực của bạn là</p> <img src='https://toigingiuvedep.vn/wp-content/uploads/2021/06/hinh-anh-hoat-hinh-de-thuong-cute-dang-yeu.jpg'/> ",
  };
  const info = await transporter.sendMail(message);
  console.log(info);
};
exports.show = async (req, res) => {
  res.render("admin/posts/show");
};

exports.edit = async (req, res) => {
  res.render("admin/posts/editPosts");
};

exports.create = async (req, res) => {
  res.render("admin/posts/createPost", { old: {}, errors: {} });
};

exports.store = async (req, res) => {
  const { ...body } = req.body;

  await postsService.create(body);
  res.redirect("/admin/posts");
};
