// 🧠 Function to ask QBot a question
async function askQBot(question) {
  const response = await fetch("https://eozflslbwks0pha.m.pipedream.net", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question })
  });

  const data = await response.json();

  // ✅ Return the response from QBot
  return data.answer || "Sorry, I couldn't get an answer.";
}

// 💬 Example usage: asking the bot when user submits a question
document.getElementById("ask-btn").addEventListener("click", async () => {
  const input = document.getElementById("question").value;
  const answerBox = document.getElementById("qbot-answer");

  answerBox.textContent = "QBot is thinking...";

  try {
    const answer = await askQBot(input);
    answerBox.textContent = answer;
  } catch (error) {
    answerBox.textContent = "QBot failed to respond. Please try again.";
    console.error(error);
  }
});
