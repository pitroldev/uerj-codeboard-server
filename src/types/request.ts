import { Request } from "express";
import { UserDocument } from "@/models/mongo/user";

export interface AuthRequest extends Request {
  user: UserDocument;
}
