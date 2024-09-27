import { Response } from "express";

import { AuthRequest } from "@/types/request";

import Board from "@/models/mongo/board";

export async function show(req: AuthRequest, res: Response) {
  const { params } = req;

  const board = await Board.findById(params.roomId);

  if (!board) {
    res.status(404).json({ message: "Board não encontrado" });
    return;
  }

  return res.status(200).json({ data: board });
}
