
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const credentilas = {
  name: "Arjun kvk",
  email: "admin@gmail.com",
  password: "Ab@12",
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE_KEY, {
    expiresIn: "30d",
  });
};
module.exports = {
  adminLogin: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (credentilas.email == email && credentilas.password == password) {
      res.json({
        name: credentilas.name,
        email: email,
        token: generateToken(email),
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  }),

  viewAdminDashBoard: asyncHandler(async (req, res) => {
    const usersData = await User.find({},'-password');
    if (usersData) {
      res.json(usersData);
    } else {
      res.status(400);
      throw new Error("Invalid admin");
    }
  }),

  editUser: asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    const usersData = await User.updateOne(
      { _id: req.params.id },
      { name: name, email: email }
    );
    if (usersData) {
      const users = await User.find({});
      res.json(users);
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  }),

  deleteUser: asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const usersData = await User.deleteOne({ _id: userId });
    if (usersData) {
      const users = await User.find({});
      res.json(users);
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  }),
};


