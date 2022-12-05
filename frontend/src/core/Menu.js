import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signout, isAutheticated } from "../auth/helper/index";

function Menu() {
  const { user } = isAutheticated();

  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = (path) => {
    if (location.pathname === path) {
      return { color: "green" };
    } else {
      return { color: "#d1d1d1" };
    }
  };

  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link style={currentTab("/")} className="nav-link" to="/">
            HOME
          </Link>
        </li>
        <li className="nav-item">
          <Link style={currentTab("/cart")} className="nav-link" to="/cart">
            Cart
          </Link>
        </li>
        {user && (
          <li className="nav-item">
            <Link
              style={currentTab("/user/dashboard")}
              className="nav-link"
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}
        {user?.role && (
          <li className="nav-item">
            <Link
              style={currentTab("/admin/dashboard")}
              className="nav-link"
              to="/admin/dashboard"
            >
              Admin Dashboard
            </Link>
          </li>
        )}
        <li className="nav-item">
          <Link style={currentTab("/signup")} className="nav-link" to="/signup">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link style={currentTab("/signin")} className="nav-link" to="/signin">
            Sign In
          </Link>
        </li>
        {user?.name && (
          <li className="nav-item">
            <Link
              style={currentTab("/signout")}
              className="nav-link"
              onClick={async () => {
                await signout();
                console.log("first");
                navigate("/signin");
              }}
            >
              Sign Out
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Menu;
