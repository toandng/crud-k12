const { checkSchema } = require("express-validator");
const handlerValidationErrors = require("./handlerErrors");

exports.createProductValidator = [
  checkSchema({
    title: {
      notEmpty: true,
      errorMessage: "Trường này không được để trống",
    },
    description: {
      notEmpty: true,
      errorMessage: "Trường này không được để trống",
    },
    price: {
      notEmpty: true,
      errorMessage: "Trường này không được để trống",
    },
  }),
];

exports.updateProductValidator = [
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
    price: {
      optional: true,

      notEmpty: true,
      errorMessage: "Trường này không được để trống",
    },
  }),
];
