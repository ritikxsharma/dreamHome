import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth"
import Sidebar from "./Sidebar";

const Main = () => {

  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()

  const loggedIn = auth.user !== null && auth.token !== "" && auth.refreshToken !== ""

  const handlePostAdClick = () => {
    if(loggedIn){      
      navigate("/ad/create")
    }else{
      navigate("/login")
    }
  }
  
  return (
    <nav className="nav justify-content-between">
      <div className="d-flex">
        <NavLink className="nav-link" aria-current="page" to="/">
          Home
        </NavLink>
        <a className="nav-link" style={{cursor: "pointer"}} onClick={handlePostAdClick} >
          Post Ad
        </a>
        {
          !loggedIn ? (
            <>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </>
          ) : ""
        }
      </div>

      {
        loggedIn ? (
        <Sidebar />
        ) : ""
      }
    </nav>
  );
};

export default Main;
