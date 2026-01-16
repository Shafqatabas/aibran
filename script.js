const chatWindow = document.getElementById("messages");
const inputField = document.getElementById("userInput");
const sendBtn = document.querySelector(".chat-input button");

function appendMessage(text, sender) {
  const div = document.createElement("div");
  div.className = sender === "user" ? "user-message" : "bot-message";
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendUserMessage() {
  const message = inputField.value.trim();
  if (!message) return;

  appendMessage(message, "user");
  inputField.value = "";

  const typing = document.createElement("div");
  typing.className = "bot-message";
  typing.textContent = "VirtualBrain AI is thinking...";
  chatWindow.appendChild(typing);

  try {
    const res = await fetch("https://chat-router-ai--khralali05.replit.app/api/app", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    typing.textContent = data.reply || "No reply from AI";

  } catch (err) {
    typing.textContent = "Connection error. AI server offline.";
  }
}

sendBtn.onclick = sendUserMessage;
inputField.addEventListener("keypress", e => {
  if (e.key === "Enter") sendUserMessage();
});

