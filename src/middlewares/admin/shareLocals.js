const userService = require("@/services/users.service");

async function shareLocals(req, res, next) {
  const userId = req.session.userId;
  res.locals.auth = null;
  if (userId) {
    res.locals.auth = await userService.getById(+userId);
  }

  // flash message
  res.locals.flash = req.session.flash;
  delete req.session.flash;

  // delete req.session.flash;
  next();
}
module.exports = shareLocals;
