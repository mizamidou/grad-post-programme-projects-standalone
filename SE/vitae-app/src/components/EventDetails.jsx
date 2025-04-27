import React from "react";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import { format } from "date-fns";
import { gapi } from "gapi-script";


function EventDetails(){
    const { id }= useParams();
    const [event, setEvent]= useState(null);
    const [loading, setLoading]= useState(true);
    

    useEffect(() =>{
        const fetchEvent =async ()=>{
            try{
                const res= await axios.get(`http://localhost:5000/api/events/${id}`);
                setEvent(res.data)
            } catch (err){
                console.error("Failed to fetch event", err);
            } finally{
                setLoading(false)
            }
        }

        fetchEvent()
    }, [id]);
    
    if (loading) return <p className="p-4">Loading...</p>
    if (!event) return <p className="p-4">Event not found.</p>
    
    const description = event.descriptions?.[0]?.description || "No description provided.";
    const schedule = event.schedules?.[0];
    const placeName = schedule?.place?.name || "Unknown venue";
    const startDate = schedule?.start_ts;

    const handleSignUp= async ()=>{
        try{
            const token= localStorage.getItem("token")
            const user= JSON.parse(localStorage.getItem("user"))

            if(!token ||!user){
                alert("Please sign in ")
                return
            }

            await axios.post("http://localhost:5000/api/events/signup",{
                userId:user.id,
                eventId:event.event_id,},
                {
                    headers:{
                        Authorization:` Bearer ${token}`,
                    }               
            })
            alert("You have signed up for an event successfully!")
        }catch(err){
            console.error("Error signing up", err.message)
            alert("Failed to sign up")
        }
    }

    const handleAddToCalendar = async () => {
        const CLIENT_ID = "478820642620-fs1ffk3aog5tv16aafkgdi8frnollfpp.apps.googleusercontent.com"; 
        const API_KEY = "";
        const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
        const SCOPES = "https://www.googleapis.com/auth/calendar.events";
    
        const gapiScriptLoaded = await new Promise((resolve) => {
          gapi.load("client:auth2", resolve);
        });
    
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        });
    
        const authInstance = gapi.auth2.getAuthInstance();
        await authInstance.signIn();
    
        const calendarEvent = {
          summary: event.name,
          location: placeName,
          description: description,
          start: {
            dateTime: startDate,
            timeZone: "Europe/London",
          },
          end: {
            dateTime: startDate,
            timeZone: "Europe/London",
          },
        };
    
        try {
          await gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: calendarEvent,
          });
          alert("Event added to your Google Calendar!");
        } catch (err) {
          console.error("Error adding to calendar", err.message);
          alert("Failed to add event to calendar.");
        }
      };
    


    return(
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className= "text-3xl font-bold mb-2">{event.name}</h1>
            <p className="text-gray-600 mb-1">{placeName}</p>
            {startDate &&(
                <p className="text-gray-600 mb-4">
                    {format(new Date(startDate), "PPPp")}
                </p>
            )}
            <p className="mb-4">{description}</p>

            <button 
                onClick={handleSignUp}
                className="bg-blue-500 text-white px-4 py-2 rounded">Sign up</button>
            <button
                onClick={handleAddToCalendar} 
                className="ml-2 bg-green-500 text-white px-4 py-2 rounded">
                    Add to calendar</button>
        </div>
    )

}

export default EventDetails; 