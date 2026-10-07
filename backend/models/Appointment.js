// SQL helpers for appointments
const db = require("../config/db");

const create = async (patientId, doctorId, date, time, reason) =>
  (await db.query(
    "INSERT INTO appointments (patient_id, doctor_id, date, time, reason) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [patientId, doctorId, date, time, reason]
  )).rows[0];

const findConflict = async (doctorId, date, time, ignoreId = 0) =>
  (await db.query(
    "SELECT id FROM appointments WHERE doctor_id=$1 AND date=$2 AND time=$3 AND status='upcoming' AND id <> $4",
    [doctorId, date, time, ignoreId]
  )).rows[0];

const findById = async (id) => (await db.query("SELECT * FROM appointments WHERE id = $1", [id])).rows[0];

const listForUser = async (userId, role) => {
  const mine = role === "doctor" ? "a.doctor_id" : "a.patient_id";
  return (await db.query(
    `SELECT a.id, a.date, a.time, a.reason, a.status, a.doctor_id, a.patient_id,
            d.name AS doctor_name, p.name AS patient_name
     FROM appointments a
     JOIN users d ON d.id = a.doctor_id
     JOIN users p ON p.id = a.patient_id
     WHERE ${mine} = $1 ORDER BY a.date DESC`,
    [userId]
  )).rows;
};

const reschedule = async (id, date, time) =>
  (await db.query("UPDATE appointments SET date=$1, time=$2 WHERE id=$3 RETURNING *", [date, time, id])).rows[0];

const setStatus = async (id, status) =>
  (await db.query("UPDATE appointments SET status=$1 WHERE id=$2 RETURNING *", [status, id])).rows[0];

module.exports = { create, findConflict, findById, listForUser, reschedule, setStatus };
