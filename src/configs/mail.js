const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_AUTH_USER,
    pass: process.env.MAIL_AUTH_PASS,
  },
  subject: "Plbants Feedback",
});

module.exports = transporter;
