const WebSocket = require('ws');

/*
function dump(label, obj) {
  console.log(label);
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      console.log(prop, '=', obj[prop]);
    }
  }
}
*/

const idToPortsMap = {};

const ports = [1234, 1235];
ports.forEach(connect);

function connect(port) {
  const wss = new WebSocket.Server({port});
  wss.on('connection', (ws, req) => {
    // Get a unique identifier for the client.  See
    // https://stackoverflow.com/questions/14822708/
    // how-to-get-client-ip-address-with-
    // websocket-websockets-ws-library-in-node-js
    // The x-forward-for header is set when there is a proxy server.
    const clientId =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('websocket for port', port, 'opened');

    let portToWsMap = idToPortsMap[clientId];
    if (!portToWsMap) portToWsMap = idToPortsMap[clientId] = {};

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
