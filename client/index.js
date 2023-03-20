var ws;

// 監聽 click 事件
document.querySelector('#connect')?.addEventListener('click', (e) => {
  console.log('[click connect]');
  connect();
});

document.querySelector('#disconnect')?.addEventListener('click', (e) => {
  console.log('[click disconnect]');
  disconnect();
});

// 監聽 click 事件
document.querySelector('#sendBtn')?.addEventListener('click', (e) => {
  const msg = document.querySelector('#sendMsg');
  sendMessage(msg?.value);
  msg.value = '';
});

function connect() {
  // Create WebSocket connection
  ws = new WebSocket('ws://localhost:8080');

  ws.addEventListener('open', function () {
    console.log('Success connect~');
  });

  // 在開啟連線時執行
  ws.onopen = () => {
    console.log('[open connection]');
    // Listen for messages from Server
    ws.onmessage = (event) => {
      console.log(`[Message from server]:\n %c${event.data}`, 'color: blue');
    };
  };
}

function sendMessage(msg) {
  // Send messages to Server
  ws.send(msg);
}

function disconnect() {
  ws.close();
  // 在關閉連線時執行
  ws.onclose = () => console.log('[close connection]');
}
