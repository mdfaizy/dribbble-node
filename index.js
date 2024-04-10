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
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

// Load environment variables from .env file
// app.use(cors());
app.use(cors({
  origin: 'http://127.0.0.1:5173'
}));
dotenv.config();

require("./config/database").connect();
// Middleware setup
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// File upload middleware setup
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}));

// Database connection


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
