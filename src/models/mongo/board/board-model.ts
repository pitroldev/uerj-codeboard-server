import mongoose, { model } from "mongoose";

import { BoardSchema } from "./board-schema";
import { BoardModel } from "./board.types";

const Board: BoardModel = mongoose.models.Board || model("Board", BoardSchema);

export default Board;
