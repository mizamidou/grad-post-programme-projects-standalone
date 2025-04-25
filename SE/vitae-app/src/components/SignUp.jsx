import React, { useState } from "react";
import axios from "axios";
import  { useNavigate } from "react-router-dom";

function SignUp(){
    const[name,setName]=useState("")
    const[surname,setSurname]=useState("")
    const[email,setEmail]= useState("")
    const[password,setPassword]= useState("")
    const [error,setError]= useState("")
    const navigate=useNavigate();

    const handleSubmit= async (e) =>{
        e.preventDefault()
        setError("")
    

    if(!name || !surname|| !email || !password){
        return setError("Please fill in both the fields, correctly")
    }

    try{
        const res= await axios.post("http://localhost:5000/api/auth/signup", {
            name,
            surname,
            email,
            password,
        })
        
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("user", JSON.stringify(res.data.user))

        navigate("/events")
    }catch (err){
        const msg= err.response?.data?.message || "Sign up failed"
        setError(msg)
    }
    }
    

    return(
        <div className="pt-24 px-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md p-6 rounded-lg">
          {error && <p className="text-red-500 text-sm">{error}</p>}
  


          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Surname</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
  
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sing Up
          </button>
        </form>
      </div>

    )
}

export default SignUp;