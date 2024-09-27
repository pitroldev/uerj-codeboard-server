import express from "express";
import morgan from "morgan";
import cors from "cors";

import needAuth from "@/middlewares/need-auth";

import * as authController from "@/controllers/auth.controller";
import * as userController from "@/controllers/user.controller";
import * as roomController from "@/controllers/room.controller";
import * as boardController from "@/controllers/board.controller";

const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_, res) => {
  res.status(200).send();
});

app.post("/api/auth/login", authController.login);
app.post("/api/auth/signup", userController.create);

app.get("/api/user", needAuth, userController.show);
app.put("/api/user", needAuth, userController.update);

app.get("/api/rooms", needAuth, roomController.list);
app.post("/api/rooms", needAuth, roomController.create);
app.get("/api/rooms/:roomId", needAuth, roomController.show);
app.post("/api/rooms/:roomId", needAuth, roomController.update);

app.post("/api/rooms/:roomId/members", needAuth, roomController.addMember);
app.delete(
  "/api/rooms/:roomId/members/:userId",
  needAuth,
  roomController.removeMember
);

app.get("/api/board/:roomId", needAuth, boardController.show);

app.use((_, res) => {
  res.status(404).send();
});

export default app;
