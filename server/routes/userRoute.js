const express = require("express");
const router = express.Router();
const upload=require('../utils/multer')
const userController =require('../controllers/userController');
const { auth } = require("../middleware/auth");

router.post("/login", userController.userLogin);
router.post("/signup", userController.userSignup);
router.post("/view/:id", userController.view);

router.post("/change-profile-pic",auth, upload.single("file"),userController.changeProfilePic);
module.exports = router;
