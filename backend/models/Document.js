// SQL helpers for medical files
const db = require("../config/db");

const create = async (patientId, name, url, publicId) =>
  (await db.query("INSERT INTO documents (patient_id, name, url, public_id) VALUES ($1,$2,$3,$4) RETURNING *", [patientId, name, url, publicId])).rows[0];

const listForPatient = async (patientId) =>
  (await db.query("SELECT id, name, url, created_at FROM documents WHERE patient_id = $1 ORDER BY created_at DESC", [patientId])).rows;

const findOwned = async (id, patientId) =>
  (await db.query("SELECT * FROM documents WHERE id = $1 AND patient_id = $2", [id, patientId])).rows[0];

const remove = (id) => db.query("DELETE FROM documents WHERE id = $1", [id]);

module.exports = { create, listForPatient, findOwned, remove };
