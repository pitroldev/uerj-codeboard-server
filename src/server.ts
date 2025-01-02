import dotenv from "dotenv";
dotenv.config();

import { Server as HttpServer } from "http";
import { Socket, Server as SocketIOServer } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";

import "@/db/mongo";
import redisClient from "@/db/redis";
import app from "@/app";

import { ENV, SERVER_PORT } from "@/config";

import sqsService from "@/services/sqs";
import { messageHandler } from "@/consumers/handler";

import { handleSocketAuth } from "@/middlewares/socket-auth";

import { handleRoomEvents } from "@/events/room";
import { handleBoardEvents } from "@/events/board";
import { handleDisconnectEvents } from "@/events/disconnect";

const httpServer = new HttpServer(app);
console.log(`[SERVER] ${ENV} server running on port ${SERVER_PORT}`);

const pubClient = redisClient;
const subClient = pubClient.duplicate();

const io = new SocketIOServer(httpServer, {
  transports: ["websocket", "polling"],
  cors: { methods: ["GET", "POST"] },
  adapter: createAdapter(pubClient, subClient),
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

httpServer.listen(SERVER_PORT);

sqsService.startPolling(15_000, async (message) => {
  await messageHandler(message);
});
