const User = require("../model/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

exports.get_login = (req, res) => {
  res.render("../views/login");
};

exports.post_login = async (req, res) => {
  const { password, email, isValid } = req.body;
  await User.findOne({ email: email })
    .exec()
    .then((user) => {
      bcrypt
        .compare(user.password, password)
        .then(() => {
          req.session.token = user;
          if (user.isValid) {
            if (user.userType === "Student") {
              return res.send({
                name: user.name,
                message: "Hello 'Student' you have successfully logged in!",
              });
            } else if (user.userType === "Teacher") {
              return res.send({
                name: user.name,
                message: "Hello 'Teacher' you have successfully logged in!",
              });
            } else {
              return res.redirect("/show/verify");
            }
          } else {
            console.log("You're not authorised yet!");
            return res.redirect("/user/login");
          }
        })
        .catch(() => {
          console.log("Invalid credentials Mr.Nobody!");
          return res.render("../views/login");
        });
    })
    .catch(() => {
      console.log("Invalid credentials!");
      return res.render("../views/login");
    });
};

exports.get_signIn = (req, res) => {
  res.render("../views/signin");
};

exports.post_signIn = async (req, res) => {
  const { password, email, name, userType } = req.body;
  await User.find({ email: email })
    .exec()
    .then((result) => {
      if (result.length > 1) {
        return res.redirect("/user/signIn");
      } else {
        bcrypt.hash(password, 12, (err, hashedPassword) => {
          if (err) {
            console.log("Password cannot be created!");
            return res.redirect("/user/signIn");
          } else {
            const user = new User({
              email: email,
              name: name,
              password: hashedPassword,
              userType: userType,
              isValid: userType === "Student" ? true : false,
            });
            user.save().then(() => {
              // req.session.token = user;
              console.log({ message: `User ${name} saved successfully` });
              return res.send(`Hi ${name}!!`);
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/user/signIn");
    });
};
