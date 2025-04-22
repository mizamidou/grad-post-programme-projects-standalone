// Event management- these handle the requests that have made to routes/events from the API. 
// Each function is connected to routes/events and it tells the server what to do when a request is received

const Event= require("../models/Event");
const axios= require("axios");// libraby for http requests

// Creation of internal events GET, POST, DELETE

exports.getManualEvents= async (req,res) =>{
    try{
        const events= await Event.find();
        res.json(events);
    }
    catch (err){
        res.status(500).json({message:"Error fetching manual events", error:err.message })
    }
}

exports.createManualEvent = async (req,res) =>{
    const {title, description, date, createdBy }= req.body;
    try{
        const newEvent= new Event ({title, description, date, createdBy, source:"manual" })
        await newEvent.save();
        res.status(202).json({message:"Event created", event:newEvent})
    }
    catch(err){
        res.status(500).json({message: "Error creating event", error:err.message})
    }
}

exports.deleteManualEvent = async (req,res) =>{
    try{
        await Event.findByIdAndDelete(req.params.id)
        res.json({message:"Event deleted"})
    }
    catch(err){
        res.status(500).json({message:"Error deleted evebt", error:err.messsage})
    }
}


exports.getExternalEvents = async (req,res) =>{
    const searchTerm=req.query.search || "";
    try{
        console.log("Backend searching for:", searchTerm)
        const response= await axios.get("https://api.datathistle.com/v1/search",{
            headers:{
                Authorization: `Bearer ${process.env.DATA_THISTLE_API_KEY}`,
            },
            params:{
                query:searchTerm,
                limit:10,
            },
        })
        console.log("Type of response.data.data:", typeof response.data.data)
        console.log("Data Thistle API Response:", response.data)
        res.json(response.data)
    }
    catch (err) {
        console.error("Data Thistle API Error:", err.response?.data || err.message);
        res.status(500).json({
          message: "Error fetching external events",
          error: err.response?.data || err.message,
        });
      }
    };
