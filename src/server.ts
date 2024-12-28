import dotenv from "dotenv";
dotenv.config();

import { Server as HttpServer } from "http";
import { Socket, Server as SocketIOServer } from "socket.io";

import "@/db/mongo";
import "@/db/redis";
import app from "@/app";

import { ENV, SERVER_PORT } from "@/config";

import sqsService from "@/services/sqs";
import { messageHandler } from "@/consumers/handler";

import { handleSocketAuth } from "@/middlewares/socket-auth";

import { handleRoomEvents } from "@/events/room";
import { handleBoardEvents } from "@/events/board";
import { handleDisconnectEvents } from "@/events/disconnect";

const httpServer = new HttpServer(app);
httpServer.listen(SERVER_PORT);
console.log(`[SERVER] ${ENV} server running on port ${SERVER_PORT}`);

const io = new SocketIOServer(httpServer, {
  cors: { methods: ["GET", "POST"] },
});

io.use(handleSocketAuth);

interface CustomSocket extends Socket {
  user: { _id: string };
}

io.on("connect", (socket: Socket) => {
  const userId = (socket as CustomSocket).user._id;

  handleDisconnectEvents(socket, userId);
  handleRoomEvents(socket, userId);
  handleBoardEvents(socket, userId);
});

sqsService.startPolling(15_000, async (message) => {
  await messageHandler(message);
});
