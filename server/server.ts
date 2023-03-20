import express from 'express';
import WebSocket, { Server } from 'ws';

const PORT = 8080;

// 建立 express 物件並用來監聽 8080 port
const server = express().listen(PORT, () =>
  console.log(`[Server] Listening on https://localhost:${PORT}`)
);

// 透過 Server 開啟 WebSocket 的服務
const wss = new Server({ server: server });

// Connection opened
wss.on('connection', (ws: WebSocket, req) => {
  let id = req.headers['sec-websocket-key'];
  if (id) id = id.substring(0, 8);

  ws.send(`[Client ${id} is connected!]`);

  // Listen for messages from client
  ws.on('message', (data) => {
    console.log('[Message from client] data: ', data);
    // Get clients who has connected
    let clients = wss.clients;
    // Use loop for sending messages to each client
    clients.forEach((client) => {
      client.send(`${id}: ` + data);
    });
  });

  // Connection closed
  ws.on('close', () => {
    console.log('[Close connected]');
  });
});
