const jwt = require("jsonwebtoken");
const { success } = require("./response");

const MAIL_JWT_SECRET =
  "72c98868b09e7d4366fb16da92f036e872f8932aed740811987a036dc7a092c01244e5ebec14e6bb587bb3217c464b32de661ca309d3e156150efd505eb7306c";

exports.createToken = function (payload, options) {
  const token = jwt.sign(payload, MAIL_JWT_SECRET, options);

  return token;
};

exports.verifyToken = function (token) {
  try {
    const decoded = jwt.verify(token, MAIL_JWT_SECRET);
    return { success: true, data: decoded };
  } catch (error) {
    return {
      success: false,
      message: message,
    };
  }
};
