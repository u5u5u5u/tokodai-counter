const socket = io();

socket.on("update counter", (counter) => {
  document.getElementById("counter").textContent = counter;
});

const incrementCounter = () => {
  socket.emit("increment");
};

const decrementCounter = () => {
  socket.emit("decrement");
};
