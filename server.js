const express=require("express")
const cookieparser=require("cookie-parser")
const jwt = require("jsonwebtoken")
const dotenv=require("dotenv")
const connectDB=require("./config/db")
const userRoutes=require("./Routes/userRoutes")
const chatRoutes=require("./Routes/chatRoutes")
const Message=require("./Models/MessageModel")

const cors=require("cors")
const ws = require('ws');
const fs = require('fs');

dotenv.config()
connectDB()

const app=express()
app.use(cookieparser())
const jwtSecret = process.env.JWT_SECRET;
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with your frontend URL
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true"); // Add this line
    next();
  });
app.use(express.json())
app.use("*",cors({ origin:" http://localhost:3000", // Replace with your frontend URL
credentials: true,}))
app.use(cookieparser())
app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoutes)
 
  // module.exports={ getUserDataFromRequest};
// app.get("/api/chat/:id",(req,res)=>{
//     const id = parseInt(req.params.id);
//     console.log(id);

//     const single=dummyData.find((data)=>{

//        return data.id===id
//     }
//     )

//     res.send(single)
// })
const PORT=process.env.PORT || 5000
console.log(process.env.PORT);


const server = app.listen(PORT);
// app.listen(PORT,()=>{
//     console.log("Server is Running at port "+PORT);
// })

const wss = new ws.WebSocketServer({server});
wss.on('connection', (connection, req) => {

  function notifyAboutOnlinePeople() {
    [...wss.clients].forEach(client => {
      client.send(JSON.stringify({
        online: [...wss.clients].map(c => ({userId:c.userId,username:c.username})),
      }));
    });
  }

  connection.isAlive = true;

  connection.timer = setInterval(() => {
    connection.ping();
    connection.deathTimer = setTimeout(() => {
      connection.isAlive = false;
      clearInterval(connection.timer);
      connection.terminate();
      notifyAboutOnlinePeople();
      console.log('dead');
    }, 1000);
  }, 5000);

  connection.on('pong', () => {
    clearTimeout(connection.deathTimer);
  });

  // read username and id form the cookie for this connection
  const cookies = req.headers.cookie;
  if (cookies) {
    const tokenCookieString = cookies.split(';').find(str => str.startsWith('token='));
    if (tokenCookieString) {
      const token = tokenCookieString.split('=')[1];
      if (token) {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
          if (err) throw err;
          const {userId, username} = userData;
          connection.userId = userId;
          connection.username = username;
        });
      }
    }
  }

  connection.on('message', async (message) => {
    const messageData = JSON.parse(message.toString());
    const {recipient, text, file} = messageData;
    let filename = null;
    if (file) {
      console.log('size', file.data.length);
      const parts = file.name.split('.');
      const ext = parts[parts.length - 1];
      filename = Date.now() + '.'+ext;
      const path = __dirname + '/uploads/' + filename;
      const bufferData = new Buffer(file.data.split(',')[1], 'base64');
      fs.writeFile(path, bufferData, () => {
        console.log('file saved:'+path);
      });
    }
    if (recipient && (text || file)) {
      const messageDoc = await Message.create({
        sender:connection.userId,
        recipient,
        text,
        file: file ? filename : null,
      });
      console.log('created message');
      [...wss.clients]
        .filter(c => c.userId === recipient)
        .forEach(c => c.send(JSON.stringify({
          text,
          sender:connection.userId,
          recipient,
          file: file ? filename : null,
          _id:messageDoc._id,
        })));
    }
  });

  // notify everyone about online people (when someone connects)
  notifyAboutOnlinePeople();
})
