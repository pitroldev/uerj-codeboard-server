import { type Document, Model, Types } from "mongoose";

export interface BoardProps {
  language: string;
  content: string;
  user: Types.ObjectId;
  room: Types.ObjectId;
  updatedAt: Date;
  createdAt: Date;
}

export interface BoardDocument extends BoardProps, Document {}

export interface BoardModel extends Model<BoardDocument> {}
