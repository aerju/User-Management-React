const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE_KEY, {
    expiresIn: "30d",
  });
};

module.exports = {
  userLogin: asyncHandler(async (req, res) => {

    const { email, password } = req.body;
  
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        imgUrl: user?.imgUrl,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  }),

  userSignup: asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("userExist");
      res.status(400);
      throw new Error("User already exists");
    }
    const bcryptPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name,
      email,
      password: bcryptPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }),

  view: asyncHandler(async(req,res)=>{
  console.log(req.body);
  console.log(req.params.id);
    res.json({
     msg: 'welcome'
    })

  }),

  changeProfilePic: asyncHandler(async (req, res) => {
    const file = req.file;
    const userId = req.body.userId;
    console.log(req.user, "user");

    cloudinary.uploader.upload(file.path, async (error, result) => {
      if (error) {
        console.error("Error uploading file to Cloudinary:", error);
        return res.status(500).json({ error: "Failed to upload file" });
      }

      const imgUrl = result.url;
      const response = await User.updateOne(
        { _id: userId },
        { $set: { imgUrl: imgUrl } }
      );
      if (response) {
        const user = await User.findOne({ _id: userId });
        res.json({
          _id: user.id,
          name: user.name,
          email: user.email,
          imgUrl:user?.imgUrl,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("User not found");
      }
    });
  }),
};
