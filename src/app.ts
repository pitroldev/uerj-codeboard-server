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

app.get("/health", (_, res) => {
  res.status(200).json({ status: "OK" });
});

app.post("/login", authController.login);
app.post("/register", userController.create);

app.use(needAuth);

app.get("/user", userController.show);
app.put("/user", userController.update);

app.get("/rooms", roomController.list);
app.get("/rooms/:roomId", roomController.show);
app.put("/rooms/:roomId", roomController.update);
app.post("/rooms", roomController.create);

app.put("/rooms/:roomId/members", roomController.addMember);
app.delete("/rooms/:roomId/members/:userId", roomController.removeMember);

app.use((_, res) => {
  res.status(404).json({ message: "Endpoint não encontrado" });
});

export default app;
