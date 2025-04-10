const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const events= require("./routes/events")

dotenv.config();

const app= express();

//Middleware
app.use(cors()); //front end to connect
app.use(express.json());
app.use("/api/events",events)

//Test route
app.get("/", (req,res)=>{
    res.send("API is working")
});

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT || 5000, ()=>{
            console.log("Server running on port £{process.env.PORT || 5000}")
        })
    })
    .catch((err)=>{
        console.error("MongoDB connection error:", err.message)
    });

