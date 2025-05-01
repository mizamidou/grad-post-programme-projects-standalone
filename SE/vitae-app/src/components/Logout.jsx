import { useNavigate } from 'react-router-dom';

function LogoutButton(){
    const navigate= useNavigate()


    const handleLogout = () =>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/signin")
    }

    return(
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
        </button>
    )
}

export default LogoutButton; 