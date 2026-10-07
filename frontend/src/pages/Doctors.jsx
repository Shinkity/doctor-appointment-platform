import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getDoctors } from "../services/api.js";
import { specialties } from "../data/doctors.js";
import DoctorCard from "../components/DoctorCard.jsx";

export default function Doctors() {
  const [params] = useSearchParams();
  const [name, setName] = useState(params.get("q") || "");
  const [specialty, setSpecialty] = useState(params.get("specialty") || "");

  const results = getDoctors().filter(
    (d) => d.name.toLowerCase().includes(name.toLowerCase()) && (specialty === "" || d.specialty === specialty)
  );

  return (
    <section className="section">
      <div className="container">
        <h2>Find a doctor</h2>
        <div className="search-row" style={{ marginBottom: 24 }}>
          <input placeholder="Search by name" value={name} onChange={(e) => setName(e.target.value)} />
          <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
            <option value="">All specialties</option>
            {specialties.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        {results.length === 0 ? (
          <p className="muted">No doctors match your search. Try a different name or specialty.</p>
        ) : (
          <div className="grid">{results.map((d) => <DoctorCard key={d.id} doctor={d} />)}</div>
        )}
      </div>
    </section>
  );
}
