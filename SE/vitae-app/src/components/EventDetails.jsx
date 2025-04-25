import React from "react";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import { format } from "date-fns";

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

            <button className="bg-blue-500 text-white px-4 py-2 rounded">Sign up</button>
            <button className="ml-2 bg-green-500 text-white px-4 py-2 rounded">Add to calendar</button>
        </div>
    )

}

export default EventDetails; 