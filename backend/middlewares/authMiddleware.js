import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  //read jwt from the cookie
  let token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //get the user
      req.user = await User.findById(decoded.userId).select("-password");
      if (!req.user) {
        res.status(401);
        throw new Error("User not found");
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Kindly authenticate");
    }
  } else {
    res.status(401);
    throw new Error("Not authenticated, no token ");
  }
});

//Check for the Admin
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).send("You are not authorized to access this");
  }
};

export { authenticate, authorizeAdmin };
