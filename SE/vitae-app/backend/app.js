const dotenv = require("dotenv");
dotenv.config();
console.log("DATA_THISTLE_API_KEY:", process.env.DATA_THISTLE_API_KEY);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const events= require("./routes/events");
const authRoutes = require("./routes/auth");

dotenv.config();

const app= express();

//Middleware
app.use(cors()); //front end to connect
app.use(express.json());
app.use("/api/events",events);
app.use("/api/auth", authRoutes);

//Test route
app.get("/", (req,res)=>{
    res.send("API is working")
});

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT || 5000, ()=>{
            console.log(`Server running on port ${process.env.PORT || 5000}`)
        })
    })
    .catch((err)=>{
        console.error("MongoDB connection error:", err.message)
    });

