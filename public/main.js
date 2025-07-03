const BACKEND_URL = "https://quantiva-backend.onrender.com";

async function uploadChart() {
  const input = document.getElementById("chartInput");
  const file = input.files[0];
  if (!file) return alert("Please select a chart image.");

  const formData = new FormData();
  formData.append("file", file);

  document.getElementById("chartResult").innerText = "Scanning...";

  try {
    const res = await fetch(`${BACKEND_URL}/scan`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    document.getElementById("chartResult").innerText = JSON.stringify(data, null, 2);
  } catch (err) {
    document.getElementById("chartResult").innerText = "Scan failed.";
  }
}

async function askQBot() {
  const question = document.getElementById("qbotInput").value;
  if (!question.trim()) return;

  document.getElementById("qbotAnswer").innerText = "Thinking...";

  try {
    const res = await fetch(`${BACKEND_URL}/qbot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    document.getElementById("qbotAnswer").innerText = data.answer || "No answer returned.";
  } catch (err) {
    document.getElementById("qbotAnswer").innerText = "QBot failed to respond.";
  }
}
