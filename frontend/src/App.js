import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  // ✅ listen for login/logout changes
  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkAuth);

    // also trigger on same tab
    checkAuth();

    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuth ? "/feed" : "/login"} />}
        />

        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to="/feed" />}
        />

        <Route
          path="/signup"
          element={!isAuth ? <Signup /> : <Navigate to="/feed" />}
        />

        <Route
          path="/feed"
          element={isAuth ? <Feed /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
