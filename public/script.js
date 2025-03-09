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

let incrementWord = "増やす";

const updateWords = () => {
  incrementWord =
    document.getElementById("increment-word").value || incrementWord;
  console.log("Increment word updated: ", incrementWord);
};

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "ja-JP";
recognition.continuous = true;

recognition.onresult = (event) => {
  const transcript = event.results[event.resultIndex][0].transcript.trim();
  console.log("Recognized: ", transcript);

  if (transcript.includes(incrementWord)) {
    incrementCounter();
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
