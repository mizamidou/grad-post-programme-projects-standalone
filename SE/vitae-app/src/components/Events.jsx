import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";

function Events(){
    const[ searchTerm, setSearchTerm]= useState(""); //user typing in the search engine
    const [events, setEvents]= useState([]);//list of events appear in the engine
    const [loading, setLoading]= useState(false);

    const handleSearch = async () =>{
        setLoading(true)
        try{
            console.log("searching term",searchTerm)
            const res= await axios.get(`http://localhost:5000/api/events/external?search=${searchTerm}`)
            console.log("response", res.data)
            setEvents(res.data)
        }
        catch(err){
            console.log("Failed to fetch events", err)
        }
        finally{
            setLoading(false)
        }
    }



    return(
        <div className="pt-20 px-4">
            <input
                type="text"
                placeholder="Search any event"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded mr-2"
            />
            <button 
                onClick={handleSearch} className= "bg-blue-400 text-white px-4 py-2 rounded">
                    Search
            </button>
            <ul className="mt-4">
                {Array.isArray(events) && events.map((event)=>(
                    <li key={event.id} className="mb-2">
                        <strong>{event.name}</strong><br/>
                        {event.description && event.description.slice(0,100)}

                    </li>
                ))}
            </ul>



        </div>
    )
}

export default Events;