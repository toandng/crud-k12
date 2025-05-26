const { checkSchema } = require("express-validator");
const handleValidationErrors = require("@/validators/admin/handlerErrors");

exports.createPost = [
  (req, res, next) => {
    res.view = "admin/posts/createPost";
    next();
  },
  checkSchema({
    title: {
      errorMessage: "Title  is not empty",
      notEmpty: true,
    },
    content: {
      errorMessage: "Content  is not empty",
      notEmpty: true,
    },
  }),
  handleValidationErrors,
];

// exports.updatePost = [
//   checkSchema({
//     title: {
//       optional: true,
//       notEmpty: true,
//       errorMessage: "Trường này không được để trống",
//     },
//   }),
//   handleValidationErrors,
// ];
