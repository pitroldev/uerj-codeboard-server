const app = require("./src/app");
const server = require("http").Server(app);
const io = require("socket.io")(server);

if (process.env.NODE_ENV) {
  console.log("SERVER STARTED IN DEBUG MODE");
  server.listen(3333);
} else {
  console.log("SERVER STARTED");
  server.listen(process.env.PORT_UERJ_CODEBOARD_SERVER_SERVER || 21117);
}

let storedData = {};

io.on("connect", (socket) => {
  socket.on("codeboard", (boardName) => {
    socket.emit(boardName, { ...storedData[boardName] });
    socket.on(boardName, (user) => {
      const currentBoard = storedData[boardName];
      const currentUser = currentBoard && currentBoard[user.id];

      storedData = {
        ...storedData,
        [boardName]: {
          ...currentBoard,
          [user.id]: { ...currentUser, ...user },
        },
      };

      socket.emit(`${boardName}/me`, { ...storedData[boardName] });
      socket.broadcast.emit(boardName, { ...storedData[boardName] });
    });
  });
});
