const User = require("../model/user");

exports.get_verifyList = async (req, res) => {
  await User.find({ isValid: false })
    .exec()
    .then((users) => {
      const desire = users.map((user) => {
        return { name: user.name, email: user.email };
      });
      return res.render("../views/verify", { desire });
    });
};

exports.get_info = (req, res) => {
  return res.send({
    user: req.session.token,
  });
};

exports.allow_teachers = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { email: req.body.ele },
    { isValid: true },
    { returnOriginal: false }
  );
  console.log(user);
  res.send(user);
};
