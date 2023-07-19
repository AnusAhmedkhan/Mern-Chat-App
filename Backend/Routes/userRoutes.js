const express=require("express")
const {Signup,login,People,Profile,Logout}=require("../Controllers/userController")
const router=express.Router()
// router.route("/login").post(login)
router.route("/signup").post(Signup)
router.route("/login").post(login)
router.route("/people").get(People)
router.route("/profile").get(Profile)
router.route("/logout").post(Logout)


module.exports=router;