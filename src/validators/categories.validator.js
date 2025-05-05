const { checkSchema } = require("express-validator");
const handlerValidationErrors = require("./handlerErrors");

exports.createCategoryValidator = [
  checkSchema({
    name: {
      notEmpty: true,
      errorMessage: "Trường này không được để trống",
    },
    description: {
      notEmpty: true,
      errorMessage: "Trường này không được để trống",
    },
  }),
];

exports.updateCategoryValidator = [
  checkSchema({
    name: {
      optional: true,
      notEmpty: true,
      errorMessage: "Trường này không được để trống",
    },
    description: {
      optional: true,

      notEmpty: true,
      errorMessage: "Trường này không được để trống",
    },
  }),
];
