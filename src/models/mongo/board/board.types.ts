import { type Document, Types } from "mongoose";

export interface BoardProps {
  content: string;
  user: Types.ObjectId;
  room: Types.ObjectId;
  updatedAt: Date;
  createdAt: Date;
}

export interface BoardModel extends BoardProps, Document {}
