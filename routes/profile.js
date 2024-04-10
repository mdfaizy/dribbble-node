



const express = require("express");
const router = express.Router();
const {profileUpload,get_profile,updateDisplayPicture} =require("../controllers/Profiles");

const { auth } = require("../middlewares/auth");

// Route for user signup
router.post("/profile",auth, profileUpload);

router.get("/profileId",get_profile);
router.put("/profileupload/:id",auth, updateDisplayPicture);

module.exports = router;



