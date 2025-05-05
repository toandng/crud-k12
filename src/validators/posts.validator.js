const { checkSchema } = require("express-validator");
const handlerValidationErrors = require("../validators/handlerErrors");
exports.createPostValidator = [
  checkSchema({
    title: {
      notEmpty: true,
      errorMessage: "Trường này không được để trống",
    },
    description: {
      notEmpty: true,
      errorMessage: "Trường này không được để trống",
    },
    content: {
      notEmpty: true,
      errorMessage: "Trường này không được để trống",
    },
  }),
];

exports.updatePosstValidator = [
  checkSchema({
    title: {
      optional: true,
      notEmpty: true,
      errorMessage: "Trường này không được để trống",
    },
    description: {
      optional: true,

      notEmpty: true,
      errorMessage: "Trường này không được để trống",
    },
    content: {
      optional: true,

      notEmpty: true,
      errorMessage: "Trường này không được để trống",
    },
  }),
];
