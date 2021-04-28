const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const properties = require("./config/properties");

// Static Files
app.use(express.static(path.join(__dirname, "core")));

// websockets
io.on("connection", (socket) => {
  console.log(`A new User have been connected ${socket.id}`);

  socket.on("chat-message", (data) => {
    io.sockets.emit("chat-message", data);
  });

  socket.on("chat-typing", (data) => {
    socket.broadcast.emit("chat-typing", data);
  });
});

// Server Start
server.listen(properties.PORT, () => {
  console.log(`The server is listening on port ${properties.PORT}`);
});
