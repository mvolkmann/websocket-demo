const WebSocket = require('ws');

const portToWsMap = {};

const ports = [1234, 1235];
ports.forEach(connect);

function connect(port) {
  const wss = new WebSocket.Server({port});
  wss.on('connection', ws => {
    console.log('websocket for port', port, 'opened');
    portToWsMap[port] = ws;

    ws.on('close', () => {
      delete portToWsMap[port];
      console.log('websocket for port', port, 'closed');
    });

    ws.on('message', data => {
      console.log('port', port, 'received', data);

      // Send data to all the other ports.
      ports.forEach(p => {
        if (p === port) return; // don't send to self
        const otherWs = portToWsMap[p];
        if (otherWs) {
          try {
            otherWs.send(data);
          } catch (e) {
            const isClosed = e.message.includes('CLOSED');
            if (isClosed) {
              console.error('websocket for port', p, 'was closed');
            } else {
              console.error(e);
            }
          }
        }
      });
    });
  });
}

console.log('ready');
