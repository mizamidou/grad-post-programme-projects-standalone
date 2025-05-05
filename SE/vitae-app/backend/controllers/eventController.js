// Event management- these handle the requests that have made to routes/events from the API. 
// Each function is connected to routes/events and it tells the server what to do when a request is received

const Event= require("../models/Event");
const axios= require("axios");
const Signup= require("../models/Signup")

// Creation of internal events GET, POST, DELETE

exports.getManualEvents = async (req, res) => {
    try {
      const events = await Event.find();
      const formatted = events.map(event => ({
        ...event.toObject(),
        event_id: event._id.toString(),
        source: "manual",
      }));
      res.json(formatted);
    } catch (err) {
      res.status(500).json({ message: "Error fetching manual events", error: err.message });
    }
  };

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
        res.json({message:"Event deleted"}  )

        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
          }
      
        res.status(204).send();
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

    exports.getSingleExternalEvent= async (req,res) =>{
        const eventId= req.params.id;

        try{
            const response= await axios.get(`https://api.datathistle.com/v1/events/${eventId}`, {
                headers:{
                    Authorization:`Bearer ${process.env.DATA_THISTLE_API_KEY}`,
            
                },
                params:{
                    limit:100,
                }
            });

        console.log("DATA_THISTLE_API_KEY:", process.env.DATA_THISTLE_API_KEY);
        const event= response.data;
        

        if(!event || !event.event_id){
            return res.status(400).json({message:"Event not found"})
        }
        
        res.json(event)


        } catch (err) {
            console.log("Fetching external event with ID:", req.params.id);
            console.error("Error fetching single external event:");
            if (err.response) {
              console.error("Status:", err.response.status);
              console.error("Response:", err.response.data);
            } else {
              console.error("Error:", err.message);
            }
            res.status(500).json({
              message: "Error retrieving external event",
              error: err.response?.data || err.message,
            });
          }
    }

    exports.signupForEvent= async (req,res) =>{
        const {userId, eventId}= req.body;

        try{
            const newSignup= new Signup({userId, eventId})
            await newSignup.save()
            res.status(201).json({message:"Signed up for event!"})
        } catch(err){
            console.error("Signup failed", err.message)
            res.status(500).json({message:"Couldnt sign up ", error:err.message})
        }

    }

    exports.getCombinedEvents = async (req, res) => {
        const searchTerm = req.query.search || "";
      
        try {
          const externalRes = await axios.get("https://api.datathistle.com/v1/search", {
            headers: { Authorization: `Bearer ${process.env.DATA_THISTLE_API_KEY}` },
            params: { query: searchTerm, limit: 10 },
          });

          console.log("Data Thistle response:", externalRes.data);
      
          const externalData = Array.isArray(externalRes.data) ? externalRes.data : [];
      
          const externalEvents = externalData.map(event => ({
            ...event,
            source: "external",
          }));
      
         
          const manualEvents = await Event.find({
            $or: [
              { title: { $regex: searchTerm, $options: "i" } },
              { description: { $regex: searchTerm, $options: "i" } },
            ],
          }).lean();
      
          const formattedManualEvents = manualEvents.map(event => ({
            event_id: event._id.toString(),
            name: event.title,
            place_name: "Local Community",
            start_ts: event.date,
            imageUrl: event.imageUrl || "",
            tags: event.tags || [],
            descriptions: [{ description: event.description }],
            schedules: [{ start_ts: event.date, place: { name: "Local Community" } }],
            source: "manual",
          }));
      
          const combined = [...externalEvents, ...formattedManualEvents];
          res.json(combined);
      
        } catch (err) {
          console.error("Error combining events:", err.response?.data || err.message);
          res.status(500).json({
            message: "Error combining events",
            error: err.response?.data || err.message,
          });
        }
      };
      
  
