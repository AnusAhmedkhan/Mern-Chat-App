const Message = require("../Models/MessageModel");
const jwt=require("jsonwebtoken")

const express=require("express")
const app=express()
const jwtSecret = process.env.JWT_SECRET;
const cookieparser=require("cookie-parser")
app.use(cookieparser())

const getUserDataFromRequest = async(req) => {
  return new Promise((resolve, reject) => {
    const token = req.cookies?.token;
    console.log("token",token);
    if (token) {
      jwt.verify(token, jwtSecret, {}, (err, userData) => {
        if (err) {
          reject(err);
        } else {
          resolve(userData);
        }
      });
    } else {
      reject('no token');
    }
  });
};

const Chatmessage = async (req, res) => {
  const { userId } = req.params;
  try {
    const userData = await getUserDataFromRequest(req);
    const ourUserId = userData.userId;
    const messages = await Message.find({
      sender: { $in: [userId, ourUserId] },
      recipient: { $in: [userId, ourUserId] },
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




module.exports=Chatmessage