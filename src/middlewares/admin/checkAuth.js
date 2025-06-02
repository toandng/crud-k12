function checkAuth(req, res, next) {
  const isAuthRequires = !["/register", "/login"].includes(req.path);

  if (!res.locals.auth && isAuthRequires) {
    return res.redirect("/admin/login");
  }

  if (res.locals.auth && !isAuthRequires) {
    return res.redirect("/admin");
  }

  next();
}

module.exports = checkAuth;
