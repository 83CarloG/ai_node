"use strict";

// server/route/test.js test server
module.exports = async (fastify, options) => {
  fastify.get('/ping', async (request, reply) => {
    return 'pong';
  });
}
