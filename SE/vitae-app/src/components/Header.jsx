import React from "react";
import { Link } from "react-router-dom";


function Header(){
    return(
        <header className="bg-black text-white fixed top-0 left-0 right-0 z-10 m-0 p-4">
            <nav>
                <ul className="flex justify-around">
                    <li><Link to="/" classsName="hover:text-yellow-500">Events</Link></li>
                </ul>
            </nav>

        </header>
    )
}

export default Header;