import express from "express";
import morgan from "morgan";
import cors from "cors";

import needAuth from "@/middlewares/need-auth";

import * as authController from "@/controllers/auth.controller";
import * as userController from "@/controllers/user.controller";
import * as roomController from "@/controllers/room.controller";

const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_, res) => {
  res.status(200).json({ status: "OK" });
});

app.post("/api/login", authController.login);
app.post("/api/register", userController.create);

app.use(needAuth);

app.get("/api/user", userController.show);
app.put("/api/user", userController.update);

app.get("/api/rooms", roomController.list);
app.get("/api/rooms/:roomId", roomController.show);
app.put("/api/rooms/:roomId", roomController.update);
app.post("/api/rooms", roomController.create);

app.put("/api/rooms/:roomId/members", roomController.addMember);
app.delete("/api/rooms/:roomId/members/:userId", roomController.removeMember);

app.use((_, res) => {
  res.status(404).json({ message: "Endpoint não encontrado" });
});

export default app;
