const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const getAllUser = async (req, res) => {
  const user = await User.find({ _id: { $ne: req.session.userId } })
    .lean()
    .select("-createdAt -updatedAt")
    .exec();
  res.status(StatusCodes.OK).json(user);
};

module.exports = { getAllUser };
