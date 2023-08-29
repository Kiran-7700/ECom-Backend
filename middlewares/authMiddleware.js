const JWT = require("jsonwebtoken");
const userSchema = require("../models/userModel");
const SECRET_KEY = "ADMIN@123";

//user access
const requireSignIn = async (req, res, next) => {
  try {
    const bearerToken = req.headers["authorization"];
    const token = bearerToken.split(" ")[1];
    const decode = JWT.verify(token, SECRET_KEY);

    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Please sign in first" });
  }
};

//admin access
const isAdmin = async (req, res, next) => {
  try {
    const user = await userSchema.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};

module.exports = {
  requireSignIn,
  isAdmin,
};
