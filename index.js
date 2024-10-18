const path = require("path");
const config = require(path.resolve(process.cwd(), "config"));
const axios = require('axios');

// Configurazione Mistral AI
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';


async function mistralCompletion(prompt, max_tokens = 100) {
  try {
    const response = await axios.post(MISTRAL_API_URL, {
      model: "open-mistral-7b", // o altro modello Mistral disponibile
      messages: [{ role: "user", content: prompt }],
      max_tokens: max_tokens
    }, {
      headers: {
        'Authorization': `Bearer ${MISTRAL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Errore nella chiamata a Mistral AI:', error);
    throw error;
  }
}





async function ragProcess(userQuery) {
  try {
    const response = await mistralCompletion(userQuery);
    return response;
  } catch (error) {
    console.error('Errore durante la chiamata a Mistral AI:', error);
    throw error;
  }
  
}

// Esempio di utilizzo
const userQuery = "Come funziona la fotosintesi?";
ragProcess(userQuery).then(results => {
  console.log("Risultati RAG:", results);
});