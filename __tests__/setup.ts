import { beforeAll, afterAll, afterEach } from "bun:test";
import MockDB from "@tests/mock/mongodb";

beforeAll(async function () {
  await MockDB.setup();
});

afterEach(async function () {
  await MockDB.clear();
});

afterAll(async function () {
  await MockDB.teardown();
});
