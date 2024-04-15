const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const app = express();

// Load environment variables from .env file
dotenv.config();
app.use(
  cors({
    
    origin:"*",
    optionSuccessstatus:200,
    
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// File upload middleware setup
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Database connection
require("./config/database").connect();

// Importing routes
const userRoutes = require("./routes/user");
const userProfile = require("./routes/profile");

// Routes setup
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", userProfile);

// Cloudinary connection
const cloudinary = require("./config/cloudinary.js");
cloudinary.cloudinaryConnect();

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

// Root route
app.get("/", (req, res) => {
  res.send("<h1>Auth App</h1>");
});
