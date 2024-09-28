import { type Document, Model, Types } from "mongoose";

export interface RoomProps {
  name: string;
  description?: string;
  owner: Types.ObjectId;
  members?: Types.ObjectId[];
  createdAt: Date;
}

export interface RoomDocument extends RoomProps, Document {}

export interface RoomModel extends Model<RoomDocument> {}
