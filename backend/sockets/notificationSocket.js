// Booking and reschedule alerts. Each user joins a private room named after their id.
const jwt = require("jsonwebtoken");

const setupNotifications = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", (token) => {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        socket.join(`user:${user.id}`);
      } catch (err) {
        socket.emit("error-message", "Invalid token");
      }
    });
  });
};

const notify = (io, userId, message) => {
  io.to(`user:${userId}`).emit("notification", { message, at: new Date() });
};

module.exports = setupNotifications;
module.exports.notify = notify;
