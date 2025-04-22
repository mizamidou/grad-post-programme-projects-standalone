import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import { format } from "date-fns";
import  { Link } from "react-router-dom";


function Events(){
    const[ searchTerm, setSearchTerm]= useState(""); //user typing in the search engine 
    const [events, setEvents]= useState([]);//list of events appear in the engine
    const [loading, setLoading]= useState(false);

    const handleSearch = async () =>{
        if (!searchTerm.trim()) {
            alert("Please enter a search term.");
            return;
          }
        setLoading(true)
        try{
            console.log("searching term",searchTerm)
            const res= await axios.get(`http://localhost:5000/api/events/external?search=${searchTerm}`)//sends the request to backend axios, backend will take the term send to the API
            console.log("TYPE OF res.data:", typeof res.data);
            console.log("IS ARRAY?", Array.isArray(res.data));
            console.log("Actual response:", res.data);
            console.log("API response:",res.data)
            console.log("Number of events:", res.data.length)
            setEvents(res.data)
        }
        catch(err){
            console.log("Failed to fetch events", err)
            setEvents([])
        }
        finally{
            setLoading(false)
        }
    }



    return(
        <div className="pt-20 px-4 relative z-10">
            <input
                type="text"
                placeholder="Search any event"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded mr-2"
            />
            <button 
                onClick={handleSearch} className= "bg-red-600 text-white text-2xl px-6 py-3 rounded-lg mt-4">
                    SEARCH
            </button>
            

            {loading &&(
                <p className="mt-4 text-blue-500 font-semibold">Loading events...</p>
            )}
            {!loading && events.length===0 &&(
                <p className="mt-4 text-gray-500">No events found. Try a different search</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {Array.isArray(events) && events.map((event)=>(
                    <Link
                        to={`/events/${event.event_id}`}
                        key={`${event.event_id}_${event.start_ts}`}
                        className="block"
                    >
                <div className="border rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition cursor-pointer">
                <h2 className="text-xl font-semibold mb-1">{event.name}</h2>

                <p className="text-sm text-gray-500 mb-2">
                    {event.place_name || "Unknown location"}
                </p>

                {event.start_ts && (
                <p className="text-sm text-gray-600 mb-2">
                    {format(new Date(event.start_ts), "PPPp")}
                </p>
                )}


                <p className="text-sm text-gray-700">
                    {event.tags?.slice(0,3).join(", ")}...
                </p>
               
            </div>
            </Link>
            ))}

        </div>
    </div>
    )
}
    

export default Events;