import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // trigger update in same tab
    window.dispatchEvent(new Event("storage"));

    navigate("/login"); // ✅ ADD THIS LINE
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
