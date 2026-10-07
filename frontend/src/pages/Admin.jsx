import { useState } from "react";
import { FaCheck, FaTimes, FaUserMd } from "react-icons/fa";
import { getPendingDoctors } from "../services/api.js";

export default function Admin() {
  const [pending, setPending] = useState(getPendingDoctors());

  // Later: PUT /api/admin/verify-doctor
  const remove = (id) => setPending(pending.filter((d) => d.id !== id));

  return (
    <section className="section">
      <div className="container">
        <h2>Admin dashboard</h2>
        <div className="grid" style={{ marginBottom: 28 }}>
          <div className="card"><FaUserMd className="icon" /><h3>{pending.length}</h3><p className="muted">Doctors waiting for approval</p></div>
          <div className="card"><h3>1,284</h3><p className="muted">Registered patients</p></div>
          <div className="card"><h3>86</h3><p className="muted">Verified doctors</p></div>
        </div>
        <h3 style={{ marginBottom: 10 }}>Pending doctors</h3>
        <div className="card table-wrap">
          {pending.length === 0 ? <p className="muted">Nothing to review right now.</p> : (
            <table>
              <thead><tr><th>Name</th><th>Specialty</th><th>Licence</th><th>Action</th></tr></thead>
              <tbody>
                {pending.map((d) => (
                  <tr key={d.id}>
                    <td>{d.name}</td><td>{d.specialty}</td><td>{d.license}</td>
                    <td>
                      <button className="btn" onClick={() => remove(d.id)}><FaCheck /> Approve</button>{" "}
                      <button className="btn outline" onClick={() => remove(d.id)}><FaTimes /> Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
