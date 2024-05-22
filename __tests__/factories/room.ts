import { Chance } from "chance";

import Room, { type RoomProps, type RoomModel } from "@/models/mongo/room";

import UserFactory from "./user";

const build = async (overrides?: Partial<RoomProps>): Promise<RoomProps> => {
  const chance = new Chance();

  const owner = await UserFactory.create();

  return {
    name: chance.name(),
    description: chance.sentence(),
    owner: owner._id as any,
    createdAt: chance.date(),
    ...overrides,
  };
};

const create = async (overrides?: Partial<RoomProps>): Promise<RoomModel> => {
  const room = await Room.create(build(overrides));

  return room;
};

const createMany = async (
  amount: number,
  overrides?: Partial<RoomProps>
): Promise<RoomModel[]> => {
  const rooms = [] as RoomProps[];

  for (let i = 0; i < amount; i++) rooms.push(await build(overrides));

  return await Room.insertMany(rooms);
};

export default {
  build,
  create,
  createMany,
};
