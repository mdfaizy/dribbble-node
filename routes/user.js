const express = require("express");
const router = express.Router();
const { login, signup, verifyUser } = require("../controllers/Auth");
// const { auth } = require("../middleware/auth.js");

// Route for user signup
router.post("/signup", signup);
// Route for user login
router.post("/login", login);

// Route for sending email

router.get("/user/:id/:token", verifyUser);

module.exports = router;
