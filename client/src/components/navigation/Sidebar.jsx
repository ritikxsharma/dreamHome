import React from "react";
import { useAuth } from "../../context/auth";
import { useNavigate, NavLink } from "react-router-dom";

const Sidebar = () => {
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {    
    setAuth({
      user: null,
      token: "",
      refreshToken: "",
    });
    localStorage.removeItem("auth");
    navigate("/login");
  };


  return (
    <>
      <div>
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#staticBackdrop"
          aria-controls="staticBackdrop"
        >
          {auth.user?.name || auth.user.username}
        </button>
        <div
          className="offcanvas offcanvas-start"
          data-bs-backdrop="static"
          tabIndex={-1}
          id="staticBackdrop"
          aria-labelledby="staticBackdropLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="staticBackdropLabel">
              Hey, {auth.user?.name || auth.user.username}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div classname="offcanvas-body">
            <ul>
              <li>
                <NavLink classname="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <a
                  classname="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                  data-bs-dismiss="offcanvas"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
