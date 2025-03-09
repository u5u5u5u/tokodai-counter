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

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "ja-JP";
recognition.continuous = true;

recognition.onresult = (event) => {
  const transcript = event.results[event.resultIndex][0].transcript.trim();
  console.log("Recognized: ", transcript);

  if (transcript.includes("東工大")) {
    incrementCounter();
  } else if (transcript.includes("科学大")) {
    decrementCounter();
  }
};

recognition.onerror = (event) => {
  console.error("Speech Recognition error: ", event.error);
};

recognition.onend = () => {
  console.log("Speech Recognition ended");
  recognition.start();
};

recognition.start();
