const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userSchema = require("../models/userModel");
const JWT = require("jsonwebtoken");
const SECRET_KEY = "ADMIN@123";

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, answer } = req.body;
    if (!name) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    if (!answer) {
      return res.send({ message: "answer is required" });
    }

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: " Already exists please Login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new userSchema({
      name,
      email,
      phone,
      password: hashedPassword,
      answer
    }).save();
    res.status(201).send({
      success: true,
      message: "user Register Successfully",
      user,
    });
  } catch (err) {
    console.log(`${err}`);
    res.send({
      message: "error in registration",
      err,
    });
  }
};

//login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    //check user
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "Invalid email",
      });
    }

    //compare password
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.send({
        success: false,
        message: "incorrect Password",
      });
    }

    //token
    const token = await JWT.sign({ _id: user.id }, SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role:user.role
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "error in login",
      err,
    });
  }
};

//forgot password
const forgotPasswordController = async(req,res) => {
 try {
  const {email,answer,newPassword}=req.body;
  if(!email){
    return res.send({
      message:"Email is required"
    })
  }
  if(!answer){
    return res.send({
      message:"Answer is required"
    })
  }
  if(!newPassword){
    return res.send({
      message:"New Password is required"
    })
  }

  //check email and password
  const user=await userSchema.findOne({email,answer})

  if(!user){
    return res.status(404).send({
      success:false,
      message:'Wrong email and answer'
    })
  }

  const hashed=await hashPassword(newPassword)
  await userSchema.findByIdAndUpdate(user._id,{password:hashed})
  res.status(200).send({
    success:true, 
    message:"Password Reset successfully"
  })
  
 } catch (error) {
  console.log(error)
  res.status(500).send({
    success:false,
    message:"Something went wrong",
    error
  })
 }
};

const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};


//update profile
 const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const user = await userSchema.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userSchema.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Update profile",
      error,
    });
  }
};
module.exports = {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController
};
