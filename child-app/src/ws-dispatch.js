import {dispatch} from 'redux-easy';

const portToWsMap = {};

export function getWebSocket(port) {
  let ws = portToWsMap[port];

  if (!ws) {
    ws = new WebSocket('ws://localhost:' + port);
    portToWsMap[port] = ws;

    ws.onclose = () => console.info('React got websocket close');

    ws.onerror = event => console.error('React got websocket error:', event.data);

    ws.onopen = () => console.info('React got websocket open for port', port);

    ws.onmessage = event => {
      const action = JSON.parse(event.data);
      dispatch(action.type, action.payload);
    };
  }

  return ws;
}

export function wsDispatch(port, type, payload) {
  let ws = portToWsMap[port];
  if (!ws)
    throw new Error('Did you forget to call getWebSocket(' + port + ')?');
  ws.send(JSON.stringify({type, payload}));
}
