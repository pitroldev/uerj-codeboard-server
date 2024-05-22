import { Request } from "express";
import { UserModel } from "@/models/mongo/user";

export interface AuthRequest extends Request {
  user: UserModel;
}
