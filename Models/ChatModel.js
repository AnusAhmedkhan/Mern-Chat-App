const mongoose=require("mongoose")

const ChatModel=mongoose.Schema(
    {
        chatName:{type:String,trim:true},
        isgroupchat:{type:Boolean,default:false},
        users:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }],
        latestmessage:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message"
        },
        groupadmin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps:true
    }
)
const chat=mongoose.model("Chat",ChatModel)
module.exports=chat;