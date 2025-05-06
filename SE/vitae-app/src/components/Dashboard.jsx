import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

function Dashboard(){
    const user= JSON.parse(localStorage.getItem("user"))
    const token= localStorage.getItem("token")

    if(!user || user.role!=="staff"){
        return <p className= "p-6 text-red-500 text-xl font-bold">Access Denied</p>
    }
    
    const [ events, setEvents]= useState([])
    const [title,setTitle]= useState("")
    const [ description,setDescription ]= useState("")
    const [ date, setDate ]= useState("")

    useEffect(()=>{
        fetchEvents()
    },[])

    const fetchEvents = async () =>{
        try{
            const res = await axios.get(`${BASE_URL}/api/events/manual`)
            setEvents(res.data)
        } catch (err){
            console.error("Failed to fetch events", err)
        }
    }

    const handleCreate = async (e) =>{
        e.preventDefault()
        try{
            await axios.post(`${BASE_URL}/api/events/manual`,{
                title,
                description,
                date,
                createdBy: user.id
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log("Creating event with:", {
                title,
                description,
                date,
                createdBy: user._id
              });
            setTitle("")
            setDescription("")
            setDate("")
            fetchEvents()
        } catch (err){
            console.error("Failed to create event", err)
            console.error("Failed to create event", err.response?.data || err.message)
        }
    }



    const handleDelete = async (id) =>{
        try{
            await axios.delete(`${BASE_URL}/api/events/manual/${id}`, {
                headers:{ Authorization:`Bearer ${token}`}
            })
            fetchEvents()
        }catch(err){
            console.error("Failed to delete Event",err)
            console.error("Failed to delete Event", err.response?.data || err.message)
        }
    }

    return(
        <div className= "p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Manage Events</h1>

            <form onSubmit={handleCreate} className="space-y-4 mb-6">
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full" required/>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border p-2 w-full" required />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 w-full" required/>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Create Events</button>
            </form>

            <h2 className="text-xl font-bold mb-2">Existing Events</h2>
            {events.map(event =>(
                <div key={event._id} className="border p=4 mb-2 flex justify-between">
                    <div>
                        <h3 className="font-bold">{event.title}</h3>
                        <p>{event.description}</p>
                        <p>{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                    <button onClick={() =>handleDelete(event._id)} className= "text-red-500">Delete</button>
                </div>
            ))}
        </div>
    )
}

export default Dashboard;