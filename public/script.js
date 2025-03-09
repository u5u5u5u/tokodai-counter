const socket = io();

socket.on("update counter", (counter) => {
  document.getElementById("counter").textContent = counter;
});

socket.on("updateWords", (incrementWord) => {
  document.getElementById("count-word").textContent = incrementWord;
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

const updateWords = () => {
  const newWord =
    document.getElementById("increment-word").value || "defaultWord";
  socket.emit("updateWords", newWord);
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

  if (transcript.includes(newWord)) {
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
