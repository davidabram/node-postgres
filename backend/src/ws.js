const { Server, OPEN } = require('ws');

const wss = new Server({ port: 40500 });

const broadcastLock = (id) => {
  wss.clients.forEach((client) => {
    if (client.readyState === OPEN) {
      client.send(JSON.stringify({ type: 'LOCK', id }));
    }
  });
};

const broadcastUnlock = (id) => {
  wss.clients.forEach((client) => {
    if (client.readyState === OPEN) {
      client.send(JSON.stringify({ type: 'UNLOCK', id }));
    }
  });
};

module.exports = { broadcastLock, broadcastUnlock };
