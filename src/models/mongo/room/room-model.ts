import mongoose, { model } from "mongoose";

import { RoomSchema } from "./room-schema";
import { RoomModel } from "./room.types";

const Room: RoomModel = mongoose.models.Room || model("Room", RoomSchema);

export default Room;
