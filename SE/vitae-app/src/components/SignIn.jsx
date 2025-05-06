import React, { useState, useContext } from "react";
import axios from "axios";
import  { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const BASE_URL = import.meta.env.VITE_API_URL;

function SignIn(){
    const[email,setEmail]= useState("")
    const[password,setPassword]= useState("")
    const [error,setError]= useState("")
    const navigate=useNavigate();
    const { login } = useContext(AuthContext)

    const handleSubmit= async (e) =>{
        e.preventDefault()
        setError("")
    

    if(!email || !password){
        return setError("Please fill in both the fields, correctly")
    }

    try{
        const res= await axios.post(`${BASE_URL}/api/events/signin`, {
            email,
            password,
        })
        
        console.log("Login data:", res.data)
        login(res.data.user)
        navigate("/events")
        console.log("Login data:", res.data)
    }catch (err){
        const msg= err.response?.data?.message || "Sign in failed"
        setError(msg)
    }
    }
    

    return(
        <div className="pt-24 px-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md p-6 rounded-lg">
          {error && <p className="text-red-500 text-sm">{error}</p>}
  
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
            Sign In
          </button>
        </form>
        <p className= "text-sm mt-4 text center">
            Create an account {""}
            <button
                className="text-blue-600 underline"
                onClick={()=> navigate("/signup")}>
                Sign up here
            </button>
        </p>
      </div>

    )
}

export default SignIn;