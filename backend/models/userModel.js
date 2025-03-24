import mongoose from "mongoose";

//Creating a User and Defining how the User should look like
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

//TimeStamps is used to give the time whenever we uses CURD operation on the user.

//make model based on that schema
const User = mongoose.model("User", userSchema);

export default User;
