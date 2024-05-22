import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo: MongoMemoryServer;

async function setup(): Promise<void> {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  mongoose
    .connect(uri, {
      dbName: "growth-engage-test",
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      return mongoose;
    })
    .catch((err) => {
      console.error("[TEST MONGODB] Connection error:", err);
      throw err;
    });
}

async function clear(): Promise<void> {
  if (!mongo) return;

  const collections = mongoose.connection.collections;

  await Promise.all(
    Object.keys(collections).map(async (key) => {
      const collection = collections[key];
      await collection.deleteMany({});
    })
  );
}

async function teardown(): Promise<void> {
  if (!mongo) return;

  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
}

export default {
  setup,
  clear,
  teardown,
};
