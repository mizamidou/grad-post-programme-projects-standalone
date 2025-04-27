const mongoose= require("mongoose")

const signupSchema= new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    eventId:{type:String, required:true},
    createdAt:{type:Date, default: Date.now}
})

module.exports= mongoose.model("Signup", signupSchema)