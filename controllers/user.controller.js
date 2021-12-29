const Users = require("../models/user.model");

const registerNewUser = async (req, res) => {
  try {
    const { fullName, email, username } = req.body;
    const newUser = new Users({ email, username, fullName });
    const result = await newUser.save();
    res.json(result);
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(409)
        .json({
          message: "Failed to create new user",
          reason: "Already Exists in DB",
        });
    } else {
      res.status(500).json({ message: "Failed to create new user", error });
    }
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const userResult = await Users.findOne({ username });
    if (userResult) {
      res.json(userResult);
    } else {
      res.status(404).json({ message: "User not found!", username });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const userResult = await Users.find({});
    if (userResult) {
      res.json(userResult);
    } else {
      res.status(404).json({ message: "No Users found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details", error });
  }
};

module.exports = { registerNewUser, getUserByUsername, getAllUsers };
