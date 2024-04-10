const express = require("express");
const router = express.Router();
const { login, signup, verifyUser } = require("../controllers/Auth");
// const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");
// const { auth } = require("../middleware/auth.js");

// Route for user signup
router.post("/signup", signup);

// Route for user login
router.post("/login", login);

// Route for sending OTP
// router.get("/:id/verify/:token", verifyUser);

router.get("/users/:id", verifyUser);
module.exports = router;
