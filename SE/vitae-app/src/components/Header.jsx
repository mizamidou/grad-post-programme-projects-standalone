import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
    navigate("/signin");
  };

  return (
    <header className="bg-black text-white fixed top-0 left-0 right-0 z-10 m-0 p-4">
      <nav>
        <ul className="flex justify-around items-center">
          <li>
            <Link to="/events" className="hover:text-yellow-500">
              Events
            </Link>
          </li>

          {!user && (
            <li>
              <Link to="/signin" className="hover:text-yellow-500">
                Sign in
              </Link>
            </li>
          )}

          {user &&(
            <>
          {user && user.role ==="staff" &&(
              <li>
                <Link to="/dashboard" className="hover:text-yellow-500">
                  Dashboard
                </Link>
              </li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-yellow-500 focus:outline-none"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
