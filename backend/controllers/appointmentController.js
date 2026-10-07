// Book, reschedule, cancel, list appointments, calendar file
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const { notify } = require("../sockets/notificationSocket");
const sendEmail = require("../utils/sendEmail");
const { makeICS } = require("../utils/calendarSync");

const book = async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;
    if (!doctorId || !date || !time) return res.status(400).json({ message: "Doctor, date and time are required" });
    if (await Appointment.findConflict(doctorId, date, time)) {
      return res.status(400).json({ message: "That time is already taken. Please pick another slot" });
    }
    const appt = await Appointment.create(req.user.id, doctorId, date, time, reason);
    const doctor = await User.getEmail(doctorId);
    const patient = await User.getEmail(req.user.id);

    notify(req.app.get("io"), doctorId, `New appointment from ${patient.name} on ${date} at ${time}`);
    sendEmail(patient.email, "Appointment booked", `Hello ${patient.name}, your appointment with ${doctor.name} is on ${date} at ${time}.`);
    res.status(201).json(appt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not book appointment" });
  }
};

const myAppointments = async (req, res) => {
  try {
    res.json(await Appointment.listForUser(req.user.id, req.user.role));
  } catch (err) {
    res.status(500).json({ message: "Could not load appointments" });
  }
};

// Patient or doctor on the appointment only
const findMine = async (req, res) => {
  const appt = await Appointment.findById(req.params.id);
  if (!appt || (appt.patient_id !== req.user.id && appt.doctor_id !== req.user.id)) {
    res.status(404).json({ message: "Appointment not found" });
    return null;
  }
  return appt;
};

const reschedule = async (req, res) => {
  try {
    const appt = await findMine(req, res);
    if (!appt) return;
    const { date, time } = req.body;
    if (await Appointment.findConflict(appt.doctor_id, date, time, appt.id)) {
      return res.status(400).json({ message: "That time is already taken" });
    }
    const updated = await Appointment.reschedule(appt.id, date, time);
    const other = req.user.id === appt.patient_id ? appt.doctor_id : appt.patient_id;
    notify(req.app.get("io"), other, `An appointment was moved to ${date} at ${time}`);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Could not reschedule" });
  }
};

const cancel = async (req, res) => {
  try {
    const appt = await findMine(req, res);
    if (!appt) return;
    res.json(await Appointment.setStatus(appt.id, "cancelled"));
  } catch (err) {
    res.status(500).json({ message: "Could not cancel" });
  }
};

// Doctor marks a visit as done so the patient can leave a review
const complete = async (req, res) => {
  try {
    const appt = await findMine(req, res);
    if (!appt) return;
    res.json(await Appointment.setStatus(appt.id, "completed"));
  } catch (err) {
    res.status(500).json({ message: "Could not update appointment" });
  }
};

const calendarFile = async (req, res) => {
  try {
    const appt = await findMine(req, res);
    if (!appt) return;
    res.set({ "Content-Type": "text/calendar", "Content-Disposition": "attachment; filename=appointment.ics" });
    res.send(makeICS(appt));
  } catch (err) {
    res.status(500).json({ message: "Could not create calendar file" });
  }
};

module.exports = { book, myAppointments, reschedule, cancel, complete, calendarFile };
