const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");

const User = require("../models/userModel");
const { sendtoken } = require("../utils/SendToken");
const ErrorHandler = require("../utils/errorHandler");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ message: "Homepage" });
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id);

  res.status(200).json({ user });
});

exports.usersignup = catchAsyncErrors(async (req, res, next) => {
  const user = await new User(req.body).save();
  sendtoken(user, 201, res);
});

exports.usersignin = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  if (!user) {
    return next(
      new ErrorHandler("User not found with this email address", 404)
    );
  }

  const isPasswordMatched = await user.comparePassword(req.body.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Wrong Credentials", 401));
  }

  sendtoken(user, 200, res);
});

exports.usersignout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token");

  res.status(200).json({
    message: "Logged out",
  });
});

exports.allusers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({ users });
});

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);
  res
    .status(200)
    .json({ success: true, message: "user updated successfully", user });
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: "user deleted successfully" });
});