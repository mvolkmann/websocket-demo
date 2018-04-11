const portToWsMap = {};

export function getWebSocket(port, obj) {
  let ws = portToWsMap[port];

  if (!ws) {
    ws = new WebSocket('ws://localhost:' + port);
    portToWsMap[port] = ws;

    ws.onclose = () => console.info('Angular got websocket close');

    ws.onerror = event =>
      console.error('Angular got websocket error:', event.data);

    ws.onopen = () => console.info('Angular got websocket open for port', port);

    ws.onmessage = event => {
      const action = JSON.parse(event.data);
      obj[action.type] = action.payload;
    };
  }

  return ws;
}

export function wsDispatch(port, type, payload) {
  const ws = portToWsMap[port];
  if (!ws) {
    throw new Error('Did you forget to call getWebSocket(' + port + ')?');
  }
  ws.send(JSON.stringify({type, payload}));
}
