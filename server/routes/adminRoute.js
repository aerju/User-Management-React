const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { auth } = require("../middleware/auth");

router.post("/login", adminController.adminLogin);
router.get("/dashboard",adminController.viewAdminDashBoard);
router.post("/edit-user/:id", adminController.editUser);
router.post("/delete-user/:id", adminController.deleteUser);

module.exports = router;
