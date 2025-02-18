import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserprofile,
  getUpdateUserprofile,
  deleteUserbyId,
  getUserbyId,
  updateUsetbyId,
} from "../controllers/userController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

//For the new User
router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

//login of the user
router.post("/auth", loginUser);

//logout of the user
router.post("/logout", logoutUser);

//User profile
router
  .route("/profile")
  .get(authenticate, getCurrentUserprofile)
  .put(authenticate, getUpdateUserprofile);

//updating and deleting a specific user from the admin side
//Admin routes 👇
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserbyId)
  .get(authenticate, authorizeAdmin, getUserbyId)
  .put(authenticate, authorizeAdmin, updateUsetbyId);

export default router;
