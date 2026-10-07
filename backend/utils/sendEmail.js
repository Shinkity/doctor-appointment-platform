// Send an email. If email is not set up yet it only logs a message, so booking never fails.
const transporter = require("../config/nodemailer");

const sendEmail = async (to, subject, text) => {
  if (!process.env.EMAIL_USER) return console.log(`[email skipped] ${to}: ${subject}`);
  try {
    await transporter.sendMail({ from: `CareLink <${process.env.EMAIL_USER}>`, to, subject, text });
  } catch (err) {
    console.error("Email failed:", err.message);
  }
};

module.exports = sendEmail;
