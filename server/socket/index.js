const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Message = require("../models/message.model");

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", socket => {
    console.log("Socket connected:", socket.id);

    socket.on("auth", token => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id;
        socket.join(decoded.id); // user-specific room
      } catch {
        socket.disconnect();
      }
    });

    socket.on("send-message", async ({ to, content }) => {
      if (!socket.userId) return;

      const message = await Message.create({
        sender: socket.userId,
        receiver: to,
        content,
      });

      io.to(to).emit("receive-message", message);
     // io.to(socket.userId).emit("receive-message", message);
     io.emit("message-sent", message);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
}

module.exports = initSocket;
