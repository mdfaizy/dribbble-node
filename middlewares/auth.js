// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const User = require("../models/User");

// dotenv.config();
// exports.auth = async (req, res, next) => {
//   try {
//     console.log("hii",req.cookies.token);
//     const token =
//       req.cookies.token ||
//       req.body.token ||
//       req.header("Authorization").replace("Bearer ", "");
//     console.log("fgfgf",token);
//     // If JWT is missing, return 401 Unauthorized response
//     if (!token) {
//       return res.status(401).json({ success: false, message: `Token Missing` });
//     }

//     try {
//       // Verifying the JWT using the secret key stored in environment variables
//       const decode = await jwt.verify(token, process.env.JWT_SECRET);
//       console.log(decode);
//       // Storing the decoded JWT payload in the request object for further use
//       req.user = decode;
//     } catch (error) {
//       // If JWT verification fails, return 401 Unauthorized response
//       return res
//         .status(401)
//         .json({ success: false, message: "token is invalid" });
//     }

//     // If JWT is valid, move on to the next middleware or request handler
//     next();
//   } catch (error) {
//     // If there is an error during the authentication process, return 401 Unauthorized response
//     return res.status(401).json({
//       success: false,
//       message: `Something Went Wrong While Validating the Token`,
//     });
//   }
// };









const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

// exports.auth = async (req, res, next) => {
//   try {
//     let token = req.cookies.token || req.body.token || req.header("Authorization");
// console.log(token);
//     if (!token) {
//       return res.status(401).json({ success: false, message: "Token missing" });
//     }

//     // Remove "Bearer " from token if present
//     if (token.startsWith("Bearer ")) {
//       token = token.slice(7, token.length);
//     }

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
// console.log("decoded",decoded);
//       const user = await User.findById(decoded.userId); // Assuming you store user ID in the token payload
// console.log("user",user);
//       if (!user) {
//         return res.status(401).json({ success: false, message: "User not found" });
//       }

//       // Store user in request object
//       req.user = user;
//       next();
//     } catch (error) {
//       return res.status(401).json({ success: false, message: "Token is invalid" });
//     }
//   } catch (error) {
//     return res.status(401).json({ success: false, message: "Authentication failed" });
//   }
// };




exports.auth = async (req, res, next) => {
  try {
      // Extracting JWT from request cookies, body or header
      let token =
          req.cookies.token ||
          req.body.token ||
          (req.headers.authorization && req.headers.authorization.replace("Bearer ", ""));
      console.log("Token:", token);

      // If JWT is missing, return 401 Unauthorized response
      if (!token) {
          return res.status(401).json({ success: false, message: `Token Missing` });
      }

      try {
          // Verifying the JWT using the secret key stored in environment variables
          const decode = await jwt.verify(token, process.env.JWT_SECRET);
          console.log("Decoded token:", decode);

          // Storing the decoded JWT payload in the request object for further use
          req.user = decode;

          // If JWT is valid, move on to the next middleware or request handler
          next();
      } catch (error) {
          // If JWT verification fails, return 401 Unauthorized response
          return res.status(401).json({ success: false, message: "Token is invalid" });
      }
  } catch (error) {
      // If there is an error during the authentication process, return 401 Unauthorized response
      return res.status(401).json({
          success: false,
          message: `Something Went Wrong While Validating the Token`,
      });
  }
};