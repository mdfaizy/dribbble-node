const Profile = require('../models/profile');
const User = require("../models/User");
const { uploadImage } = require('../utils/uploadTofile'); 
exports.profileUpload = async (req, res) => {
    try {
      const { location,checkbox } = req.body;
      console.log("Location:",location);
      const { id } = req.user; 
      // let existingProfile = await Profile.findOne({ user: id });
      // if (existingProfile) {
      //   return res.status(400).json({ success: false, message: "Profile already submitted" });
      // }
      
      await uploadImage(req, res);
      const uploadResult = res.locals.uploadResult;
      const image = uploadResult.image;
      // Find the user by id
      let userdata = await User.findOne({ _id: id });
      console.log("User Data:", userdata);
      // Create a new profile
      const profile = await Profile.create({
        location,
        checkbox,
        image: image, 
        user: id,
      });
      res.status(201).json({ success: true, data: profile });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to create profile" });
    }
};




exports.get_profile = async (req, res) => {
  try {
    // fetch all newadmissions items from database
    const profile = await Profile.find({});

    // Response
    res.status(200).json({
      success: true,
      data: profile,
      message: "Entire New Addmission  Data is Fetched",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Server error",
    });
  }
};






// exports.updateDisplayPicture = async (req, res) => {
//   try {
//     // const profile = await Profile.findById(req.id);

//     let profile = await Profile.findOne({user:id });
//     console.log("profile", profile);
//     console.log(profile);
//     if (!profile) {
//       return res.status(404).json({
//         success: false,
//         message: "Profile not found",
//       });
//     }
//     // Check if the authenticated user is the creator of the Profile
//     if (profile.userId.toString() !== req.user.id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "You are not authorized to update this Profile",
//       });
//     }
//     // Check if a new image file is provided in the request
//     const newImageFile = req.files?.image;
//     if (newImageFile) {
//       // Call the deleteImage middleware with async/await
//       await uploadImage.deleteImage(profile.image);
//       // Call the uploadImage middleware with async/await
//       await uploadImage.uploadImage(req, res);
     
//       // Check if the upload was successful
//       const uploadResult = res.locals.uploadResult;
//       // Save the Cloudinary image URL to the updated Profile
//       req.body.image = uploadResult.imageUrl;
//     }

//     // Update the Profile with the new data
//     const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       updatedProfile,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: err.message,
//     });
//   }
// };






















