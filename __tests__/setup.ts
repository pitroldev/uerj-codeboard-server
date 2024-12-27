import { beforeAll, afterAll, afterEach } from "vitest";
import MockDB from "@tests/mock/mongodb";

beforeAll(async () => {
  await MockDB.setup();
});

afterEach(async () => {
  await MockDB.clear();
});

afterAll(async () => {
  await MockDB.teardown();
});
