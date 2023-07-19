const asynchandler=require("express-async-handler");
const express=require("express")
const app=express()
const user=require("../Models/UserModels")
// const cookieparser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const token=require("../config/jwt")
const jwtSecret = process.env.JWT_SECRET;
// app.use(cookieparser())
const Signup=asynchandler(async(req,res)=>{
    const {name,email,password,pic}=req.body;
    if(!name||!email||!password){
        res.json(
            {
                message: "400"
            }

        )
    }
    const userexist=await user.findOne({email})
    if(userexist){
         res.json(
            {
                message: "403"
            }

        )
    }
    const User=await user.create({
        name,
        email,
        password,
        pic,
    })
    if(User){
        res.cookie("token",token(User._id,User.name),{  withCredentials:true,secure:true,sameSite:"None"}).json({
            Id:User._id
        })
        res.status(201).json({
           id:User._id,
           name:User.name,
           email:User.email,
           password:User.password ,
           token:token(User._id)
        })}
        else{
            res.send("Failed to create User")
        }
    })

    const login = async (req, res) => {
        const { email, password } = req.body;
      
        if (!email || !password) {
          return res.json({ message: "400" });
        }
      
        try {
          const userex = await user.findOne({ email });
      
          if (userex && (await userex.matchPassword(password))) {
            res.cookie("token", token(userex._id, userex.name), {
            withCredentials:true,
              secure: true,
              sameSite: "none",
            });
      
            return res.json({
              message: "200",
              id: userex._id,
              name: userex.name,
              email: userex.email,
              token:req.cookies?.token
            });
          } else {
            return res.status(401).json({ message: "Invalid credentials" });
          }
        } catch (error) {
          return res.status(500).json({ message: "Internal Server Error" });
        }
      };
      

    const Profile=(req,res) => {
        const token = req.cookies?.token;
        console.log("profile",token)
        if (token) {
          jwt.verify(token, jwtSecret, {}, (err, userData) => {
            if (err) throw err;
            res.json(userData);
          });
        } else {
          res.status(401).json('no token');
        }
      }

      const People=async (req,res) => {
        const users = await user.find({}, {'_id':1,username:1});
        res.json(users);
      }
      const Logout = async (req, res) => {
        try {
          res.cookie("token", "",{ withCredentials:true, sameSite: "none", secure: true }).json( {message: "Logout successful"});
          // res.status(200).json({ message: "Logout successful" });
        } catch (error) {
          res.status(500).json({ message: "Failed to logout" });
        }
      };
      



module.exports={Signup,login,People,Profile,Logout}

