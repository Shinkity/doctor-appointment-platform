import { useState } from "react";
import { Link } from "react-router-dom";
import { saveUser } from "../services/api.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Later: POST /api/auth/login
    saveUser({ name: "Chinedu Okafor", email, role: "patient" });
    window.location.href = "/dashboard";
  };

  return (
    <div className="container">
      <form className="card auth-box" onSubmit={handleSubmit}>
        <h2>Log in</h2>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn" style={{ marginTop: 18, width: "100%", justifyContent: "center" }}>Log in</button>
        <p className="muted" style={{ marginTop: 14 }}>New here? <Link to="/register"><strong>Create an account</strong></Link></p>
      </form>
    </div>
  );
}
