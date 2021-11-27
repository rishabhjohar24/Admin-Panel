exports.isLoggedOut = (req, res, next) => {
  if (req.session.token !== undefined) {
    console.log("You're in session, please logout first!");
    return res.redirect("/show/info");
  }
  return next();
};

exports.isLoggedIn = (req, res, next) => {
  if (req.session.token === undefined) {
    console.log("Please logIn first!");
    return res.redirect("/user/login");
  }
  return next();
};
