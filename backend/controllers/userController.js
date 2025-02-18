import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import brycpt from "bcryptjs";
import createToken from "../utils/createToken.js";

//Create the User
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //for the empty input field
  if (!username || !email || !password)
    throw new Error("Please fill all the inputs.");

  //to check if the user exists with that same email
  const userExists = await User.findOne({ email });
  if (userExists) res.status("400").send("User already exists.");

  //make the password as hash so to make it secure
  const salt = await brycpt.genSalt(10);
  const hashedPassword = await brycpt.hash(password, salt);

  //To create a user
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    //save the user in the db
    await newUser.save();
    //create a cookie for that user
    createToken(res, newUser._id);

    res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    console.error(error);
    throw new Error("Invalid user data");
  }
});

//Login the user
const loginUser = asyncHandler(async (req, res) => {
  //get the email and password entered
  const { email, password } = req.body;
  //check for the existing user from the DB
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    //check for the password entered and the Db password with that email
    const isPasswordValid = await brycpt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      //create a token for that user
      createToken(res, existingUser._id);

      res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
    }
  }
});

//Logout the user
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", {
    httpOnly: true,
    expires: new Date(),
  });

  res.send("200"), json({ message: "Logged Out" });
});

//if the login person is the Admin then he can see all the users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

const getCurrentUserprofile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
});

const getUpdateUserprofile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    //to update the username value given by the user if not then it will be the same
    user.username = req.body.username || user.username;
    //to update the email value given by the user if not then it will be the same
    user.email = req.body.email || user.email;
    //to update the password value given by the user if not then it will be the same
    if (req.body.password) {
      const salt = await brycpt.genSalt(10);
      const handlePassword = await brycpt.hash(req.body.password, salt);
      user.password = handlePassword;
    }

    //save the updated user in the DB
    const updatedUser = await user.save();

    res.status(200).json({
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

const deleteUserbyId = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400).json({ message: "You can't delete an admin user" });
    }

    await User.deleteOne({ _id: user._id });
    res.json({
      message: "User removed",
    });
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
});

const getUserbyId = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

const updateUsetbyId = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updateUser = await user.save();

    res.status(201).json({
      id: updateUser._id,
      username: updateUser.username,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new ERROR("User not found");
  }
});

export {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserprofile,
  getUpdateUserprofile,
  deleteUserbyId,
  getUserbyId,
  updateUsetbyId,
};
