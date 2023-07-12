const express = require("express");
const cors = require("cors");
const app = express();
// const db = require("./config/connection");
const mongoose = require("mongoose");
const { errorHandler } = require("./middleware/errorHandler");
require("dotenv").config();
const userRouter = require('./routes/userRoute');
const adminRouter = require('./routes/adminRoute');
const { text } = require("./samp");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))


const PORT = 4000;

mongoose.connect(text);

app.use('/',userRouter);
app.use('/admin', adminRouter);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server connected to PORT:", PORT);
});
module.exports = app;


// const express = require("express");
// const cors = require("cors");
// const app = express();
// // const db = require("./config/connection");
// const mongoose = require("mongoose");
// const User = require("./models/user");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const { errorHandler } = require("./middleware/errorHandler");
// const fileUpload = require("express-fileupload");
// const upload = require("./utils/multer");
// const cloudinary = require("cloudinary").v2;
// const asyncHandler = require("express-async-handler");
// require("dotenv").config();


// const { auth } = require("./middleware/auth");

// app.use(cors());
// app.use(express.json());
// // app.use(fileUpload());

// const PORT = 4000;

// cloudinary.config({
//   cloud_name: "dnrqgtc2u",
//   api_key: "396279964871674",
//   api_secret: "BitvXrBlVem4W5MK8inu1iL4KEI",
// });

// mongoose.connect(process.env.MONGODB_URL);

// app.post(
//   "/api/signup",
//   asyncHandler(async (req, res) => {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//       res.status(400);
//       throw new Error("Please add all fields");
//     }

//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       console.log("userExist");

//       res.status(400);
//       throw new Error("User already exists");
//     }

//     const bcryptPassword = await bcrypt.hash(req.body.password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: bcryptPassword,
//     });

//     if (user) {
//       res.status(201).json({
//         _id: user.id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(400);
//       throw new Error("Invalid user data");
//     }
//   })
// );

// const generateToken = (id) => {
//   return jwt.sign({ id }, "secret1234", {
//     expiresIn: "30d",
//   });
// };

// app.post(
//   "/api/login",
//   asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user && (await bcrypt.compare(password, user.password))) {
//       res.json({
//         _id: user.id,
//         name: user.name,
//         email: user.email,
//         imgUrl: user?.imgUrl,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(400);
//       throw new Error("Invalid email or password");
//     }
//   })
// );

// app.get("/api/dashboard", auth, async (req, res) => {
//   console.log(req.user, "this is user");
//   console.log("working");

//   const token = req.headers["x-access-token"];
//   try {
//     const decode = jwt.verify(token, "secret123");

//     const email = decode.email;
//     const user = await User.findOne({
//       email: email,
//     });
//     const userData = {
//       name: user.name,
//       email: user.email,
//     };

//     return res.json({ status: "ok", user: userData });
//   } catch (error) {
//     res.json({ status: "error", error: "invalid token" });
//   }
// });

// app.post(
//   "/admin/login",
//   asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const credentilas = {
//       name: "Arjun kvk",
//       email: "admin@gmail.com",
//       password: "1234",
//     };

//     if (credentilas.email == email && credentilas.password == password) {
//       res.json({
//         name: credentilas.name,
//         email: email,
//         token: generateToken(email),
//       });
//     } else {
//       res.status(400);
//       throw new Error("Invalid email or password");
//     }
//   })
// );

// app.get("/admin", async (req, res) => {
//   const usersData = await User.find({});
//   if (usersData) {
//     res.json(usersData);
//   } else {
//     res.status(400);
//     throw new Error("Invalid admin");
//   }
// });

// app.post("/admin/user-edit/:id", async (req, res) => {
//   const { name, email } = req.body;
//   const usersData = await User.updateOne(
//     { _id: req.params.id },
//     { name: name, email: email }
//   );
//   if (usersData) {
//     const users = await User.find({});
//     res.json(users);
//   } else {
//     res.status(400);
//     throw new Error("User not found");
//   }
// });

// app.post("/admin/user-delete/:id", async (req, res) => {
//   const userId = req.params.id;
//   const usersData = await User.deleteOne({ _id: userId });
//   if (usersData) {
//     const users = await User.find({});
//     res.json(users);
//   } else {
//     res.status(400);
//     throw new Error("User not found");
//   }
// });

// app.post("/update-profile", auth, upload.single("file"), (req, res) => {

//   const file = req.file;
//   const userId = req.body.userId;
//   console.log(req.user,'user');

//   cloudinary.uploader.upload(file.path, async (error, result) => {
//     if (error) {
//       console.error("Error uploading file to Cloudinary:", error);
//       return res.status(500).json({ error: "Failed to upload file" });
//     }

//     const imgUrl = result.url;
//     const response = await User.updateOne(
//       { _id: userId },
//       { $set: { imgUrl: imgUrl } }
//     );
//     if (response) {
//       const user= await User.findOne({_id:userId})
//       res.json(user);
//     } else {
//       res.status(400);
//       throw new Error("User not found");
//     }
//   });
// });

// app.use(errorHandler);

// app.listen(PORT, () => {
//   console.log("Server connected to PORT:", PORT);
// });
