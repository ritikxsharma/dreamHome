import { NavLink } from "react-router-dom";

import React from "react";

const Main = () => {
  return (
    <nav className="nav justify-content-between">
      <div className="d-flex">
        <NavLink className="nav-link" aria-current="page" to="/">
          Home
        </NavLink>
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
        <NavLink className="nav-link" to="/register">
          Register
        </NavLink>
      </div>

      <div className="dropdown">
        <li>
          <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              User
          </a>
          <ul className="dropdown-menu">
            <li>
              <NavLink className="nav-link" to='/dashboard'>
                Dashboard
              </NavLink>
            </li>
            <li>
              <a className="nav-link">Logout</a>
            </li>
          </ul>
        </li>
      </div>
    </nav>
  );
};

export default Main;
