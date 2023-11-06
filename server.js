const app = require("./src/app");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    methods: ['GET', 'POST']
  }
});

let storedData = {};

io.on("connect", (socket) => {
  console.log('connected', socket.id)
  
  socket.on("codeboard", (boardName) => {
    console.log('codeboard', boardName, socket.id)
    socket.emit(boardName, { users: storedData[boardName]?.users });
    socket.on(`${boardName}`, (user) => { // Escrevendo no board
      const currentBoard = storedData[boardName];
      const currentUser = currentBoard && currentBoard[user.id];
      const currentUsers = currentBoard && currentBoard.users;
      const timeouts = currentBoard && currentBoard.timeouts;

      if (currentBoard) {
        storedData[boardName][user.id] = { ...currentUser, ...user }
        
        if (!timeouts) {
          storedData[boardName].timeouts = {}
        }

        if (!currentUsers) {        
          storedData[boardName].users = {}
        }
      } else {
        storedData[boardName] = {}
      }

      socket.broadcast.emit(`${boardName}/${user.id}`, user); // emit to all
      
      // Typing logic 
      if (currentUsers && !currentUsers[user.id]) {
        storedData[boardName].users[user.id] = true
        socket.broadcast.emit(boardName,  storedData[boardName]?.users);
        socket.emit(boardName, storedData[boardName]?.users);
      }

      if (timeouts) {   
        timeouts[user.id] && clearTimeout(timeouts[user.id]) 
        timeouts[user.id] = setTimeout(() => {
          storedData[boardName].users[user.id] = false
          socket.broadcast.emit(`${boardName}`, storedData[boardName]?.users);
          socket.emit(boardName, storedData[boardName]?.users);
        }, 1000)
      }
    });
    
    socket.on(`${boardName}/get`, (userID) => { // get user      
      socket.emit(`${boardName}/${userID}`, storedData[boardName]?.[userID]);
    })
  });
});


if (process.env.NODE_ENV) {
  console.log("SERVER STARTED IN DEBUG MODE");
  server.listen(3333);
} else {
  console.log("SERVER STARTED");
  server.listen(process.env.PORT_UERJ_CODEBOARD_SERVER_SERVER || 21117);
}