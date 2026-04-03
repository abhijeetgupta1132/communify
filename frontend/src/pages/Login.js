import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/feed");
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError("");
    try {
      // ✅ FIXED API URL
      const res = await axios.post(`${API}/api/auth/login`, form);

      // ✅ Save token + username
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      // ✅ Redirect after login
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="logo">
          <h2>Communify</h2>
          <p>Welcome back!</p>
        </div>

        {error && <div className="error">⚠️ {error}</div>}

        <div className="input-group">
          <span className="input-icon">📧</span>
          <input
            name="email"
            value={form.email}
            placeholder="Email address"
            type="email"
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <span className="input-icon">🔒</span>
          <input
            name="password"
            value={form.password}
            placeholder="Password"
            type="password"
            onChange={handleChange}
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Login →
        </button>

        <div className="switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
