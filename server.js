const app = require("./src/app");
const server = require("http").Server(app);
const io = require("socket.io")(server);

// server.listen(process.env.UERJ_CODEBOARD || 3333);

server.listen(3333);

let storedData = {};

io.on("connect", (socket) => {
  socket.on("codeboard", (boardName) => {
    socket.emit(boardName, { ...storedData[boardName] });
    socket.on(boardName, (user) => {
      storedData = {
        ...storedData,
        [boardName]: { ...storedData[boardName], [user.id]: user },
      };

      socket.broadcast.emit(boardName, { ...storedData[boardName] });
    });
  });
});
