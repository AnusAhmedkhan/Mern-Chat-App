const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      required: true,
      default: "https://loremflickr.com/g/320/240/paris",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.matchPassword=async function(eneterdpassword){
  return await bcrypt.compare(eneterdpassword,this.password)
}
UserSchema.pre("save",async function(next){
  if(!this.isModified){
next()
  }
const Salt= await bcrypt.genSalt(10)
this.password= await bcrypt.hash(this.password,Salt)
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
