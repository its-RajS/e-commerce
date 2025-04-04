import jwt from "jsonwebtoken";

//create a token
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    //its not expireIn its "expiresIn"
    expiresIn: "30d",
  });

  //making jwt only for the http-only cookie
  //anytime we crate a user we wanna pass that token as a cookie header
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
  });

  //optionally
  return token;
};

export default generateToken;
