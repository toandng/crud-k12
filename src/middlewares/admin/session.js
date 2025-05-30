const { randomUUID } = require("node:crypto");
const modelSession = require("@/models/session.model");

async function Session(req, res, next) {
  let id = req.cookies.id;
  let session = id && (await modelSession.findBySid(req.cookies.id));

  if (
    !session ||
    (session.expires_at && new Date(session.expires_at) < new Date())
  ) {
    id = randomUUID();
    const date = new Date();
    date.setDate(date.getDate() + 7);
    session = await modelSession.create({
      id,
      expires_at: date.toISOString(),
      data: JSON.stringify({}),
    });
    const isProd = (process.env.NODE_ENV = "production");

    res.set(
      "Set-Cookie",
      `sid= ${id}; path = /, httpOnly, eprires= ${date.toISOString()}; ${
        isProd ? "Secure" : ""
      } Samesite = Lax`
    );
  }
  const sessionData = JSON.parse(session.data ?? null) ?? {};

  req.session = {
    get(key) {
      return sessionData[key] ?? null;
    },
    async set(key, value) {
      sessionData[key] = value;
      await modelSession.update(id, {
        data: JSON.stringify(sessionData),
      });
    },
  };

  next();
}

module.exports = Session;
