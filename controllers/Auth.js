const User = require("../models/User");
const Token = require("../models/VerifyUser");
const mailSender = require("../utils/sendEmail");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const Profile = require("../models/profile.js");
const emailverification = require("../emailtemplate/emailVerification");

// const emailVerification =required("../")
dotenv.config();

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
        // process.env.BASE_URL_FRONT
        
      } else {
        const token = await Token.findOne({ userId: existingUser._id });
        if (token) {
          const url = `${process.env.BASE_URL_FRONT}api/v1/auth/user/${existingUser._id}/${tokens.token}`;
          const emailContent = emailverification(url, email);
          await mailSender(existingUser.email, "Verify Email", emailContent);
          return res.status(200).json({
            success: true,
            message:
              "Verification email has been resent. Please check your inbox.",
          });
        }
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profile = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    const user = new User({
      name,
      email,
      username,
      password: hashedPassword,
      profile: profile._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
    });

    const newUser = await user.save();
    // const token1 = crypto.randomBytes(32).toString("hex");
    const tokens = new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await tokens.save();

    const url = `${process.env.BASE_URL_FRONT}api/v1/auth/user/${newUser._id}/${tokens.token}`;
    const emailContent = emailverification(url, email);
    await mailSender(newUser.email, "Verify Email", emailContent);

    res.status(201).json({
      success: true,
      message:
        "User created successfully. Please check your email to verify your account.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
exports.verifyUser = async (req, res) => {
  try {
    const { id, token } = req.params;

    const tokenEntry = await Token.findOne({ userId: id, token });
    if (!tokenEntry) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    await User.findByIdAndUpdate(id, { verified: true });

    // Delete the token entry after successful verification
    await Token.findByIdAndDelete(tokenEntry._id);

    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

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
        { email: user.email, id: user._id,  },
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
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};