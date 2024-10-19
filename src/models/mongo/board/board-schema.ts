import { Schema } from "mongoose";

import { BoardDocument } from "./board.types";

const BoardSchema = new Schema<BoardDocument>(
  {
    language: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    updatedAt: {
      type: Date,
      default: () => new Date(),
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { collection: "board" }
);

BoardSchema.index({ room: 1, owner: 1 }, { unique: true });

BoardSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export { BoardSchema };
