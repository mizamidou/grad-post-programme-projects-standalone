// staff to create and manage events
const mongoose= require("mongoose");

const eventSchema= new mongoose.Schema({
    title:{type: String, required:true},
    description:{type: String, required:true},
    date:{type:Date, required:true},
    createdBy:{type:String, required:true},
    source:{type: String, default:"manual"},
    imageUrl:{type:String},
    tags:[{type:String}],

});

module.exports= mongoose.model("Event", eventSchema);

