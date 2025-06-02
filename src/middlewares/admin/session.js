const { randomUUID } = require("node:crypto");
const modelSession = require("@/models/session.model");

async function Session(req, res, next) {
  let sid = req.cookies.sid;
  let session;

  try {
    session = sid && (await modelSession.findBySid(sid));

    // Nếu không có session hoặc session hết hạn
    if (
      !session ||
      (session.expires_at && new Date(session.expires_at) < new Date())
    ) {
      sid = randomUUID();
      const date = new Date();
      date.setDate(date.getDate() + 7);

      session = await modelSession.create({
        id: sid,
        expires_at: date.toISOString(),
        data: JSON.stringify({}),
      });

      const isProd = process.env.NODE_ENV === "production";

      res.setHeader(
        "Set-Cookie",
        `sid=${sid}; Path=/; HttpOnly; Expires=${date.toUTCString()}; ${
          isProd ? "Secure;" : ""
        } SameSite=Lax`
      );
    }
  } catch (err) {
    console.error("Lỗi khi xử lý session:", err);
    return next(err);
  }

  req.session = session?.data ? JSON.parse(session.data) : {};

  res.setFlash = (data) => {
    if (typeof req.session !== "object") req.session = {};
    req.session.flash = data;
  };

  res.on("finish", () => {
    modelSession.update(sid, {
      data: JSON.stringify(req.session),
    });
  });

  next();
}

module.exports = Session;
