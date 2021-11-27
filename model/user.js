const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { required: true, type: String },
  email: {
    required: true,
    unique: true,
    message: "Email should be unique!",
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  isValid: Boolean,
  userType: String,
});

module.exports = mongoose.model("User", userSchema);
