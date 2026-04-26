export default (io) => {
  io.on("connection", socket => {
    socket.on("join", room => socket.join(room));
    socket.on("timer", data => io.to(data.room).emit("timer", data.time));
    socket.on("end", room => io.to(room).emit("ended"));
  });
};