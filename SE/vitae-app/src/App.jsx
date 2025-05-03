import "./App.css";
import { Routes, Route} from "react-router-dom";
import "./index.css";
import {AuthProvider} from "./components/AuthContext";
import Events from "./components/Events";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import EventDetails from "./components/EventDetails";
import SignUp from "./components/SignUp";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";



function App(){
  return(
    <AuthProvider>
      <Header/>
      <main className="pt-20 px-4">
      <Routes>
        <Route path="/events/:id" element={<EventDetails/>} />
        <Route path="/" element={<Events/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }/>
      </Routes>
      </main>
    </AuthProvider>

  )
}

export default App;

