import { type Document, Types } from "mongoose";

export interface RoomProps {
  name: string;
  description?: string;
  owner: Types.ObjectId;
  members?: Types.ObjectId[];
  createdAt: Date;
}

export interface RoomModel extends RoomProps, Document {}
