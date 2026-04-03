import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = "https://communify-wizt.onrender.com/api";

function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError("");
    try {
      const res = await axios.post(`${API}/auth/signup`, form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="logo">
          <h2>Communify</h2>
          <p>Join the community 🚀</p>
        </div>
        {error && <div className="error">⚠️ {error}</div>}
        <div className="input-group">
          <span className="input-icon">👤</span>
          <input
            name="username"
            value={form.username}
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
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
          Create Account →
        </button>
        <div className="switch">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
