const express=require("express")
const Message=require("../Controllers/chatControllers")

const router=express.Router()
// router.route("/login").post(login)
router.route('/messages/:userId').get(Message)

module.exports=router;