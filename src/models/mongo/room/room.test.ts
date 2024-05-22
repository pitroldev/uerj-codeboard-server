import { describe, it, expect } from "bun:test";

import Room from "@/models/mongo/room";

import factories from "@tests/factories";

describe("Room Model", function () {
  it("should be defined and be a model", function () {
    expect(Room).toBeDefined();
    expect(Room.modelName).toBe("Room");
  });

  it("should create a new Room", async function () {
    const params = await factories.Room.build();

    const room = await Room.create(params);

    expect(room).toBeDefined();
    expect(room).toBeInstanceOf(Room);
    expect(room._id).toBeDefined();

    expect(room.name).toBe(params.name);
    expect(room.description).toBe(params.description);
    expect(room.owner).toBe(params.owner);
    expect(room.createdAt).toBeInstanceOf(Date);
  });

  it("should name be required", async function () {
    const params = await factories.Room.build();

    expect(Room.create({ ...params, name: undefined })).rejects.toThrowError();
  });

  it("should trim spaces in the name field", async function () {
    const params = await factories.Room.build({ name: "  Sala  " });
    const room = await Room.create(params);
    expect(room.name).toBe("Sala");
  });

  it("should description be required", async function () {
    const params = await factories.Room.build();

    expect(
      Room.create({ ...params, description: undefined })
    ).rejects.toThrowError();
  });

  it("should trim spaces in the description field", async function () {
    const params = await factories.Room.build({ description: "  Descrição  " });
    const room = await Room.create(params);
    expect(room.description).toBe("Descrição");
  });

  it("should owner be required", async function () {
    const params = await factories.Room.build();

    expect(Room.create({ ...params, owner: undefined })).rejects.toThrowError();
  });
});
