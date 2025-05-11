const response = require("@/utils/response");

function notFoudHandler(req, res) {
  response.error(res, 404, "Resource not found.");
}

module.exports = notFoudHandler;
