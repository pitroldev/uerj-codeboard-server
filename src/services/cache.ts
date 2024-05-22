import redis from "@/db/redis";

async function load<T>(key: string): Promise<[T, boolean]> {
  try {
    const strContent = await redis.get(key);

    const cacheData = await JSON.parse(strContent || "{}").catch(
      () => strContent
    );

    return cacheData;
  } catch (err) {
    console.log("[ERROR][CACHE] cache.load", err);
    return null;
  }
}

async function save<T>(
  key: string,
  data: T,
  expirationInSeconds?: number
): Promise<boolean> {
  try {
    const strContent = JSON.stringify(data);

    const result = await redis.set(key, strContent, "EX", expirationInSeconds);

    const wasSuccessful = result === "OK";
    return wasSuccessful;
  } catch (err) {
    console.log("[ERROR][CACHE] cache.save", err);
    return false;
  }
}

async function remove(key: string): Promise<boolean> {
  try {
    const result = await redis.del(key);

    const wasSuccessful = result === 1;
    return wasSuccessful;
  } catch (err) {
    console.log("[ERROR][CACHE] cache.remove", err);
    return false;
  }
}

export default { save, load, search: load, remove };
