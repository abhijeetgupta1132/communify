import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1>Communify</h1>
      <div className="navbar-right">
        {username ? (
          <>
            <span>👤 {username}</span>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
