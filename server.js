const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//Run when a client connects
io.on("connection", (socket) => {
  console.log("New socket connection");

  //User enters the chat
  socket.emit("message", "User entered the  Chat!");

  //Broadcast when a user connects
  socket.broadcast.emit("message", "A user has joined the chat");

  //When client disconnects
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
