const app = require("./src/app");
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(process.env.PORT_UERJ_CODEBOARD_SERVER_SERVER || 21117);

let storedData = {};

io.on("connect", (socket) => {
  socket.on("codeboard", (boardName) => {
    socket.emit(boardName, { ...storedData[boardName] });
    socket.on(boardName, (user) => {
      storedData = {
        ...storedData,
        [boardName]: { ...storedData[boardName], [user.id]: user },
      };

      socket.emit(`${boardName}/me`, { ...storedData[boardName] });
      socket.broadcast.emit(boardName, { ...storedData[boardName] });
    });
  });
});
