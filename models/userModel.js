const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is required"],
      maxLength: [15, "First Name should not exceed more than 15 characters"],
    },
    lastname: {
      type: String,
      required: [true, "Last Name is required"],
      maxLength: [15, "Last Name should not exceed more than 15 characters"],
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
      maxLength: [10, "Contact should not exceed more than 10 characters"],
      minLength: [10, "Contact should have atleast 10 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      unique: true,
    },

    password: {
      type: String,
      select: false,
      required: [true, "Password is required"],
      maxLength: [15, "Password should not exceed more than 15 characters"],
      minLength: [6, "Password should have atleast 6 characters"],
    },
  },
  { timestamps: true }
);

userModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }

  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

userModel.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userModel.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userModel.methods.getjwtoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const User = mongoose.model("User", userModel);

module.exports = User;
