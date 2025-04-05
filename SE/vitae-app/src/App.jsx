import "./App.css";
import {Routes, Route} from "react-router-dom";
import "./index.css";
import Events from "./components/Events";
import Header from "./components/Header"

function App(){
  return(
    <div className="app">
      <Header/>
      <Routes>
        <Route path="/" element={<Events/>}/>
      </Routes>
    </div>

  )
}

export default App;

