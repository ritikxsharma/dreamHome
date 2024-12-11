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
          class="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          {auth.user?.name || auth.user.username}
        </button>
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h5 id="offcanvasRightLabel">
              Hey, {auth.user?.name || auth.user.username}
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div classname="offcanvas-body">
            <ul style={{}}>
              <li>
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <a
                  className="nav-link"
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
