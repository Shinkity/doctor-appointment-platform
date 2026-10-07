// Mirrors the backend routes. For now these read the sample data.
// Later swap each body for fetch("/api/...") calls.
import { doctors, reviews, myAppointments, myDocuments, pendingDoctors } from "../data/doctors.js";

export const getDoctors = () => doctors;                                   // GET /api/doctors
export const getDoctor = (id) => doctors.find((d) => d.id === Number(id)); // GET /api/doctors/:id
export const getReviews = (id) => reviews.filter((r) => r.doctorId === Number(id)); // GET /api/reviews/doctor/:id
export const getMyAppointments = () => myAppointments;                     // GET /api/appointments/my-appointments
export const getMyDocuments = () => myDocuments;                           // GET /api/documents
export const getPendingDoctors = () => pendingDoctors;                     // GET /api/admin/pending-doctors

export const getUser = () => JSON.parse(localStorage.getItem("user") || "null");
export const saveUser = (user) => localStorage.setItem("user", JSON.stringify(user));
export const logout = () => localStorage.removeItem("user");
