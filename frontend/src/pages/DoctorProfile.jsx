import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaBriefcaseMedical } from "react-icons/fa";
import { getDoctor, getReviews, getUser } from "../services/api.js";
import { times } from "../data/doctors.js";
import Avatar from "../components/Avatar.jsx";

export default function DoctorProfile() {
  const { id } = useParams();
  const doctor = getDoctor(id);
  const reviews = getReviews(id);
  const user = getUser();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [booked, setBooked] = useState(false);

  if (!doctor) return <section className="section container"><p>Doctor not found.</p></section>;

  const handleBook = (e) => {
    e.preventDefault();
    if (!date || !time) return;
    // Later: POST /api/appointments/book
    setBooked(true);
  };

  return (
    <section className="section">
      <div className="container profile-grid">
        <div>
          <div className="profile-head">
            <Avatar name={doctor.name} photo={doctor.photo} size={120} />
            <div>
              <h1 style={{ fontSize: "1.9rem" }}>{doctor.name}</h1>
              <span className="tag">{doctor.specialty}</span>
              <p className="muted"><FaMapMarkerAlt /> {doctor.hospital}</p>
              <p className="muted"><FaBriefcaseMedical /> {doctor.experience} years of experience</p>
              <p className="rating"><FaStar /> {doctor.rating}</p>
            </div>
          </div>
          <h2>About</h2>
          <p>{doctor.bio}</p>
          <h2 style={{ marginTop: 32 }}>Patient reviews</h2>
          {reviews.length === 0 && <p className="muted">No reviews yet.</p>}
          {reviews.map((r) => (
            <div className="review" key={r.id}>
              <strong>{r.patient}</strong> <span className="rating"><FaStar /> {r.rating}</span>
              <p>{r.text}</p>
            </div>
          ))}
        </div>

        <form className="card" onSubmit={handleBook}>
          <h3>Book an appointment</h3>
          <p className="muted">Fee: N{doctor.fee.toLocaleString()}</p>
          {!user && <div className="notice">Please <Link to="/login"><strong>log in</strong></Link> to confirm your booking.</div>}
          <label htmlFor="date">Date</label>
          <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <label>Time</label>
          <div className="slots">
            {times.map((t) => (
              <button type="button" key={t} className={t === time ? "slot active" : "slot"} onClick={() => setTime(t)}>{t}</button>
            ))}
          </div>
          <label htmlFor="reason">Reason for visit</label>
          <textarea id="reason" rows="3" value={reason} onChange={(e) => setReason(e.target.value)} />
          <button className="btn" style={{ marginTop: 16 }} disabled={!user}>Confirm booking</button>
          {booked && <div className="notice">Your appointment with {doctor.name} is booked for {date} at {time}. A reminder will be sent to your email.</div>}
        </form>
      </div>
    </section>
  );
}
