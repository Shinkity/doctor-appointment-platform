import { Link } from "react-router-dom";
import { FaCalendarAlt, FaFileMedical, FaTrash } from "react-icons/fa";
import { getUser, getMyAppointments, getMyDocuments } from "../services/api.js";

export default function Dashboard() {
  const user = getUser();
  if (!user) return <section className="section container"><p>Please <Link to="/login"><strong>log in</strong></Link> to see your dashboard.</p></section>;

  return (
    <section className="section">
      <div className="container">
        <h2>Welcome, {user.name}</h2>

        <h3 style={{ marginBottom: 10 }}><FaCalendarAlt /> Appointment history</h3>
        <div className="card table-wrap" style={{ marginBottom: 32 }}>
          <table>
            <thead><tr><th>Doctor</th><th>Date</th><th>Time</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {getMyAppointments().map((a) => (
                <tr key={a.id}>
                  <td>{a.doctor}</td><td>{a.date}</td><td>{a.time}</td>
                  <td className={a.status === "Completed" ? "status done" : "status"}>{a.status}</td>
                  <td>{a.status === "Upcoming" && <button className="btn outline">Reschedule</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ marginBottom: 10 }}><FaFileMedical /> Medical documents</h3>
        <div className="card">
          <input type="file" style={{ marginBottom: 14 }} />
          {getMyDocuments().map((d) => (
            <div className="review" key={d.id} style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <span>{d.name} <span className="muted">({d.date})</span></span>
              <button className="btn outline" aria-label="Delete document"><FaTrash /></button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
