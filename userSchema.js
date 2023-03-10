const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  cnpassword: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
});

// hashing the password to make it secure

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cnpassword = await bcrypt.hash(this.cnpassword, 12);
  }
  next();
});

const User = mongoose.model("USER", userSchema);

module.exports = User;
