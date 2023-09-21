exports.sendtoken = (student, statusCode, res) => {
  const token = student.getjwtoken();

  const option = {
    exipres: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, option)
    .json({ success: true, id: student._id, token });
};
