import {Navigate} from "react-router-dom";

function ProtectedRoute({children}){
    const user= JSON.parse(localStorage.getItem("user"))


    if(!user || user.role !=="staff"){
        return <Navigate to="/events" replace/>
    }
    return children

}

export default ProtectedRoute;