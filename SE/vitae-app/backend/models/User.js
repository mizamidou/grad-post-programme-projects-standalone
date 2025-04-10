// Defines what my data should look like in the db

const mongoose= require("mongoose");

const userSchema= new mongoose.Schema ({
    username:{type:String, required:true, unique:true},
    password:{ type:String, required:true},
    role:{type:String, enum:["user", "staff"], default:"user"}
})

module.exports=mongoose.model("User", userSchema);