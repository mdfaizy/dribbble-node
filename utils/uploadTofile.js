// const cloudinary = require("cloudinary").v2;

// exports.uploadImage = async (req, res) => {
//   try {
//     const file = req.files?.image;
//     console.log(req);


//     // Check if a file is provided in the request
//     if (!file) {
//       return res.status(400).json({
//         success: false,
//         message: "No file provided",
//       });
//     }

//     // Upload the file to Cloudinary in the 'post' folder
//     const result = await cloudinary.uploader.upload(file.tempFilePath, {
//       folder: "post",
//     });

//     // Save the Cloudinary image URL and other details to res.locals
//     res.locals.uploadResult = {
//       success: true,
//       image: result.secure_url,
//     };
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Internal server error",
//       message: error.message,
//     });
//   }
// };













const cloudinary = require("cloudinary").v2;

exports.uploadImage = async (req, res) => {
  try {
    const file = req.files?.image;

    // Check if a file is provided in the request
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file provided",
      });
    }

    // Upload the file to Cloudinary in the 'post' folder
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "post",
    });

    // Save the Cloudinary image URL and other details to res.locals
    res.locals.uploadResult = {
      success: true,
      image: result.secure_url,
    };

    // next(); // Move to the next middleware or route handler
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};
