import { Chance } from "chance";

import User, { type UserProps, type UserModel } from "@/models/mongo/user";

const build = (overrides?: Partial<UserProps>): UserProps => {
  const chance = new Chance();

  return {
    name: chance.name(),
    email: chance.email(),
    password: "Abc123!#@321",
    profilePictureUrl: chance.url(),
    createdAt: chance.date(),
    ...overrides,
  };
};

const create = async (overrides?: Partial<UserProps>): Promise<UserModel> => {
  const user = await User.create(build(overrides));

  return user;
};

const createMany = async (
  amount: number,
  overrides?: Partial<UserProps>
): Promise<UserModel[]> => {
  const users = [] as UserProps[];

  for (let i = 0; i < amount; i++) users.push(build(overrides));

  return await User.insertMany(users);
};

export default {
  build,
  create,
  createMany,
};
