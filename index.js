// const express =  require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const fileUpload = require('express-fileupload');
// const cors = require("cors");

// require("dotenv").config();
// app.use(cookieParser());
// app.use(cors());


// const userRoutes = require("./routes/user");
// const userProfile=require("./routes/profile")
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); 
// app.use(express.json());

// require("./config/database").connect()

// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile",userProfile);

// const PORT = process.env.PORT || 3000;


// app.use(
//     fileUpload({
//       useTempFiles: true,
//       tempFileDir: "/tmp/",
//     })
//   );
//   require("./config/database").connect();

// //cloud se connect
// const cloudinary = require("./config/cloudinary.js");
// cloudinary.cloudinaryConnect();
// app.listen(PORT,() => {
//     console.log("Server Run at ",PORT);
// })

// app.get("/", (req,res) => {
//     res.send("<h1>Auth App</h1>")
// })







const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Middleware setup
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// File upload middleware setup
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}));

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
