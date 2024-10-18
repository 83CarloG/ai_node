"use strict";
const path = require("path");
const process = require("process");
const config = require(path.resolve(process.cwd(), "config"));
const axios = require("axios");

module.exports = async (fastify, options) => {
    fastify.get("/query", async (request, reply) => {
        const userQuery = request.query.userQuery;
        if (!userQuery) {
            reply.code(400).send({ error: "Missing userQuery parameter" });
            return; // Assicurati di interrompere l'esecuzione qui
        }

        async function mistralCompletion(prompt, max_tokens = 100) {
            try {
                const response = await axios.post(config.MISTRAL_API_URL, {
                    model: config.MISTRAL_MODEL,
                    messages: [{ role: "user", content: prompt }],
                    max_tokens: max_tokens
                }, {
                    headers: {
                        'Authorization': `Bearer ${config.MISTRAL_API_KEY}`,
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

        // Esegui il processo RAG e invia i risultati
        try {
            const results = await ragProcess(userQuery);
            return reply.send({ results }); // Aggiunto "return" per evitare doppi invii
        } catch (error) {
            return reply.code(500).send({ error: 'Internal Server Error' }); // Aggiunto "return" qui per evitare doppi invii
        }
    });
};
