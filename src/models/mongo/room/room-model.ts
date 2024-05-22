import mongoose, { model } from "mongoose";

import { RoomSchema } from "./room-schema";
import { RoomModel } from "./room.types";

const Room: mongoose.Model<RoomModel> =
  mongoose.models.Room || model<RoomModel>("Room", RoomSchema);

export default Room;
