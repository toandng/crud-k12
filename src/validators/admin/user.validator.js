const { checkSchema } = require("express-validator");
const handleValidationErrors = require("@/validators/admin/handlerErrors");

exports.createUser = [
  (req, res, next) => {
    res.view = "admin/users/create";
    next();
  },
  checkSchema({
    name: {
      errorMessage: "Name is not empty",
      notEmpty: true,
    },
    email: {
      notEmpty: {
        errorMessage: "Email is not empty",
      },

      isEmail: {
        errorMessage: "Must be an email ",
      },
    },
    phone: {
      errorMessage: "Phone is not empty",
      notEmpty: true,
    },
  }),
  handleValidationErrors,
];

exports.updateUser = [
  checkSchema({
    name: {
      errorMessage: "Name is not empty",
      notEmpty: true,
    },
    email: {
      notEmpty: {
        errorMessage: "Email is not empty",
      },

      isEmail: {
        errorMessage: "Must be an email ",
      },
    },
    phone: {
      errorMessage: "Phone is not empty",
      notEmpty: true,
    },
  }),
  handleValidationErrors,
];
