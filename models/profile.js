const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  location: {
    type: String,
    // required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "User",
  },
  image: {
    type: String,
  },
  checkbox: [{
    type: Boolean,
  }],
},
{ timestamps: true }
);
const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
