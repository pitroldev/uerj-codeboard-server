import ws from "k6/ws";
import http from "k6/http";
import { check, sleep, group } from "k6";

export const options = {
  stages: [
    { duration: "3m", target: 300 },
    { duration: "5m", target: 300 },
    { duration: "2m", target: 0 },
  ],
};

const BASE_URL = "https://api.growthstation.ai";

const socketIoPath = "https://api.growthstation.ai/socket.io/?EIO=4&transport=";

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
    // Directly upgrade to WebSocket
    ws.connect(`ws://${socketIoPath}websocket`, (socket) => {
      socket.on("open", () => {
        socket.send("2probe"); // Send ping
        console.log("open");
      });

      socket.on("message", (message) => {
        // Receive pong from server
        console.log("message", message);
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

        const roomJoinMessage = formatMessage("room:join", roomId);
        socket.send(roomJoinMessage);

        const roomMembersMessage = formatMessage("board:join", roomId, userId);
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
        console.error("connect error", error);
      });
    });
  });
}

const formatMessage = (...args) => {
  return `42${JSON.stringify(args)}`;
};
