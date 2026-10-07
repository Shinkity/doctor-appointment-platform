import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaCalendarCheck, FaFileMedical, FaVideo } from "react-icons/fa";
import { getDoctors } from "../services/api.js";
import { specialties } from "../data/doctors.js";
import DoctorCard from "../components/DoctorCard.jsx";

export default function Home() {
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/doctors?q=${encodeURIComponent(name)}&specialty=${encodeURIComponent(specialty)}`);
  };

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>See a trusted doctor without the long queue</h1>
            <p>Search verified doctors across Nigeria, pick a time that suits you and keep all your records in one place.</p>
            <form className="search-row" onSubmit={handleSearch}>
              <input placeholder="Doctor name" value={name} onChange={(e) => setName(e.target.value)} />
              <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
                <option value="">All specialties</option>
                {specialties.map((s) => <option key={s}>{s}</option>)}
              </select>
              <button className="btn" type="submit"><FaSearch /> Search</button>
            </form>
          </div>
          {/* Rule 5: swap this placeholder for a real photo later */}
          <img src="https://placehold.co/600x400/1565c0/ffffff?text=Care+Team" alt="Doctor consulting a patient" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>How it works</h2>
          <div className="grid">
            <div className="card"><FaSearch className="icon" /><h3>Find a doctor</h3><p className="muted">Search by name or specialty and read patient reviews.</p></div>
            <div className="card"><FaCalendarCheck className="icon" /><h3>Book a time</h3><p className="muted">Choose a date and slot, then get a reminder by email.</p></div>
            <div className="card"><FaFileMedical className="icon" /><h3>Share your records</h3><p className="muted">Upload test results so your doctor sees them before you arrive.</p></div>
            <div className="card"><FaVideo className="icon" /><h3>Consult by video</h3><p className="muted">Speak to your doctor from home when a visit is not needed.</p></div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2>Doctors patients book most</h2>
          <div className="grid">
            {getDoctors().slice(0, 3).map((d) => <DoctorCard key={d.id} doctor={d} />)}
          </div>
        </div>
      </section>
    </>
  );
}
