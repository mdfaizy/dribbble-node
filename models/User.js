const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
      trim: true,
    },
    username: {
      type: String,
      // required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profile",
      // required: true,
    },
    password: {
      type: String,
      required: true,
      trime: true,
    },
   profile: {
      type: mongoose.Schema.Types.ObjectId,
    //   required: true,
      ref: "Profile",
    },
    verified: {
        type: Boolean,
        default: false,
      },
   
    // resetPasswordExpires: {
    //   type: Date,
    // },
    image: {
      type: String,
      // required: true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
