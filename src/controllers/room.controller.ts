import { Response } from "express";

import { AuthRequest } from "@/types/request";
import { roomSchema } from "@/schemas/room";

import Room from "@/models/mongo/room";
import User from "@/models/mongo/user";

export async function create(req: AuthRequest, res: Response) {
  const { body, user } = req;

  const result = roomSchema.safeParse(body);
  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  const room = await Room.create({ ...result.data, owner: user._id });

  return res.status(201).json({
    data: room,
    message: "Sala criada com sucesso",
  });
}

export async function update(req: AuthRequest, res: Response) {
  const { body, params } = req;

  const result = roomSchema
    .pick({ name: true, description: true })
    .safeParse(body);

  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  const updatedRoom = await Room.findById(params.roomId);
  if (!updatedRoom) {
    res.status(404).json({ message: "Sala não encontrada" });
    return;
  }

  const isOwner = updatedRoom.owner.toString() === req.user._id.toString();
  if (!isOwner) {
    res
      .status(403)
      .json({ message: "Você não tem permissão para editar esta sala" });
    return;
  }

  updatedRoom.set(result.data);
  await updatedRoom.save();

  const populatedRoom = await updatedRoom.populate(["members", "owner"]);

  return res.status(200).json({
    data: populatedRoom,
    message: "Sala atualizada com sucesso",
  });
}

export async function list(req: AuthRequest, res: Response) {
  const { user } = req;

  const rooms = await Room.find({
    $or: [{ owner: user._id }, { members: user._id }],
  })
    .populate(["members", "owner"])
    .limit(50);

  return res.status(200).json({ data: rooms });
}

export async function show(req: AuthRequest, res: Response) {
  const { params } = req;

  const room = await Room.findById(params.roomId).populate([
    "members",
    "owner",
  ]);

  if (!room) {
    res.status(404).json({ message: "Sala não encontrada" });
    return;
  }

  return res.status(200).json({ data: room });
}

export async function addMember(req: AuthRequest, res: Response) {
  const { body, params } = req;

  const { email } = body;

  const room = await Room.findById(params.roomId);
  if (!room) {
    res.status(404).json({ message: "Sala não encontrada" });
    return;
  }

  const isOwner = room.owner.toString() === req.user._id.toString();
  if (!isOwner) {
    res
      .status(403)
      .json({ message: "Você não tem permissão para adicionar membros" });
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "Usuário não encontrado" });
    return;
  }

  const isMember =
    room.members.some((member) => member.toString() === user.id) ||
    room.owner.toString() === user.id;
  if (isMember) {
    res.status(400).json({ message: "Usuário já é membro desta sala" });
    return;
  }

  room.members.push(user.id);
  await room.save();

  const populatedRoom = await room.populate(["members", "owner"]);

  return res.status(200).json({
    data: populatedRoom,
    message: "Membro adicionado com sucesso",
  });
}

export async function removeMember(req: AuthRequest, res: Response) {
  const { params, user } = req;

  const room = await Room.findById(params.roomId);
  if (!room) {
    res.status(404).json({ message: "Sala não encontrada" });
    return;
  }

  const isOwner = room.owner.toString() === user.id;
  if (!isOwner) {
    res
      .status(403)
      .json({ message: "Você não tem permissão para remover membros" });
    return;
  }

  const memberIndex = room.members.findIndex(
    (member) => member.toString() === params.userId
  );
  if (memberIndex === -1) {
    res.status(404).json({ message: "Membro não encontrado" });
    return;
  }

  room.members = room.members.filter(
    (member) => member.toString() !== params.userId
  );
  await room.save();
  const populatedRoom = await room.populate(["members", "owner"]);

  return res.status(200).json({
    data: populatedRoom,
    message: "Membro removido com sucesso",
  });
}
