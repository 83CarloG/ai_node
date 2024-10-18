// server/index.js
const fastify = require('fastify')({ logger: true });
const path = require('path');
const config = require(path.resolve(process.cwd(), "config"));

// Importa le rotte
const testRoutes = require(path.resolve(process.cwd(), "server/routes/test"));
const queryRoutes = require(path.resolve(process.cwd(), "server/routes/query"));
//const promptRoutes = require(path.resolve(process.cwd(), "server/routes/prompt"));
fastify.register(require('@fastify/static'), {
  root: path.resolve(process.cwd(), "public"),
  prefix: '/public/', // optional: add a prefix to the URL
})



// Registra la rotta
fastify.register(testRoutes,queryRoutes);

// Funzione per avviare il server
const start = async () => {
  try {
    await fastify.listen({ port: config.HTTP_PORT });
    console.log('Server in ascolto su http://localhost:' + config.HTTP_PORT);

  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

module.exports = { start };
