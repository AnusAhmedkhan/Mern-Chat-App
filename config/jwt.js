const jwt = require("jsonwebtoken")
const Token=(id,username)=>{
return jwt.sign({userId:id,username:username},process.env.JWT_SECRET,{
    expiresIn:"30d",
})
}
module.exports=Token