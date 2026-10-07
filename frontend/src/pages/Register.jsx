import { useState } from "react";
import { saveUser } from "../services/api.js";

export default function Register() {
  const [role, setRole] = useState("patient");
  const [form, setForm] = useState({ name: "", email: "", password: "", specialty: "" });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Later: POST /api/auth/register-patient or /register-doctor
    saveUser({ name: form.name, email: form.email, role });
    window.location.href = "/dashboard";
  };

  return (
    <div className="container">
      <form className="card auth-box" onSubmit={handleSubmit}>
        <h2>Create your account</h2>
        <div className="tabs">
          <button type="button" className={role === "patient" ? "btn" : "btn outline"} onClick={() => setRole("patient")}>Patient</button>
          <button type="button" className={role === "doctor" ? "btn" : "btn outline"} onClick={() => setRole("doctor")}>Doctor</button>
        </div>
        <label htmlFor="name">Full name</label>
        <input id="name" name="name" value={form.name} onChange={update} placeholder="Chinedu Okafor" required />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={update} required />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={form.password} onChange={update} required />
        {role === "doctor" && (
          <>
            <label htmlFor="specialty">Specialty</label>
            <input id="specialty" name="specialty" value={form.specialty} onChange={update} required />
            <label htmlFor="license">Licence PDF</label>
            <input id="license" type="file" accept=".pdf" required />
            <div className="notice">Doctor accounts are reviewed by an admin before they go live.</div>
          </>
        )}
        <button className="btn" style={{ marginTop: 18, width: "100%", justifyContent: "center" }}>Sign up</button>
      </form>
    </div>
  );
}
