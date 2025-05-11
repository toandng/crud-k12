const { checkSchema } = require("express-validator");
const handleValidationErrors = require("@/validators/handlerErrors");

exports.createComment = [
  checkSchema({
    comment: {
      notEmpty: true,
      errorMessage: "trường này không được để trống",
    },
    name: {
      notEmpty: true,
      errorMessage: "trường này không được để trống",
    },
    // name: {
    //   notEmpty: true,
    //   errorMessage: "Name is required",
    // },
    // tit: {
    //   notEmpty: {
    //     errorMessage: "Email is required",
    //   },
    //   isEmail: {
    //     errorMessage: "Email is not valid",
    //   },
    // },
    // body: {
    //   notEmpty: true,
    //   errorMessage: "Body is required",
    // },
  }),
  handleValidationErrors,
];

exports.updateComment = [
  checkSchema({
    comment: {
      notEmpty: true,
      errorMessage: "trường này không được để trống",
    },
    name: {
      notEmpty: true,
      errorMessage: "trường này không được để trống",
    },
    // title: {
    //   optional: true,
    //   notEmpty: true,
    //   errorMessage: "Name cannot be empty",
    // },
    // email: {
    //   optional: true,
    //   notEmpty: {
    //     errorMessage: "Email cannot be empty",
    //   },
    //   isEmail: {
    //     errorMessage: "Email is not valid",
    //   },
    // },
    // body: {
    //   optional: true,
    //   notEmpty: true,
    //   errorMessage: "Body cannot be empty",
    // },
  }),
  handleValidationErrors,
];
