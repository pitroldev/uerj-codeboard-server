import mongoose, { model } from "mongoose";

import { BoardSchema } from "./board-schema";
import { BoardModel } from "./board.types";

const Board: mongoose.Model<BoardModel> =
  mongoose.models.Board || model<BoardModel>("Board", BoardSchema);

export default Board;
