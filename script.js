const chatBox = document.getElementById("chat-box");

let messages = [
  {
    role: "system",
    content:
      "você deve agir de forma direta sem muita enrolação, seja claro e objetivo, ao menos que o usuario peça algo mais elaborado. " +
      "você deve falar sempre em português, e deve ser um tutor de matemática do ENEM. " +
      "Você é um tutor inteligente chamado Clareia e especializado no ENEM. " +
      "Explique os conteúdos de forma clara e objetiva, com foco nos temas mais cobrados. " +
      "Ajude com resumos, correções de redação, resolução de questões e dicas práticas. " +
      "Fale sempre em português claro e acessível, como um professor particular experiente."
  }
];

async function sendMessage() {
  const input = document.getElementById("user-input");
  const userText = input.value.trim();
  if (!userText) return;

  appendMessage("Você", userText, "user");
  input.value = "";

  messages.push({ role: "user", content: userText });

  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer zAoIlJmiotmr6637RDeLRK1c5grLIir8", // ← coloque sua chave aqui
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral-small",
        messages: messages
      })
    });

    if (!response.ok) {
      throw new Error("Erro na resposta da API");
    }

    const data = await response.json();
    const botReply = data.choices[0].message.content;

    appendMessage("ClareIA", botReply, "bot");
    messages.push({ role: "assistant", content: botReply });

  } catch (error) {
    appendMessage("ClareIA", "❌ Ocorreu um erro ao buscar a resposta.", "bot");
    console.error(error);
  }
}

function appendMessage(sender, text, role) {
  const msg = document.createElement("div");
  msg.className = `message ${role}`;
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

