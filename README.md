# websocket-demo

This demonstrates using WebSockets to communicate between
an Angular app and two React apps embedded inside it
using &lt;object> tags.
The Angular app was created using the Angular CLI.
The React app was created using create-react-app.
The WebSocket server was created using Node.js.

To run this:

1. open a terminal
2. cd server
3. npm install
4. npm run start

5. open a terminal
6. cd child-app (hosts a React app)
7. npm install
8. npm run start
9. close the browser window that opens to localhost:3000

10. open a terminal
11. cd parent-app (hosts an Angular app)
12. npm install
13. npm run start

14. browse localhost:4200
