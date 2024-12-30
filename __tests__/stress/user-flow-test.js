import ws from "k6/ws";
import http from "k6/http";
import { check, sleep, group } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 500 },
    { duration: "1m", target: 500 },
    { duration: "30s", target: 0 },
  ],
};

const BASE_URL = "http://localhost:3333";

const socketIoPath = "localhost:3333/socket.io/?EIO=4&transport=";

export default function () {
  let token, roomId, userId;

  group("Login", function () {
    const res = http.post(
      `${BASE_URL}/api/auth/login`,
      JSON.stringify({ email: "test@pitrol.dev", password: "Senha123*" }),
      { headers: { "Content-Type": "application/json" } }
    );
    check(res, { "status is 200": (r) => r.status === 200 });

    const body = res.json();
    token = body.authToken;
    userId = body.data._id;

    http.get(`${BASE_URL}/api/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    http.get(`${BASE_URL}/api/rooms`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    sleep(Math.random() * 5); // Think time
  });

  group("Create a Room", function () {
    const res = http.post(
      `${BASE_URL}/api/rooms`,
      JSON.stringify({
        name: "Room " + new Date().toISOString() + " " + Math.random(),
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    check(res, { "status is 200": (r) => r.status === 200 });

    const body = res.json();
    roomId = body.data._id;

    sleep(Math.random() * 8); // Think time
  });

  group("Enter the Room", function () {
    const res = http.get(`${BASE_URL}/api/room/${roomId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    check(res, { "status is 200": (r) => r.status === 200 });

    sleep(Math.random() * 5); // Think time
  });

  group("Code in the Room and Leave", function () {
    // HTTP then Websocket upgrading
    const received = http.get(`http://${socketIoPath}polling`);

    // substring 1 to remove first char protocol number
    const { sid, upgrades } = JSON.parse(received.body.substring(1));

    // Server informs websocket available
    if (upgrades.includes("websocket")) {
      // Use sid to upgrade current polling session
      ws.connect(`ws://${socketIoPath}websocket&sid=${sid}`, (socket) => {
        socket.on("open", () => {
          socket.send("2probe"); // Send ping
        });

        socket.on("message", (message) => {
          // Receive pong from server
          const hasReceivedPong = message === "3probe";
          if (hasReceivedPong) {
            socket.send("5"); // Upgrade
            socket.send(
              "40" + JSON.stringify({ Authorization: `Bearer ${token}` })
            ); // Ask default namespace / connection
          }

          // Namespace connected by server
          const isNamespaceConnected = message.startsWith("40");
          if (!isNamespaceConnected) return;

          const roomJoinMessage = formatMessage("room:joined", roomId);
          socket.send(roomJoinMessage);

          const roomMembersMessage = formatMessage(
            "board:join",
            roomId,
            userId
          );
          socket.send(roomMembersMessage);

          const qttyOfWrites = 10;
          for (let index = 0; index < qttyOfWrites; index++) {
            const codeMessage = formatMessage(
              "board:write",
              roomId,
              JSON.stringify({
                language: "javascript",
                content: `console.log('Hello, World! ${index}');`,
              })
            );
            socket.send(codeMessage);
            sleep(3);
          }

          socket.send("41");
          sleep(1);
          socket.close();
        });

        socket.on("error", (error) => {
          console.error(error);
        });
      });
    }
  });
}

const formatMessage = (...args) => {
  return `42${JSON.stringify(args)}`;
};
