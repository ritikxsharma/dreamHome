import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth"

const Main = () => {

  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
      refreshToken: ""
    })
    localStorage.removeItem("auth")
    navigate("/login")
  }

  const loggedIn = auth.user !== null && auth.token !== "" && auth.refreshToken !== ""

  
  return (
    <nav className="nav justify-content-between">
      <div className="d-flex">
        <NavLink className="nav-link" aria-current="page" to="/">
          Home
        </NavLink>
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
          <div className="dropdown">
          <li>
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                { auth?.user?.name || auth.user.username }
            </a>
            <ul className="dropdown-menu">
              <li>
                <NavLink className="nav-link" to='/dashboard'>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <a className="nav-link" style={{cursor: "pointer"}} onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </li>
        </div>
        ) : ""
      }
    </nav>
  );
};

export default Main;
