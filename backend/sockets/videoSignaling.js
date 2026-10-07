// WebRTC signaling: the server only passes offer, answer and ICE messages between two people
const setupVideo = (io) => {
  io.on("connection", (socket) => {
    socket.on("call:join", (roomId) => {
      socket.join(`call:${roomId}`);
      socket.to(`call:${roomId}`).emit("call:user-joined", socket.id);
    });
    socket.on("call:offer", ({ roomId, offer }) => socket.to(`call:${roomId}`).emit("call:offer", offer));
    socket.on("call:answer", ({ roomId, answer }) => socket.to(`call:${roomId}`).emit("call:answer", answer));
    socket.on("call:ice", ({ roomId, candidate }) => socket.to(`call:${roomId}`).emit("call:ice", candidate));
    socket.on("call:leave", (roomId) => {
      socket.leave(`call:${roomId}`);
      socket.to(`call:${roomId}`).emit("call:ended");
    });
  });
};

module.exports = setupVideo;
