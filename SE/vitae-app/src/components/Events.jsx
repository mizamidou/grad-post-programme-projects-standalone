import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";

function EventSearch(){
    const[ searchTerm, setSearchTerm]= useState(""); //user typing in the search engine
    const [events, setEvents]= useState([])//list of events appear in the engine

    const handleSearch = async () =>{
        try{
            const res= await axios.get(`/api/events/external?search=${searchTerm}`)
            setEvents(res.data)
        }
        catch(err){
            console.log("Failed to fetch events", err)
        }
    }



    return(
        <div>
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
                {events && events.data && events.data.map((event)=>(
                    <li key={event.id} className="mb-2">
                        <strong>{event.name}</strong><br/>
                        {event.description && event.description.slice(0,100)}

                    </li>
                ))}
            </ul>



        </div>
    )
}

export default EventSearch;