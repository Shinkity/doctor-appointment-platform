import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import Avatar from "./Avatar.jsx";

export default function DoctorCard({ doctor }) {
  return (
    <div className="card doctor-card">
      <Avatar name={doctor.name} photo={doctor.photo} />
      <h3>{doctor.name}</h3>
      <span className="tag">{doctor.specialty}</span>
      <p className="muted" style={{ margin: "8px 0" }}><FaMapMarkerAlt /> {doctor.hospital}</p>
      <p className="rating"><FaStar /> {doctor.rating}</p>
      <p style={{ margin: "6px 0 14px" }}>N{doctor.fee.toLocaleString()} per visit</p>
      <Link to={`/doctors/${doctor.id}`} className="btn">View profile</Link>
    </div>
  );
}
