const User = require("../models/User");
const Token = require("../models/VerifyUser");
const mailSender = require("../utils/sendEmail");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const Profile = require("../models/profile.js");
const emailverification=require("../emailtemplate/emailVerification");
dotenv.config();
// exports.signup = async (req, res) => {
//     try {
//       const { name, username, email, password } = req.body;
  
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         if (existingUser.verified) {
//           return res.status(400).json({
//             success: false,
//             message: "User already exists. Please sign in to continue.",
//           });
//         } else {
//           // Resend verification email
//           const token = await Token.findOne({ userId: existingUser._id });
//           if (token) {
//             const url = `${process.env.BASE_URL_FRONT}/users/${existingUser._id}`;
//             const emailMessage = `Please click the following link to verify your email address: ${url}`;

//             await mailSender(existingUser.email, "Verify Email", emailMessage);
//             return res.status(200).json({
//               success: true,
//               message: "Verification email has been resent. Please check your inbox.",
//             });
//           }
//         }
//       }
  
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Create the Additional Profile For User
//     const profile = await Profile.create({
//       gender: null,
//       dateOfBirth: null,
//       about: null,
//       contactNumber: null,
//     });
//       const user = new User({
//         name,
//         email,
//         username,
//         password: hashedPassword,
//         profile: profile._id,
//         image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
//       });
  
//       const newUser = await user.save();
//       const token = new Token({
//         userId: newUser._id,
//         token: crypto.randomBytes(32).toString("hex"),
//       });
//       await token.save();
  
//       const url = `${process.env.BASE_URL_FRONT}/users/${newUser._id}`;
//       await mailSender(newUser.email, "Verify Email", url);
  
//       res.status(201).send({ message: "An Email sent to your account please verify" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
//   };





// signupController.js
// const User = require("../models/User");
// const Token = require("../models/VerifyUser");
// const mailSender = require("../utils/sendEmail");
// const crypto = require("crypto");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const dotenv = require("dotenv");
// const Profile = require("../models/profile.js");
// const emailverification = require("../emailtemplate/emailVerification");
// dotenv.config();





// exports.signup = async (req, res) => {
//     try {
//         const { name, username, email, password } = req.body;

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             if (existingUser.verified) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "User already exists. Please sign in to continue.",
//                 });
//             } else {
//                 const token = await Token.findOne({ userId: existingUser._id });
//                 if (token) {
//                     const url = `${process.env.BASE_URL_FRONT}/users/${existingUser._id}`;
//                     const emailContent = emailverification(url, email);
//                     await mailSender(existingUser.email, "Verify Email", emailContent);
//                     return res.status(200).json({
//                         success: true,
//                         message: "Verification email has been resent. Please check your inbox.",
//                     });
//                 }
//             }
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const profile = await Profile.create({
//             gender: null,
//             dateOfBirth: null,
//             about: null,
//             contactNumber: null,
//         });
//         const user = new User({
//             name,
//             email,
//             username,
//             password: hashedPassword,
//             profile: profile._id,
//             image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
//         });

//         const newUser = await user.save();
//         const token = new Token({
//             userId: newUser._id,
//             token: crypto.randomBytes(32).toString("hex"),
//         });
//         await token.save();

//         const url = `${process.env.BASE_URL_FRONT}/users/${newUser._id}`;
//         const emailContent = emailverification(url, email);
//         await mailSender(newUser.email, "Verify Email", emailContent);

//         res.status(201).json({
//             success: true,
//             message: "User created successfully. Please check your email to verify your account.",
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };

// exports.verifyUser = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         await User.findByIdAndUpdate(id, { verified: true });

//         res.status(200).json({ success: true, message: "Email verified successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };
















exports.signup = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.verified) {
                return res.status(400).json({
                    success: false,
                    message: "User already exists. Please sign in to continue.",
                });
            } else {
                let token = await Token.findOne({ userId: existingUser._id });
                if (!token) {
                    // If token doesn't exist, generate a new one
                    token = new Token({
                        userId: existingUser._id,
                        token: crypto.randomBytes(32).toString("hex"),
                    });
                    await token.save();
                }
                
                const url = `${process.env.BASE_URL_FRONT}/verify/${existingUser._id}/${token.token}`;
                const emailContent = emailverification(url, email);
                await mailSender(existingUser.email, "Verify Email", emailContent);

                return res.status(200).json({
                    success: true,
                    message: "Verification email has been sent. Please check your inbox.",
                });
            }
        }

        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const profile = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });
        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword,
            profile: profile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
        });
        await newUser.save();

        // Generate token for the new user
        const token = new Token({
            userId: newUser._id,
            token: crypto.randomBytes(32).toString("hex"),
        });
        await token.save();

        const url = `${process.env.BASE_URL_FRONT}/verify/${newUser._id}/${token.token}`;
        const emailContent = emailverification(url, email);
        await mailSender(newUser.email, "Verify Email", emailContent);

        res.status(201).json({
            success: true,
            message: "User created successfully. Please check your email to verify your account.",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.verifyUser = async (req, res) => {
    try {
        const { id, token } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        // Find the token associated with the user ID and token
        const tokenRecord = await Token.findOne({ userId: id, token });
        if (!tokenRecord) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification token",
            });
        }

        // Optionally, you may want to check if the token has expired here

        // Update user's verified status
        await User.findByIdAndUpdate(id, { verified: true });

        // Delete the token record from the database
        await Token.findByIdAndDelete(tokenRecord._id);

        res.status(200).json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};












  




// exports.verifyUser = async (req, res) => {
//   try {
//     const { id } = req.params; // Remove token from params

//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // You can directly update the user's verification status here if needed
//     await User.findByIdAndUpdate(id, { verified: true });

//     res
//       .status(200)
//       .json({ success: true, message: "Email verified successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };





exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    if (!user.verified) {
      return res.status(401).json({
        success: false,
        message: "Email is not verified",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, accountType: user.accountType },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
          // expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        }
      );

      // Optionally, save the token to the user document in the database
      user.token = token;
      await user.save();

      // Set cookie for token (optional) and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options);

      res.status(200).json({
        success: true,
        token,
        user: {
          // Optionally, omit sensitive fields from the user object
          id: user._id,
          email: user.email,
          name: user.name,
          // Omit other sensitive fields as needed
        },
        message: "User Login Success",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};


