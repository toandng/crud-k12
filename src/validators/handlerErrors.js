const { validationResult } = require("express-validator");

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  res.json({
    errors: errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    })),
  });
}

module.exports = handleValidationErrors;
