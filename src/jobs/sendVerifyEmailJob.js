const { createToken } = require("@/utils/jwt");
const transporter = require("@/configs/mail");
const loadEmail = require("@/utils/loadEmail");
const usersService = require("@/services/users.service");

async function sendVerifyEmailJob(job) {
  const { userId } = JSON.parse(job.payload);
  const user = await usersService.getById(userId);

  const token = createToken(
    { userId: user.id },
    {
      expiresIn: 60 * 60 * 12,
    }
  );
  // Tạo link xác minh email

  const verifyUrl = `http://localhost:3001/admin/verify-email?token=${token}`;
  const data = { token, userId, verifyUrl };
  const template = await loadEmail("auth/verification", data);
  console.log(template);

  await transporter.sendMail({
    from: "meocute0508@gmail.com",
    to: user.email,
    html: template,
  });

  // res.setFlash({
  //   type: "succes",
  //   message: `Chúng tôi đã gửi một email xác thực tới  ${user.email}. Hãy kiểm tra inbox và xác minh tiếp tục`,
  // });
}
module.exports = sendVerifyEmailJob;
