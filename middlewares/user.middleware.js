const User = require("../models/user.model");

const fetchUserInCollection = async (req, res, next) => {
  try {
    const { author } = req.body;
    const user = await User.findOne({ username: author });
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found!", username: author });
    else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Could not find user" });
  }
};

module.exports = { fetchUserInCollection };
