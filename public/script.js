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

const resetCounter = () => {
  socket.emit("reset");
};

let incrementWord = "増やす";

const updateWords = () => {
  const newWord =
    document.getElementById("increment-word").value || incrementWord;
  socket.emit("updateWords", newWord);
  document.getElementById("count-word").textContent = newWord;
  console.log("Increment word updated: ", newWord);
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
