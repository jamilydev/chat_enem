const chatBox = document.getElementById("chat-box");

async function sendMessage() {
  const input = document.getElementById("user-input");
  const userText = input.value;
  if (!userText.trim()) return;

  appendMessage("Você", userText, "user");
  input.value = "";

  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer zAoIlJmiotmr6637RDeLRK1c5grLIir8",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistral-small",
      messages: [
        {
          role: "system",
          content: "Você é um tutor especializado no ENEM chamado clareia. Você é um assistente de IA que ajuda os alunos a se prepararem para o ENEM, respondendo perguntas e fornecendo dicas de estudo."
                  
        },
        {
          role: "user",
          content: userText
        }
      ]
    })
  });

  const data = await response.json();
  const botMessage = data.choices[0].message.content;
  appendMessage("Tutor ENEM", botMessage, "bot");
}

function appendMessage(sender, text, role) {
  const msg = document.createElement("div");
  msg.className = `message ${role}`;
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
