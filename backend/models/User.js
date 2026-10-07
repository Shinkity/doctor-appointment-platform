// SQL helpers for users and their profiles
const db = require("../config/db");

const createUser = async (name, email, password, role, isVerified) => {
  const r = await db.query(
    "INSERT INTO users (name, email, password, role, is_verified) VALUES ($1,$2,$3,$4,$5) RETURNING id, name, email, role, is_verified",
    [name, email, password, role, isVerified]
  );
  return r.rows[0];
};

const findByEmail = async (email) => (await db.query("SELECT * FROM users WHERE email = $1", [email])).rows[0];

const createDoctorProfile = (userId, specialty, licenseUrl) =>
  db.query("INSERT INTO doctor_profiles (user_id, specialty, license_url) VALUES ($1,$2,$3)", [userId, specialty, licenseUrl]);

const createPatientProfile = (userId) => db.query("INSERT INTO patient_profiles (user_id) VALUES ($1)", [userId]);

const doctorSelect = `
  SELECT u.id, u.name, d.specialty, d.hospital, d.bio, d.fee, d.experience, d.photo_url,
         COALESCE(ROUND(AVG(r.rating), 1), 0) AS rating
  FROM users u
  JOIN doctor_profiles d ON d.user_id = u.id
  LEFT JOIN reviews r ON r.doctor_id = u.id`;

const listDoctors = async (search, specialty) =>
  (await db.query(
    `${doctorSelect} WHERE u.is_verified = true AND u.name ILIKE $1 AND ($2 = '' OR d.specialty = $2)
     GROUP BY u.id, d.user_id ORDER BY u.name`,
    [`%${search}%`, specialty]
  )).rows;

const getDoctor = async (id) =>
  (await db.query(`${doctorSelect} WHERE u.id = $1 AND u.is_verified = true GROUP BY u.id, d.user_id`, [id])).rows[0];

const updateDoctorProfile = async (userId, { hospital, bio, fee, experience }) =>
  (await db.query(
    "UPDATE doctor_profiles SET hospital=$1, bio=$2, fee=$3, experience=$4 WHERE user_id=$5 RETURNING *",
    [hospital, bio, fee, experience, userId]
  )).rows[0];

const getPatient = async (userId) =>
  (await db.query(
    "SELECT u.id, u.name, u.email, p.phone, p.address FROM users u JOIN patient_profiles p ON p.user_id = u.id WHERE u.id = $1",
    [userId]
  )).rows[0];

const updatePatient = async (userId, { name, phone, address }) => {
  await db.query("UPDATE users SET name = $1 WHERE id = $2", [name, userId]);
  await db.query("UPDATE patient_profiles SET phone = $1, address = $2 WHERE user_id = $3", [phone, address, userId]);
  return getPatient(userId);
};

const pendingDoctors = async () =>
  (await db.query(
    "SELECT u.id, u.name, d.specialty, d.license_url FROM users u JOIN doctor_profiles d ON d.user_id = u.id WHERE u.is_verified = false ORDER BY u.created_at"
  )).rows;

const setVerified = (id) => db.query("UPDATE users SET is_verified = true WHERE id = $1", [id]);
const deleteUser = (id) => db.query("DELETE FROM users WHERE id = $1", [id]);
const getEmail = async (id) => (await db.query("SELECT name, email FROM users WHERE id = $1", [id])).rows[0];

const stats = async () => {
  const r = await db.query(`SELECT
    (SELECT COUNT(*) FROM users WHERE role = 'patient') AS patients,
    (SELECT COUNT(*) FROM users WHERE role = 'doctor' AND is_verified = true) AS doctors,
    (SELECT COUNT(*) FROM users WHERE role = 'doctor' AND is_verified = false) AS pending,
    (SELECT COUNT(*) FROM appointments) AS appointments`);
  return r.rows[0];
};

module.exports = { createUser, findByEmail, createDoctorProfile, createPatientProfile, listDoctors, getDoctor, updateDoctorProfile, getPatient, updatePatient, pendingDoctors, setVerified, deleteUser, getEmail, stats };
