function checkAuth(req, res, next) {
  const isAuthRequires = ![
    "/register",
    "/login",
    "/verify-email",
    "/forgot-password",
    "/reset-password",
  ].includes(req.path);

  // if (!res.locals.auth && isAuthRequires) {
  //   return res.redirect("/admin/login");
  // }

  // if (res.locals.auth && !isAuthRequires) {
  //   if (res.locals.auth && res.locals.auth.verify_at && isAuthRequires) {
  //     res.setFlash({
  //       type: "error",
  //       message: "Vui lòng xác minh email trước",
  //     });
  //   }
  //   return res.redirect("/admin/login");
  // }
  // if (res.locals.auth && !isAuthRequires && res.locals.auth.verify_at) {
  //   return res.redirect("/admin");
  // }

  next();
}

module.exports = checkAuth;
