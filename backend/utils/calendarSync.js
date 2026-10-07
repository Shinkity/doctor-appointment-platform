// Build an .ics file that opens in Google Calendar, Outlook and Apple Calendar
const toStamp = (date, time) => {
  const [clock, ampm] = time.split(" ");
  let [h, m] = clock.split(":").map(Number);
  if (ampm === "PM" && h < 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(h)}${pad(m)}00`;
};

const makeICS = (appt) => {
  const start = toStamp(appt.date, appt.time);
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//CareLink//EN", "BEGIN:VEVENT",
    `UID:appointment-${appt.id}@carelink`, `DTSTAMP:${start}`, `DTSTART:${start}`,
    "DURATION:PT30M", "SUMMARY:Doctor appointment", `DESCRIPTION:${appt.reason || "Consultation"}`,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
};

module.exports = { makeICS };
