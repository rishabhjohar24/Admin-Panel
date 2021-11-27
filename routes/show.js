const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../model/user");

const isAdmin = async (req, res, next) => {
  if (req.session.token === undefined) {
    res.redirect("/user/login");
  } else {
    const user = await User.findOne({ email: req.session.token.email });
    console.log(user.userType);
    return user.userType === "Admin" ? next() : res.redirect("/show/info");
  }
};

router.get("/verify", isAdmin, async (req, res) => {
  await User.find({ isValid: false })
    .exec()
    .then((users) => {
      const desire = users.map((user) => {
        return { name: user.name, email: user.email };
      });
      return res.render("../views/verify", { desire });
    });
});

router.post("/verification", async (req, res) => {
  const user = await User.findOneAndUpdate(
    { email: req.body.ele },
    { isValid: true },
    { returnOriginal: false }
  );
  console.log(user);
  res.send(user);
});

router.get("/info", (req, res) => {
  return res.send({
    user: req.session.token,
  });
});

module.exports = router;
