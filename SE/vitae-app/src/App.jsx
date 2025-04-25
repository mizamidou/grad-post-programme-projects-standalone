import "./App.css";
import {Routes, Route} from "react-router-dom";
import "./index.css";
import Events from "./components/Events";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import EventDetails from "./components/EventDetails";

function App(){
  return(
    <div className="app">
      <Header/>
      <main className="pt-20 px-4">
      <Routes>
        <Route path="/events/:id" element={<EventDetails/>} />
        <Route path="/" element={<Events/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
      </main>
    </div>

  )
}

export default App;

