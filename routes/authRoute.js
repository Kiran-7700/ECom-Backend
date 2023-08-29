const {registerController,loginController,testController,forgotPasswordController, updateProfileController}=require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router=require("express").Router();

router.post("/register",registerController)
router.post("/login",loginController)

//forgot password
router.post("/forgot-password",forgotPasswordController)

router.get("/test",requireSignIn,  isAdmin ,testController)

//user Route
router.get("/user-auth",requireSignIn, (req,res)=>{
   res.status(200).send({
    ok:true
   })
})

//admin route
router.get("/admin-auth",requireSignIn,isAdmin, (req,res)=>{
   res.status(200).send({
    ok:true
   })
})

//update profile
router.put("/profile", requireSignIn, updateProfileController);

module.exports={router};