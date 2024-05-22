import { Schema } from "mongoose";

import { roomSchema } from "@/schemas/room";

import { type RoomModel } from "./room.types";

const RoomSchema = new Schema<RoomModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      validate: [
        (v: string) => {
          const result = roomSchema.shape.name.safeParse(v);
          return result.success || result.error.message;
        },
      ],
    },
    description: {
      type: String,
      trim: true,
      validate: [
        (v: string) => {
          const result = roomSchema.shape.name.safeParse(v);
          return result.success || result.error.message;
        },
      ],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { collection: "room" }
);

export { RoomSchema };
