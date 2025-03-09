const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

let counter = 0;

io.on("connection", (socket) => {
  socket.emit("update counter", counter);

  socket.on("increment", () => {
    if (counter < 99) {
      counter++;
    }
    io.emit("update counter", counter);
  });

  socket.on("decrement", () => {
    if (counter > 0) {
      counter--;
    }
    io.emit("update counter", counter);
  });

  socket.on("reset", () => {
    counter = 0;
    io.emit("update counter", counter);
  });

  socket.on("updateWords", (newWord) => {
    incrementWord = newWord;
    console.log("Increment word updated: ", incrementWord);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
