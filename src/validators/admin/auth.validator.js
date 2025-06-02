const { checkSchema } = require("express-validator");
const handleValidationErrors = require("@/validators/admin/handlerErrors");

exports.authLoginUser = [
  (req, res, next) => {
    res.view = "admin/users/create";
    next();
  },
  checkSchema({
    email: {
      notEmpty: {
        errorMessage: "Email is not empty",
      },
    },
    password: {
      errorMessage: "Password is not empty",
      notEmpty: true,
    },
  }),
  handleValidationErrors,
];

exports.authRegisterUser = [
  checkSchema({
    first_name: {
      errorMessage: "Name is not empty",
      notEmpty: true,
    },
    last_name: {
      errorMessage: "Name is not empty",
      notEmpty: true,
    },
    email: {
      notEmpty: {
        errorMessage: "Email is not empty",
      },
    },
    password: {
      errorMessage: "Password is not empty",
      notEmpty: true,
    },
  }),
  handleValidationErrors,
];
