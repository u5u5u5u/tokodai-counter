const socket = io();

socket.on("update counter", (counter) => {
  document.getElementById("counter").textContent = counter;
});

socket.on("updateWords", (countWord) => {
  console.log("Increment word updated: ", countWord);
  document.getElementById("count-text").textContent = countWord;
  document.getElementById("count-word").value = countWord;
});

let countWord = "defaultWord";

const incrementCounter = () => {
  socket.emit("increment");
};

const decrementCounter = () => {
  socket.emit("decrement");
};

const resetCounter = () => {
  socket.emit("reset");
};

const updateWords = () => {
  countWord = document.getElementById("count-word").value || "defaultWord";
  socket.emit("updateWords", countWord);
  console.log("Increment word updated: ", countWord);
  document.getElementById("count-word").value = countWord;
};

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "ja-JP";
recognition.continuous = true;
recognition.interimResults = true;

recognition.onresult = (event) => {
  const transcript = event.results[event.resultIndex][0].transcript.trim();
  console.log("Recognized: ", transcript);

  if (transcript.includes(countWord)) {
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
