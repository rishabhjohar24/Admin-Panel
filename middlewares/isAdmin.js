const User = require("../model/user");

exports.isAdmin = async (req, res, next) => {
  if (req.session.token === undefined) {
    return res.redirect("/user/login");
  }
  const user = await User.findOne({ email: req.session.token.email });
  console.log(user.userType);
  return user.userType === "Admin" ? next() : res.redirect("/show/info");
};
